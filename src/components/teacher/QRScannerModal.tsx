import React, { useState, useEffect, useRef } from 'react';
import jsQR from 'jsqr';
import {
  Camera,
  X,
  Sparkles,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Clipboard,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { StorageService } from '../../services/storageService';
import { AutoCheckingService, ActivityCheckResult } from '../../services/autoCheckingService';
import { WORKBOOK_SESSIONS } from '../../data/workbookData';
import { SessionSyncPayload } from '../mobile/SessionQRCodeModal';

interface QRScannerModalProps {
  onClose: () => void;
  onSuccessCheck: (studentId: string, sessionId: number) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({ onClose, onSuccessCheck }) => {
  const [mode, setMode] = useState<'camera' | 'paste'>('camera');
  const [pasteInput, setPasteInput] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [cameraPermissionError, setCameraPermissionError] = useState(false);

  // Result state after decoding
  const [checkResult, setCheckResult] = useState<{
    studentName: string;
    sessionId: number;
    sessionTitle: string;
    totalEarned: number;
    totalPossible: number;
    percentage: number;
    evaluatedActivities: ActivityCheckResult[];
    suggestedGrade: string;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start Camera Stream
  useEffect(() => {
    if (mode !== 'camera' || checkResult) {
      stopCamera();
      return;
    }

    let active = true;

    async function initCamera() {
      try {
        setCameraPermissionError(false);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });

        if (!active) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute('playsinline', 'true');
          videoRef.current.play();
          requestAnimationFrame(scanVideoFrame);
        }
      } catch (err) {
        console.warn('Camera error or blocked', err);
        setCameraPermissionError(true);
        setMode('paste');
      }
    }

    initCamera();

    return () => {
      active = false;
      stopCamera();
    };
  }, [mode, checkResult]);

  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  // Continuous frame scanning
  const scanVideoFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;

    if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.height = videoRef.current.videoHeight;
        canvas.width = videoRef.current.videoWidth;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (code && code.data) {
          handleProcessPayload(code.data);
          return;
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(scanVideoFrame);
  };

  // Parse & evaluate incoming student session QR payload
  const handleProcessPayload = (rawPayloadString: string) => {
    try {
      const parsed: SessionSyncPayload = JSON.parse(rawPayloadString);

      if (!parsed || parsed.proto !== 'ARAL_S1' || !parsed.sid || !parsed.stId) {
        setErrorMsg('Invalid QR code format. Please scan an ARAL Reading Plus Session QR.');
        return;
      }

      stopCamera();
      setErrorMsg('');

      // 1. Ensure student exists in roster
      const students = StorageService.getStudents();
      let student = students.find((s) => s.id === parsed.stId);
      if (!student) {
        student = StorageService.addStudent(parsed.stName || 'Student', 'Grade 8', 'Sampaguita');
      }

      // 2. Ingest all answers into storage
      const session = WORKBOOK_SESSIONS.find((s) => s.id === parsed.sid);
      if (!session) {
        setErrorMsg(`Session #${parsed.sid} not found in workbook syllabus.`);
        return;
      }

      Object.entries(parsed.acts || {}).forEach(([actId, actData]) => {
        if (actData.done) {
          StorageService.saveActivityAnswer(
            student.id,
            parsed.sid,
            actId,
            actData.ans || {},
            true
          );
        }
      });

      // 3. Immediately run auto-grading evaluation on this session
      const studentEval = AutoCheckingService.autoGradeStudent(student.id);
      const sessionActs = studentEval.results.filter((r) => r.sessionId === parsed.sid);

      const totalEarned = sessionActs.reduce((acc, curr) => acc + curr.earnedPoints, 0);
      const totalPossible = sessionActs.reduce((acc, curr) => acc + curr.totalPoints, 0);
      const percentage = totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 0;

      let grade = 'Needs Support';
      if (percentage >= 80) grade = 'Mastered';
      else if (percentage >= 60) grade = 'Satisfactory';

      setCheckResult({
        studentName: parsed.stName,
        sessionId: parsed.sid,
        sessionTitle: session.title,
        totalEarned,
        totalPossible,
        percentage,
        evaluatedActivities: sessionActs,
        suggestedGrade: grade,
      });

      onSuccessCheck(student.id, parsed.sid);
    } catch (err) {
      console.error('Error parsing QR data', err);
      setErrorMsg('Could not decode QR payload. Ensure the student code is valid.');
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pasteInput.trim()) return;
    handleProcessPayload(pasteInput.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-amber-500 to-rose-600 text-white flex items-center justify-center shadow-md">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                Teacher Offline Sync & Auto-Check
              </span>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                Scan Student Session QR
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Evaluation Result View */}
        {checkResult ? (
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-950 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="font-extrabold text-sm">{checkResult.studentName}</span>
                </div>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                  {checkResult.suggestedGrade} ({checkResult.percentage}%)
                </span>
              </div>
              <p className="text-xs text-emerald-800">
                Session {checkResult.sessionId}: <strong>{checkResult.sessionTitle}</strong>
              </p>
              <div className="flex items-center gap-3 text-xs font-bold pt-1 border-t border-emerald-200/80">
                <span>Score: {checkResult.totalEarned} / {checkResult.totalPossible} pts</span>
                <span>·</span>
                <span>{checkResult.evaluatedActivities.length} Activities Checked</span>
              </div>
            </div>

            {/* Question Breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Automatic Evaluation Breakdown:
              </span>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1 text-xs">
                {checkResult.evaluatedActivities.map((act) => (
                  <div
                    key={act.activityId}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>{act.activityNumber}: {act.title}</span>
                      <span className="font-mono text-[11px] text-emerald-700">
                        {act.earnedPoints}/{act.totalPoints} pts
                      </span>
                    </div>

                    <div className="space-y-1">
                      {act.details.map((q, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between gap-2 p-1.5 rounded bg-white border border-slate-100 text-[11px]"
                        >
                          <div className="min-w-0">
                            <span className="font-medium text-slate-700 block truncate">
                              {q.questionPrompt}
                            </span>
                            <span className="text-slate-500 font-semibold">
                              Answer: “{q.studentAnswer}”
                            </span>
                          </div>
                          <span
                            className={`shrink-0 font-bold px-1.5 py-0.5 rounded text-[9px] ${
                              q.status === 'correct'
                                ? 'bg-emerald-100 text-emerald-800'
                                : q.status === 'partial'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {q.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] text-slate-600 italic bg-amber-50/60 p-2 rounded-lg border border-amber-200/60">
                      Suggested Feedback: “{act.suggestedFeedback}”
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setCheckResult(null);
                  setMode('camera');
                }}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Scan Another Student</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition shadow-xs"
              >
                Done & View in Matrix
              </button>
            </div>
          </div>
        ) : (
          /* Scanning View */
          <>
            <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-bold border border-slate-200">
              <button
                onClick={() => setMode('camera')}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  mode === 'camera' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Live Camera Scanner</span>
              </button>
              <button
                onClick={() => setMode('paste')}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  mode === 'paste' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>Paste Text Code</span>
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {mode === 'camera' ? (
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-square max-w-xs mx-auto border-2 border-slate-800 shadow-inner flex items-center justify-center">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                  />
                  <canvas ref={canvasRef} className="hidden" />

                  {/* Scanner Reticle Overlay */}
                  <div className="absolute inset-8 border-2 border-amber-400/80 rounded-2xl pointer-events-none shadow-2xs">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-amber-400 rounded-tl-xl" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-amber-400 rounded-tr-xl" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-amber-400 rounded-bl-xl" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-amber-400 rounded-br-xl" />
                    {/* Animated Laser line */}
                    <div className="w-full h-0.5 bg-rose-500 shadow-md shadow-rose-500/50 animate-pulse mt-16" />
                  </div>
                </div>

                <p className="text-center text-xs text-slate-500">
                  Point camera at the student's phone screen showing their <strong>Session QR</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleManualSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Paste Student Offline Submission Code:
                  </label>
                  <textarea
                    rows={5}
                    value={pasteInput}
                    onChange={(e) => setPasteInput(e.target.value)}
                    placeholder='{"proto":"ARAL_S1","sid":2,"stId":"student-1",...}'
                    className="w-full text-xs font-mono p-3 rounded-2xl border border-slate-200 outline-none focus:border-rose-600 bg-slate-50"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md transition"
                >
                  Verify & Check Answers
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};
