import React, { useState } from 'react';
import {
  Award,
  CheckCircle,
  Clock,
  Sparkles,
  MessageSquare,
  Star,
  ChevronRight,
  TrendingUp,
  RefreshCw,
  QrCode,
  ShieldCheck,
} from 'lucide-react';
import { StudentSummary, StudentProgressRecord, WorkbookSession } from '../../types/workbook';
import { WORKBOOK_SESSIONS } from '../../data/workbookData';
import { SessionQRCodeModal } from './SessionQRCodeModal';

interface StudentProgressTrackerViewProps {
  summary: StudentSummary;
  records: StudentProgressRecord[];
  onOpenSession: (session: WorkbookSession, actIndex?: number) => void;
  onTriggerSync: () => void;
}

export const StudentProgressTrackerView: React.FC<StudentProgressTrackerViewProps> = ({
  summary,
  records,
  onOpenSession,
  onTriggerSync,
}) => {
  const [qrModalSession, setQrModalSession] = useState<WorkbookSession | null>(null);
  const percentage = Math.round(
    (summary.completedActivitiesCount / summary.totalActivitiesCount) * 100
  );

  const teacherReviewedRecords = records.filter((r) => r.teacherFeedback || r.teacherGrade);

  // Gamification badges
  const badges = [
    {
      title: 'Active Learner',
      desc: 'Completed at least 1 activity',
      unlocked: summary.completedActivitiesCount >= 1,
      icon: '🌱',
    },
    {
      title: 'ARAL Explorer',
      desc: 'Completed Session 1 Diagnostic & Goals',
      unlocked: summary.sessionStatus[1] === 'completed',
      icon: '🎯',
    },
    {
      title: 'Context Detective',
      desc: 'Mastered Session 2 vocabulary',
      unlocked: summary.sessionStatus[2] === 'completed',
      icon: '🔍',
    },
    {
      title: 'Fluency Champion',
      desc: 'Completed Session 3 and 5 pacing',
      unlocked: summary.sessionStatus[3] === 'completed' || summary.sessionStatus[5] === 'completed',
      icon: '🎙️',
    },
    {
      title: 'Plot Master',
      desc: 'Sequenced Little Match Boy',
      unlocked: summary.sessionStatus[6] === 'completed',
      icon: '📜',
    },
    {
      title: 'Media Discernment',
      desc: 'Distinguished facts from propaganda',
      unlocked: summary.sessionStatus[12] === 'completed' || summary.sessionStatus[13] === 'completed',
      icon: '💡',
    },
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* Top Sync & Status Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Personal Progress Tracker
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              {summary.student.name}
            </h2>
          </div>
          <button
            onClick={onTriggerSync}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition-colors active:scale-95"
            title="Sync with Teacher's Dashboard"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sync Live</span>
          </button>
        </div>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-1">
          <div className="bg-slate-50 p-2.5 rounded-2xl text-center border border-slate-100">
            <span className="text-xl font-extrabold text-slate-900 block font-mono">
              {percentage}%
            </span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight">
              Progress
            </span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-2xl text-center border border-slate-100">
            <span className="text-xl font-extrabold text-rose-600 block font-mono">
              {summary.completedActivitiesCount}
            </span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight">
              Activities
            </span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-2xl text-center border border-slate-100">
            <span className="text-xl font-extrabold text-emerald-600 block font-mono">
              {summary.averageScorePercentage}%
            </span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight">
              Accuracy
            </span>
          </div>
        </div>
      </div>

      {/* Teacher's Notes & Remarks Section */}
      {teacherReviewedRecords.length > 0 && (
        <div className="bg-linear-to-br from-indigo-50 to-blue-50 border border-blue-200 rounded-3xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              Teacher's Remarks & Feedback
            </h3>
            <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full ml-auto">
              {teacherReviewedRecords.length} Reviewed
            </span>
          </div>

          <div className="space-y-2.5">
            {teacherReviewedRecords.map((r, i) => {
              const session = WORKBOOK_SESSIONS.find((s) => s.id === r.sessionId);
              const activity = session?.activities.find((a) => a.id === r.activityId);
              return (
                <div key={i} className="bg-white/90 p-3 rounded-2xl border border-blue-100 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800">
                      {activity?.title || r.activityId}
                    </span>
                    {r.teacherGrade && (
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                        {r.teacherGrade}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 italic mt-0.5">“{r.teacherFeedback}”</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Unlocked Badges */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-sm">Reading Badges</h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {badges.filter((b) => b.unlocked).length}/{badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-2xl border transition-all ${
                badge.unlocked
                  ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                  : 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{badge.icon}</span>
                <span className="text-xs font-bold leading-tight truncate">{badge.title}</span>
              </div>
              <p className="text-[10px] leading-snug text-slate-500">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Session Progress Checklist */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Session Mastery Overview
            </h3>
            <p className="text-[11px] text-slate-500">
              Show QR to your teacher to record answers offline
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {summary.completedSessionsCount}/{WORKBOOK_SESSIONS.length} Done
          </span>
        </div>

        <div className="space-y-2">
          {WORKBOOK_SESSIONS.map((s) => {
            const status = summary.sessionStatus[s.id] || 'not_started';
            const sRecords = records.filter((r) => r.sessionId === s.id);
            const hasAnswers = sRecords.length > 0;

            return (
              <div
                key={s.id}
                className="p-3 rounded-2xl border border-slate-100 hover:border-slate-200 bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs shadow-2xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      status === 'completed'
                        ? 'bg-emerald-500 ring-2 ring-emerald-100'
                        : status === 'in_progress'
                        ? 'bg-amber-500'
                        : 'bg-slate-300'
                    }`}
                  />
                  <div className="min-w-0">
                    <span className="font-bold text-slate-800 block truncate">
                      Session {s.sessionNumber}: {s.title}
                    </span>
                    <span className="text-[10px] text-slate-400 capitalize">
                      {status === 'completed'
                        ? '✓ Session Completed'
                        : status === 'in_progress'
                        ? '• In Progress'
                        : '○ Pending'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  {/* Show Session QR Button */}
                  <button
                    onClick={() => setQrModalSession(s)}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-[11px] flex items-center gap-1.5 transition active:scale-95 shadow-2xs border border-indigo-200/60"
                    title={`Generate offline QR code for Session ${s.sessionNumber}`}
                  >
                    <QrCode className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Show QR</span>
                  </button>

                  <button
                    onClick={() => onOpenSession(s)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-[11px] flex items-center gap-0.5 transition"
                  >
                    <span>Open</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Session QR Code Modal */}
      {qrModalSession && (
        <SessionQRCodeModal
          session={qrModalSession}
          student={summary.student}
          sessionRecords={records.filter((r) => r.sessionId === qrModalSession.id)}
          onClose={() => setQrModalSession(null)}
        />
      )}
    </div>
  );
};
