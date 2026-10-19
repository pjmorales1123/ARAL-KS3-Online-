export interface AnswerKeyItem {
  questionId: string;
  questionPrompt: string;
  correctAnswer?: string;
  acceptableAnswers?: string[];
  explanation?: string;
  rubricCriteria?: string[];
  exemplarAnswer?: string;
  keyConcepts?: string[]; // keywords used by automated checking tool
}

export interface ActivityAnswerKey {
  activityId: string;
  activityNumber: string;
  title: string;
  type: string;
  totalPoints: number;
  items: AnswerKeyItem[];
  scoringGuideline: string;
}

export interface SessionAnswerKey {
  sessionId: number;
  sessionTitle: string;
  competency: string;
  activities: ActivityAnswerKey[];
}

export const OFFICIAL_ANSWER_KEYS: SessionAnswerKey[] = [
  // ==========================================
  // SESSION 1
  // ==========================================
  {
    sessionId: 1,
    sessionTitle: 'Orientation, Reading Inventory, and Diagnostic Pre-Assessment',
    competency: 'Establish reading baseline, evaluate reading habits, and set Key Stage 3 literacy goals',
    activities: [
      {
        activityId: 's1-act1',
        activityNumber: 'Activity 1',
        title: 'Learner Reading Inventory & Self-Profile',
        type: 'qa',
        totalPoints: 3,
        scoringGuideline: 'Check for honest, constructive self-evaluation of reading habits and clear goal formulation.',
        items: [
          {
            questionId: 's1_q1',
            questionPrompt: '1. What kinds of stories, books, or articles do you enjoy reading the most (and why)?',
            exemplarAnswer: 'I enjoy reading adventure folktales and science articles because they introduce new worlds, interesting facts, and broaden my imagination.',
            keyConcepts: ['enjoy', 'like', 'books', 'stories', 'because', 'interest', 'imagination', 'learn'],
            rubricCriteria: ['Mentions preferred genre or topic', 'Provides reason/explanation'],
          },
          {
            questionId: 's1_q2',
            questionPrompt: '2. What is the biggest challenge you encounter when reading difficult English texts?',
            exemplarAnswer: 'My main challenge is encountering unfamiliar vocabulary words and figuring out their meanings without stopping frequently.',
            keyConcepts: ['words', 'vocabulary', 'speed', 'difficult', 'understanding', 'meaning', 'comprehension'],
            rubricCriteria: ['Identifies specific reading hurdle (vocabulary, pacing, or comprehension)'],
          },
          {
            questionId: 's1_q3',
            questionPrompt: '3. What specific reading skill do you most want to improve during this ARAL Reading Plus program?',
            exemplarAnswer: 'I want to master using context clues to deduce unfamiliar words and learn how to distinguish facts from opinions.',
            keyConcepts: ['improve', 'context', 'clues', 'speed', 'fluency', 'words', 'skill', 'comprehension', 'meaning'],
            rubricCriteria: ['Sets a clear, achievable literacy goal for Key Stage 3'],
          },
        ],
      },
      {
        activityId: 's1-act2',
        activityNumber: 'Activity 2',
        title: 'Diagnostic Pre-Assessment: The Journey of a Reader',
        type: 'mcq',
        totalPoints: 4,
        scoringGuideline: 'Objective evaluation (1 point per correct answer).',
        items: [
          {
            questionId: 's1_diag1',
            questionPrompt: '1. According to the text, what is reading compared to?',
            correctAnswer: 'B. A bridge connecting human minds across distance and time',
            explanation: 'Literal comprehension: Paragraph 1 states directly that reading is a bridge connecting human minds across distance and time.',
          },
          {
            questionId: 's1_diag2',
            questionPrompt: '2. In the sentence "an active reader asks questions," the word discerning most likely means:',
            correctAnswer: 'B. Able to judge well and think critically',
            explanation: 'Vocabulary in context: "Discerning" refers to having good judgment and critical evaluation skills.',
          },
          {
            questionId: 's1_diag3',
            questionPrompt: '3. What does an active reader do when encountering messages in the digital world?',
            correctAnswer: 'C. Asks questions and looks for supporting evidence',
            explanation: 'Inferential comprehension: Active readers do not blindly accept statements; they examine claims and look for evidence.',
          },
          {
            questionId: 's1_diag4',
            questionPrompt: '4. What is the central message or theme of the passage?',
            correctAnswer: 'C. Reading builds critical thinking and connects us with ideas through practice',
            explanation: 'Main idea / Theme: The passage emphasizes continuous practice to become discerning, critical thinkers.',
          },
        ],
      },
      {
        activityId: 's1-act3',
        activityNumber: 'Activity 3',
        title: 'My ARAL Reading Commitment & Goal Checklist',
        type: 'checklist',
        totalPoints: 3,
        scoringGuideline: 'Checklist completion and personal commitment statement.',
        items: [
          {
            questionId: 's1_chk5',
            questionPrompt: 'Personal Commitment Statement: Write one personal promise to yourself as an ARAL reader:',
            exemplarAnswer: 'I promise to read actively for at least 15 minutes each day and never give up when encountering difficult words.',
            keyConcepts: ['promise', 'read', 'daily', 'practice', 'learn', 'improve', 'words'],
            rubricCriteria: ['Expresses positive dedication and commitment'],
          },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 2
  // ==========================================
  {
    sessionId: 2,
    sessionTitle: 'Context Clues, Literal, and Implied Meaning of Words',
    competency: 'Distinguish between literal and implied meanings using context clues',
    activities: [
      {
        activityId: 's2-act1',
        activityNumber: 'Activity 1',
        title: 'Predict-Read-Confirm: The Cleverness of Sang Kancil',
        type: 'qa',
        totalPoints: 5,
        scoringGuideline: 'Direct comprehension based on text details from Sang Kancil.',
        items: [
          {
            questionId: 'q1',
            questionPrompt: '1. Who is Sang Kancil, and where does he live?',
            exemplarAnswer: 'Sang Kancil is a small mouse deer who lives in the forest, famous for his intelligence and quick thinking.',
            keyConcepts: ['mouse deer', 'deer', 'forest', 'small', 'intelligent', 'clever'],
            rubricCriteria: ['Mentions mouse deer', 'Mentions forest habitat'],
          },
          {
            questionId: 'q2',
            questionPrompt: '2. What problem does Sang Kancil face at the beginning of the story?',
            exemplarAnswer: 'He is extremely hungry and sees ripe fruit across a wide river, but the river is filled with dangerous crocodiles.',
            keyConcepts: ['hungry', 'river', 'crocodiles', 'fruit', 'cross', 'dangerous'],
            rubricCriteria: ['States hunger / desire for fruit across river', 'Mentions crocodiles blocking the river'],
          },
          {
            questionId: 'q3',
            questionPrompt: '3. Why can Sang Kancil not cross the river safely?',
            exemplarAnswer: 'He cannot swim across safely because the dangerous crocodiles might attack or eat him.',
            keyConcepts: ['crocodiles', 'dangerous', 'swim', 'eat', 'attack', 'safely'],
            rubricCriteria: ['Identifies threat posed by river crocodiles'],
          },
          {
            questionId: 'q4',
            questionPrompt: '4. What does Sang Kancil tell the crocodiles?',
            exemplarAnswer: 'He tells them that the king of the forest ordered him to count all the crocodiles to see how many can protect the forest.',
            keyConcepts: ['king', 'count', 'order', 'protect', 'forest', 'royal'],
            rubricCriteria: ['Mentions the king’s fake royal order to count them'],
          },
          {
            questionId: 'q5',
            questionPrompt: '5. How do the crocodiles help Sang Kancil cross the river?',
            exemplarAnswer: 'They line up across the river to form a bridge so he can jump on their backs while pretending to count them.',
            keyConcepts: ['line up', 'bridge', 'jump', 'back', 'count', 'across'],
            rubricCriteria: ['Explains they lined up across the river forming a bridge'],
          },
        ],
      },
      {
        activityId: 's2-act2',
        activityNumber: 'Activity 2',
        title: 'Word Detective Chart',
        type: 'table_qa',
        totalPoints: 4,
        scoringGuideline: 'Context clue definitions in student’s own words.',
        items: [
          {
            questionId: 'row1_meaning',
            questionPrompt: 'Meaning of Clever (Clue: intelligence, creativity)',
            correctAnswer: 'Smart, quick-witted, intelligent, or creative',
            exemplarAnswer: 'Having or showing quick intelligence and creative problem solving.',
            keyConcepts: ['smart', 'intelligent', 'brain', 'creative', 'quick-witted', 'thinking'],
          },
          {
            questionId: 'row2_meaning',
            questionPrompt: 'Meaning of Power (Clue: stronger animals relied on power)',
            correctAnswer: 'Physical strength, force, or authority',
            exemplarAnswer: 'Physical strength or force used by larger animals.',
            keyConcepts: ['strength', 'force', 'might', 'strong', 'physical'],
          },
          {
            questionId: 'row3_meaning',
            questionPrompt: 'Meaning of Dangerous (Clue: river home to dangerous crocodiles)',
            correctAnswer: 'Unsafe, harmful, perilous, or risky',
            exemplarAnswer: 'Likely to cause harm, injury, or death; not safe.',
            keyConcepts: ['unsafe', 'harmful', 'deadly', 'hazard', 'risk', 'hurt'],
          },
          {
            questionId: 'row4_meaning',
            questionPrompt: 'Meaning of Eagerly (Clue: feeling honored, agreed to help)',
            correctAnswer: 'Excitedly, enthusiastically, willingly',
            exemplarAnswer: 'With great excitement, interest, or willing enthusiasm.',
            keyConcepts: ['excitedly', 'willingly', 'enthusiasm', 'readily', 'happily'],
          },
        ],
      },
      {
        activityId: 's2-act3',
        activityNumber: 'Activity 3',
        title: 'Context Clue Check',
        type: 'mcq',
        totalPoints: 3,
        scoringGuideline: 'Objective 1 point each.',
        items: [
          {
            questionId: 'mcq1',
            questionPrompt: '1. Meaning of eagerly',
            correctAnswer: 'excitedly',
            explanation: '"Eagerly" indicates enthusiasm and excitement.',
          },
          {
            questionId: 'mcq2',
            questionPrompt: '2. Meaning of paused',
            correctAnswer: 'stopped briefly',
            explanation: '"Paused" means halting temporarily before acting.',
          },
          {
            questionId: 'mcq3',
            questionPrompt: '3. Meaning of honored',
            correctAnswer: 'proud',
            explanation: '"Honored" means feeling respected, privileged, or proud.',
          },
        ],
      },
      {
        activityId: 's2-act4',
        activityNumber: 'Activity 4',
        title: 'Literal or Implied?',
        type: 'literal_implied',
        totalPoints: 4,
        scoringGuideline: 'Literal (L) vs Implied (I) classification.',
        items: [
          {
            questionId: 'li1',
            questionPrompt: '1. Sang Kancil crossed the river using the crocodiles.',
            correctAnswer: 'L',
            explanation: 'Literal: Directly describes the physical event.',
          },
          {
            questionId: 'li2',
            questionPrompt: '2. Intelligence can defeat strength.',
            correctAnswer: 'I',
            explanation: 'Implied: A moral insight drawn from the story.',
          },
          {
            questionId: 'li3',
            questionPrompt: '3. The crocodiles felt proud when Sang Kancil talked to them.',
            correctAnswer: 'L',
            explanation: 'Literal: Text states they felt honored.',
          },
          {
            questionId: 'li4',
            questionPrompt: '4. The river was a test of courage.',
            correctAnswer: 'I',
            explanation: 'Implied: Metaphorical interpretation.',
          },
        ],
      },
      {
        activityId: 's2-act5',
        activityNumber: 'Exit Ticket',
        title: 'Think Like Sang Kancil',
        type: 'exit_ticket',
        totalPoints: 3,
        scoringGuideline: 'Application of context clues, literal facts, and implied lessons.',
        items: [
          {
            questionId: 'et1',
            questionPrompt: 'One new word I learned using context clues:',
            exemplarAnswer: 'Eagerly (means excitedly and enthusiastically).',
            keyConcepts: ['eagerly', 'honored', 'paused', 'clever', 'power', 'dangerous'],
          },
          {
            questionId: 'et2',
            questionPrompt: 'One literal statement from the story:',
            exemplarAnswer: 'Sang Kancil is a small mouse deer who crossed the river on crocodiles’ backs.',
            keyConcepts: ['kancil', 'mouse deer', 'river', 'crocodiles', 'fruit', 'forest'],
          },
          {
            questionId: 'et3',
            questionPrompt: 'One implied lesson from the story:',
            exemplarAnswer: 'Being calm and thinking intelligently is more effective than relying on brute force.',
            keyConcepts: ['intelligence', 'brain', 'smart', 'strength', 'power', 'calm', 'clever'],
          },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 3
  // ==========================================
  {
    sessionId: 3,
    sessionTitle: 'Assessing Fluency',
    competency: 'Pacing, decoding unfamiliar words, and self-evaluating oral reading fluency',
    activities: [
      {
        activityId: 's3-act2',
        activityNumber: 'Activity 2',
        title: 'Think – Pair – Share (Reflection)',
        type: 'qa',
        totalPoints: 3,
        scoringGuideline: 'Comprehension of reading speed vs reading clarity.',
        items: [
          {
            questionId: 'tps1',
            questionPrompt: '1. What is the text mostly about?',
            exemplarAnswer: 'The text explains why reading clearly and understanding meaning is much more important than just reading quickly.',
            keyConcepts: ['reading', 'clearly', 'speed', 'understanding', 'pace', 'comprehension'],
          },
          {
            questionId: 'tps2',
            questionPrompt: '2. What is one important idea from the text?',
            exemplarAnswer: 'Good readers adjust their reading pace—slowing down when text is difficult and paying attention to punctuation.',
            keyConcepts: ['pace', 'slow down', 'punctuation', 'context clues', 'understand', 'difficult'],
          },
          {
            questionId: 'tps3',
            questionPrompt: '3. Did any part confuse you at first? What helped?',
            exemplarAnswer: 'Rereading confusing sentences and looking at surrounding clue words helped me understand.',
            keyConcepts: ['reread', 'context', 'clues', 'pace', 'comma', 'period'],
          },
        ],
      },
      {
        activityId: 's3-act3',
        activityNumber: 'Activity 3',
        title: 'Context Clue Challenge',
        type: 'table_qa',
        totalPoints: 3,
        scoringGuideline: 'Identification of difficult words, clues, and meanings.',
        items: [
          {
            questionId: 'w1_word',
            questionPrompt: 'Target Word 1',
            exemplarAnswer: 'adjust (clue: "slow down when difficult", meaning: to change or adapt pace).',
            keyConcepts: ['adjust', 'unfamiliar', 'effective', 'struggle', 'fluent'],
          },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 4
  // ==========================================
  {
    sessionId: 4,
    sessionTitle: 'Word Detective: Roots, Affixes, and Dictionary Skills',
    competency: 'Analyze word structure (prefixes, roots, suffixes) and apply reference skills',
    activities: [
      {
        activityId: 's4-act1',
        activityNumber: 'Activity 1',
        title: 'Root Word & Affix Chart',
        type: 'root_affix',
        totalPoints: 5,
        scoringGuideline: 'Break words down into root, affix, and whole meaning.',
        items: [
          {
            questionId: 'rf_disagree',
            questionPrompt: 'Word: Disagree',
            correctAnswer: 'Root: agree | Affix: dis- (prefix) | Meaning: to not agree or have different opinions',
            keyConcepts: ['agree', 'dis', 'not', 'different'],
          },
          {
            questionId: 'rf_joyful',
            questionPrompt: 'Word: Joyful',
            correctAnswer: 'Root: joy | Affix: -ful (suffix) | Meaning: full of joy or happiness',
            keyConcepts: ['joy', 'ful', 'happy', 'full of'],
          },
          {
            questionId: 'rf_unhappy',
            questionPrompt: 'Word: Unhappy',
            correctAnswer: 'Root: happy | Affix: un- (prefix) | Meaning: not happy or sad',
            keyConcepts: ['happy', 'un', 'not', 'sad'],
          },
          {
            questionId: 'rf_careless',
            questionPrompt: 'Word: Careless',
            correctAnswer: 'Root: care | Affix: -less (suffix) | Meaning: without care or inattentive',
            keyConcepts: ['care', 'less', 'without', 'not careful'],
          },
          {
            questionId: 'rf_replay',
            questionPrompt: 'Word: Replay',
            correctAnswer: 'Root: play | Affix: re- (prefix) | Meaning: to play again',
            keyConcepts: ['play', 're', 'again'],
          },
        ],
      },
      {
        activityId: 's4-act3',
        activityNumber: 'Activity 3',
        title: 'Context Clue MCQ',
        type: 'mcq',
        totalPoints: 5,
        scoringGuideline: '1 point per correct answer.',
        items: [
          {
            questionId: 'c_mcq1',
            questionPrompt: '1. What helped Maria understand the new math topic?',
            correctAnswer: 'B. The explanation was clear and easy to follow',
            explanation: '"Clear" implies easily understood without confusion.',
          },
          {
            questionId: 'c_mcq2',
            questionPrompt: '2. In the sentence, the word observe means:',
            correctAnswer: 'B. To look closely at something',
            explanation: '"Observe" means watching or inspecting carefully.',
          },
          {
            questionId: 'c_mcq3',
            questionPrompt: '3. The word frequent tells us that the school fair happens:',
            correctAnswer: 'C. Many times',
            explanation: '"Frequent" indicates repeated occurrences.',
          },
          {
            questionId: 'c_mcq4',
            questionPrompt: '4. How did the students work independently?',
            correctAnswer: 'C. They worked on their own tasks',
            explanation: '"Independently" means working without relying on others.',
          },
          {
            questionId: 'c_mcq5',
            questionPrompt: '5. In the text, the word process refers to:',
            correctAnswer: 'C. A series of steps',
            explanation: 'A process is an organized progression of steps.',
          },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 6
  // ==========================================
  {
    sessionId: 6,
    sessionTitle: 'Sequencing Events and Chronological Order',
    competency: 'Sequence events chronologically and understand narrative structure',
    activities: [
      {
        activityId: 's6-act1',
        activityNumber: 'Activity 1',
        title: 'Sequencing The Little Match Boy',
        type: 'sequencing',
        totalPoints: 5,
        scoringGuideline: 'Chronological ordering 1 to 5.',
        items: [
          {
            questionId: 'seq_1',
            questionPrompt: 'The boy strikes the first match to warm his freezing hands.',
            correctAnswer: '1',
            explanation: 'First action in the cold street.',
          },
          {
            questionId: 'seq_2',
            questionPrompt: 'In the match’s glow, he envisions a warm crackling iron stove.',
            correctAnswer: '2',
            explanation: 'Second event: the first comforting vision.',
          },
          {
            questionId: 'seq_3',
            questionPrompt: 'He strikes another match and sees a feast with delicious food.',
            correctAnswer: '3',
            explanation: 'Third event: the second vision of nourishment.',
          },
          {
            questionId: 'seq_4',
            questionPrompt: 'He sees his loving grandmother smiling gently at him.',
            correctAnswer: '4',
            explanation: 'Fourth event: the vision of his loving grandmother.',
          },
          {
            questionId: 'seq_5',
            questionPrompt: 'The boy strikes all remaining matches to keep his grandmother near.',
            correctAnswer: '5',
            explanation: 'Fifth event: desperately keeping the warm vision alive.',
          },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 7
  // ==========================================
  {
    sessionId: 7,
    sessionTitle: 'Distinguishing Fact from Opinion using Visuals',
    competency: 'Differentiate factual statements from subjective opinions using photo cues',
    activities: [
      {
        activityId: 's7-act1',
        activityNumber: 'Activity 1',
        title: 'Fact or Opinion: Tokyo Shibuya Crossing',
        type: 'mcq',
        totalPoints: 5,
        scoringGuideline: 'Distinguish verifiable facts from personal subjective opinions.',
        items: [
          {
            questionId: 's7_q1',
            questionPrompt: '1. Pedestrians walk across zebra stripes at the city crossing.',
            correctAnswer: 'Fact',
            explanation: 'Verifiable physical fact observable in the image.',
          },
          {
            questionId: 's7_q2',
            questionPrompt: '2. The crossing is the most exciting place in the entire world.',
            correctAnswer: 'Opinion',
            explanation: 'Subjective feeling / value judgment.',
          },
          {
            questionId: 's7_q3',
            questionPrompt: '3. Digital billboard screens display advertisements on the buildings.',
            correctAnswer: 'Fact',
            explanation: 'Directly observable and verifiable.',
          },
          {
            questionId: 's7_q4',
            questionPrompt: '4. Living in a bustling city is much better than living in the province.',
            correctAnswer: 'Opinion',
            explanation: 'Personal preference / opinion.',
          },
          {
            questionId: 's7_q5',
            questionPrompt: '5. Tall commercial buildings surround the road intersection.',
            correctAnswer: 'Fact',
            explanation: 'Architectural fact verifiable in the photo.',
          },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 8
  // ==========================================
  {
    sessionId: 8,
    sessionTitle: 'Making Inferences and Predictions',
    competency: 'Formulate predictions and construct textual inferences',
    activities: [
      {
        activityId: 's8-act3',
        activityNumber: 'Activity 3',
        title: 'Fill Me In (Word Bank)',
        type: 'fillblank',
        totalPoints: 9,
        scoringGuideline: '1 point per correct cloze insertion.',
        items: [
          { questionId: 'fb1', questionPrompt: 'Della and Jim worked hard, but they still ______ to save money.', correctAnswer: 'struggled' },
          { questionId: 'fb2', questionPrompt: 'Della counted her ______. She had only one dollar and eighty-seven cents.', correctAnswer: 'savings' },
          { questionId: 'fb3', questionPrompt: 'Della had one thing she ______ her long, beautiful hair.', correctAnswer: 'treasured' },
          { questionId: 'fb4', questionPrompt: 'It was one of his most important ______.', correctAnswer: 'possessions' },
          { questionId: 'fb5', questionPrompt: 'Della made a brave ______ to sell her hair.', correctAnswer: 'decision' },
          { questionId: 'fb6', questionPrompt: 'She wanted to buy Jim a ______ present for Christmas.', correctAnswer: 'special' },
          { questionId: 'fb7', questionPrompt: '...a gift she knew he would love and had always ______.', correctAnswer: 'admired' },
          { questionId: 'fb8', questionPrompt: 'When Jim came home and saw Della’s short hair, he was ______.', correctAnswer: 'surprised' },
          { questionId: 'fb9', questionPrompt: 'He looked a little ______ when he told her.', correctAnswer: 'embarrassed' },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 9
  // ==========================================
  {
    sessionId: 9,
    sessionTitle: 'Differentiating Fantasy from Reality',
    competency: 'Distinguish between realistic facts and fantasy elements',
    activities: [
      {
        activityId: 's9-act2',
        activityNumber: 'Activity 2',
        title: 'Categorize Me (Reality vs Fantasy)',
        type: 'categorize',
        totalPoints: 12,
        scoringGuideline: 'Categorize into Reality or Fantasy.',
        items: [
          { questionId: 'cat_Real', questionPrompt: 'Real', correctAnswer: 'Reality' },
          { questionId: 'cat_fact', questionPrompt: 'fact', correctAnswer: 'Reality' },
          { questionId: 'cat_truthful', questionPrompt: 'truthful', correctAnswer: 'Reality' },
          { questionId: 'cat_imaginary', questionPrompt: 'imaginary', correctAnswer: 'Fantasy' },
          { questionId: 'cat_nonfiction', questionPrompt: 'nonfiction', correctAnswer: 'Reality' },
          { questionId: 'cat_magical', questionPrompt: 'magical', correctAnswer: 'Fantasy' },
          { questionId: 'cat_Fictional', questionPrompt: 'Fictional', correctAnswer: 'Fantasy' },
          { questionId: 'cat_Actual', questionPrompt: 'Actual', correctAnswer: 'Reality' },
          { questionId: 'cat_true', questionPrompt: 'true', correctAnswer: 'Reality' },
          { questionId: 'cat_make-believe', questionPrompt: 'make-believe', correctAnswer: 'Fantasy' },
          { questionId: 'cat_monster', questionPrompt: 'monster', correctAnswer: 'Fantasy' },
          { questionId: 'cat_evidenced-based', questionPrompt: 'evidenced-based', correctAnswer: 'Reality' },
        ],
      },
      {
        activityId: 's9-act3',
        activityNumber: 'Activity 3',
        title: 'The Flood in the Barangay',
        type: 'mcq',
        totalPoints: 10,
        scoringGuideline: 'Reality/Fact vs Fantasy/Non-Fact.',
        items: [
          { questionId: 'q_fl1', questionPrompt: '1. Heavy rain caused flooding', correctAnswer: 'a. Reality/Fact' },
          { questionId: 'q_fl2', questionPrompt: '2. Garbage blocking canals', correctAnswer: 'a. Reality/Fact' },
          { questionId: 'q_fl3', questionPrompt: '3. Giant water monster caused flood', correctAnswer: 'b. Fantasy/Non-Fact' },
          { questionId: 'q_fl4', questionPrompt: '4. People helped each other', correctAnswer: 'a. Reality/Fact' },
          { questionId: 'q_fl5', questionPrompt: '5. Cleaning surroundings helps', correctAnswer: 'a. Reality/Fact' },
          { questionId: 'q_fl6', questionPrompt: '6. Flooding happens from too much rain', correctAnswer: 'a. Reality/Fact' },
          { questionId: 'q_fl7', questionPrompt: '7. Children created imaginative story', correctAnswer: 'a. Reality/Fact' },
          { questionId: 'q_fl8', questionPrompt: '8. Monsters control weather in real life', correctAnswer: 'b. Fantasy/Non-Fact' },
          { questionId: 'q_fl9', questionPrompt: '9. Blocked drainage causes water to rise', correctAnswer: 'a. Reality/Fact' },
          { questionId: 'q_fl10', questionPrompt: '10. Real problems have scientific causes', correctAnswer: 'a. Reality/Fact' },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 13
  // ==========================================
  {
    sessionId: 13,
    sessionTitle: 'Propaganda Techniques & Media Literacy',
    competency: 'Analyze propaganda techniques (bandwagon, testimonial, plain folks, name calling, etc.)',
    activities: [
      {
        activityId: 's13-act1',
        activityNumber: 'Activity 1',
        title: 'Buy or Bye? Advertising Claims',
        type: 'buy_or_bye',
        totalPoints: 5,
        scoringGuideline: 'BUY (sound factual claim) vs BYE (misleading propaganda claim).',
        items: [
          {
            questionId: 'bb1',
            questionPrompt: '1. "Join 10 Million Filipinos who switched to BrightSmile! Don’t be left behind!"',
            correctAnswer: 'BYE',
            explanation: 'Classic Bandwagon technique relying on FOMO rather than dental science.',
          },
          {
            questionId: 'bb2',
            questionPrompt: '2. "Tested and approved by the Philippine Dental Association with clinical fluoridation studies."',
            correctAnswer: 'BUY',
            explanation: 'Evidence-based claim supported by accredited clinical authority.',
          },
          {
            questionId: 'bb3',
            questionPrompt: '3. "A gold-medalist runner drinks this energy bottle, so you will win every marathon too!"',
            correctAnswer: 'BYE',
            explanation: 'Faulty Testimonial logic; athletic achievement requires years of training.',
          },
          {
            questionId: 'bb4',
            questionPrompt: '4. "Contains 100% Vitamin C! (Hidden tiny print: 55 grams added refined sugar)."',
            correctAnswer: 'BYE',
            explanation: 'Card Stacking: deliberately conceals adverse nutritional facts.',
          },
          {
            questionId: 'bb5',
            questionPrompt: '5. "Made with locally harvested organic whole grains certified by the Department of Agriculture."',
            correctAnswer: 'BUY',
            explanation: 'Legitimate agricultural certification and verifiable ingredient sourcing.',
          },
        ],
      },
      {
        activityId: 's13-act2',
        activityNumber: 'Activity 2',
        title: 'Propaganda Techniques Matching',
        type: 'matching',
        totalPoints: 5,
        scoringGuideline: 'Match technique in Column A to correct definition in Column B.',
        items: [
          { questionId: 'p_bandwagon', questionPrompt: 'Bandwagon', correctAnswer: 'def_bandwagon', explanation: 'Persuading people to do something because everybody else is doing it.' },
          { questionId: 'p_testimonial', questionPrompt: 'Testimonial', correctAnswer: 'def_testimonial', explanation: 'Using an influential or famous personality to endorse a product.' },
          { questionId: 'p_plainfolks', questionPrompt: 'Plain Folks', correctAnswer: 'def_plainfolks', explanation: 'Portraying someone as an ordinary, humble citizen to relate to the masses.' },
          { questionId: 'p_cardstacking', questionPrompt: 'Card Stacking', correctAnswer: 'def_cardstacking', explanation: 'Emphasizing one positive aspect while deliberately omitting negative facts.' },
          { questionId: 'p_namecalling', questionPrompt: 'Name Calling', correctAnswer: 'def_namecalling', explanation: 'Using derogatory words or labels to create negative prejudice.' },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 14
  // ==========================================
  {
    sessionId: 14,
    sessionTitle: 'Reading & Interpreting Infographics',
    competency: 'Extract statistical data and visual information from infographics',
    activities: [
      {
        activityId: 's14-act1',
        activityNumber: 'Activity 1',
        title: 'Visual Rebus Puzzles: Guess the Province',
        type: 'rebus',
        totalPoints: 3,
        scoringGuideline: 'Correct Philippine province name identified from visual clues.',
        items: [
          {
            questionId: 'reb1',
            questionPrompt: 'Visual Clue 1: Cat + And + Wan-es',
            correctAnswer: 'Catanduanes',
            explanation: 'Cat + And + E-wan = Catanduanes (Island Province in Bicol).',
          },
          {
            questionId: 'reb2',
            questionPrompt: 'Visual Clue 2: Bat + Ang + Gas',
            correctAnswer: 'Batangas',
            explanation: 'Bat (flying mammal) + Ang + Gas = Batangas (Calabarzon).',
          },
          {
            questionId: 'reb3',
            questionPrompt: 'Visual Clue 3: Bull + A + Can',
            correctAnswer: 'Bulacan',
            explanation: 'Bull + A + Can (tin container) = Bulacan (Central Luzon).',
          },
        ],
      },
      {
        activityId: 's14-act3',
        activityNumber: 'Activity 3',
        title: 'Jumbled Letters (Vocabulary)',
        type: 'jumbled_letters',
        totalPoints: 5,
        scoringGuideline: 'Unscramble letters to form target terms.',
        items: [
          { questionId: 'j1', questionPrompt: '1. S-D-I-G-E-O-N-U-I-N', correctAnswer: 'INDIGENOUS', explanation: 'Native to a particular region or culture.' },
          { questionId: 'j2', questionPrompt: '2. T-N-O-I-D-I-A-R-T', correctAnswer: 'TRADITION', explanation: 'Customs and beliefs passed down through generations.' },
          { questionId: 'j3', questionPrompt: '3. H-P-I-C-G-R-A-F-O-N-I', correctAnswer: 'INFOGRAPHIC', explanation: 'Visual representation of data or knowledge.' },
          { questionId: 'j4', questionPrompt: '4. T-U-R-E-L-U-C', correctAnswer: 'CULTURE', explanation: 'The arts, customs, and habits of a group.' },
          { questionId: 'j5', questionPrompt: '5. S-E-R-P-V-E-E-R', correctAnswer: 'PRESERVE', explanation: 'To maintain and protect something in its original state.' },
        ],
      },
    ],
  },
];
