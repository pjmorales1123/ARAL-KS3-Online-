/**
 * Service managing classroom session locks and passcodes.
 * Prevents students from answering beforehand, sharing answers, or viewing upcoming sessions.
 */

const STORAGE_KEYS = {
  SESSION_PASSCODES: 'aral_session_passcodes_v1',
  STUDENT_UNLOCKED_SESSIONS: 'aral_student_unlocked_sessions_v1',
};

// Default passwords for each session (configured by teacher)
export const DEFAULT_SESSION_PASSCODES: Record<number, string> = {
  1: 'OPEN',       // Session 1: Orientation & Diagnostic (Open by default)
  2: 'KANCIL24',   // Session 2: Sang Kancil
  3: 'STRATEGY',   // Session 3: Reading Strategies
  4: 'CONTEXT',    // Session 4: Context Clues
  5: 'GRENDEL',    // Session 5: Beowulf and Grendel
  6: 'MATCHBOY',   // Session 6: The Little Match Boy
  7: 'CROSSING',   // Session 7: Road Safety Crossing
  8: 'MAGI1905',   // Session 8: The Gift of the Magi
  9: 'BEOWULF',    // Session 9: The Dragon's Horde
  10: 'BALINSA',   // Session 10: Balinsasayao Twin Lakes
  11: 'MIDNIGHT',  // Session 11: Ocean Midnight Zone
  12: 'OBATSU',    // Session 12: Story of the Aged Mother
  13: 'BILLBOARD', // Session 13: Propaganda Devices
  14: 'HERITAGE',  // Session 14: Indigenous Peoples of PH
};

export const SessionSecurityService = {
  /**
   * Get all session passcodes (Teacher Dashboard)
   */
  getPasscodes(): Record<number, string> {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SESSION_PASSCODES);
      if (stored) return { ...DEFAULT_SESSION_PASSCODES, ...JSON.parse(stored) };
    } catch (e) {
      console.warn('Error reading passcodes', e);
    }
    return DEFAULT_SESSION_PASSCODES;
  },

  /**
   * Update a specific session passcode
   */
  setPasscode(sessionId: number, newCode: string): void {
    const codes = this.getPasscodes();
    codes[sessionId] = newCode.trim().toUpperCase();
    localStorage.setItem(STORAGE_KEYS.SESSION_PASSCODES, JSON.stringify(codes));
  },

  /**
   * Check if a session is currently unlocked for a specific student on this device
   */
  isSessionUnlocked(studentId: string, sessionId: number): boolean {
    if (sessionId === 1) return true; // Session 1 is always unlocked for diagnostic baseline

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STUDENT_UNLOCKED_SESSIONS);
      if (stored) {
        const map: Record<string, number[]> = JSON.parse(stored);
        const unlockedList = map[studentId] || [];
        if (unlockedList.includes(sessionId)) return true;
      }
    } catch (e) {
      console.warn('Error checking unlocked session', e);
    }
    return false;
  },

  /**
   * Unlock a session for a student using the entered passcode
   */
  attemptUnlock(studentId: string, sessionId: number, enteredCode: string): { success: boolean; message: string } {
    if (sessionId === 1) {
      return { success: true, message: 'Session 1 is already open.' };
    }

    const passcodes = this.getPasscodes();
    const correctCode = passcodes[sessionId] || DEFAULT_SESSION_PASSCODES[sessionId] || 'ARAL';

    const normalizedEntered = enteredCode.trim().toUpperCase();
    const normalizedCorrect = correctCode.trim().toUpperCase();

    // Master teacher bypass code
    const isMasterBypass = normalizedEntered === 'DEPED2026' || normalizedEntered === 'TEACHER';

    if (normalizedEntered === normalizedCorrect || isMasterBypass) {
      this.grantUnlock(studentId, sessionId);
      return { success: true, message: 'Passcode verified! Session unlocked successfully.' };
    }

    return {
      success: false,
      message: 'Incorrect passcode. Please ask your teacher for the current classroom unlock code.',
    };
  },

  /**
   * Grant unlock state directly
   */
  grantUnlock(studentId: string, sessionId: number): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STUDENT_UNLOCKED_SESSIONS);
      const map: Record<string, number[]> = stored ? JSON.parse(stored) : {};
      const currentList = new Set(map[studentId] || []);
      currentList.add(sessionId);
      map[studentId] = Array.from(currentList);
      localStorage.setItem(STORAGE_KEYS.STUDENT_UNLOCKED_SESSIONS, JSON.stringify(map));
    } catch (e) {
      console.warn('Error granting unlock', e);
    }
  },

  /**
   * Teacher tool: Unlock all sessions for testing or free exploration
   */
  unlockAllForStudent(studentId: string): void {
    const allSessionIds = Array.from({ length: 14 }, (_, i) => i + 1);
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STUDENT_UNLOCKED_SESSIONS);
      const map: Record<string, number[]> = stored ? JSON.parse(stored) : {};
      map[studentId] = allSessionIds;
      localStorage.setItem(STORAGE_KEYS.STUDENT_UNLOCKED_SESSIONS, JSON.stringify(map));
    } catch (e) {
      console.warn('Error unlocking all', e);
    }
  },

  /**
   * Teacher tool: Relock all sessions (except Session 1)
   */
  relockAllForStudent(studentId: string): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STUDENT_UNLOCKED_SESSIONS);
      const map: Record<string, number[]> = stored ? JSON.parse(stored) : {};
      map[studentId] = [1];
      localStorage.setItem(STORAGE_KEYS.STUDENT_UNLOCKED_SESSIONS, JSON.stringify(map));
    } catch (e) {
      console.warn('Error relocking', e);
    }
  },
};
