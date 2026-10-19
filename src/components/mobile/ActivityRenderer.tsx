import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Check,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Layers,
  Palette,
  Eraser,
  Save,
  MessageSquare,
  Award,
  Type,
  ChevronRight,
  Quote
} from 'lucide-react';
import { BaseActivity, StudentProgressRecord } from '../../types/workbook';
import { CityCrossingIllustration } from '../illustrations/CityCrossingIllustration';
import { RebusClueCard } from '../illustrations/RebusClues';
import { IndigenousPeoplesInfographic } from '../illustrations/IndigenousPeoplesInfographic';
import { ReasonsToStayInfographic } from '../illustrations/ReasonsToStayInfographic';
import { OceanMidnightZone } from '../illustrations/OceanMidnightZone';
import { SangKancilIllustration } from '../illustrations/SangKancilIllustration';
import { LittleMatchBoyIllustration } from '../illustrations/LittleMatchBoyIllustration';
import { GiftOfMagiIllustration } from '../illustrations/GiftOfMagiIllustration';
import { TwinLakesBrochure } from '../illustrations/TwinLakesBrochure';
import { AgedMotherIllustration } from '../illustrations/AgedMotherIllustration';
import { PropagandaPosters } from '../illustrations/PropagandaPosters';
import { BeowulfIllustration } from '../illustrations/BeowulfIllustration';

interface ActivityRendererProps {
  activity: BaseActivity;
  studentId: string;
  sessionId: number;
  initialRecord?: StudentProgressRecord;
  onSave: (answers: Record<string, any>, isCompleted: boolean, score?: { earned: number; total: number }) => void;
  onNextActivity?: () => void;
  hasNextActivity?: boolean;
}

export const ActivityRenderer: React.FC<ActivityRendererProps> = ({
  activity,
  studentId,
  sessionId,
  initialRecord,
  onSave,
  onNextActivity,
  hasNextActivity,
}) => {
  const [answers, setAnswers] = useState<Record<string, any>>(initialRecord?.answers || {});
  const [showExplanation, setShowExplanation] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Timer for reading passages
  const [readingTimer, setReadingTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Canvas for drawing
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawColor, setDrawColor] = useState('#0284c7');
  const [isDrawing, setIsDrawing] = useState(false);

  // Anagram builder state
  const [currentWordInput, setCurrentWordInput] = useState('');

  // Matching game state
  const [selectedColA, setSelectedColA] = useState<string | null>(null);

  // Reader's Theater role
  const [selectedRole, setSelectedRole] = useState<string>('All');

  // Reset when activity changes
  useEffect(() => {
    setAnswers(initialRecord?.answers || {});
    setShowExplanation(false);
    setIsSpeaking(false);
    setReadingTimer(0);
    setIsTimerRunning(false);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [activity.id, initialRecord]);

  // Handle Reading Timer
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setReadingTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Handle Text-to-Speech
  const toggleSpeech = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsDrawing(true);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = drawColor === '#ffffff' ? 16 : 3;
    ctx.lineCap = 'round';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      setAnswers((prev) => ({ ...prev, drawingData: dataUrl }));
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setAnswers((prev) => {
      const next = { ...prev };
      delete next.drawingData;
      return next;
    });
  };

  // Generic answer change helper
  const handleAnswerChange = (key: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  // Calculate score for objective activities
  const calculateObjectiveScore = (): { earned: number; total: number } | undefined => {
    if (activity.type === 'mcq' && activity.questions) {
      let earned = 0;
      activity.questions.forEach((q) => {
        if (answers[q.id] === q.correctAnswer) earned++;
      });
      return { earned, total: activity.questions.length };
    }

    if (activity.type === 'literal_implied' && activity.questions) {
      let earned = 0;
      activity.questions.forEach((q) => {
        if (answers[q.id] === q.correctAnswer) earned++;
      });
      return { earned, total: activity.questions.length };
    }

    if (activity.type === 'buy_or_bye' && activity.questions) {
      let earned = 0;
      activity.questions.forEach((q) => {
        if (answers[q.id] === q.correctAnswer) earned++;
      });
      return { earned, total: activity.questions.length };
    }

    if (activity.type === 'matching' && activity.customConfig?.correctPairs) {
      const correctPairs = activity.customConfig.correctPairs;
      let earned = 0;
      const total = Object.keys(correctPairs).length;
      Object.keys(correctPairs).forEach((k) => {
        if (answers[k] === correctPairs[k]) earned++;
      });
      return { earned, total };
    }

    if (activity.type === 'categorize' && activity.customConfig?.items) {
      const items = activity.customConfig.items as Array<{ word: string; category: string }>;
      let earned = 0;
      items.forEach((item) => {
        if (answers[item.word] === item.category) earned++;
      });
      return { earned, total: items.length };
    }

    if (activity.type === 'fillblank' && activity.questions) {
      let earned = 0;
      activity.questions.forEach((q) => {
        if (
          answers[q.id] &&
          answers[q.id].trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()
        ) {
          earned++;
        }
      });
      return { earned, total: activity.questions.length };
    }

    if (activity.type === 'sequencing' && activity.customConfig?.sequenceItems) {
      const items = activity.customConfig.sequenceItems as Array<{ key: string; correctPos: number }>;
      let earned = 0;
      items.forEach((item) => {
        if (answers[item.key] === item.correctPos) earned++;
      });
      return { earned, total: items.length };
    }

    if (activity.type === 'jumbled_letters' && activity.questions) {
      let earned = 0;
      activity.questions.forEach((q) => {
        if (
          answers[q.id] &&
          answers[q.id].trim().toUpperCase() === String(q.correctAnswer).trim().toUpperCase()
        ) {
          earned++;
        }
      });
      return { earned, total: activity.questions.length };
    }

    return undefined;
  };

  // Submit and sync handler
  const handleSaveAndSync = () => {
    const score = calculateObjectiveScore();
    onSave(answers, true, score);
    setShowExplanation(true);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  // Render Story / Passage if present
  const renderPassage = () => {
    if (!activity.passageParagraphs && !activity.passage) return null;
    const fullText =
      activity.passage || (activity.passageParagraphs ? activity.passageParagraphs.join(' ') : '');

    return (
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 mb-4 shadow-2xs">
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-amber-200/60">
          <div>
            {activity.storyTitle && (
              <h3 className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
                <span>📖</span>
                <span>{activity.storyTitle}</span>
              </h3>
            )}
            {activity.storyAuthor && (
              <p className="text-[11px] text-slate-500 font-medium">{activity.storyAuthor}</p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className="p-1.5 rounded-lg bg-white border border-amber-200 text-slate-700 hover:bg-amber-100 text-xs font-bold"
              title="Toggle font size"
            >
              {fontSize === 'normal' ? 'A+' : 'A-'}
            </button>
            <button
              onClick={() => toggleSpeech(fullText)}
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 font-medium transition-colors ${
                isSpeaking
                  ? 'bg-rose-500 text-white border-rose-600'
                  : 'bg-white border-amber-200 text-slate-700 hover:bg-amber-100'
              }`}
              title="Listen to story read aloud"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="text-[10px] hidden xs:inline">{isSpeaking ? 'Stop' : 'Listen'}</span>
            </button>
          </div>
        </div>

        {/* Timed Reading Helper for Session 3 */}
        {activity.type === 'reading_timed' && (
          <div className="flex items-center justify-between bg-white/90 rounded-xl p-2.5 mb-3 border border-amber-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Reading Stopwatch:</span>
              <span className="font-mono font-bold text-rose-600 text-sm">
                {Math.floor(readingTimer / 60)}:
                {(readingTimer % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 ${
                  isTimerRunning ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
                }`}
              >
                {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                {isTimerRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setReadingTimer(0);
                }}
                className="p-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        <div
          className={`space-y-3 text-slate-800 leading-relaxed ${
            fontSize === 'large' ? 'text-base' : 'text-xs sm:text-sm'
          }`}
        >
          {activity.passageParagraphs ? (
            activity.passageParagraphs.map((para, idx) => (
              <p key={idx} className="indent-3 text-justify">
                {para}
              </p>
            ))
          ) : (
            <p className="text-justify">{activity.passage}</p>
          )}
        </div>
      </div>
    );
  };

  // Render Teacher Feedback Alert if exists
  const renderTeacherFeedback = () => {
    if (!initialRecord?.teacherFeedback && !initialRecord?.teacherGrade) return null;
    return (
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-3.5 mb-4 shadow-2xs">
        <div className="flex items-center gap-2 mb-1 text-blue-900 font-bold text-xs">
          <MessageSquare className="w-4 h-4 text-blue-600" />
          <span>Teacher’s Note & Evaluation</span>
          {initialRecord.teacherGrade && (
            <span className="ml-auto bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {initialRecord.teacherGrade}
            </span>
          )}
        </div>
        <p className="text-xs text-blue-950 italic mt-1 bg-white/70 p-2.5 rounded-xl border border-blue-100">
          “{initialRecord.teacherFeedback}”
        </p>
      </div>
    );
  };

  return (
    <div className="pb-28">
      {/* Activity Title Banner */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60">
            {activity.activityNumber}
          </span>
          {initialRecord?.score && (
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
              Score: {initialRecord.score.earned} / {initialRecord.score.total}
            </span>
          )}
        </div>
        <h2 className="text-lg font-bold text-slate-900 mt-1 tracking-tight">
          {activity.title}
        </h2>
        <p className="text-xs text-slate-600 mt-1 leading-normal font-medium">
          {activity.instructions}
        </p>
      </div>

      {renderTeacherFeedback()}
      {renderPassage()}

      {/* Visual Illustrations / Posters / Infographics extracted from the PDF */}
      {activity.id === 's2-act1' && (
        <div className="mb-4">
          <SangKancilIllustration />
        </div>
      )}

      {activity.id === 's5-act1' && (
        <div className="mb-4">
          <BeowulfIllustration type="dragon" />
        </div>
      )}

      {(activity.id === 's6-act1' || activity.id === 's6-act2') && (
        <div className="mb-4">
          <LittleMatchBoyIllustration />
        </div>
      )}

      {activity.id === 's7-act1' && (
        <div className="mb-4">
          <CityCrossingIllustration />
        </div>
      )}

      {(activity.id === 's8-act1' || activity.id === 's8-act2') && (
        <div className="mb-4">
          <GiftOfMagiIllustration />
        </div>
      )}

      {activity.id === 's9-act1' && (
        <div className="mb-4">
          <BeowulfIllustration type="grendel" />
        </div>
      )}

      {activity.id === 's10-act1' && (
        <div className="space-y-4 mb-4">
          <TwinLakesBrochure />
          <div className="bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-4 rounded-3xl shadow-sm border border-blue-800">
            <div className="flex items-center gap-1.5 mb-2 text-amber-300">
              <Quote className="w-4 h-4 fill-amber-300/30" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Mindset Quote Reflection (Workbook Page 40)
              </span>
            </div>
            <blockquote className="text-xs sm:text-sm italic font-serif leading-relaxed text-blue-50 pl-2 border-l-2 border-amber-400">
              “The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence.”
            </blockquote>
            <span className="text-xs font-semibold text-amber-300 block text-right mt-2 font-mono">
              — Confucius
            </span>
          </div>
        </div>
      )}

      {activity.id === 's11-act2' && (
        <div className="mb-4">
          <OceanMidnightZone />
        </div>
      )}

      {(activity.id === 's12-act1' || activity.id === 's12-act2') && (
        <div className="mb-4">
          <AgedMotherIllustration />
        </div>
      )}

      {(activity.id === 's13-act1' || activity.id === 's13-act2') && (
        <div className="mb-4">
          <PropagandaPosters />
        </div>
      )}

      {activity.id === 's14-act2' && (
        <div className="mb-4">
          <IndigenousPeoplesInfographic />
        </div>
      )}

      {activity.id === 's14-act4' && (
        <div className="mb-4">
          <ReasonsToStayInfographic />
        </div>
      )}

      {/* Render Specific Activity Interactivity */}
      <div className="space-y-4">
        {/* 1. STANDARD QA */}
        {activity.type === 'qa' && activity.questions && (
          <div className="space-y-3.5">
            {activity.questions.map((q) => (
              <div key={q.id} className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs">
                <label className="block text-xs font-semibold text-slate-900 mb-1.5 leading-snug">
                  {q.prompt}
                </label>
                <textarea
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  placeholder={q.placeholder || 'Write your response here...'}
                  rows={3}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all resize-none outline-none text-slate-800 placeholder:text-slate-400"
                />
              </div>
            ))}
          </div>
        )}

        {/* 2. TABLE QA / WORD DETECTIVE / MEANING CHART (Card style for mobile) */}
        {activity.type === 'table_qa' && activity.tableData && (
          <div className="space-y-3">
            {activity.tableData.rows.map((row) => {
              const isWorkedExample = row.id.includes('_ex');

              return (
                <div
                  key={row.id}
                  className={`border rounded-2xl p-3.5 shadow-2xs ${
                    isWorkedExample
                      ? 'bg-amber-50/40 border-amber-200'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-900 text-sm text-rose-700">
                      {row.word || row.event || 'Workbook Item'}
                    </span>
                    {isWorkedExample ? (
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        Workbook Practice Item
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        Target Word / Item
                      </span>
                    )}
                  </div>
                  {row.sentence && (
                    <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-slate-700 italic mb-2.5 border border-slate-100">
                      "{row.sentence}"
                    </div>
                  )}
                  {row.event && (
                    <div className="bg-slate-50 p-2.5 rounded-xl text-xs font-medium text-slate-800 mb-2.5 border border-slate-100">
                      {row.event}
                    </div>
                  )}
                  <div className="space-y-2">
                    {row.fields.map((field) => (
                      <div key={field.key}>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          value={answers[`${row.id}_${field.key}`] || ''}
                          onChange={(e) =>
                            handleAnswerChange(`${row.id}_${field.key}`, e.target.value)
                          }
                          placeholder={field.placeholder || `Enter ${field.label}...`}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-slate-800 bg-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. ROOT & AFFIX ANALYSIS */}
        {activity.type === 'root_affix' && activity.tableData && (
          <div className="space-y-3">
            {activity.tableData.rows.map((row) => (
              <div key={row.id} className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs">
                <div className="flex items-center justify-between pb-1.5 mb-2.5 border-b border-slate-100">
                  <span className="font-bold text-slate-900 text-sm text-purple-700">
                    {row.word}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">Word Analysis</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block mb-1">
                      Root Word
                    </label>
                    <input
                      type="text"
                      value={answers[`${row.id}_root`] || ''}
                      onChange={(e) => handleAnswerChange(`${row.id}_root`, e.target.value)}
                      placeholder="Root"
                      className="w-full text-xs p-2 rounded-xl border border-slate-200 outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block mb-1">
                      Affix (Prefix/Suffix)
                    </label>
                    <input
                      type="text"
                      value={answers[`${row.id}_affix`] || ''}
                      onChange={(e) => handleAnswerChange(`${row.id}_affix`, e.target.value)}
                      placeholder="Affix"
                      className="w-full text-xs p-2 rounded-xl border border-slate-200 outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">
                    Meaning of Whole Word
                  </label>
                  <input
                    type="text"
                    value={answers[`${row.id}_meaning`] || ''}
                    onChange={(e) => handleAnswerChange(`${row.id}_meaning`, e.target.value)}
                    placeholder="Enter whole word meaning..."
                    className="w-full text-xs p-2 rounded-xl border border-slate-200 outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. DICTIONARY DASH */}
        {activity.type === 'dictionary' && activity.tableData && (
          <div className="space-y-3">
            <div className="bg-amber-50 p-2.5 rounded-xl text-[11px] text-amber-800 flex items-center gap-1.5 border border-amber-200/70">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Use a phone dictionary or reference to find definitions and guide words.</span>
            </div>
            {activity.tableData.rows.map((row) => (
              <div key={row.id} className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs">
                <span className="font-bold text-slate-900 text-sm text-blue-700 block mb-2">
                  {row.word}
                </span>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={answers[`${row.id}_meaning`] || ''}
                    onChange={(e) => handleAnswerChange(`${row.id}_meaning`, e.target.value)}
                    placeholder="Definition / Meaning..."
                    className="w-full text-xs p-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    value={answers[`${row.id}_guideWords`] || ''}
                    onChange={(e) => handleAnswerChange(`${row.id}_guideWords`, e.target.value)}
                    placeholder="Guide Words (e.g., wordA – wordB)..."
                    className="w-full text-xs p-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. MULTIPLE CHOICE (MCQ) */}
        {activity.type === 'mcq' && activity.questions && (
          <div className="space-y-4">
            {activity.questions.map((q) => {
              const selected = answers[q.id];
              return (
                <div key={q.id} className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs">
                  <p className="text-xs font-semibold text-slate-900 mb-3 leading-snug">
                    {q.prompt}
                  </p>
                  <div className="space-y-2">
                    {q.options?.map((opt) => {
                      const isChosen = selected === opt;
                      const isCorrect = showExplanation && opt === q.correctAnswer;
                      const isWrong = showExplanation && isChosen && opt !== q.correctAnswer;

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleAnswerChange(q.id, opt)}
                          className={`w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between border ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                              : isWrong
                              ? 'bg-rose-50 border-rose-400 text-rose-900'
                              : isChosen
                              ? 'bg-rose-50 border-rose-500 text-rose-900 font-semibold shadow-xs'
                              : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="flex-1 pr-2">{opt}</span>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                              isChosen
                                ? isCorrect
                                  ? 'bg-emerald-600 border-emerald-600 text-white'
                                  : isWrong
                                  ? 'bg-rose-600 border-rose-600 text-white'
                                  : 'bg-rose-600 border-rose-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isChosen && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {showExplanation && q.explanation && (
                    <div className="mt-2.5 p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600 border border-slate-200">
                      <span className="font-bold text-slate-800">Explanation: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 6. LITERAL OR IMPLIED TOGGLE */}
        {activity.type === 'literal_implied' && activity.questions && (
          <div className="space-y-3">
            {activity.questions.map((q) => {
              const currentVal = answers[q.id];
              const isCorrect = showExplanation && currentVal === q.correctAnswer;
              return (
                <div key={q.id} className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs">
                  <p className="text-xs font-semibold text-slate-900 mb-2.5 leading-snug">
                    {q.prompt}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleAnswerChange(q.id, 'L')}
                      className={`min-h-[44px] py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                        currentVal === 'L'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>L</span>
                      <span className="text-[10px] font-normal opacity-90">(Literal)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAnswerChange(q.id, 'I')}
                      className={`min-h-[44px] py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                        currentVal === 'I'
                          ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>I</span>
                      <span className="text-[10px] font-normal opacity-90">(Implied)</span>
                    </button>
                  </div>
                  {showExplanation && (
                    <div
                      className={`mt-2 p-2 rounded-xl text-[11px] border ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-rose-50 border-rose-200 text-rose-800'
                      }`}
                    >
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 7. EXIT TICKET */}
        {activity.type === 'exit_ticket' && activity.questions && (
          <div className="bg-linear-to-b from-rose-50/60 to-white border border-rose-200 rounded-3xl p-4 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2 pb-2 border-b border-rose-100">
              <Award className="w-5 h-5 text-rose-600" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Exit Ticket: Reflect & Lock In</h4>
                <p className="text-[11px] text-slate-500">Wrap up this session with your reflections</p>
              </div>
            </div>
            {activity.questions.map((q) => (
              <div key={q.id}>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  {q.prompt}
                </label>
                <input
                  type="text"
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  placeholder={q.placeholder || 'Type here...'}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:border-rose-500 outline-none text-slate-800"
                />
              </div>
            ))}
          </div>
        )}

        {/* 8. CHECKLIST (Self-Assessment) */}
        {activity.type === 'checklist' && activity.questions && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-2.5">
            {activity.questions.map((q) => {
              if (q.placeholder) {
                // Open reflection prompt inside checklist
                return (
                  <div key={q.id} className="pt-2 border-t border-slate-100 mt-2">
                    <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                      {q.prompt}
                    </label>
                    <textarea
                      value={answers[q.id] || ''}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      placeholder={q.placeholder}
                      rows={2}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-rose-500 outline-none resize-none"
                    />
                  </div>
                );
              }

              const isChecked = !!answers[q.id];
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => handleAnswerChange(q.id, !isChecked)}
                  className={`w-full min-h-[48px] p-3 rounded-xl text-left text-xs font-medium border flex items-center justify-between transition-all ${
                    isChecked
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex-1 pr-3">{q.prompt}</span>
                  <div
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* 9. ANAGRAM CHALLENGE: SANG KANCIL */}
        {activity.type === 'anagram' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
            <div className="text-center pb-2 border-b border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Available Letter Pool
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {['S', 'A', 'N', 'G', 'K', 'A', 'N', 'C', 'I', 'L'].map((letter, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentWordInput((prev) => prev + letter)}
                    className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 font-bold text-amber-900 text-sm flex items-center justify-center shadow-xs active:scale-95 transition-transform"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={currentWordInput}
                onChange={(e) => setCurrentWordInput(e.target.value.toUpperCase())}
                placeholder="Type or tap letters above..."
                className="flex-1 text-xs sm:text-sm font-bold tracking-wider uppercase p-2.5 rounded-xl border border-slate-200 outline-none focus:border-rose-500"
              />
              <button
                type="button"
                onClick={() => {
                  const word = currentWordInput.trim().toUpperCase();
                  if (word.length >= 2) {
                    const list = answers.discoveredWords || [];
                    if (!list.includes(word)) {
                      handleAnswerChange('discoveredWords', [...list, word]);
                    }
                    setCurrentWordInput('');
                  }
                }}
                className="px-3.5 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 active:scale-95"
              >
                Add Word
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                <span>Words Found: {(answers.discoveredWords || []).length}</span>
                <span className="text-[11px] text-slate-500 font-normal">
                  (e.g., CAN, SANK, GAIN, SICK, NAIL, SCAN...)
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 min-h-[44px] p-2 bg-slate-50 rounded-xl border border-slate-200">
                {(answers.discoveredWords || []).length === 0 ? (
                  <span className="text-xs text-slate-400 italic">No words added yet</span>
                ) : (
                  (answers.discoveredWords || []).map((w: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-white border border-slate-200 text-slate-800 font-mono font-bold text-xs px-2.5 py-1 rounded-lg shadow-2xs flex items-center gap-1.5"
                    >
                      <span>{w}</span>
                      <button
                        onClick={() =>
                          handleAnswerChange(
                            'discoveredWords',
                            answers.discoveredWords.filter((_: any, i: number) => i !== idx)
                          )
                        }
                        className="text-slate-400 hover:text-rose-600 text-[10px]"
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* 10. SEQUENCING EVENTS (The Little Match Boy) */}
        {activity.type === 'sequencing' && (
          <div className="space-y-3.5">
            <div className="bg-rose-50/70 border border-rose-200 p-3 rounded-2xl text-xs text-rose-900 font-medium">
              Assign the proper order (1st to 5th) for each event in the story:
            </div>
            {activity.customConfig?.sequenceItems.map((item: any) => {
              const currentPos = answers[item.key];
              const isCorrect = showExplanation && currentPos === item.correctPos;
              return (
                <div key={item.key} className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs">
                  <p className="text-xs text-slate-800 font-medium mb-2.5">{item.text}</p>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((pos) => (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => handleAnswerChange(item.key, pos)}
                        className={`flex-1 min-h-[40px] py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          currentPos === pos
                            ? isCorrect
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-rose-600 text-white border-rose-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {pos === 1 ? '1st' : pos === 2 ? '2nd' : pos === 3 ? '3rd' : `${pos}th`}
                      </button>
                    ))}
                  </div>
                  {showExplanation && (
                    <p className="text-[10px] text-slate-500 mt-1.5">
                      Correct position: <strong className="text-slate-800">{item.correctPos}</strong>
                    </p>
                  )}
                </div>
              );
            })}

            {activity.questions?.map((q) => (
              <div key={q.id} className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs">
                <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                  {q.prompt}
                </label>
                <textarea
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  placeholder={q.placeholder || 'Type your response...'}
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:border-rose-500 resize-none"
                />
              </div>
            ))}
          </div>
        )}

        {/* 11. CATEGORIZE ME: REALITY VS FANTASY */}
        {activity.type === 'categorize' && (
          <div className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Tap words below to categorize:
              </span>
              <div className="flex flex-wrap gap-2">
                {activity.customConfig?.items.map((item: any) => {
                  const assigned = answers[item.word];
                  return (
                    <div
                      key={item.word}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                        assigned === 'Reality'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : assigned === 'Fantasy'
                          ? 'bg-purple-100 text-purple-800 border-purple-300'
                          : 'bg-white text-slate-800 border-slate-200 shadow-2xs'
                      }`}
                    >
                      <span>{item.word}</span>
                      <div className="flex items-center gap-0.5 ml-1">
                        <button
                          onClick={() => handleAnswerChange(item.word, 'Reality')}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            assigned === 'Reality'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 text-slate-600 hover:bg-emerald-200'
                          }`}
                          title="Classify as Reality"
                        >
                          R
                        </button>
                        <button
                          onClick={() => handleAnswerChange(item.word, 'Fantasy')}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            assigned === 'Fantasy'
                              ? 'bg-purple-600 text-white'
                              : 'bg-slate-200 text-slate-600 hover:bg-purple-200'
                          }`}
                          title="Classify as Fantasy"
                        >
                          F
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Buckets summary view */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3">
                <h4 className="font-bold text-emerald-900 text-xs mb-2 flex items-center justify-between">
                  <span>Reality Bucket</span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded-md">
                    {
                      Object.keys(answers).filter((k) => answers[k] === 'Reality').length
                    }
                  </span>
                </h4>
                <div className="flex flex-wrap gap-1 text-[11px]">
                  {Object.keys(answers)
                    .filter((k) => answers[k] === 'Reality')
                    .map((w) => (
                      <span key={w} className="bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                        {w}
                      </span>
                    ))}
                </div>
              </div>
              <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-3">
                <h4 className="font-bold text-purple-900 text-xs mb-2 flex items-center justify-between">
                  <span>Fantasy Bucket</span>
                  <span className="text-[10px] bg-purple-200 text-purple-900 px-1.5 py-0.5 rounded-md">
                    {
                      Object.keys(answers).filter((k) => answers[k] === 'Fantasy').length
                    }
                  </span>
                </h4>
                <div className="flex flex-wrap gap-1 text-[11px]">
                  {Object.keys(answers)
                    .filter((k) => answers[k] === 'Fantasy')
                    .map((w) => (
                      <span key={w} className="bg-white px-2 py-0.5 rounded-md border border-purple-200">
                        {w}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 12. BUY OR BYE (Session 13) */}
        {activity.type === 'buy_or_bye' && activity.questions && (
          <div className="space-y-3">
            {activity.questions.map((q) => {
              const currentChoice = answers[q.id];
              const isCorrect = showExplanation && currentChoice === q.correctAnswer;
              return (
                <div key={q.id} className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs">
                  <p className="text-xs font-semibold text-slate-900 mb-2.5 leading-snug">
                    {q.prompt}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleAnswerChange(q.id, 'BUY')}
                      className={`min-h-[44px] py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                        currentChoice === 'BUY'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-emerald-50/50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      <span>👍 BUY</span>
                      <span className="text-[10px] font-normal opacity-90">(Agree)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAnswerChange(q.id, 'BYE')}
                      className={`min-h-[44px] py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                        currentChoice === 'BYE'
                          ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                          : 'bg-rose-50/50 text-rose-800 border-rose-200 hover:bg-rose-100'
                      }`}
                    >
                      <span>👎 BYE</span>
                      <span className="text-[10px] font-normal opacity-90">(Disagree)</span>
                    </button>
                  </div>
                  {showExplanation && (
                    <div
                      className={`mt-2 p-2 rounded-xl text-[11px] border ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-rose-50 border-rose-200 text-rose-800'
                      }`}
                    >
                      Recommended standard answer: <strong>{q.correctAnswer}</strong>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 13. MATCHING (Propaganda Techniques) */}
        {activity.type === 'matching' && activity.customConfig && (() => {
          const cfg = activity.customConfig;
          return (
            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs space-y-3">
              <p className="text-xs text-slate-600">
                Tap a <strong>Technique (Column A)</strong>, then tap its matching <strong>Definition (Column B)</strong>:
              </p>
              <div className="space-y-2">
                {cfg.columnA.map((itemA: any) => {
                  const pairedB = answers[itemA.id];
                  const matchingDef = cfg.columnB.find((b: any) => b.id === pairedB);
                  const isSelected = selectedColA === itemA.id;
                  const isCorrect = showExplanation && cfg.correctPairs[itemA.id] === pairedB;

                  return (
                    <div key={itemA.id} className="border border-slate-200 rounded-xl p-2.5 bg-slate-50/50">
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setSelectedColA(isSelected ? null : itemA.id)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                            isSelected
                              ? 'bg-rose-600 text-white border-rose-600'
                              : pairedB
                              ? 'bg-white text-slate-800 border-slate-300'
                              : 'bg-white text-rose-700 border-rose-300 hover:bg-rose-50'
                          }`}
                        >
                          {itemA.label}
                        </button>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {pairedB ? '✓ Paired' : 'Select pair'}
                        </span>
                      </div>

                      {matchingDef ? (
                        <div
                          className={`mt-2 p-2 rounded-lg text-xs border ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          {matchingDef.label}
                        </div>
                      ) : null}

                      {isSelected && (
                        <div className="mt-2.5 pt-2 border-t border-slate-200 space-y-1.5">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">
                            Choose definition for {itemA.label}:
                          </span>
                          {cfg.columnB.map((itemB: any) => (
                            <button
                              key={itemB.id}
                              type="button"
                              onClick={() => {
                                handleAnswerChange(itemA.id, itemB.id);
                                setSelectedColA(null);
                              }}
                              className="w-full text-left text-xs p-2 rounded-lg bg-white border border-slate-200 hover:border-rose-400 text-slate-800"
                            >
                              {itemB.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* 14. FILL IN THE BLANK (Word Bank) */}
        {activity.type === 'fillblank' && activity.customConfig && activity.questions && (
          <div className="space-y-4">
            <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-2xl">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-2">
                Word Bank (Tap or select for each blank)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activity.customConfig.wordBank.map((word: string) => (
                  <span
                    key={word}
                    className="bg-white border border-amber-300 text-amber-950 px-2.5 py-1 rounded-lg text-xs font-semibold shadow-2xs"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {activity.questions.map((q) => {
                const currentAnswer = answers[q.id] || '';
                const isCorrect =
                  showExplanation &&
                  currentAnswer.trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();

                return (
                  <div key={q.id} className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs">
                    <p className="text-xs text-slate-900 font-medium mb-2 leading-relaxed">
                      {q.prompt}
                    </p>
                    <select
                      value={currentAnswer}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-rose-500 outline-none text-slate-800 font-medium"
                    >
                      <option value="">-- Choose from Word Bank --</option>
                      {activity.customConfig?.wordBank.map((word: string) => (
                        <option key={word} value={word}>
                          {word}
                        </option>
                      ))}
                    </select>
                    {showExplanation && (
                      <p className="text-[11px] text-slate-500 mt-1.5">
                        Answer: <strong className="text-emerald-700">{q.correctAnswer}</strong>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 15. REBUS PUZZLE: GUESS THE PROVINCE */}
        {activity.type === 'rebus' && activity.questions && (
          <div className="space-y-4">
            {activity.questions.map((q, idx) => {
              const userGuess = answers[q.id] || '';
              const isCorrect =
                showExplanation &&
                userGuess.trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();

              return (
                <div key={q.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">
                      Visual Clue #{idx + 1}
                    </span>
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60">
                      Guess the Province
                    </span>
                  </div>

                  {/* Render Visual Rebus Illustration */}
                  <RebusClueCard itemIndex={idx + 1} />

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Philippine Province Answer:
                    </label>
                    <input
                      type="text"
                      value={userGuess}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      placeholder={q.placeholder || 'Type the Philippine province name...'}
                      className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 focus:border-rose-500 outline-none text-slate-900 bg-slate-50 focus:bg-white"
                    />
                  </div>

                  {showExplanation && (
                    <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600 border border-slate-200">
                      <strong>Answer: </strong> {q.correctAnswer} · {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 16. JUMBLED LETTERS (Session 14) */}
        {activity.type === 'jumbled_letters' && activity.questions && (
          <div className="space-y-3">
            {activity.questions.map((q) => {
              const currentVal = answers[q.id] || '';
              const isCorrect =
                showExplanation &&
                currentVal.trim().toUpperCase() === String(q.correctAnswer).trim().toUpperCase();

              return (
                <div key={q.id} className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-slate-800">{q.prompt}</span>
                    <span className="text-xs font-mono font-bold tracking-widest bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md border border-amber-300">
                      {q.jumbled}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={currentVal}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value.toUpperCase())}
                    placeholder="Rearrange letters here..."
                    className="w-full text-xs font-bold tracking-wider uppercase p-2.5 rounded-xl border border-slate-200 focus:border-rose-500 outline-none"
                  />
                  {showExplanation && (
                    <p className="text-[11px] text-emerald-700 font-semibold mt-1.5">
                      Correct: {q.correctAnswer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 17. READER'S THEATER (Beowulf) */}
        {activity.type === 'script_theater' && activity.customConfig && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800">Your Character Role:</span>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="text-xs p-1.5 rounded-lg border border-slate-300 font-semibold bg-slate-50 text-slate-800"
              >
                {activity.customConfig.characters.map((char: string) => (
                  <option key={char} value={char}>
                    {char}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              {activity.customConfig.scenes.map((scene: any) => (
                <div key={scene.sceneNumber} className="border border-slate-200 rounded-xl p-3 bg-slate-50/50">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Scene {scene.sceneNumber}
                  </span>
                  <div className="space-y-2.5">
                    {scene.dialogues.map((dlg: any, idx: number) => {
                      const isMyPart = selectedRole === 'All' || selectedRole === dlg.speaker;
                      return (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl text-xs transition-all ${
                            isMyPart
                              ? 'bg-amber-100/80 border border-amber-300 text-slate-900 font-medium'
                              : 'text-slate-600 bg-white/70 border border-slate-100'
                          }`}
                        >
                          <span className="font-bold text-rose-700 block mb-0.5">
                            {dlg.speaker}:
                          </span>
                          <span>{dlg.line}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 18. DRAWING PROFILE (Deep Sea Monster Profile) */}
        {activity.type === 'drawing_profile' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Creature Name
              </label>
              <input
                type="text"
                value={answers.monster_name || ''}
                onChange={(e) => handleAnswerChange('monster_name', e.target.value)}
                placeholder="e.g. Abyssal Leviathan..."
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:border-rose-500 font-semibold"
              />
            </div>

            {/* Drawing Canvas */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-700">Draw Your Creature:</span>
                <div className="flex items-center gap-1">
                  {['#0284c7', '#10b981', '#f43f5e', '#1e293b', '#ffffff'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setDrawColor(color)}
                      className={`w-5 h-5 rounded-full border-2 ${
                        drawColor === color ? 'border-rose-600 scale-110' : 'border-slate-300'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color === '#ffffff' ? 'Eraser' : 'Brush Color'}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="p-1 rounded-md text-slate-500 hover:text-rose-600 text-[10px] ml-1 font-semibold"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="relative border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden bg-slate-900 touch-none">
                <canvas
                  ref={canvasRef}
                  width={340}
                  height={190}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-[190px] cursor-crosshair"
                />
              </div>
            </div>

            {/* 3 Sentences using literary devices */}
            <div className="space-y-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  1. Sentence 1 (Simile or Metaphor):
                </label>
                <input
                  type="text"
                  value={answers.monster_s1 || ''}
                  onChange={(e) => handleAnswerChange('monster_s1', e.target.value)}
                  placeholder="e.g. Its scales shone like shattered obsidian."
                  className="w-full text-xs p-2 rounded-xl border border-slate-200 outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  2. Sentence 2 (Personification or Alliteration):
                </label>
                <input
                  type="text"
                  value={answers.monster_s2 || ''}
                  onChange={(e) => handleAnswerChange('monster_s2', e.target.value)}
                  placeholder="e.g. Silent shadows slithered along the sea floor."
                  className="w-full text-xs p-2 rounded-xl border border-slate-200 outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  3. Sentence 3 (Onomatopoeia or Imagery):
                </label>
                <input
                  type="text"
                  value={answers.monster_s3 || ''}
                  onChange={(e) => handleAnswerChange('monster_s3', e.target.value)}
                  placeholder="e.g. Whoosh! The cold current churned as its fin sliced the dark."
                  className="w-full text-xs p-2 rounded-xl border border-slate-200 outline-none focus:border-rose-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* 19. CREATE YOUR OWN INFOGRAPHIC (Session 14) */}
        {activity.type === 'infographic_builder' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Infographic Headline
              </label>
              <input
                type="text"
                value={answers.info_title || ''}
                onChange={(e) => handleAnswerChange('info_title', e.target.value)}
                placeholder="Type your catchy headline (e.g. Why Reading Daily Transforms Your Mind)..."
                className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 outline-none focus:border-rose-500 text-slate-900 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Key Stat 1
                </label>
                <input
                  type="text"
                  value={answers.info_stat1 || ''}
                  onChange={(e) => handleAnswerChange('info_stat1', e.target.value)}
                  placeholder="e.g. +50% Vocabulary"
                  className="w-full text-xs p-2 rounded-xl border border-slate-200 outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Key Stat 2
                </label>
                <input
                  type="text"
                  value={answers.info_stat2 || ''}
                  onChange={(e) => handleAnswerChange('info_stat2', e.target.value)}
                  placeholder="e.g. 15 Mins Daily"
                  className="w-full text-xs p-2 rounded-xl border border-slate-200 outline-none bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Visual Highlight / Core Message
              </label>
              <textarea
                value={answers.info_highlight || ''}
                onChange={(e) => handleAnswerChange('info_highlight', e.target.value)}
                placeholder="Write your visual highlight or key message..."
                rows={2}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:border-rose-500 resize-none bg-white"
              />
            </div>

            {/* Mobile Infographic Preview Card */}
            <div className="border-2 border-rose-400 bg-linear-to-br from-rose-500 via-amber-500 to-indigo-600 rounded-2xl p-4 text-white shadow-md">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2 py-0.5 rounded-full inline-block mb-2 backdrop-blur-xs">
                DepEd ARAL Infographic Card
              </span>
              <h3 className="font-extrabold text-base leading-tight text-white mb-3">
                {answers.info_title || '[Your Infographic Headline]'}
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-white/15 backdrop-blur-md p-2 rounded-xl border border-white/20 text-center">
                  <span className="text-xs font-black block">
                    {answers.info_stat1 || '[Key Stat 1]'}
                  </span>
                  <span className="text-[9px] opacity-80">Proven Result</span>
                </div>
                <div className="bg-white/15 backdrop-blur-md p-2 rounded-xl border border-white/20 text-center">
                  <span className="text-xs font-black block">
                    {answers.info_stat2 || '[Key Stat 2]'}
                  </span>
                  <span className="text-[9px] opacity-80">Simple Routine</span>
                </div>
              </div>
              <p className="text-[11px] leading-relaxed bg-black/20 p-2.5 rounded-xl border border-white/10">
                {answers.info_highlight || '[Your core message or key insight will appear here.]'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating / Sticky Bottom CTA Bar */}
      <div className="fixed bottom-14 left-0 right-0 z-30 p-3 bg-linear-to-t from-white via-white/95 to-transparent max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveAndSync}
            className="flex-1 h-12 rounded-xl bg-slate-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 active:scale-[0.98] transition-all hover:bg-slate-800"
          >
            <Save className="w-4 h-4 text-emerald-400" />
            <span>Save & Sync with Teacher</span>
          </button>
          {hasNextActivity && onNextActivity && (
            <button
              type="button"
              onClick={onNextActivity}
              className="h-12 px-3.5 rounded-xl bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md hover:bg-rose-700 active:scale-95 transition-all shrink-0"
              title="Next Activity"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-emerald-700 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-300" />
          <span>Synced directly with Teacher's Dashboard!</span>
        </div>
      )}
    </div>
  );
};
