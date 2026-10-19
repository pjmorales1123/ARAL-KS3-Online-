import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle,
  XCircle,
  AlertCircle,
  Award,
  Send,
  X,
  Play,
  Check,
  User,
  Users,
  Layers,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  FileCheck,
} from 'lucide-react';
import { StudentProfile } from '../../types/workbook';
import { AutoCheckingService, ActivityCheckResult } from '../../services/autoCheckingService';
import { StorageService } from '../../services/storageService';

interface AutoCheckingModalProps {
  students: StudentProfile[];
  onClose: () => void;
  onRefreshClassData: () => void;
  preSelectedStudentId?: string;
}

export const AutoCheckingModal: React.FC<AutoCheckingModalProps> = ({
  students,
  onClose,
  onRefreshClassData,
  preSelectedStudentId,
}) => {
  const [targetScope, setTargetScope] = useState<'single' | 'all'>(
    preSelectedStudentId ? 'single' : 'all'
  );
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    preSelectedStudentId || students[0]?.id || ''
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [resultsByStudent, setResultsByStudent] = useState<
    Record<
      string,
      {
        studentName: string;
        earned: number;
        possible: number;
        percentage: number;
        checkedCount: number;
        results: ActivityCheckResult[];
      }
    >
  >({});
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);
  const [appliedSuccessToast, setAppliedSuccessToast] = useState(false);

  // Run the automated check
  const handleRunCheck = () => {
    setIsRunning(true);
    setResultsByStudent({});

    setTimeout(() => {
      const output: Record<string, any> = {};

      if (targetScope === 'single') {
        const student = students.find((s) => s.id === selectedStudentId);
        if (student) {
          const res = AutoCheckingService.autoGradeStudent(student.id);
          output[student.id] = {
            studentName: student.name,
            earned: res.totalEarned,
            possible: res.totalPossible,
            percentage: res.overallPercentage,
            checkedCount: res.checkedActivitiesCount,
            results: res.results,
          };
          setExpandedStudent(student.id);
        }
      } else {
        students.forEach((student) => {
          const res = AutoCheckingService.autoGradeStudent(student.id);
          output[student.id] = {
            studentName: student.name,
            earned: res.totalEarned,
            possible: res.totalPossible,
            percentage: res.overallPercentage,
            checkedCount: res.checkedActivitiesCount,
            results: res.results,
          };
        });
        setExpandedStudent(students[0]?.id || null);
      }

      setResultsByStudent(output);
      setIsRunning(false);
      setAppliedSuccessToast(true);
      onRefreshClassData();
      setTimeout(() => setAppliedSuccessToast(false), 3000);
    }, 400);
  };

  const totalEvaluatedActivities = Object.values(resultsByStudent).reduce(
    (acc, curr) => acc + curr.checkedCount,
    0
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-amber-400 to-rose-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Automated Checking & Grading Engine
                </h3>
                <span className="text-[10px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full">
                  DepEd Aligned
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Instantly check objective questions, evaluate open-ended reflections, and auto-generate constructive teacher feedback.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Bar */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <button
                type="button"
                onClick={() => setTargetScope('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  targetScope === 'all'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Whole Class ({students.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setTargetScope('single')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  targetScope === 'single'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Single Student</span>
              </button>
            </div>

            {targetScope === 'single' && (
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="text-xs font-semibold p-2 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.avatar} {s.name} ({s.section})
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            type="button"
            onClick={handleRunCheck}
            disabled={isRunning}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-rose-600/20 active:scale-95 transition-all disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Evaluating Submissions...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Run Automated Check & Sync</span>
              </>
            )}
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {appliedSuccessToast && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm animate-in fade-in duration-200">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Automated check completed! Evaluated scores and personalized feedback remarks have been synced live to learner phones.
              </span>
            </div>
          )}

          {Object.keys(resultsByStudent).length === 0 ? (
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-10 text-center space-y-3">
              <FileCheck className="w-12 h-12 text-slate-400 mx-auto" />
              <div>
                <h4 className="text-base font-bold text-slate-800">
                  Ready to Run Automated Checking
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Click the <strong>"Run Automated Check & Sync"</strong> button above to evaluate all objective and subjective workbook answers against the DepEd ARAL Answer Key.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-600 pb-2 border-b border-slate-200">
                <span className="font-bold">
                  Evaluation Report · {totalEvaluatedActivities} Activities Auto-Checked
                </span>
                <span>DepEd ARAL KS3 Answer Key & Rubrics</span>
              </div>

              {Object.entries(resultsByStudent).map(([studentId, data]) => {
                const isStudentOpen = expandedStudent === studentId;

                return (
                  <div
                    key={studentId}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs"
                  >
                    {/* Student Row Header */}
                    <div
                      onClick={() =>
                        setExpandedStudent(isStudentOpen ? null : studentId)
                      }
                      className="p-4 bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">👨‍🎓</span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">
                            {data.studentName}
                          </h4>
                          <span className="text-[11px] text-slate-500">
                            {data.checkedCount === 0
                              ? 'No submitted activities yet'
                              : `${data.checkedCount} activities checked · Total Score: ${data.earned}/${data.possible}`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {data.checkedCount > 0 && (
                          <div className="text-right">
                            <span
                              className={`text-sm font-black font-mono ${
                                data.percentage >= 80
                                  ? 'text-emerald-600'
                                  : data.percentage >= 50
                                  ? 'text-amber-600'
                                  : 'text-rose-600'
                              }`}
                            >
                              {data.percentage}%
                            </span>
                            <span className="block text-[10px] text-slate-400 font-medium">
                              Accuracy
                            </span>
                          </div>
                        )}
                        {isStudentOpen ? (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {/* Detailed Activity Check Results for Student */}
                    {isStudentOpen && (
                      <div className="p-4 space-y-3 bg-white border-t border-slate-100">
                        {data.results.length === 0 ? (
                          <p className="text-xs text-slate-400 italic py-2">
                            This student has not submitted any activities to evaluate yet. When they answer on their phone, you can run this tool to grade them instantly!
                          </p>
                        ) : (
                          data.results.map((actRes) => {
                            const isActOpen = expandedActivity === `${studentId}_${actRes.activityId}`;

                            return (
                              <div
                                key={actRes.activityId}
                                className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 space-y-2.5"
                              >
                                <div
                                  onClick={() =>
                                    setExpandedActivity(
                                      isActOpen ? null : `${studentId}_${actRes.activityId}`
                                    )
                                  }
                                  className="flex items-center justify-between cursor-pointer"
                                >
                                  <div>
                                    <span className="text-xs font-bold text-slate-800">
                                      {actRes.activityTitle}
                                    </span>
                                    <span className="text-[10px] text-slate-400 block">
                                      Type: {actRes.type}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                        actRes.suggestedGrade === 'Mastered'
                                          ? 'bg-emerald-100 text-emerald-800'
                                          : actRes.suggestedGrade === 'Satisfactory'
                                          ? 'bg-blue-100 text-blue-800'
                                          : 'bg-amber-100 text-amber-800'
                                      }`}
                                    >
                                      {actRes.suggestedGrade}
                                    </span>
                                    <span className="text-xs font-mono font-bold text-slate-700">
                                      {actRes.earnedPoints}/{actRes.totalPoints} pts ({actRes.percentage}%)
                                    </span>
                                  </div>
                                </div>

                                {/* Generated Feedback Card */}
                                <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                                  <div className="flex items-center gap-1.5 text-rose-600 font-bold text-[10px] uppercase tracking-wider">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>Auto-Generated Teacher Feedback Remark:</span>
                                  </div>
                                  <p className="italic text-slate-800">
                                    “{actRes.suggestedFeedback}”
                                  </p>
                                </div>

                                {/* Question-by-Question Details Accordion */}
                                {isActOpen && (
                                  <div className="pt-2 border-t border-slate-200 space-y-2">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                                      Question-Level Breakdown:
                                    </span>
                                    {actRes.details.map((qDet, qIdx) => (
                                      <div
                                        key={qDet.questionId || qIdx}
                                        className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs space-y-1"
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className="font-semibold text-slate-800">
                                            {qDet.questionPrompt}
                                          </span>
                                          <div className="flex items-center gap-1 shrink-0">
                                            {qDet.status === 'correct' ? (
                                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1 border border-emerald-200">
                                                <CheckCircle className="w-3 h-3 text-emerald-600" />
                                                <span>Correct ({qDet.pointsEarned} pt)</span>
                                              </span>
                                            ) : qDet.status === 'partial' ? (
                                              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded flex items-center gap-1 border border-blue-200">
                                                <AlertCircle className="w-3 h-3 text-blue-600" />
                                                <span>Partial ({qDet.pointsEarned}/{qDet.totalPoints})</span>
                                              </span>
                                            ) : (
                                              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded flex items-center gap-1 border border-rose-200">
                                                <XCircle className="w-3 h-3 text-rose-600" />
                                                <span>Incorrect (0 pt)</span>
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                                          <div>
                                            <span className="text-slate-500 block font-medium">
                                              Learner Answer:
                                            </span>
                                            <span className="font-semibold text-slate-900 bg-slate-50 p-1 rounded block">
                                              {qDet.studentAnswer}
                                            </span>
                                          </div>
                                          {qDet.correctAnswer && (
                                            <div>
                                              <span className="text-emerald-700 block font-medium">
                                                Official Answer Key:
                                              </span>
                                              <span className="font-semibold text-emerald-950 bg-emerald-50/70 p-1 rounded block border border-emerald-100">
                                                {qDet.correctAnswer}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Real-time synchronization with active student workbooks.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
