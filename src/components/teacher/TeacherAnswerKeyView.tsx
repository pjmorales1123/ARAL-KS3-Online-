import React, { useState } from 'react';
import {
  Key,
  BookOpen,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Award,
  Search,
  Filter,
} from 'lucide-react';
import { OFFICIAL_ANSWER_KEYS, SessionAnswerKey, ActivityAnswerKey } from '../../data/answerKeyData';

export const TeacherAnswerKeyView: React.FC = () => {
  const [selectedSessionId, setSelectedSessionId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedActivities, setExpandedActivities] = useState<Record<string, boolean>>({});

  const currentSessionKey =
    OFFICIAL_ANSWER_KEYS.find((s) => s.sessionId === selectedSessionId) ||
    OFFICIAL_ANSWER_KEYS[0];

  const toggleExpand = (actId: string) => {
    setExpandedActivities((prev) => ({
      ...prev,
      [actId]: !prev[actId],
    }));
  };

  // Filter items if searching
  const filteredActivities = currentSessionKey.activities.filter((act) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      act.title.toLowerCase().includes(q) ||
      act.activityNumber.toLowerCase().includes(q) ||
      act.items.some(
        (it) =>
          it.questionPrompt.toLowerCase().includes(q) ||
          (it.correctAnswer && it.correctAnswer.toLowerCase().includes(q)) ||
          (it.exemplarAnswer && it.exemplarAnswer.toLowerCase().includes(q))
      )
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-amber-500 via-rose-600 to-indigo-700 text-white rounded-3xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-lg bg-white/20 backdrop-blur-xs">
                <Key className="w-5 h-5 text-amber-200" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                Teacher Reference Guide · DepEd ARAL Key Stage 3
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">
              Official Answer Key & Scoring Rubrics
            </h2>
            <p className="text-xs text-white/90 mt-1 max-w-2xl leading-relaxed">
              Use this comprehensive guide for verification and auto-checking. Contains exact correct options for objective assessments, alongside exemplar answers, key concept criteria, and rubric ratings for subjective reflections.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md text-xs font-bold border border-white/20">
              14 Total Sessions
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-400 text-emerald-950 text-xs font-bold">
              DepEd Aligned
            </span>
          </div>
        </div>
      </div>

      {/* Session Selection Strip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-rose-600" />
            <span>Select Workbook Session:</span>
          </span>
          <span className="text-xs text-slate-500">
            Current: <strong>Session {selectedSessionId}</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {OFFICIAL_ANSWER_KEYS.map((sess) => {
            const isSelected = sess.sessionId === selectedSessionId;
            return (
              <button
                key={sess.sessionId}
                onClick={() => setSelectedSessionId(sess.sessionId)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>Session {sess.sessionId}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Session Info & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
            Session {currentSessionKey.sessionId} Guide
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            {currentSessionKey.sessionTitle}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Competency: {currentSessionKey.competency}
          </p>
        </div>

        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-200"
          />
        </div>
      </div>

      {/* Activities Accordion List */}
      <div className="space-y-4">
        {filteredActivities.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
            <HelpCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold">No questions matching "{searchQuery}"</p>
            <p className="text-xs text-slate-400 mt-1">Try searching for other words or reset the search field.</p>
          </div>
        ) : (
          filteredActivities.map((act) => {
            const isExpanded = expandedActivities[act.activityId] !== false; // default open

            return (
              <div
                key={act.activityId}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs transition-all"
              >
                {/* Header */}
                <button
                  type="button"
                  onClick={() => toggleExpand(act.activityId)}
                  className="w-full p-4 text-left flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition-colors border-b border-slate-200/80"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold bg-rose-100 text-rose-800 px-2.5 py-1 rounded-lg">
                      {act.activityNumber}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {act.title}
                      </h4>
                      <span className="text-[11px] text-slate-500 font-normal">
                        Type: <strong className="capitalize">{act.type.replace('_', ' ')}</strong> · Total Points: <strong>{act.totalPoints}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                      {act.items.length} questions
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Body Content */}
                {isExpanded && (
                  <div className="p-4 space-y-4">
                    {/* Scoring Guideline Notice */}
                    <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold">DepEd Scoring Guideline:</strong>
                        <span>{act.scoringGuideline}</span>
                      </div>
                    </div>

                    {/* Question Items */}
                    <div className="space-y-3 pt-1">
                      {act.items.map((item, idx) => (
                        <div
                          key={item.questionId || idx}
                          className="bg-slate-50/80 border border-slate-200 rounded-xl p-3.5 space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-slate-800 leading-snug">
                              {item.questionPrompt}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 shrink-0">
                              [{item.questionId}]
                            </span>
                          </div>

                          {/* Correct Answer Display for Objective */}
                          {item.correctAnswer && (
                            <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-xs">
                              <span className="font-bold text-emerald-900 block mb-0.5">
                                Official Correct Answer:
                              </span>
                              <span className="font-semibold text-emerald-950 font-mono text-sm">
                                {item.correctAnswer}
                              </span>
                              {item.explanation && (
                                <p className="text-[11px] text-emerald-800 mt-1 italic border-t border-emerald-200/60 pt-1">
                                  <strong>Rationale:</strong> {item.explanation}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Exemplar Answer Display for Subjective */}
                          {item.exemplarAnswer && (
                            <div className="bg-indigo-50/70 border border-indigo-200 p-2.5 rounded-lg text-xs space-y-1.5">
                              <span className="font-bold text-indigo-900 block">
                                Exemplar Model Answer:
                              </span>
                              <p className="text-indigo-950 font-medium italic">
                                “{item.exemplarAnswer}”
                              </p>

                              {item.keyConcepts && (
                                <div className="pt-1.5 border-t border-indigo-200/60 flex flex-wrap items-center gap-1">
                                  <span className="text-[10px] font-bold text-indigo-800">
                                    Target Key Concepts:
                                  </span>
                                  {item.keyConcepts.map((kc) => (
                                    <span
                                      key={kc}
                                      className="bg-white border border-indigo-200 text-indigo-900 text-[10px] px-1.5 py-0.5 rounded font-mono"
                                    >
                                      {kc}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {item.rubricCriteria && (
                                <div className="text-[10px] text-indigo-800">
                                  <strong>Rubric Criteria: </strong>
                                  {item.rubricCriteria.join(' · ')}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
