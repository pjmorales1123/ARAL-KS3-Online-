import { StudentProfile, StudentProgressRecord, StudentSummary, WorkbookSession } from '../types/workbook';
import { DEFAULT_STUDENTS, WORKBOOK_SESSIONS } from '../data/workbookData';

const STORAGE_KEYS = {
  STUDENTS: 'aral_students_v3',
  ACTIVE_STUDENT: 'aral_active_student_v3',
  PROGRESS: 'aral_progress_v3', // v3 guarantees completely empty inputs and zero preloaded answers
  TEACHER_FEEDBACK: 'aral_teacher_feedback_v3',
};

// Create a BroadcastChannel for cross-tab and cross-component instant sync
const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window 
  ? new BroadcastChannel('aral_reading_sync') 
  : null;

// Initial progress starts 100% EMPTY as requested by the user
function getInitialProgress(): Record<string, StudentProgressRecord[]> {
  return {};
}

export const StorageService = {
  getStudents(): StudentProfile[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading students', e);
    }
    // Set default students roster (with zero preloaded answers)
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(DEFAULT_STUDENTS));
    return DEFAULT_STUDENTS;
  },

  addStudent(name: string, grade = 'Grade 8', section = 'Sampaguita'): StudentProfile {
    const students = this.getStudents();
    const newStudent: StudentProfile = {
      id: `student-${Date.now()}`,
      name: name.trim(),
      lrn: `1098${Math.floor(10000000 + Math.random() * 90000000)}`,
      grade,
      section,
      avatar: ['👨‍🎓', '👩‍🎓', '🧑‍🎓', '🙋‍♂️', '🙋‍♀️'][Math.floor(Math.random() * 5)],
    };
    students.push(newStudent);
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    this.broadcastChange('student_added', newStudent);
    return newStudent;
  },

  getActiveStudentId(): string {
    const students = this.getStudents();
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ACTIVE_STUDENT);
      if (stored && students.some((s) => s.id === stored)) return stored;
    } catch (e) {
      // ignore
    }
    const defaultId = students[0]?.id || 'student-1';
    localStorage.setItem(STORAGE_KEYS.ACTIVE_STUDENT, defaultId);
    return defaultId;
  },

  setActiveStudentId(id: string) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_STUDENT, id);
    this.broadcastChange('active_student_changed', id);
  },

  getAllProgress(): Record<string, StudentProgressRecord[]> {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading progress', e);
    }
    const init = getInitialProgress();
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(init));
    return init;
  },

  getStudentProgress(studentId: string): StudentProgressRecord[] {
    const all = this.getAllProgress();
    return all[studentId] || [];
  },

  getActivityAnswer(studentId: string, activityId: string): StudentProgressRecord | undefined {
    const list = this.getStudentProgress(studentId);
    return list.find((item) => item.activityId === activityId);
  },

  saveActivityAnswer(
    studentId: string,
    sessionId: number,
    activityId: string,
    answers: Record<string, any>,
    isCompleted = true,
    score?: { earned: number; total: number }
  ): StudentProgressRecord {
    const all = this.getAllProgress();
    const list = all[studentId] || [];
    const existingIndex = list.findIndex((item) => item.activityId === activityId);

    const record: StudentProgressRecord = {
      studentId,
      sessionId,
      activityId,
      updatedAt: new Date().toISOString(),
      answers,
      isCompleted,
      score: score || (existingIndex >= 0 ? list[existingIndex].score : undefined),
      teacherFeedback: existingIndex >= 0 ? list[existingIndex].teacherFeedback : undefined,
      teacherGrade: existingIndex >= 0 ? list[existingIndex].teacherGrade : undefined,
    };

    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...record };
    } else {
      list.push(record);
    }

    all[studentId] = list;
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(all));
    this.broadcastChange('answer_saved', { studentId, sessionId, activityId, record });
    return record;
  },

  saveTeacherFeedback(
    studentId: string,
    activityId: string,
    feedback: string,
    grade?: 'Mastered' | 'Satisfactory' | 'Needs Review'
  ) {
    const all = this.getAllProgress();
    const list = all[studentId] || [];
    const item = list.find((r) => r.activityId === activityId);
    if (item) {
      item.teacherFeedback = feedback;
      if (grade) item.teacherGrade = grade;
      item.updatedAt = new Date().toISOString();
      all[studentId] = list;
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(all));
      this.broadcastChange('feedback_added', { studentId, activityId, feedback, grade });
    }
  },

  resetStudentData(studentId: string) {
    const all = this.getAllProgress();
    delete all[studentId];
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(all));
    this.broadcastChange('student_reset', { studentId });
  },

  clearAllData() {
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.STUDENTS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_STUDENT);
    this.broadcastChange('student_reset', {});
  },

  getStudentSummary(studentId: string): StudentSummary {
    const students = this.getStudents();
    const student = students.find((s) => s.id === studentId) || {
      id: studentId,
      name: 'Unknown Learner',
      lrn: '000000000000',
      grade: 'Grade 8',
      section: 'Regular',
      avatar: '🧑‍🎓',
    };

    const studentRecords = this.getStudentProgress(studentId);
    let totalCompletedActs = 0;
    let earnedPoints = 0;
    let possiblePoints = 0;
    let lastActive = 'Not yet started';

    const sessionStatus: Record<number, 'not_started' | 'in_progress' | 'completed'> = {};

    let totalActivitiesInWorkbook = 0;

    WORKBOOK_SESSIONS.forEach((session) => {
      totalActivitiesInWorkbook += session.activities.length;
      const actsInSession = session.activities.map((a) => a.id);
      const completedInSession = studentRecords.filter(
        (r) => actsInSession.includes(r.activityId) && r.isCompleted
      );

      if (completedInSession.length === 0) {
        sessionStatus[session.id] = 'not_started';
      } else if (completedInSession.length === actsInSession.length) {
        sessionStatus[session.id] = 'completed';
      } else {
        sessionStatus[session.id] = 'in_progress';
      }
    });

    studentRecords.forEach((r) => {
      if (r.isCompleted) totalCompletedActs++;
      if (r.score) {
        earnedPoints += r.score.earned;
        possiblePoints += r.score.total;
      }
      if (r.updatedAt && (lastActive === 'Not yet started' || new Date(r.updatedAt) > new Date(lastActive))) {
        lastActive = r.updatedAt;
      }
    });

    const completedSessionsCount = Object.values(sessionStatus).filter((s) => s === 'completed').length;
    const avgScore = possiblePoints > 0 ? Math.round((earnedPoints / possiblePoints) * 100) : 0;

    return {
      student,
      completedActivitiesCount: totalCompletedActs,
      totalActivitiesCount: totalActivitiesInWorkbook,
      completedSessionsCount,
      totalSessionsCount: WORKBOOK_SESSIONS.length,
      averageScorePercentage: avgScore,
      lastActive,
      sessionStatus,
    };
  },

  getAllStudentsSummary(): StudentSummary[] {
    const students = this.getStudents();
    return students.map((s) => this.getStudentSummary(s.id));
  },

  broadcastChange(type: string, payload: any) {
    if (syncChannel) {
      try {
        syncChannel.postMessage({ type, payload, timestamp: Date.now() });
      } catch (e) {
        // ignore
      }
    }
    // Also dispatch on window for local components in same window
    window.dispatchEvent(new CustomEvent('aral-sync-event', { detail: { type, payload } }));
  },

  subscribeToSync(callback: (event: { type: string; payload: any }) => void) {
    const handleCustom = (e: Event) => {
      const customEvent = e as CustomEvent;
      callback(customEvent.detail);
    };

    window.addEventListener('aral-sync-event', handleCustom);

    if (syncChannel) {
      syncChannel.onmessage = (event) => {
        callback(event.data);
      };
    }

    return () => {
      window.removeEventListener('aral-sync-event', handleCustom);
    };
  },
};
