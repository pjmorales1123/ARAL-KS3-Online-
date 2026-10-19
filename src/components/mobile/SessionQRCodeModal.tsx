import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  X,
  CheckCircle2,
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { StudentProfile, StudentProgressRecord, WorkbookSession } from '../../types/workbook';

interface SessionQRCodeModalProps {
  session: WorkbookSession;
  student: StudentProfile;
  sessionRecords: StudentProgressRecord[];
  onClose: () => void;
}

export interface SessionSyncPayload {
  proto: 'ARAL_S1';
  sid: number;
  stId: string;
  stName: string;
  lrn: string;
  ts: string;
  acts: Record<
    string,
    {
      done: boolean;
      ans: Record<string, any>;
      score?: { e: number; t: number };
    }
  >;
}

export const SessionQRCodeModal: React.FC<SessionQRCodeModalProps> = ({
  session,
  student,
  sessionRecords,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'qr' | 'code'>('qr');
  const [encodedPayloadString, setEncodedPayloadString] = useState('');

  // Prepare compressed sync payload
  useEffect(() => {
    const activityMap: Record<string, any> = {};

    session.activities.forEach((act) => {
      const rec = sessionRecords.find((r) => r.activityId === act.id);
      if (rec && rec.isCompleted) {
        // Strip heavy binary like drawings for QR code; keep all answers, MCQs, words, text
        const cleanedAnswers: Record<string, any> = {};
        Object.entries(rec.answers || {}).forEach(([k, v]) => {
          if (k === 'drawingData') {
            cleanedAnswers[k] = '[Canvas Drawing Submitted]';
          } else {
            cleanedAnswers[k] = v;
          }
        });

        activityMap[act.id] = {
          done: true,
          ans: cleanedAnswers,
          score: rec.score ? { e: rec.score.earned, t: rec.score.total } : undefined,
        };
      }
    });

    const payload: SessionSyncPayload = {
      proto: 'ARAL_S1',
      sid: session.id,
      stId: student.id,
      stName: student.name,
      lrn: student.lrn,
      ts: new Date().toISOString(),
      acts: activityMap,
    };

    const jsonString = JSON.stringify(payload);
    setEncodedPayloadString(jsonString);

    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        jsonString,
        {
          width: 250,
          margin: 2,
          color: {
            dark: '#0f172a',
            light: '#ffffff',
          },
          errorCorrectionLevel: 'M',
        },
        (error) => {
          if (error) console.error('QR Render error:', error);
        }
      );
    }
  }, [session, student, sessionRecords]);

  const completedActivitiesCount = sessionRecords.filter(
    (r) => r.sessionId === session.id && r.isCompleted
  ).length;

  const handleCopy = () => {
    navigator.clipboard.writeText(encodedPayloadString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4">
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
                Session {session.sessionNumber} Offline Submission
              </span>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                Teacher Check QR
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

        {/* Student & Session Tag */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-900 block truncate max-w-[190px]">
              {student.avatar} {student.name}
            </span>
            <span className="text-[11px] text-slate-500 font-mono">LRN: {student.lrn}</span>
          </div>
          <div className="text-right">
            <span className="font-extrabold text-indigo-600 block">
              {completedActivitiesCount}/{session.activities.length} Done
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold">Ready to Check</span>
          </div>
        </div>

        {/* Tabs: QR Code vs Text String */}
        <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-bold border border-slate-200">
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
              activeTab === 'qr' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR Scanner Code</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
              activeTab === 'code' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Copy Text Code</span>
          </button>
        </div>

        {/* QR View */}
        {activeTab === 'qr' ? (
          <div className="flex flex-col items-center justify-center py-2 space-y-3">
            <div className="p-3 bg-white border-2 border-indigo-200 rounded-2xl shadow-md flex items-center justify-center">
              <canvas ref={canvasRef} className="rounded-lg max-w-full" />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-center text-xs text-amber-900 max-w-xs">
              <span className="font-bold block mb-0.5">📱 Show this to your teacher:</span>
              <p className="text-[11px] text-amber-800 leading-tight">
                Turn your screen brightness to maximum. Your teacher will scan this code on their dashboard to instantly record and grade your answers.
              </p>
            </div>
          </div>
        ) : (
          /* Text Fallback View */
          <div className="space-y-2.5">
            <p className="text-xs text-slate-600">
              If your teacher’s camera is unavailable, copy this offline submission token and send it or let your teacher paste it:
            </p>
            <div className="bg-slate-900 text-slate-200 font-mono text-[10px] p-3 rounded-2xl max-h-36 overflow-y-auto break-all border border-slate-800 select-all">
              {encodedPayloadString}
            </div>
            <button
              onClick={handleCopy}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Code Copied to Clipboard!' : 'Copy Submission Code'}</span>
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition shadow-xs"
        >
          Done / Close
        </button>
      </div>
    </div>
  );
};
