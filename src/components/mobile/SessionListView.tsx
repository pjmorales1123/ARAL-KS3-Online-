import React, { useState } from 'react';
import { BookOpen, CheckCircle, Clock, ChevronRight, Award, Sparkles, BookMarked, Lock, KeyRound } from 'lucide-react';
import { WORKBOOK_SESSIONS } from '../../data/workbookData';
import { WorkbookSession, StudentProgressRecord } from '../../types/workbook';
import { SessionSecurityService } from '../../services/sessionSecurityService';
import { SessionUnlockModal } from './SessionUnlockModal';

interface SessionListViewProps {
  studentId: string;
  studentRecords: StudentProgressRecord[];
  currentSessionId: number;
  onSelectSession: (session: WorkbookSession, activityIndex?: number) => void;
}

export const SessionListView: React.FC<SessionListViewProps> = ({
  studentId,
  studentRecords,
  currentSessionId,
  onSelectSession,
}) => {
  const [unlockTargetSession, setUnlockTargetSession] = useState<WorkbookSession | null>(null);
  const [unlockVersion, setUnlockVersion] = useState(0);

  // Calculate stats
  let totalActs = 0;
  let completedActs = 0;

  WORKBOOK_SESSIONS.forEach((s) => {
    totalActs += s.activities.length;
    const sActs = s.activities.map((a) => a.id);
    const done = studentRecords.filter((r) => sActs.includes(r.activityId) && r.isCompleted).length;
    completedActs += done;
  });

  const overallPercentage = Math.round((completedActs / totalActs) * 100);

  const handleSessionClick = (session: WorkbookSession, actIdx = 0) => {
    const isUnlocked = SessionSecurityService.isSessionUnlocked(studentId, session.id);
    if (isUnlocked) {
      onSelectSession(session, actIdx);
    } else {
      setUnlockTargetSession(session);
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* DepEd ARAL Welcome Header Banner */}
      <div className="bg-linear-to-br from-rose-600 via-rose-700 to-amber-600 rounded-3xl p-4 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-xs">
              DepEd ARAL Program · Key Stage 3
            </span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight leading-tight">
            Reading Plus Mobile Workbook
          </h1>
          <p className="text-xs text-rose-100 font-medium mt-0.5">
            Key Stage 3 · Interactive Student Companion
          </p>

          {/* Progress Mini Bar */}
          <div className="mt-3 bg-black/20 p-2.5 rounded-2xl border border-white/10 backdrop-blur-xs">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-rose-50">My Workbook Progress</span>
              <span className="font-bold font-mono text-amber-200">{overallPercentage}% Complete</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-rose-100 mt-1">
              <span>{completedActs} of {totalActs} activities completed</span>
              <span>Sessions 1 – 14</span>
            </div>
          </div>
        </div>
      </div>

      {/* Session Cards List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Table of Contents
          </h2>
          <span className="text-xs text-slate-400 font-medium">14 Complete Sessions</span>
        </div>

        {WORKBOOK_SESSIONS.map((session) => {
          const sActIds = session.activities.map((a) => a.id);
          const completedInThisSession = studentRecords.filter(
            (r) => sActIds.includes(r.activityId) && r.isCompleted
          ).length;
          const isComplete = completedInThisSession === session.activities.length;
          const isCurrent = currentSessionId === session.id;
          const isUnlocked = SessionSecurityService.isSessionUnlocked(studentId, session.id);

          return (
            <div
              key={session.id}
              className={`border rounded-2xl p-4 transition-all bg-white shadow-2xs hover:shadow-xs ${
                isCurrent
                  ? 'border-rose-400 ring-2 ring-rose-100'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                      Session {session.sessionNumber}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {session.pageNumberDisplay}
                    </span>
                    {!isUnlocked ? (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md flex items-center gap-1 border border-amber-200">
                        <Lock className="w-2.5 h-2.5 text-amber-600" />
                        Locked by Teacher
                      </span>
                    ) : isComplete ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md flex items-center gap-1 border border-emerald-200">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Completed
                      </span>
                    ) : null}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {session.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {session.description}
                  </p>
                </div>
              </div>

              {/* Activities Mini Pills and Action */}
              <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {session.activities.map((act, idx) => {
                    const isActDone = studentRecords.some(
                      (r) => r.activityId === act.id && r.isCompleted
                    );
                    return (
                      <button
                        key={act.id}
                        onClick={() => handleSessionClick(session, idx)}
                        className={`w-6 h-6 rounded-md text-[10px] font-bold transition-all flex items-center justify-center ${
                          !isUnlocked
                            ? 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            : isActDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title={`${act.activityNumber}: ${act.title}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                  <span className="text-[11px] text-slate-400 font-medium ml-1.5">
                    {completedInThisSession}/{session.activities.length}
                  </span>
                </div>

                <button
                  onClick={() => handleSessionClick(session, 0)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                    !isUnlocked
                      ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-2xs'
                      : isComplete
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-rose-600 text-white hover:bg-rose-700 active:scale-95 shadow-2xs'
                  }`}
                >
                  {!isUnlocked ? (
                    <>
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Unlock</span>
                    </>
                  ) : (
                    <>
                      <span>{isComplete ? 'Review' : 'Open'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Unlock Passcode Modal */}
      {unlockTargetSession && (
        <SessionUnlockModal
          session={unlockTargetSession}
          studentId={studentId}
          onClose={() => setUnlockTargetSession(null)}
          onUnlocked={() => {
            const sess = unlockTargetSession;
            setUnlockTargetSession(null);
            setUnlockVersion((v) => v + 1);
            onSelectSession(sess, 0);
          }}
        />
      )}
    </div>
  );
};
