import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Maximize2,
  Users,
  QrCode,
  Share2,
  BookOpen,
  CheckCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Battery,
  Signal,
  X,
  ExternalLink,
  Download,
  Layers,
} from 'lucide-react';
import { StorageService } from './services/storageService';
import { WORKBOOK_SESSIONS } from './data/workbookData';
import {
  StudentProfile,
  WorkbookSession,
  BaseActivity,
  StudentProgressRecord,
  StudentSummary,
} from './types/workbook';

import { MobileHeader } from './components/mobile/MobileHeader';
import { MobileBottomNav, MobileTab } from './components/mobile/MobileBottomNav';
import { ActivityRenderer } from './components/mobile/ActivityRenderer';
import { SessionListView } from './components/mobile/SessionListView';
import { StudentProgressTrackerView } from './components/mobile/StudentProgressTrackerView';
import { LearnerProfileView } from './components/mobile/LearnerProfileView';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { PWAInstallBanner } from './components/mobile/PWAInstallBanner';
import { usePWAInstall } from './hooks/usePWAInstall';

export default function App() {
  // Top-level View Mode: 'student_app' | 'teacher_dashboard'
  const [viewMode, setViewMode] = useState<'student_app' | 'teacher_dashboard'>('student_app');
  const [desktopContainerWidth, setDesktopContainerWidth] = useState<'phone' | 'fluid'>('phone');
  const { isInstallable, isInstalled, install } = usePWAInstall();

  // Active student
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [activeStudentId, setActiveStudentId] = useState<string>('student-1');

  // Active student data & records
  const [studentRecords, setStudentRecords] = useState<StudentProgressRecord[]>([]);
  const [studentSummary, setStudentSummary] = useState<StudentSummary | null>(null);

  // Mobile App Navigation
  const [activeTab, setActiveTab] = useState<MobileTab>('sessions');
  const [currentSessionId, setCurrentSessionId] = useState<number>(1);
  const [currentActivityIndex, setCurrentActivityIndex] = useState<number>(0);
  const [syncState, setSyncState] = useState<'synced' | 'saving' | 'offline'>('synced');
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  // Phone Clock simulation
  const [phoneTime, setPhoneTime] = useState<string>('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setPhoneTime(
        `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')}`
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  // Initialize and load student data
  const loadData = () => {
    const allStudents = StorageService.getStudents();
    setStudents(allStudents);
    const activeId = StorageService.getActiveStudentId();
    setActiveStudentId(activeId);

    const records = StorageService.getStudentProgress(activeId);
    setStudentRecords(records);
    const summary = StorageService.getStudentSummary(activeId);
    setStudentSummary(summary);
  };

  useEffect(() => {
    loadData();

    // Listen to sync events
    const unsubscribe = StorageService.subscribeToSync((event) => {
      if (
        event.type === 'answer_saved' ||
        event.type === 'feedback_added' ||
        event.type === 'student_reset' ||
        event.type === 'active_student_changed'
      ) {
        const activeId = StorageService.getActiveStudentId();
        setActiveStudentId(activeId);
        setStudentRecords(StorageService.getStudentProgress(activeId));
        setStudentSummary(StorageService.getStudentSummary(activeId));
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle student change
  const handleSelectStudent = (id: string) => {
    StorageService.setActiveStudentId(id);
    setActiveStudentId(id);
    setStudentRecords(StorageService.getStudentProgress(id));
    setStudentSummary(StorageService.getStudentSummary(id));
  };

  const handleAddStudent = (name: string, grade: string, section: string) => {
    const newStudent = StorageService.addStudent(name, grade, section);
    handleSelectStudent(newStudent.id);
  };

  const handleResetStudent = (id: string) => {
    StorageService.resetStudentData(id);
    setStudentRecords([]);
    setStudentSummary(StorageService.getStudentSummary(id));
  };

  // Get current active session & activity objects
  const currentSession =
    WORKBOOK_SESSIONS.find((s) => s.id === currentSessionId) || WORKBOOK_SESSIONS[0];
  const currentActivity: BaseActivity =
    currentSession.activities[currentActivityIndex] || currentSession.activities[0];

  const currentActivityRecord = studentRecords.find((r) => r.activityId === currentActivity.id);

  // Save activity answer handler
  const handleSaveActivity = (
    answers: Record<string, any>,
    isCompleted = true,
    score?: { earned: number; total: number }
  ) => {
    setSyncState('saving');
    StorageService.saveActivityAnswer(
      activeStudentId,
      currentSession.id,
      currentActivity.id,
      answers,
      isCompleted,
      score
    );
    // Reload local state
    setStudentRecords(StorageService.getStudentProgress(activeStudentId));
    setStudentSummary(StorageService.getStudentSummary(activeStudentId));
    setTimeout(() => {
      setSyncState('synced');
    }, 400);
  };

  // Navigate to session & activity
  const handleOpenSession = (session: WorkbookSession, actIndex = 0) => {
    setCurrentSessionId(session.id);
    setCurrentActivityIndex(actIndex);
    setActiveTab('activity');
  };

  const handleNextActivity = () => {
    if (currentActivityIndex < currentSession.activities.length - 1) {
      setCurrentActivityIndex(currentActivityIndex + 1);
    } else {
      // Find next session if available
      const nextSession = WORKBOOK_SESSIONS.find((s) => s.id === currentSession.id + 1);
      if (nextSession) {
        setCurrentSessionId(nextSession.id);
        setCurrentActivityIndex(0);
      } else {
        setActiveTab('tracker');
      }
    }
  };

  const handlePrevActivity = () => {
    if (currentActivityIndex > 0) {
      setCurrentActivityIndex(currentActivityIndex - 1);
    } else {
      const prevSession = WORKBOOK_SESSIONS.find((s) => s.id === currentSession.id - 1);
      if (prevSession) {
        setCurrentSessionId(prevSession.id);
        setCurrentActivityIndex(prevSession.activities.length - 1);
      }
    }
  };

  const currentStudent =
    students.find((s) => s.id === activeStudentId) ||
    students[0] || {
      id: 'student-1',
      name: 'Juan Dela Cruz',
      lrn: '109823451201',
      grade: 'Grade 8',
      section: 'Sampaguita',
      avatar: '👨‍🎓',
    };

  // Completed activities in current session count
  const completedInCurrentSession = currentSession.activities.filter((act) =>
    studentRecords.some((r) => r.activityId === act.id && r.isCompleted)
  ).length;

  const hasUnreviewedFeedback = studentRecords.some((r) => r.teacherFeedback);

  // App URL for sharing / QR
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Render Mobile Interior
  const renderMobileContent = () => (
    <div className="flex flex-col min-h-dvh bg-slate-50 text-slate-900 select-text w-full">
      {/* Real Android / iOS Install Banner */}
      <PWAInstallBanner />

      {/* Mobile Sticky Top Header */}
      <MobileHeader
        student={currentStudent}
        currentSessionNumber={currentSession.sessionNumber}
        completedActivitiesInSession={completedInCurrentSession}
        totalActivitiesInSession={currentSession.activities.length}
        onOpenProfile={() => setActiveTab('profile')}
        syncState={syncState}
      />

      {/* Main Tab Area */}
      <div className="flex-1 px-4 py-4 max-w-md mx-auto w-full">
        {activeTab === 'sessions' && (
          <SessionListView
            studentRecords={studentRecords}
            currentSessionId={currentSessionId}
            onSelectSession={handleOpenSession}
          />
        )}

        {activeTab === 'activity' && (
          <div>
            {/* Activity Quick Step Navigator */}
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-2 mb-3 shadow-2xs">
              <button
                onClick={handlePrevActivity}
                disabled={currentSession.id === 1 && currentActivityIndex === 0}
                className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-500"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 overflow-x-auto max-w-[210px] px-1">
                {currentSession.activities.map((act, idx) => {
                  const isActActive = idx === currentActivityIndex;
                  const isActDone = studentRecords.some(
                    (r) => r.activityId === act.id && r.isCompleted
                  );
                  return (
                    <button
                      key={act.id}
                      onClick={() => setCurrentActivityIndex(idx)}
                      className={`min-w-[28px] h-7 px-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center shrink-0 ${
                        isActActive
                          ? 'bg-rose-600 text-white shadow-2xs'
                          : isActDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNextActivity}
                className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <ActivityRenderer
              activity={currentActivity}
              studentId={activeStudentId}
              sessionId={currentSession.id}
              initialRecord={currentActivityRecord}
              onSave={handleSaveActivity}
              onNextActivity={handleNextActivity}
              hasNextActivity={
                currentActivityIndex < currentSession.activities.length - 1 ||
                currentSession.id < WORKBOOK_SESSIONS.length + 1
              }
            />
          </div>
        )}

        {activeTab === 'tracker' && studentSummary && (
          <StudentProgressTrackerView
            summary={studentSummary}
            records={studentRecords}
            onOpenSession={handleOpenSession}
            onTriggerSync={() => {
              setSyncState('saving');
              setTimeout(() => setSyncState('synced'), 300);
            }}
          />
        )}

        {activeTab === 'profile' && (
          <LearnerProfileView
            currentStudent={currentStudent}
            allStudents={students}
            onSelectStudent={handleSelectStudent}
            onAddStudent={handleAddStudent}
            onResetStudent={handleResetStudent}
            onOpenTeacherDashboard={() => setViewMode('teacher_dashboard')}
          />
        )}
      </div>

      {/* Mobile Fixed Bottom Nav */}
      <MobileBottomNav
        activeTab={activeTab}
        onChangeTab={(t) => setActiveTab(t)}
        hasUnreviewedFeedback={hasUnreviewedFeedback}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Universal App Control Bar (hidden when launched as installed PWA app) */}
      {!isInstalled && (
        <nav className="h-14 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between gap-4 shrink-0 z-50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-linear-to-tr from-rose-600 to-amber-500 flex items-center justify-center font-extrabold text-white text-xs shadow-xs">
                ARAL
              </span>
              <div className="hidden sm:block">
                <span className="text-xs font-bold text-white block leading-tight">
                  Reading Plus Mobile App
                </span>
                <span className="text-[10px] text-slate-400">
                  DepEd Key Stage 3 · Installable Android PWA
                </span>
              </div>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('student_app')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'student_app'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Learner App</span>
            </button>
            <button
              onClick={() => setViewMode('teacher_dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'teacher_dashboard'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Teacher Dashboard</span>
            </button>
          </div>

          {/* Student Switcher, Width Toggle & Actions */}
          <div className="flex items-center gap-2">
            {viewMode === 'student_app' && (
              <>
                {/* Desktop Width Toggle */}
                <div className="hidden lg:flex items-center p-0.5 bg-slate-900 border border-slate-800 rounded-lg text-[11px]">
                  <button
                    onClick={() => setDesktopContainerWidth('phone')}
                    className={`px-2 py-1 rounded font-medium transition ${
                      desktopContainerWidth === 'phone'
                        ? 'bg-slate-800 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Phone Width (390px)"
                  >
                    Mobile (390px)
                  </button>
                  <button
                    onClick={() => setDesktopContainerWidth('fluid')}
                    className={`px-2 py-1 rounded font-medium transition ${
                      desktopContainerWidth === 'fluid'
                        ? 'bg-slate-800 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Wide View (768px)"
                  >
                    Tablet (768px)
                  </button>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1">
                  <span className="text-xs text-slate-400 hidden lg:inline">Learner:</span>
                  <select
                    value={activeStudentId}
                    onChange={(e) => handleSelectStudent(e.target.value)}
                    className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer max-w-[120px] sm:max-w-none truncate"
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                        {s.avatar} {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Install Android App Button */}
            {isInstallable && (
              <button
                onClick={() => install()}
                className="px-3 py-1.5 bg-linear-to-r from-amber-500 to-rose-600 hover:opacity-95 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition"
                title="Install real Android application"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Install Android App</span>
              </button>
            )}

            <button
              onClick={() => {
                if (window.confirm('Reset all answers to completely empty state?')) {
                  StorageService.clearAllData();
                  loadData();
                }
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 transition-colors"
              title="Reset all inputs to empty"
            >
              <span className="text-xs font-bold px-1 hidden sm:inline">🧹 Empty State</span>
            </button>

            <button
              onClick={() => setShowQrModal(true)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Open on actual phone via QR"
            >
              <QrCode className="w-4 h-4" />
            </button>
          </div>
        </nav>
      )}

      {/* View Mode 1: Teacher Dashboard */}
      {viewMode === 'teacher_dashboard' && (
        <div className="flex-1 bg-slate-50 overflow-y-auto">
          <TeacherDashboard
            onSwitchToStudentView={(studentId) => {
              if (studentId) handleSelectStudent(studentId);
              setViewMode('student_app');
            }}
          />
        </div>
      )}

      {/* View Mode 2: Real Mobile Student App (Edge-to-Edge on Phone, Centered Clean Mobile Frame on Desktop) */}
      {viewMode === 'student_app' && (
        <main className="flex-1 bg-slate-200/60 dark:bg-slate-900 flex justify-center overflow-y-auto w-full">
          <div
            className={`w-full bg-slate-50 min-h-dvh flex flex-col transition-all duration-200 ${
              desktopContainerWidth === 'phone'
                ? 'max-w-md shadow-2xl sm:border-x sm:border-slate-200'
                : 'max-w-3xl shadow-2xl sm:border-x sm:border-slate-200'
            }`}
          >
            {renderMobileContent()}
          </div>
        </main>
      )}

      {/* QR Code / Share on Real Mobile Device Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-sm">Open on Your Phone</h3>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Scan this QR code with your smartphone camera to answer activities directly on your real phone.
              Any answers you submit on your phone will sync live with this teacher dashboard!
            </p>

            {/* High Contrast QR Code Canvas */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  shareUrl
                )}`}
                alt="QR Code to open on mobile"
                className="w-44 h-44 rounded-lg bg-white p-2 border border-slate-200 shadow-xs"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if offline
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-[11px] font-mono text-slate-500 mt-2 break-all text-center">
                {shareUrl}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  alert('URL copied to clipboard! You can send it via chat or open it in your mobile browser.');
                }}
                className="flex-1 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Mobile Link</span>
              </button>
              <button
                onClick={() => setShowQrModal(false)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
