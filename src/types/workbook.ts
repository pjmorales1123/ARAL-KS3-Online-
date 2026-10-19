export interface StudentProfile {
  id: string;
  name: string;
  lrn: string; // Learner Reference Number (DepEd 12-digit)
  grade: string;
  section: string;
  avatar: string;
}

export type ActivityType =
  | 'qa'
  | 'table_qa'
  | 'mcq'
  | 'literal_implied'
  | 'exit_ticket'
  | 'reading_timed'
  | 'checklist'
  | 'anagram'
  | 'root_affix'
  | 'dictionary'
  | 'sequencing'
  | 'script_theater'
  | 'categorize'
  | 'drawing_profile'
  | 'buy_or_bye'
  | 'matching'
  | 'rebus'
  | 'jumbled_letters'
  | 'fillblank'
  | 'infographic_builder';

export interface BaseActivity {
  id: string;
  activityNumber: string;
  title: string;
  instructions: string;
  type: ActivityType;
  storyTitle?: string;
  storyAuthor?: string;
  passage?: string;
  passageParagraphs?: string[];
  audioScript?: {
    withoutExpression?: string;
    withExpression?: string;
  };
  questions?: Array<{
    id: string;
    prompt: string;
    placeholder?: string;
    options?: string[];
    correctAnswer?: string | number;
    explanation?: string;
    word?: string;
    context?: string;
    jumbled?: string;
  }>;
  tableData?: {
    headers: string[];
    rows: Array<{
      id: string;
      word?: string;
      sentence?: string;
      event?: string;
      fields: Array<{
        key: string;
        label: string;
        placeholder?: string;
        preset?: string;
      }>;
    }>;
  };
  customConfig?: Record<string, any>;
}

export interface WorkbookSession {
  id: number;
  sessionNumber: number;
  title: string;
  pageNumberDisplay: string;
  competency: string;
  description: string;
  themeColor: string;
  activities: BaseActivity[];
}

export interface StudentProgressRecord {
  studentId: string;
  sessionId: number;
  activityId: string;
  updatedAt: string;
  answers: Record<string, any>;
  isCompleted: boolean;
  score?: {
    earned: number;
    total: number;
  };
  teacherFeedback?: string;
  teacherGrade?: 'Mastered' | 'Satisfactory' | 'Needs Review';
}

export interface StudentSummary {
  student: StudentProfile;
  completedActivitiesCount: number;
  totalActivitiesCount: number;
  completedSessionsCount: number;
  totalSessionsCount: number;
  averageScorePercentage: number;
  lastActive: string;
  sessionStatus: Record<number, 'not_started' | 'in_progress' | 'completed'>;
}
