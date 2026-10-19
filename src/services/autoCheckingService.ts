import { BaseActivity, StudentProgressRecord } from '../types/workbook';
import { OFFICIAL_ANSWER_KEYS } from '../data/answerKeyData';
import { StorageService } from './storageService';
import { WORKBOOK_SESSIONS } from '../data/workbookData';

export interface QuestionCheckResult {
  questionId: string;
  questionPrompt: string;
  studentAnswer: string;
  correctAnswer?: string;
  exemplarAnswer?: string;
  status: 'correct' | 'incorrect' | 'partial' | 'unanswered';
  explanation?: string;
  pointsEarned: number;
  totalPoints: number;
}

export interface ActivityCheckResult {
  activityId: string;
  activityTitle: string;
  type: string;
  earnedPoints: number;
  totalPoints: number;
  percentage: number;
  suggestedGrade: 'Mastered' | 'Satisfactory' | 'Needs Review';
  suggestedFeedback: string;
  details: QuestionCheckResult[];
}

export const AutoCheckingService = {
  /**
   * Check a single activity's answers for a student
   */
  checkActivity(
    activity: BaseActivity,
    answers: Record<string, any> = {}
  ): ActivityCheckResult {
    const details: QuestionCheckResult[] = [];
    let earnedPoints = 0;
    let totalPoints = 0;

    // Find official answer key if available
    let officialActKey: any = null;
    for (const sessKey of OFFICIAL_ANSWER_KEYS) {
      const found = sessKey.activities.find((a) => a.activityId === activity.id);
      if (found) {
        officialActKey = found;
        break;
      }
    }

    // 1. Check Multiple Choice (MCQ)
    if (activity.type === 'mcq' && activity.questions) {
      activity.questions.forEach((q) => {
        totalPoints += 1;
        const studentAns = String(answers[q.id] || '').trim();
        const correct = String(q.correctAnswer || '').trim();
        const isMatch = studentAns && studentAns.toLowerCase() === correct.toLowerCase();

        if (isMatch) {
          earnedPoints += 1;
          details.push({
            questionId: q.id,
            questionPrompt: q.prompt,
            studentAnswer: studentAns || '[No answer]',
            correctAnswer: correct,
            status: 'correct',
            explanation: q.explanation,
            pointsEarned: 1,
            totalPoints: 1,
          });
        } else if (!studentAns) {
          details.push({
            questionId: q.id,
            questionPrompt: q.prompt,
            studentAnswer: '[Unanswered]',
            correctAnswer: correct,
            status: 'unanswered',
            explanation: q.explanation,
            pointsEarned: 0,
            totalPoints: 1,
          });
        } else {
          details.push({
            questionId: q.id,
            questionPrompt: q.prompt,
            studentAnswer: studentAns,
            correctAnswer: correct,
            status: 'incorrect',
            explanation: q.explanation,
            pointsEarned: 0,
            totalPoints: 1,
          });
        }
      });
    }

    // 2. Check Literal vs Implied
    else if (activity.type === 'literal_implied' && activity.questions) {
      activity.questions.forEach((q) => {
        totalPoints += 1;
        const studentAns = String(answers[q.id] || '').trim().toUpperCase();
        const correct = String(q.correctAnswer || '').trim().toUpperCase();
        const isMatch = studentAns === correct;

        if (isMatch) {
          earnedPoints += 1;
          details.push({
            questionId: q.id,
            questionPrompt: q.prompt,
            studentAnswer: studentAns ? `${studentAns} (${studentAns === 'L' ? 'Literal' : 'Implied'})` : '[No answer]',
            correctAnswer: `${correct} (${correct === 'L' ? 'Literal' : 'Implied'})`,
            status: 'correct',
            explanation: q.explanation,
            pointsEarned: 1,
            totalPoints: 1,
          });
        } else {
          details.push({
            questionId: q.id,
            questionPrompt: q.prompt,
            studentAnswer: studentAns || '[Unanswered]',
            correctAnswer: `${correct} (${correct === 'L' ? 'Literal' : 'Implied'})`,
            status: studentAns ? 'incorrect' : 'unanswered',
            explanation: q.explanation,
            pointsEarned: 0,
            totalPoints: 1,
          });
        }
      });
    }

    // 3. Check Buy or Bye
    else if (activity.type === 'buy_or_bye' && activity.questions) {
      activity.questions.forEach((q) => {
        totalPoints += 1;
        const studentAns = String(answers[q.id] || '').trim().toUpperCase();
        const correct = String(q.correctAnswer || '').trim().toUpperCase();
        const isMatch = studentAns === correct;

        if (isMatch) {
          earnedPoints += 1;
          details.push({
            questionId: q.id,
            questionPrompt: q.prompt,
            studentAnswer: studentAns,
            correctAnswer: correct,
            status: 'correct',
            explanation: q.explanation,
            pointsEarned: 1,
            totalPoints: 1,
          });
        } else {
          details.push({
            questionId: q.id,
            questionPrompt: q.prompt,
            studentAnswer: studentAns || '[Unanswered]',
            correctAnswer: correct,
            status: studentAns ? 'incorrect' : 'unanswered',
            explanation: q.explanation,
            pointsEarned: 0,
            totalPoints: 1,
          });
        }
      });
    }

    // 4. Check Rebus Puzzles
    else if (activity.type === 'rebus' && activity.questions) {
      activity.questions.forEach((q) => {
        totalPoints += 1;
        const studentAns = String(answers[q.id] || '').trim().toLowerCase();
        const correct = String(q.correctAnswer || '').trim().toLowerCase();
        const isMatch = studentAns && (studentAns === correct || correct.includes(studentAns) || studentAns.includes(correct));

        if (isMatch) {
          earnedPoints += 1;
          details.push({
            questionId: q.id,
            questionPrompt: q.prompt,
            studentAnswer: String(answers[q.id] || ''),
            correctAnswer: q.correctAnswer ? String(q.correctAnswer) : undefined,
            status: 'correct',
            explanation: q.explanation,
            pointsEarned: 1,
            totalPoints: 1,
          });
        } else {
          details.push({
            questionId: q.id,
            questionPrompt: q.prompt,
            studentAnswer: answers[q.id] ? String(answers[q.id]) : '[Unanswered]',
            correctAnswer: q.correctAnswer ? String(q.correctAnswer) : undefined,
            status: studentAns ? 'incorrect' : 'unanswered',
            explanation: q.explanation,
            pointsEarned: 0,
            totalPoints: 1,
          });
        }
      });
    }

    // 5. Check Jumbled Letters
    else if (activity.type === 'jumbled_letters' && activity.questions) {
      activity.questions.forEach((q) => {
        totalPoints += 1;
        const studentAns = String(answers[q.id] || '').trim().toUpperCase();
        const correct = String(q.correctAnswer || '').trim().toUpperCase();
        const isMatch = studentAns === correct;

        if (isMatch) {
          earnedPoints += 1;
          details.push({
            questionId: q.id,
            questionPrompt: `${q.prompt} (Letters: ${q.jumbled})`,
            studentAnswer: studentAns,
            correctAnswer: correct,
            status: 'correct',
            pointsEarned: 1,
            totalPoints: 1,
          });
        } else {
          details.push({
            questionId: q.id,
            questionPrompt: `${q.prompt} (Letters: ${q.jumbled})`,
            studentAnswer: studentAns || '[Unanswered]',
            correctAnswer: correct,
            status: studentAns ? 'incorrect' : 'unanswered',
            pointsEarned: 0,
            totalPoints: 1,
          });
        }
      });
    }

    // 6. Check Fill in the Blank
    else if (activity.type === 'fillblank' && activity.questions) {
      activity.questions.forEach((q) => {
        totalPoints += 1;
        const studentAns = String(answers[q.id] || '').trim().toLowerCase();
        const correct = String(q.correctAnswer || '').trim().toLowerCase();
        const isMatch = studentAns === correct;

        if (isMatch) {
          earnedPoints += 1;
          details.push({
            questionId: q.id,
            questionPrompt: q.prompt,
            studentAnswer: answers[q.id] || '',
            correctAnswer: String(q.correctAnswer),
            status: 'correct',
            pointsEarned: 1,
            totalPoints: 1,
          });
        } else {
          details.push({
            questionId: q.id,
            questionPrompt: q.prompt,
            studentAnswer: answers[q.id] || '[Unanswered]',
            correctAnswer: String(q.correctAnswer),
            status: studentAns ? 'incorrect' : 'unanswered',
            pointsEarned: 0,
            totalPoints: 1,
          });
        }
      });
    }

    // 7. Check Matching (Propaganda)
    else if (activity.type === 'matching' && activity.customConfig) {
      const correctPairs = activity.customConfig.correctPairs || {};
      const colA = activity.customConfig.columnA || [];
      const colB = activity.customConfig.columnB || [];

      colA.forEach((itemA: any) => {
        totalPoints += 1;
        const pairedB = answers[itemA.id];
        const correctB = correctPairs[itemA.id];
        const isMatch = pairedB === correctB;
        const studentDef = colB.find((b: any) => b.id === pairedB)?.label || '[Not paired]';
        const correctDef = colB.find((b: any) => b.id === correctB)?.label || '';

        if (isMatch) {
          earnedPoints += 1;
          details.push({
            questionId: itemA.id,
            questionPrompt: `Match Technique: ${itemA.label}`,
            studentAnswer: studentDef,
            correctAnswer: correctDef,
            status: 'correct',
            pointsEarned: 1,
            totalPoints: 1,
          });
        } else {
          details.push({
            questionId: itemA.id,
            questionPrompt: `Match Technique: ${itemA.label}`,
            studentAnswer: studentDef,
            correctAnswer: correctDef,
            status: pairedB ? 'incorrect' : 'unanswered',
            pointsEarned: 0,
            totalPoints: 1,
          });
        }
      });
    }

    // 8. Check Categorize (Reality vs Fantasy)
    else if (activity.type === 'categorize' && activity.customConfig) {
      const items = activity.customConfig.items || [];
      items.forEach((item: any) => {
        totalPoints += 1;
        const studentCat = answers[item.word];
        const isMatch = studentCat === item.category;

        if (isMatch) {
          earnedPoints += 1;
          details.push({
            questionId: item.word,
            questionPrompt: `Classify Word: "${item.word}"`,
            studentAnswer: studentCat || '[Unassigned]',
            correctAnswer: item.category,
            status: 'correct',
            pointsEarned: 1,
            totalPoints: 1,
          });
        } else {
          details.push({
            questionId: item.word,
            questionPrompt: `Classify Word: "${item.word}"`,
            studentAnswer: studentCat || '[Unassigned]',
            correctAnswer: item.category,
            status: studentCat ? 'incorrect' : 'unanswered',
            pointsEarned: 0,
            totalPoints: 1,
          });
        }
      });
    }

    // 9. Check Sequencing (Match Boy)
    else if (activity.type === 'sequencing' && activity.customConfig) {
      const items = activity.customConfig.sequenceItems || [];
      items.forEach((item: any) => {
        totalPoints += 1;
        const studentPos = answers[item.key];
        const isMatch = studentPos === item.correctPos;

        if (isMatch) {
          earnedPoints += 1;
          details.push({
            questionId: item.key,
            questionPrompt: item.text,
            studentAnswer: studentPos ? `Step ${studentPos}` : '[Unassigned]',
            correctAnswer: `Step ${item.correctPos}`,
            status: 'correct',
            pointsEarned: 1,
            totalPoints: 1,
          });
        } else {
          details.push({
            questionId: item.key,
            questionPrompt: item.text,
            studentAnswer: studentPos ? `Step ${studentPos}` : '[Unassigned]',
            correctAnswer: `Step ${item.correctPos}`,
            status: studentPos ? 'incorrect' : 'unanswered',
            pointsEarned: 0,
            totalPoints: 1,
          });
        }
      });
    }

    // 10. Check Subjective / Open-ended QA / Exit Tickets / Tables
    else {
      const questionsList = activity.questions || [];
      const tableRows = activity.tableData?.rows || [];

      if (questionsList.length > 0) {
        questionsList.forEach((q) => {
          totalPoints += 3; // 3-point rubric scale for open-ended
          const studentText = String(answers[q.id] || '').trim();

          // Find key concepts in official answer key
          const itemKey = officialActKey?.items.find((it: any) => it.questionId === q.id);
          const keyConcepts: string[] = itemKey?.keyConcepts || ['story', 'text', 'because', 'details'];
          const exemplarAnswer = itemKey?.exemplarAnswer || 'A detailed answer citing evidence from the text.';

          // Evaluate text quality & key concepts
          const lower = studentText.toLowerCase();
          const matchedConcepts = keyConcepts.filter((c) => lower.includes(c.toLowerCase()));
          const wordCount = studentText.split(/\s+/).filter(Boolean).length;

          let score = 0;
          let status: 'correct' | 'partial' | 'unanswered' = 'unanswered';

          if (wordCount >= 7 && matchedConcepts.length >= 2) {
            score = 3; // Mastered
            status = 'correct';
          } else if (wordCount >= 3 || matchedConcepts.length >= 1) {
            score = 2; // Satisfactory
            status = 'partial';
          } else if (wordCount > 0) {
            score = 1; // Needs review
            status = 'partial';
          }

          earnedPoints += score;
          details.push({
            questionId: q.id,
            questionPrompt: q.prompt,
            studentAnswer: studentText || '[No response provided]',
            exemplarAnswer,
            status,
            pointsEarned: score,
            totalPoints: 3,
            explanation: `Matched concepts: ${matchedConcepts.join(', ') || 'None'}. Word count: ${wordCount}.`,
          });
        });
      } else if (tableRows.length > 0) {
        tableRows.forEach((row) => {
          totalPoints += 2;
          let filledCount = 0;
          const userVals: string[] = [];

          row.fields.forEach((f) => {
            const val = String(answers[`${row.id}_${f.key}`] || '').trim();
            if (val) {
              filledCount++;
              userVals.push(`${f.label}: ${val}`);
            }
          });

          const earned = filledCount >= row.fields.length ? 2 : filledCount > 0 ? 1 : 0;
          earnedPoints += earned;

          details.push({
            questionId: row.id,
            questionPrompt: row.word || row.event || 'Table Row Item',
            studentAnswer: userVals.join(' | ') || '[Incomplete / Unanswered]',
            status: earned === 2 ? 'correct' : earned === 1 ? 'partial' : 'unanswered',
            pointsEarned: earned,
            totalPoints: 2,
            explanation: 'Table fields completed by student.',
          });
        });
      } else {
        // Fallback for drawing or creative activities
        totalPoints = 5;
        const hasWork = Object.keys(answers).length > 0;
        earnedPoints = hasWork ? 5 : 0;
        details.push({
          questionId: 'creative_act',
          questionPrompt: activity.title,
          studentAnswer: hasWork ? 'Creative assignment completed' : '[Not completed]',
          status: hasWork ? 'correct' : 'unanswered',
          pointsEarned: earnedPoints,
          totalPoints: 5,
        });
      }
    }

    // Compute percentage and recommendations
    const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    let suggestedGrade: 'Mastered' | 'Satisfactory' | 'Needs Review' = 'Needs Review';
    let suggestedFeedback = '';

    if (percentage >= 80) {
      suggestedGrade = 'Mastered';
      suggestedFeedback = `Outstanding work! You demonstrated mastery of ${activity.title} (${percentage}%). Keep up the excellent analytical reading!`;
    } else if (percentage >= 50) {
      suggestedGrade = 'Satisfactory';
      suggestedFeedback = `Good effort! You showed satisfactory understanding of ${activity.title} (${percentage}%). Practice using more context clues to refine your answers.`;
    } else {
      suggestedGrade = 'Needs Review';
      suggestedFeedback = `Keep working on this! Review the story passage again and look for textual evidence for ${activity.title}. You can do it!`;
    }

    return {
      activityId: activity.id,
      activityTitle: activity.title,
      type: activity.type,
      earnedPoints,
      totalPoints,
      percentage,
      suggestedGrade,
      suggestedFeedback,
      details,
    };
  },

  /**
   * Run automated check on all activities for a specific student and apply scores + feedback
   */
  autoGradeStudent(
    studentId: string,
    sessions = StorageService.getStudents()
  ): {
    studentId: string;
    totalEarned: number;
    totalPossible: number;
    overallPercentage: number;
    checkedActivitiesCount: number;
    results: ActivityCheckResult[];
  } {
    const studentRecords = StorageService.getStudentProgress(studentId);

    let totalEarned = 0;
    let totalPossible = 0;
    let checkedCount = 0;
    const results: ActivityCheckResult[] = [];

    WORKBOOK_SESSIONS.forEach((session: any) => {
      session.activities.forEach((act: BaseActivity) => {
        const record = studentRecords.find((r) => r.activityId === act.id);
        if (record && record.isCompleted) {
          const checkResult = this.checkActivity(act, record.answers || {});
          results.push(checkResult);

          totalEarned += checkResult.earnedPoints;
          totalPossible += checkResult.totalPoints;
          checkedCount++;

          // Save evaluated score and feedback directly into StorageService
          StorageService.saveActivityAnswer(
            studentId,
            session.id,
            act.id,
            record.answers || {},
            true,
            { earned: checkResult.earnedPoints, total: checkResult.totalPoints }
          );

          // If no custom teacher feedback was entered yet, save automated recommendation
          if (!record.teacherFeedback) {
            StorageService.saveTeacherFeedback(
              studentId,
              act.id,
              checkResult.suggestedFeedback,
              checkResult.suggestedGrade
            );
          }
        }
      });
    });

    const overallPercentage = totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 0;

    return {
      studentId,
      totalEarned,
      totalPossible,
      overallPercentage,
      checkedActivitiesCount: checkedCount,
      results,
    };
  },
};
