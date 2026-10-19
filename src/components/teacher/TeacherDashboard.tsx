import React, { useState, useEffect } from 'react';
import {
  Users,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Download,
  Award,
  BookOpen,
  MessageSquare,
  Sparkles,
  Phone,
  Send,
  Eye,
  RefreshCw,
  TrendingUp,
  BarChart,
  FileSpreadsheet,
  AlertCircle,
  X,
  Star,
  Key,
  Zap,
  CheckCircle,
  XCircle,
  CheckCheck,
  Camera,
  Lock,
} from 'lucide-react';
import { StorageService } from '../../services/storageService';
import { WORKBOOK_SESSIONS } from '../../data/workbookData';
import { StudentSummary, StudentProgressRecord, WorkbookSession } from '../../types/workbook';
import { TeacherAnswerKeyView } from './TeacherAnswerKeyView';
import { AutoCheckingModal } from './AutoCheckingModal';
import { AutoCheckingService, ActivityCheckResult } from '../../services/autoCheckingService';
import { QRScannerModal } from './QRScannerModal';
import { SessionPasscodeManagerModal } from './SessionPasscodeManagerModal';

interface TeacherDashboardProps {
  onSwitchToStudentView: (studentId?: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  onSwitchToStudentView,
}) => {
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'answer_key'>('overview');
  const [showAutoCheckingModal, setShowAutoCheckingModal] = useState<boolean>(false);
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const [showPasscodeManager, setShowPasscodeManager] = useState<boolean>(false);
  const [qrScanToast, setQrScanToast] = useState<string | null>(null);
  const [perActivityCheck, setPerActivityCheck] = useState<Record<string, ActivityCheckResult>>({});

  const [summaries, setSummaries] = useState<StudentSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [selectedSessionFilter, setSelectedSessionFilter] = useState<number | 'all'>('all');
  const [activeInspectorStudentId, setActiveInspectorStudentId] = useState<string | null>(null);
  const [activeInspectorSessionId, setActiveInspectorSessionId] = useState<number>(1);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [gradeInput, setGradeInput] = useState<'Mastered' | 'Satisfactory' | 'Needs Review'>('Mastered');
  const [feedbackSuccessToast, setFeedbackSuccessToast] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());

  const refreshData = () => {
    const list = StorageService.getAllStudentsSummary();
    setSummaries(list);
    setLastSyncTime(new Date());
  };

  useEffect(() => {
    refreshData();
    // Subscribe to live sync events from student phones
    const unsubscribe = StorageService.subscribeToSync(() => {
      refreshData();
    });
    // Regular polling every 2.5s for seamless multi-device or multi-tab sync
    const interval = setInterval(refreshData, 2500);
    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  // Filter students
  const filteredSummaries = summaries.filter((s) => {
    const matchesSearch =
      s.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.student.lrn.includes(searchTerm);
    const matchesSection =
      selectedSection === 'All' || s.student.section === selectedSection;
    return matchesSearch && matchesSection;
  });

  // Calculate High-Level Metrics
  const totalStudents = summaries.length;
  const overallAvgCompletion =
    totalStudents > 0
      ? Math.round(
          summaries.reduce(
            (acc, s) => acc + (s.completedActivitiesCount / s.totalActivitiesCount) * 100,
            0
          ) / totalStudents
        )
      : 0;
  const overallAvgAccuracy =
    totalStudents > 0
      ? Math.round(
          summaries.reduce((acc, s) => acc + s.averageScorePercentage, 0) / totalStudents
        )
      : 0;

  // Selected student for inspection
  const inspectedStudentSummary = summaries.find(
    (s) => s.student.id === activeInspectorStudentId
  );
  const inspectedStudentRecords = activeInspectorStudentId
    ? StorageService.getStudentProgress(activeInspectorStudentId)
    : [];

  const inspectedSession = WORKBOOK_SESSIONS.find((s) => s.id === activeInspectorSessionId);

  const handleSendFeedback = (activityId: string) => {
    if (!activeInspectorStudentId || !feedbackInput.trim()) return;
    StorageService.saveTeacherFeedback(
      activeInspectorStudentId,
      activityId,
      feedbackInput.trim(),
      gradeInput
    );
    setFeedbackInput('');
    setFeedbackSuccessToast(true);
    setTimeout(() => setFeedbackSuccessToast(false), 2500);
    refreshData();
  };

  const handleAutoCheckActivity = (act: any, answers: Record<string, any>) => {
    const result = AutoCheckingService.checkActivity(act, answers);
    setPerActivityCheck((prev) => ({ ...prev, [act.id]: result }));
    setFeedbackInput(result.suggestedFeedback);
    setGradeInput(result.suggestedGrade);
  };

  // Export CSV
  const exportProgressCSV = () => {
    const headers = ['LRN', 'Student Name', 'Grade', 'Section', 'Completed Activities', 'Completion Rate %', 'Average Accuracy %', 'Last Active'];
    const rows = summaries.map((s) => [
      s.student.lrn,
      `"${s.student.name}"`,
      s.student.grade,
      s.student.section,
      s.completedActivitiesCount,
      `${Math.round((s.completedActivitiesCount / s.totalActivitiesCount) * 100)}%`,
      `${s.averageScorePercentage}%`,
      s.lastActive,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `deped_aral_reading_plus_class_progress_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white font-extrabold flex items-center justify-center text-lg shadow-xs">
              ARAL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 leading-tight">
                  DepEd Reading Plus · Teacher Dashboard
                </h1>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono">
                  Key Stage 3 (Sessions 1–14)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync Active
                </span>
                <span>·</span>
                <span>Last updated {lastSyncTime.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Dashboard Sub-Tab Switcher */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setDashboardTab('overview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  dashboardTab === 'overview'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-rose-600" />
                <span>Class Overview</span>
              </button>
              <button
                type="button"
                onClick={() => setDashboardTab('answer_key')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  dashboardTab === 'answer_key'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Key className="w-3.5 h-3.5 text-amber-600" />
                <span>Official Answer Key</span>
              </button>
            </div>

            {/* Scan Student Session QR */}
            <button
              onClick={() => setShowQRScanner(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 active:scale-95 transition-all"
              title="Scan Student Offline Session QR Code"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Scan Student QR</span>
            </button>

            {/* Session Passcode Security */}
            <button
              onClick={() => setShowPasscodeManager(true)}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all"
              title="Manage classroom session unlock codes"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Session Passcodes</span>
            </button>

            {/* Automated Checking Tool Button */}
            <button
              onClick={() => setShowAutoCheckingModal(true)}
              className="px-3.5 py-2 bg-linear-to-r from-amber-500 via-rose-600 to-indigo-600 hover:opacity-95 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-600/20 active:scale-95 transition-all"
              title="Run Automated Checking Engine on Class or Student"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
              <span>Automated Checking Tool</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all student answers and reset the entire class to a clean blank state?')) {
                  StorageService.clearAllData();
                  refreshData();
                }
              }}
              className="px-3 py-2 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-1 border border-slate-200 transition-colors"
              title="Reset all student answers to clean empty state"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Reset to Empty</span>
            </button>

            <button
              onClick={() => onSwitchToStudentView()}
              className="px-3.5 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-rose-200 transition-colors shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Student View</span>
            </button>

            <button
              onClick={exportProgressCSV}
              className="px-3.5 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {dashboardTab === 'answer_key' ? (
          <TeacherAnswerKeyView />
        ) : (
          <>
            {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Total Students</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">
                {totalStudents}
              </span>
              <span className="text-xs text-slate-400">Enrolled Learners</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Class Completion</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-rose-600 font-mono">
                {overallAvgCompletion}%
              </span>
              <span className="text-xs text-slate-400">Across {WORKBOOK_SESSIONS.length} Sessions</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Objective Accuracy</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-emerald-600 font-mono">
                {overallAvgAccuracy}%
              </span>
              <span className="text-xs text-slate-400">MCQ & Word Checks</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Active Workbook</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-purple-600 font-mono">
                {WORKBOOK_SESSIONS.length}
              </span>
              <span className="text-xs text-slate-400">Sessions Ready</span>
            </div>
          </div>
        </div>

        {/* Section Matrix & Filters */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Student Progress Matrix</h2>
              <p className="text-xs text-slate-500">
                Direct live synchronization showing student submissions and competency status
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search student or LRN..."
                  className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-rose-500 w-48"
                />
              </div>

              {/* Section Filter */}
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="py-1.5 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-700"
              >
                <option value="All">All Sections</option>
                <option value="Sampaguita">Section Sampaguita</option>
                <option value="Molave">Section Molave</option>
              </select>

              <button
                onClick={refreshData}
                className="p-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                title="Refresh Live Data"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table of Students */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[11px]">
                  <th className="py-3 px-3">Student</th>
                  <th className="py-3 px-3">Section</th>
                  <th className="py-3 px-3">Completion</th>
                  <th className="py-3 px-3">Activities</th>
                  <th className="py-3 px-3">Score</th>
                  <th className="py-3 px-3">Sessions (2–14)</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSummaries.map((s) => {
                  const pct = Math.round(
                    (s.completedActivitiesCount / s.totalActivitiesCount) * 100
                  );
                  return (
                    <tr key={s.student.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{s.student.avatar || '👨‍🎓'}</span>
                          <div>
                            <span className="font-bold text-slate-900 block">{s.student.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              LRN {s.student.lrn}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-600">
                        {s.student.grade} · {s.student.section}
                      </td>
                      <td className="py-3 px-3">
                        <div className="w-28">
                          <div className="flex items-center justify-between text-[11px] font-mono font-bold mb-1">
                            <span>{pct}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                pct >= 70
                                  ? 'bg-emerald-500'
                                  : pct >= 30
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-700">
                        {s.completedActivitiesCount} / {s.totalActivitiesCount}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-emerald-700">
                        {s.averageScorePercentage}%
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1">
                          {WORKBOOK_SESSIONS.map((sess) => {
                            const st = s.sessionStatus[sess.id] || 'not_started';
                            return (
                              <div
                                key={sess.id}
                                className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[8px] font-bold ${
                                  st === 'completed'
                                    ? 'bg-emerald-500 text-white'
                                    : st === 'in_progress'
                                    ? 'bg-amber-400 text-amber-950'
                                    : 'bg-slate-200 text-slate-400'
                                }`}
                                title={`Session ${sess.sessionNumber}: ${st}`}
                              >
                                {sess.sessionNumber}
                              </div>
                            );
                          })}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setActiveInspectorStudentId(s.student.id);
                              setActiveInspectorSessionId(2);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                            <span>Inspect</span>
                          </button>
                          <button
                            onClick={() => onSwitchToStudentView(s.student.id)}
                            className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors"
                            title="Open this student's phone view"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
          </>
        )}
      </main>

      {/* Inspector / Grading Modal Drawer */}
      {inspectedStudentSummary && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-end">
          <div className="w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{inspectedStudentSummary.student.avatar}</span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {inspectedStudentSummary.student.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    LRN {inspectedStudentSummary.student.lrn} · {inspectedStudentSummary.student.grade} - {inspectedStudentSummary.student.section}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveInspectorStudentId(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Session Selector Strip */}
            <div className="px-6 py-2.5 border-b border-slate-200 bg-white overflow-x-auto flex items-center gap-1.5">
              {WORKBOOK_SESSIONS.map((sess) => {
                const isActive = activeInspectorSessionId === sess.id;
                const st = inspectedStudentSummary.sessionStatus[sess.id] || 'not_started';
                return (
                  <button
                    key={sess.id}
                    onClick={() => setActiveInspectorSessionId(sess.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>S{sess.sessionNumber}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        st === 'completed'
                          ? 'bg-emerald-400'
                          : st === 'in_progress'
                          ? 'bg-amber-400'
                          : 'bg-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Drawer Body: Activity-by-Activity Answers */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {inspectedSession ? (
                <div>
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                      Session {inspectedSession.sessionNumber}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-0.5">
                      {inspectedSession.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{inspectedSession.competency}</p>
                  </div>

                  <div className="space-y-4">
                    {inspectedSession.activities.map((act) => {
                      const record = inspectedStudentRecords.find((r) => r.activityId === act.id);
                      const isDone = !!record?.isCompleted;
                      const answers = record?.answers || {};

                      return (
                        <div
                          key={act.id}
                          className="border border-slate-200 rounded-2xl p-4 bg-white shadow-2xs space-y-3"
                        >
                          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <div>
                              <span className="text-xs font-bold text-slate-800">
                                {act.activityNumber}: {act.title}
                              </span>
                              <span className="text-[11px] text-slate-400 block font-normal">
                                {act.type.replace('_', ' ')}
                              </span>
                            </div>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                isDone
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              {isDone ? 'Submitted' : 'Not Answered'}
                            </span>
                          </div>

                          {/* Answers Inspection */}
                          {isDone ? (
                            <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-2 border border-slate-100">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                                Student Responses:
                              </span>
                              {Object.keys(answers).length === 0 ? (
                                <p className="italic text-slate-400">Marked complete without textual answers.</p>
                              ) : (
                                Object.entries(answers).map(([k, v]) => {
                                  if (k === 'drawingData') {
                                    return (
                                      <div key={k} className="mt-2">
                                        <span className="font-semibold text-slate-700 block mb-1">
                                          Sea Monster Drawing:
                                        </span>
                                        <img
                                          src={v as string}
                                          alt="Student Drawing"
                                          className="w-48 h-28 object-contain bg-slate-900 rounded-xl border border-slate-700"
                                        />
                                      </div>
                                    );
                                  }
                                  if (k === 'discoveredWords') {
                                    return (
                                      <div key={k}>
                                        <span className="font-semibold text-slate-700">
                                          Discovered Anagram Words:
                                        </span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {(v as string[]).map((w, idx) => (
                                            <span
                                              key={idx}
                                              className="bg-white px-2 py-0.5 rounded-md border text-[11px] font-mono font-bold"
                                            >
                                              {w}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    );
                                  }
                                  return (
                                    <div key={k} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                                      <span className="font-mono text-[11px] text-slate-500 shrink-0">
                                        [{k}]:
                                      </span>
                                      <span className="font-medium text-slate-800 break-words">
                                        {String(v)}
                                      </span>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400 italic">
                              Learner has not yet completed this activity on their mobile device.
                            </p>
                          )}

                          {/* Automated Activity Checking Widget */}
                          {isDone && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between bg-amber-50/80 border border-amber-200 p-2.5 rounded-xl">
                                <div className="flex items-center gap-1.5 text-xs text-amber-900 font-semibold">
                                  <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                  <span>DepEd Answer Key Comparison:</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleAutoCheckActivity(act, answers)}
                                  className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-all active:scale-95 shrink-0"
                                >
                                  <Sparkles className="w-3 h-3" />
                                  <span>Auto-Check Activity</span>
                                </button>
                              </div>

                              {/* Per-Activity Auto-Check Breakdown */}
                              {perActivityCheck[act.id] && (() => {
                                const checkRes = perActivityCheck[act.id];
                                return (
                                  <div className="bg-white border-2 border-amber-300 rounded-xl p-3 space-y-2.5 shadow-xs">
                                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                                      <span className="text-xs font-bold text-slate-800">
                                        Evaluation: {checkRes.earnedPoints}/{checkRes.totalPoints} pts ({checkRes.percentage}%)
                                      </span>
                                      <span
                                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                          checkRes.suggestedGrade === 'Mastered'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : checkRes.suggestedGrade === 'Satisfactory'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-amber-100 text-amber-800'
                                        }`}
                                      >
                                        {checkRes.suggestedGrade}
                                      </span>
                                    </div>

                                    {/* Breakdown of questions */}
                                    <div className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-1">
                                      {checkRes.details.map((qDet, qIdx) => (
                                        <div
                                          key={qIdx}
                                          className="p-2 rounded-lg bg-slate-50 border border-slate-200 space-y-1"
                                        >
                                          <div className="flex items-center justify-between text-[11px]">
                                            <span className="font-semibold text-slate-800">
                                              {qDet.questionPrompt}
                                            </span>
                                            <span
                                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                                qDet.status === 'correct'
                                                  ? 'bg-emerald-100 text-emerald-800'
                                                  : qDet.status === 'partial'
                                                  ? 'bg-blue-100 text-blue-800'
                                                  : 'bg-rose-100 text-rose-800'
                                              }`}
                                            >
                                              {qDet.status} ({qDet.pointsEarned}/{qDet.totalPoints} pt)
                                            </span>
                                          </div>
                                          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                                            <div>
                                              <span className="text-slate-500 font-medium">Student:</span>
                                              <span className="font-semibold text-slate-900 block truncate">
                                                {qDet.studentAnswer}
                                              </span>
                                            </div>
                                            {qDet.correctAnswer && (
                                              <div>
                                                <span className="text-emerald-700 font-medium">Official Key:</span>
                                                <span className="font-semibold text-emerald-950 block truncate">
                                                  {qDet.correctAnswer}
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>

                                    <div className="bg-amber-50/70 p-2 rounded-lg border border-amber-200/80 text-xs">
                                      <span className="text-[10px] font-bold text-amber-900 block mb-0.5">
                                        Suggested Feedback:
                                      </span>
                                      <p className="italic text-slate-800 text-[11px]">
                                        “{checkRes.suggestedFeedback}”
                                      </p>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          )}

                          {/* Existing feedback if any */}
                          {record?.teacherFeedback && (
                            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                              <strong>Your Feedback: </strong> “{record.teacherFeedback}” (Grade: {record.teacherGrade})
                            </div>
                          )}

                          {/* Teacher Feedback / Grading Widget */}
                          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              Leave Teacher Evaluation for {act.activityNumber}:
                            </span>

                            {/* Quick Remark Chips */}
                            <div className="flex flex-wrap gap-1">
                              {[
                                '🌟 Outstanding analysis with textual evidence!',
                                '👍 Good effort! Try citing specific details.',
                                '🔍 Re-read paragraph 2 for context clues.',
                                '👏 Accurate and well-reasoned response!',
                              ].map((preset) => (
                                <button
                                  key={preset}
                                  type="button"
                                  onClick={() => setFeedbackInput(preset)}
                                  className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 transition-colors text-left"
                                >
                                  {preset}
                                </button>
                              ))}
                            </div>

                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Write constructive feedback for student's phone..."
                                value={feedbackInput}
                                onChange={(e) => setFeedbackInput(e.target.value)}
                                className="flex-1 text-xs p-2 rounded-xl border border-slate-200 outline-none focus:border-rose-500"
                              />
                              <select
                                value={gradeInput}
                                onChange={(e) => setGradeInput(e.target.value as any)}
                                className="text-xs p-2 rounded-xl border border-slate-200 bg-white"
                              >
                                <option value="Mastered">Mastered</option>
                                <option value="Satisfactory">Satisfactory</option>
                                <option value="Needs Review">Needs Review</option>
                              </select>
                              <button
                                onClick={() => handleSendFeedback(act.id)}
                                className="px-3 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 flex items-center gap-1 shrink-0"
                              >
                                <Send className="w-3 h-3" />
                                <span>Send</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Drawer Footer */}
            <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => onSwitchToStudentView(activeInspectorStudentId || undefined)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Simulate Answering as {inspectedStudentSummary.student.name}</span>
              </button>
              <button
                onClick={() => setActiveInspectorStudentId(null)}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-300"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {feedbackSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>Evaluation directly sent to student's phone!</span>
        </div>
      )}

      {qrScanToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-700 text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-indigo-300" />
          <span>{qrScanToast}</span>
        </div>
      )}

      {/* QR Scanner & Offline Auto-Check Modal */}
      {showQRScanner && (
        <QRScannerModal
          onClose={() => setShowQRScanner(false)}
          onSuccessCheck={(studentId, sessionId) => {
            refreshData();
            setQrScanToast(`Session ${sessionId} evaluated and updated!`);
            setActiveInspectorStudentId(studentId);
            setActiveInspectorSessionId(sessionId);
            setTimeout(() => setQrScanToast(null), 4000);
          }}
        />
      )}

      {/* Session Passcode Security Manager Modal */}
      {showPasscodeManager && (
        <SessionPasscodeManagerModal
          onClose={() => setShowPasscodeManager(false)}
          onRefresh={refreshData}
        />
      )}
    </div>
  );
};
