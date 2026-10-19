import React, { useState } from 'react';
import { Lock, KeyRound, AlertCircle, CheckCircle2, X, Sparkles, ShieldCheck } from 'lucide-react';
import { SessionSecurityService } from '../../services/sessionSecurityService';
import { WorkbookSession } from '../../types/workbook';

interface SessionUnlockModalProps {
  session: WorkbookSession;
  studentId: string;
  onClose: () => void;
  onUnlocked: () => void;
}

export const SessionUnlockModal: React.FC<SessionUnlockModalProps> = ({
  session,
  studentId,
  onClose,
  onUnlocked,
}) => {
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!passcode.trim()) {
      setErrorMsg('Please enter the classroom unlock passcode.');
      return;
    }

    const result = SessionSecurityService.attemptUnlock(studentId, session.id, passcode);
    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        onUnlocked();
      }, 700);
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-md transition-colors ${
              isSuccess ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
            }`}>
              {isSuccess ? <CheckCircle2 className="w-6 h-6 animate-bounce" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">
                Session {session.sessionNumber} Security
              </span>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                {isSuccess ? 'Session Unlocked!' : 'Classroom Passcode Required'}
              </h3>
            </div>
          </div>
          {!isSuccess && (
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {isSuccess ? (
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-1.5">
            <Sparkles className="w-6 h-6 text-emerald-600 mx-auto" />
            <p className="text-xs font-bold text-emerald-900">Passcode Accepted!</p>
            <p className="text-[11px] text-emerald-700">Opening {session.title} now...</p>
          </div>
        ) : (
          <>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <p className="font-semibold text-slate-800">
                🔒 {session.title}
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Your teacher locks upcoming sessions so students cannot answer ahead of time or share questions. Enter the passcode written on the classroom board to begin:
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-rose-600" />
                  <span>Teacher Classroom Passcode:</span>
                </label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value.toUpperCase())}
                  placeholder="e.g. KANCIL24"
                  className="w-full text-center tracking-widest font-mono font-extrabold text-base uppercase p-3 rounded-2xl border-2 border-slate-200 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 outline-none transition"
                />
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-rose-600/20 active:scale-98 transition flex items-center justify-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Unlock & Begin</span>
                </button>
              </div>
            </form>

            <div className="pt-1 border-t border-slate-100 text-center">
              <span className="text-[10px] text-slate-400">
                Tip: The default classroom code for Session 2 is <strong className="font-mono text-slate-600">KANCIL24</strong>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
