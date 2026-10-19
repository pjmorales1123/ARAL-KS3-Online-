import React, { useState } from 'react';
import {
  User,
  Plus,
  RefreshCw,
  QrCode,
  ShieldCheck,
  Check,
  Trash2,
  ExternalLink,
  Smartphone,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { StudentProfile } from '../../types/workbook';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface LearnerProfileViewProps {
  currentStudent: StudentProfile;
  allStudents: StudentProfile[];
  onSelectStudent: (studentId: string) => void;
  onAddStudent: (name: string, grade: string, section: string) => void;
  onResetStudent: (studentId: string) => void;
  onOpenTeacherDashboard: () => void;
}

export const LearnerProfileView: React.FC<LearnerProfileViewProps> = ({
  currentStudent,
  allStudents,
  onSelectStudent,
  onAddStudent,
  onResetStudent,
  onOpenTeacherDashboard,
}) => {
  const { isInstallable, isInstalled, isAndroid, isIOS, install } = usePWAInstall();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSection, setNewSection] = useState('Sampaguita');
  const [newGrade, setNewGrade] = useState('Grade 8');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    onAddStudent(newName.trim(), newGrade, newSection);
    setNewName('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Current Student Profile Card */}
      <div className="bg-linear-to-br from-slate-900 via-slate-800 to-rose-950 text-white rounded-3xl p-5 shadow-md">
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl border border-white/20 shadow-xs">
            {currentStudent.avatar || '👨‍🎓'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-500/80 text-white px-2 py-0.5 rounded-full">
                Active Learner
              </span>
              <span className="text-[10px] text-slate-300 font-mono">
                LRN: {currentStudent.lrn}
              </span>
            </div>
            <h2 className="text-lg font-bold mt-1 text-white">{currentStudent.name}</h2>
            <p className="text-xs text-slate-300">
              {currentStudent.grade} · Section {currentStudent.section}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>DepEd ARAL Registered</span>
          </div>
          <button
            onClick={onOpenTeacherDashboard}
            className="text-xs font-bold text-amber-300 hover:text-amber-200 underline flex items-center gap-1"
          >
            <span>Open Teacher Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Switch Learner Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900">Switch Learner</h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddForm ? 'Cancel' : 'New Learner'}</span>
          </button>
        </div>

        {showAddForm && (
          <form
            onSubmit={handleCreate}
            className="bg-slate-50 p-3 rounded-2xl border border-slate-200 mb-3 space-y-2.5"
          >
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Student Full Name
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Jose Rizal"
                className="w-full text-xs p-2 rounded-xl border border-slate-200 bg-white outline-none focus:border-rose-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Grade Level
                </label>
                <select
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Section
                </label>
                <input
                  type="text"
                  value={newSection}
                  onChange={(e) => setNewSection(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-rose-700"
            >
              Save New Student
            </button>
          </form>
        )}

        <div className="space-y-1.5 max-h-56 overflow-y-auto">
          {allStudents.map((s) => {
            const isSelected = s.id === currentStudent.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectStudent(s.id)}
                className={`w-full min-h-[44px] p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                  isSelected
                    ? 'bg-rose-50 border-rose-300 text-rose-950 font-bold'
                    : 'bg-white border-slate-100 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{s.avatar || '👨‍🎓'}</span>
                  <div>
                    <span className="text-xs block leading-tight">{s.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {s.grade} · {s.section}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Active</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Real Phone App Installation Card */}
      <div className="bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 shadow-md border border-slate-800 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-black text-white">Real Android / Mobile App</h3>
                <span className="bg-rose-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase">
                  PWA / APK
                </span>
              </div>
              <p className="text-[11px] text-slate-300">Install directly onto your phone</p>
            </div>
          </div>
          {isInstalled && (
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Installed</span>
            </span>
          )}
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          This app is a progressive mobile application. When installed, it opens borderless without a browser address bar, caches activities offline, and places the official ARAL icon on your phone home screen.
        </p>

        {!isInstalled ? (
          <div className="space-y-2 pt-1">
            {isInstallable ? (
              <button
                onClick={() => install()}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-98 transition"
              >
                <Download className="w-4 h-4" />
                <span>Install App on this Phone</span>
              </button>
            ) : (
              <div className="p-3 bg-white/10 rounded-2xl text-[11px] space-y-1.5 border border-white/10">
                <span className="font-bold text-amber-300 block">How to Install on Android / iOS:</span>
                <p className="text-slate-200">
                  {isIOS
                    ? '• Tap Share in Safari → Tap "Add to Home Screen"'
                    : '• Tap ⋮ (menu) in Chrome → Tap "Install app" or "Add to Home screen"'}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Currently running as an installed standalone application!</span>
          </div>
        )}
      </div>

      {/* Reset Current Student Answers */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-1">Testing Controls</h3>
        <p className="text-xs text-slate-500 mb-3">
          Clear answers for {currentStudent.name} to simulate answering from scratch.
        </p>

        {showResetConfirm ? (
          <div className="flex gap-2">
            <button
              onClick={() => {
                onResetStudent(currentStudent.id);
                setShowResetConfirm(false);
              }}
              className="flex-1 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold"
            >
              Yes, Reset All Answers
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full min-h-[44px] border border-rose-200 text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset {currentStudent.name}'s Answers</span>
          </button>
        )}
      </div>
    </div>
  );
};
