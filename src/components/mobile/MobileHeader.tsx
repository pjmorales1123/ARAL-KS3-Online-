import React from 'react';
import { Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { StudentProfile } from '../../types/workbook';
import { DepEdBannerStrip, DepEdOfficialSeal, AralProgramLogo } from '../illustrations/DepEdLogos';

interface MobileHeaderProps {
  student: StudentProfile;
  currentSessionNumber: number;
  completedActivitiesInSession: number;
  totalActivitiesInSession: number;
  onOpenProfile: () => void;
  syncState: 'synced' | 'saving' | 'offline';
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  student,
  currentSessionNumber,
  completedActivitiesInSession,
  totalActivitiesInSession,
  onOpenProfile,
  syncState,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* DepEd ARAL Top Ribbon */}
      <DepEdBannerStrip />

      <div className="px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={onOpenProfile}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-tr from-amber-400 to-rose-500 text-white font-bold text-lg shadow-xs shrink-0 active:scale-95 transition-transform"
            aria-label="Student Profile"
          >
            <span>{student.avatar || '👨‍🎓'}</span>
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-900 truncate max-w-[130px] sm:max-w-none">
                {student.name}
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                {student.section}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
              <span className="font-semibold text-rose-600">Session {currentSessionNumber}</span>
              <span>·</span>
              <span>
                {completedActivitiesInSession}/{totalActivitiesInSession} done
              </span>
            </div>
          </div>
        </div>

        {/* DepEd Stamp & Sync Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <DepEdOfficialSeal className="hidden sm:flex" />
          {syncState === 'synced' ? (
            <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden xs:inline">Synced</span>
            </div>
          ) : syncState === 'saving' ? (
            <div className="flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
              <span className="hidden xs:inline">Saving</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden xs:inline">Offline</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
