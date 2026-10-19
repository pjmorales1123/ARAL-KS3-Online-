import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  KeyRound,
  Copy,
  Check,
  X,
  Sparkles,
  ShieldAlert,
  RotateCcw,
  Presentation,
} from 'lucide-react';
import { WORKBOOK_SESSIONS } from '../../data/workbookData';
import { SessionSecurityService } from '../../services/sessionSecurityService';

interface SessionPasscodeManagerModalProps {
  onClose: () => void;
  onRefresh: () => void;
}

export const SessionPasscodeManagerModal: React.FC<SessionPasscodeManagerModalProps> = ({
  onClose,
  onRefresh,
}) => {
  const [passcodes, setPasscodes] = useState<Record<number, string>>(
    SessionSecurityService.getPasscodes()
  );
  const [editingSessionId, setEditingSessionId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [copiedSessionId, setCopiedSessionId] = useState<number | null>(null);
  const [projectedSession, setProjectedSession] = useState<{
    sessionId: number;
    title: string;
    code: string;
  } | null>(null);

  const handleStartEdit = (sessionId: number, currentCode: string) => {
    setEditingSessionId(sessionId);
    setEditValue(currentCode);
  };

  const handleSaveEdit = (sessionId: number) => {
    if (editValue.trim()) {
      SessionSecurityService.setPasscode(sessionId, editValue.trim());
      setPasscodes(SessionSecurityService.getPasscodes());
    }
    setEditingSessionId(null);
  };

  const handleCopy = (sessionId: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSessionId(sessionId);
    setTimeout(() => setCopiedSessionId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
              <Lock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                Classroom Security & Anti-Cheating
              </span>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                Session Unlock Passcodes
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Students cannot enter upcoming sessions or see questions in advance until you announce the passcode. Announce the code when your class starts each session.
        </p>

        {/* Projector / Big Screen Mode Overlay */}
        {projectedSession && (
          <div className="p-6 bg-linear-to-r from-slate-900 to-indigo-950 text-white rounded-2xl text-center space-y-2 border-2 border-amber-400 shadow-xl animate-fadeIn">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
              Session {projectedSession.sessionId} Classroom Code
            </span>
            <div className="text-4xl sm:text-5xl font-black font-mono tracking-widest text-white py-2 select-all">
              {projectedSession.code}
            </div>
            <p className="text-xs text-slate-300">
              Students: Type this code on your phone to unlock <strong>{projectedSession.title}</strong>
            </p>
            <button
              onClick={() => setProjectedSession(null)}
              className="mt-2 px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold text-white transition"
            >
              Close Big Screen
            </button>
          </div>
        )}

        {/* List of Sessions & Codes */}
        <div className="space-y-2 divide-y divide-slate-100 max-h-72 overflow-y-auto pr-1">
          {WORKBOOK_SESSIONS.map((sess) => {
            const isSessionOne = sess.id === 1;
            const code = isSessionOne ? 'OPEN' : passcodes[sess.id] || 'ARAL';
            const isEditing = editingSessionId === sess.id;

            return (
              <div
                key={sess.id}
                className="pt-2.5 pb-1 flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 truncate">
                      S{sess.sessionNumber}: {sess.title}
                    </span>
                    {isSessionOne ? (
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <Unlock className="w-2.5 h-2.5" />
                        <span>Open Baseline</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-slate-100 text-slate-700 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5 text-rose-600" />
                        <span>Locked</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isSessionOne ? (
                    <span className="font-mono font-bold text-emerald-700 text-xs px-2.5 py-1 bg-emerald-50 rounded-lg">
                      Always Open
                    </span>
                  ) : isEditing ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value.toUpperCase())}
                        className="w-24 px-2 py-1 font-mono font-bold text-xs uppercase border border-rose-300 rounded-lg outline-none"
                      />
                      <button
                        onClick={() => handleSaveEdit(sess.id)}
                        className="px-2 py-1 bg-rose-600 text-white rounded-lg text-[11px] font-bold"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          setProjectedSession({
                            sessionId: sess.id,
                            title: sess.title,
                            code,
                          })
                        }
                        title="Display large code on classroom projector"
                        className="p-1 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition"
                      >
                        <Presentation className="w-4 h-4" />
                      </button>

                      <div
                        onClick={() => handleStartEdit(sess.id, code)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 cursor-pointer rounded-lg font-mono font-extrabold text-slate-900 border border-slate-200"
                        title="Click to change passcode"
                      >
                        {code}
                      </div>

                      <button
                        onClick={() => handleCopy(sess.id, code)}
                        className="p-1 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
                        title="Copy code"
                      >
                        {copiedSessionId === sess.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Master Teacher Emergency Bypass */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-600 flex items-center justify-between gap-2">
          <div>
            <span className="font-bold text-slate-800 block">Master Teacher Bypass Passcode:</span>
            <span>Entering <strong className="font-mono text-rose-600">DEPED2026</strong> unlocks any session immediately.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
