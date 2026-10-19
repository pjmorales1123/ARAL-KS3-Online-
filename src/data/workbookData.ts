import { WorkbookSession, StudentProfile } from '../types/workbook';

export const DEFAULT_STUDENTS: StudentProfile[] = [
  {
    id: 'student-1',
    name: 'Juan Dela Cruz',
    lrn: '109823451201',
    grade: 'Grade 8',
    section: 'Sampaguita',
    avatar: '👨‍🎓',
  },
  {
    id: 'student-2',
    name: 'Maria Clara Santos',
    lrn: '109823451202',
    grade: 'Grade 8',
    section: 'Sampaguita',
    avatar: '👩‍🎓',
  },
  {
    id: 'student-3',
    name: 'Angelo Gabriel Reyes',
    lrn: '109823451203',
    grade: 'Grade 8',
    section: 'Sampaguita',
    avatar: '🧑‍🎓',
  },
  {
    id: 'student-4',
    name: 'Bea Bianca Alcantara',
    lrn: '109823451204',
    grade: 'Grade 8',
    section: 'Sampaguita',
    avatar: '👩‍🏫',
  },
  {
    id: 'student-5',
    name: 'Carlos Miguel Dizon',
    lrn: '109823451205',
    grade: 'Grade 8',
    section: 'Molave',
    avatar: '🙋‍♂️',
  },
  {
    id: 'student-6',
    name: 'Divine Grace Bautista',
    lrn: '109823451206',
    grade: 'Grade 8',
    section: 'Molave',
    avatar: '🙋‍♀️',
  },
];

export const WORKBOOK_SESSIONS: WorkbookSession[] = [
  // ==========================================
  // SESSION 1
  // ==========================================
  {
    id: 1,
    sessionNumber: 1,
    title: 'Orientation, Reading Inventory, and Diagnostic Pre-Assessment',
    pageNumberDisplay: 'Orientation & Diagnostic',
    competency: 'Establish reading baseline, evaluate reading habits, and set Key Stage 3 literacy goals',
    description: 'Welcome to the DepEd ARAL Reading Plus Program. Complete your baseline reading inventory, diagnostic passage, and set personal reading goals.',
    themeColor: 'rose',
    activities: [
      {
        id: 's1-act1',
        activityNumber: 'Activity 1',
        title: 'Learner Reading Inventory & Self-Profile',
        instructions: 'Reflect on your reading habits and experiences. Answer the questions honestly below:',
        type: 'qa',
        questions: [
          {
            id: 's1_q1',
            prompt: '1. What kinds of stories, books, or articles do you enjoy reading the most (and why)?',
            placeholder: 'e.g., Adventure stories, science articles, folktales, comics...',
          },
          {
            id: 's1_q2',
            prompt: '2. What is the biggest challenge you encounter when reading difficult English texts?',
            placeholder: 'e.g., Unfamiliar vocabulary words, reading speed, understanding deep meaning...',
          },
          {
            id: 's1_q3',
            prompt: '3. What specific reading skill do you most want to improve during this ARAL Reading Plus program?',
            placeholder: 'e.g., Finding context clues, reading aloud with confidence, distinguishing facts from opinions...',
          },
        ],
      },
      {
        id: 's1-act2',
        activityNumber: 'Activity 2',
        title: 'Diagnostic Pre-Assessment: The Journey of a Reader',
        instructions: 'Read the diagnostic passage below, then choose the best answer for each question to determine your baseline proficiency.',
        type: 'mcq',
        storyTitle: 'The Journey of a Reader',
        passageParagraphs: [
          'Reading is much more than pronouncing words written on a page. It is a bridge connecting human minds across distance and time. When we read, our brains transform quiet symbols into vibrant pictures, deep emotions, and new ideas.',
          'In today’s fast-paced digital world, people encounter thousands of messages every single day. A skilled reader does not merely accept every statement as truth. Instead, an active reader asks questions: What is the author’s primary message? Is there sufficient evidence to support this claim? Are these words literal, or do they hold a deeper, implied meaning?',
          'Becoming a proficient reader does not happen overnight. It requires consistent practice, patience, and the willingness to explore unfamiliar words. Through the ARAL Reading Plus program, you will develop the tools to become not only a faster reader, but a critical, discerning thinker.',
        ],
        questions: [
          {
            id: 's1_diag1',
            prompt: '1. According to the text, what is reading compared to?',
            options: ['A. A high mountain to climb', 'B. A bridge connecting human minds across distance and time', 'C. A fast-moving train', 'D. A test of speed only'],
            correctAnswer: 'B. A bridge connecting human minds across distance and time',
            explanation: 'The passage explicitly states: "It is a bridge connecting human minds across distance and time."',
          },
          {
            id: 's1_diag2',
            prompt: '2. In the sentence "an active reader asks questions," the word discerning most likely means:',
            options: ['A. Careless and hurried', 'B. Able to judge well and think critically', 'C. Confused and uncertain', 'D. Silent and indifferent'],
            correctAnswer: 'B. Able to judge well and think critically',
            explanation: '"Discerning" means showing good judgment and understanding.',
          },
          {
            id: 's1_diag3',
            prompt: '3. What does an active reader do when encountering messages in the digital world?',
            options: ['A. Accepts everything without questioning', 'B. Reads only the headlines and skips details', 'C. Asks questions and looks for supporting evidence', 'D. Deletes all digital content'],
            correctAnswer: 'C. Asks questions and looks for supporting evidence',
            explanation: 'Active readers ask critical questions about author purpose and evidence.',
          },
          {
            id: 's1_diag4',
            prompt: '4. What is the central message or theme of the passage?',
            options: ['A. Fast reading is the only measure of success', 'B. Reading requires memorizing long word lists', 'C. Reading builds critical thinking and connects us with ideas through practice', 'D. Digital messages have made reading unnecessary'],
            correctAnswer: 'C. Reading builds critical thinking and connects us with ideas through practice',
            explanation: 'The author emphasizes that reading transforms us into critical, discerning thinkers through practice.',
          },
        ],
      },
      {
        id: 's1-act3',
        activityNumber: 'Activity 3',
        title: 'My ARAL Reading Commitment & Goal Checklist',
        instructions: 'Check the reading milestones you pledge to accomplish during this Key Stage 3 Reading Plus workbook:',
        type: 'checklist',
        questions: [
          {
            id: 's1_chk1',
            prompt: 'I will read each passage attentively and use context clues to decode unfamiliar words.',
          },
          {
            id: 's1_chk2',
            prompt: 'I will distinguish between literal statements and implied figurative meanings.',
          },
          {
            id: 's1_chk3',
            prompt: 'I will practice reading aloud with proper phrasing, pacing, and expression.',
          },
          {
            id: 's1_chk4',
            prompt: 'I will critically evaluate information to tell facts from opinions and propaganda.',
          },
          {
            id: 's1_chk5',
            prompt: 'Personal Commitment Statement: Write one personal promise to yourself as an ARAL reader:',
            placeholder: 'My promise as an ARAL Key Stage 3 reader is...',
          },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 2
  // ==========================================
  {
    id: 2,
    sessionNumber: 2,
    title: 'Context Clues, Literal, and Implied Meaning of Words',
    pageNumberDisplay: 'Pages 1 – 3',
    competency: 'Distinguish between literal and implied meanings using context clues',
    description: 'Learn how to deduce unfamiliar words and differentiate explicit facts from implied messages using the folktale of Sang Kancil.',
    themeColor: 'emerald',
    activities: [
      {
        id: 's2-act1',
        activityNumber: 'Activity 1',
        title: 'Predict-Read-Confirm',
        instructions: 'Read the story below then answer the following questions.',
        type: 'qa',
        storyTitle: 'The Cleverness of Sang Kancil',
        passageParagraphs: [
          'Sang Kancil was a small mouse deer who lived in the forest. Despite his size, he was famous among the animals for his intelligence and creativity. While stronger animals relied on power, Sang Kancil survived through clever thinking and quick decisions.',
          'One day, Sang Kancil felt extremely hungry. Across a wide river, he saw trees filled with ripe, delicious fruits. The only problem was that the river was home to many dangerous crocodiles. Sang Kancil knew he could not swim across safely, so he paused to think of a solution.',
          'After a moment, Sang Kancil called out to the crocodiles. He told them that the king of the forest had ordered him to count all the crocodiles in the river. According to Sang Kancil, the king wanted to know how many crocodiles were strong enough to protect the forest. The crocodiles, feeling honored by the task, eagerly agreed to help.',
          'At Sang Kancil’s request, the crocodiles lined up across the river, forming a bridge from one bank to the other. Sang Kancil then began jumping from the back of one crocodile to the next, pretending to count them one by one. When he reached the opposite bank, he quickly ran to safety.',
          'Sang Kancil thanked them for their help before enjoying the fruit he had wanted. Once again, Sang Kancil proved that intelligence can overcome strength and danger.',
        ],
        questions: [
          {
            id: 'q1',
            prompt: '1. Who is Sang Kancil, and where does he live?',
            placeholder: 'Type your answer here...',
          },
          {
            id: 'q2',
            prompt: '2. What problem does Sang Kancil face at the beginning of the story?',
            placeholder: 'Type your answer here...',
          },
          {
            id: 'q3',
            prompt: '3. Why can Sang Kancil not cross the river safely?',
            placeholder: 'Type your answer here...',
          },
          {
            id: 'q4',
            prompt: '4. What does Sang Kancil tell the crocodiles?',
            placeholder: 'Type your answer here...',
          },
          {
            id: 'q5',
            prompt: '5. How do the crocodiles help Sang Kancil cross the river?',
            placeholder: 'Type your answer here...',
          },
        ],
      },
      {
        id: 's2-act2',
        activityNumber: 'Activity 2',
        title: 'Word Detective Chart',
        instructions: 'Read the sentences from the story. Use the context clues in the sentence to understand the given word. Write the meaning in your own words on the last column.',
        type: 'table_qa',
        tableData: {
          headers: ['Word', 'Sentence from the Story', 'Word Meaning in Your Own Words'],
          rows: [
            {
              id: 'row1',
              word: 'Clever',
              sentence: 'Despite his size, he was famous for his intelligence and creativity.',
              fields: [{ key: 'meaning', label: 'Meaning of Clever', placeholder: 'Enter meaning based on clues...' }],
            },
            {
              id: 'row2',
              word: 'Power',
              sentence: 'While stronger animals relied on power, Sang Kancil survived through clever thinking and quick decisions.',
              fields: [{ key: 'meaning', label: 'Meaning of Power', placeholder: 'Enter meaning based on clues...' }],
            },
            {
              id: 'row3',
              word: 'dangerous',
              sentence: 'The only problem was that the river was home to many dangerous crocodiles.',
              fields: [{ key: 'meaning', label: 'Meaning of dangerous', placeholder: 'Enter meaning based on clues...' }],
            },
            {
              id: 'row4',
              word: 'Eagerly',
              sentence: 'The crocodiles, feeling honored by the task, eagerly agreed to help.',
              fields: [{ key: 'meaning', label: 'Meaning of Eagerly', placeholder: 'Enter meaning based on clues...' }],
            },
          ],
        },
      },
      {
        id: 's2-act3',
        activityNumber: 'Activity 3',
        title: 'Context Clue Check',
        instructions: 'Read each sentence. Choose the correct meaning of the underlined word.',
        type: 'mcq',
        questions: [
          {
            id: 'mcq1',
            prompt: '1. The crocodiles eagerly lined up across the river, believing that the king had chosen them for an important task.',
            word: 'eagerly',
            options: ['angrily', 'unwillingly', 'excitedly', 'carefully'],
            correctAnswer: 'excitedly',
            explanation: '"Eagerly" means doing something with great enthusiasm, excitement, or keen interest.',
          },
          {
            id: 'mcq2',
            prompt: '2. Sang Kancil paused for a moment, knowing that jumping into the river would be dangerous.',
            word: 'paused',
            options: ['ran fast', 'jumped suddenly', 'stopped briefly', 'shouted loudly'],
            correctAnswer: 'stopped briefly',
            explanation: '"Paused" means taking a temporary stop or resting briefly before continuing.',
          },
          {
            id: 'mcq3',
            prompt: '3. The crocodiles felt honored by the task, believing they were chosen to protect the forest.',
            word: 'honored',
            options: ['scared', 'proud', 'confused', 'disgusted'],
            correctAnswer: 'proud',
            explanation: '"Honored" means feeling privileged, respected, or proud to be entrusted with an important mission.',
          },
        ],
      },
      {
        id: 's2-act4',
        activityNumber: 'Activity 4',
        title: 'Literal or Implied?',
        instructions: 'Tap L if the statement is literal (means exactly what it says) or I if it is implied (suggests a deeper meaning).',
        type: 'literal_implied',
        questions: [
          {
            id: 'li1',
            prompt: '1. Sang Kancil crossed the river using the crocodiles.',
            correctAnswer: 'L',
            explanation: 'Literal: It describes exactly what took place physically in the story.',
          },
          {
            id: 'li2',
            prompt: '2. Intelligence can defeat strength.',
            correctAnswer: 'I',
            explanation: 'Implied: A deeper moral lesson drawn from the mouse deer outsmarting stronger crocodiles.',
          },
          {
            id: 'li3',
            prompt: '3. The crocodiles felt proud when Sang Kancil talked to them.',
            correctAnswer: 'L',
            explanation: 'Literal: The text states they felt honored and proud when spoken to about the royal task.',
          },
          {
            id: 'li4',
            prompt: '4. The river was a test of courage.',
            correctAnswer: 'I',
            explanation: 'Implied: It symbolizes a metaphoric trial rather than a literal written exam.',
          },
        ],
      },
      {
        id: 's2-act5',
        activityNumber: 'Exit Ticket',
        title: 'Think Like Sang Kancil',
        instructions: 'Go back to the story, The Cleverness of Sang Kancil. Complete the sentences below with your answers:',
        type: 'exit_ticket',
        questions: [
          {
            id: 'et1',
            prompt: 'One new word I learned using context clues:',
            placeholder: 'e.g., eagerly, honored, paused...',
          },
          {
            id: 'et2',
            prompt: 'One literal statement from the story:',
            placeholder: 'e.g., Sang Kancil is a small mouse deer...',
          },
          {
            id: 'et3',
            prompt: 'One implied lesson from the story:',
            placeholder: 'e.g., Being clever and calm is more powerful than raw strength...',
          },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 3
  // ==========================================
  {
    id: 3,
    sessionNumber: 3,
    title: 'Assessing Fluency',
    pageNumberDisplay: 'Pages 4 – 7',
    competency: 'Pacing, decoding unfamiliar words, and self-evaluating oral reading fluency',
    description: 'Understand why reading clearly matters, monitor your reading speed, and evaluate your own fluency using an interactive checklist.',
    themeColor: 'blue',
    activities: [
      {
        id: 's3-act1',
        activityNumber: 'Activity 1',
        title: 'Silent Reading',
        instructions: 'Read the text silently. Use the built-in reading timer to practice your pace.',
        type: 'reading_timed',
        storyTitle: 'Why Reading Clearly Matters',
        passageParagraphs: [
          'Reading is an important skill that students use every day in school. It helps them understand lessons in different subjects such as English, Science, and Social Studies. However, reading is not only about finishing a text quickly. It is also about understanding the ideas and information in the text.',
          'Some students believe that fast reading is always better. They try to finish reading tasks as quickly as possible. While speed can be useful, reading too fast may cause readers to miss important details. When this happens, students may struggle to answer questions or explain what they have read.',
          'Good readers know how to adjust their reading pace. They slow down when the text becomes difficult and reread sentences that are confusing. They also pay attention to punctuation, such as commas and periods, which help them understand the meaning of sentences. Reading clearly allows readers to focus on the message of the text.',
          'Another important part of clear reading is understanding unfamiliar words. Skilled readers use context clues, or the words around an unfamiliar word, to figure out its meaning. This strategy helps readers build their vocabulary without stopping too often.',
          'In conclusion, clear reading helps students understand information better. By reading at the right speed, rereading when necessary, and using context clues, learners can become more confident and effective readers.',
        ],
      },
      {
        id: 's3-act2',
        activityNumber: 'Activity 2',
        title: 'Think – Pair – Share (Reflection)',
        instructions: 'Write your answers to the following questions below. You can also share your answers with your partner or class.',
        type: 'qa',
        questions: [
          {
            id: 'tps1',
            prompt: '1. What is the text mostly about?',
            placeholder: 'Explain what the passage emphasizes about reading...',
          },
          {
            id: 'tps2',
            prompt: '2. What is one important idea from the text?',
            placeholder: 'Write one key takeaway...',
          },
          {
            id: 'tps3',
            prompt: '3. Did any part confuse you at first? What helped?',
            placeholder: 'Share your personal reading experience...',
          },
        ],
      },
      {
        id: 's3-act3',
        activityNumber: 'Activity 3',
        title: 'Context Clue Challenge',
        instructions: 'Go back to the text in Activity 1. Choose 3 difficult words. For each word, use context clues to figure out its meaning. Write the clue words and the meaning in the boxes.',
        type: 'table_qa',
        tableData: {
          headers: ['Word', 'Clues from Text', 'Meaning'],
          rows: [
            {
              id: 'w1',
              fields: [
                { key: 'word', label: 'Word 1', placeholder: 'e.g. adjust' },
                { key: 'clue', label: 'Clues', placeholder: 'e.g. slow down when text becomes difficult' },
                { key: 'meaning', label: 'Meaning', placeholder: 'e.g. change or adapt' },
              ],
            },
            {
              id: 'w2',
              fields: [
                { key: 'word', label: 'Word 2', placeholder: 'e.g. effective' },
                { key: 'clue', label: 'Clues', placeholder: 'e.g. understand information better' },
                { key: 'meaning', label: 'Meaning', placeholder: 'e.g. successful at producing a result' },
              ],
            },
            {
              id: 'w3',
              fields: [
                { key: 'word', label: 'Word 3', placeholder: 'e.g. strategy' },
                { key: 'clue', label: 'Clues', placeholder: 'e.g. build vocabulary without stopping' },
                { key: 'meaning', label: 'Meaning', placeholder: 'e.g. a helpful plan or method' },
              ],
            },
          ],
        },
      },
      {
        id: 's3-act4',
        activityNumber: 'Activity 4',
        title: 'Context Clue Check',
        instructions: 'Use context clues to identify the meaning of the underlined word. Put a check mark on the box to choose the correct meaning of the underlined word.',
        type: 'mcq',
        questions: [
          {
            id: 'f_mcq1',
            prompt: '1. Fluent readers can read smoothly, without long pauses. What does smoothly mean in this sentence?',
            word: 'smoothly',
            options: ['slowly', 'with difficulty', 'with ease', 'loudly'],
            correctAnswer: 'with ease',
            explanation: '"Smoothly" indicates flowing continuously and effortlessly with ease.',
          },
          {
            id: 'f_mcq2',
            prompt: '2. Poor fluency can make reading feel tiring.',
            word: 'tiring',
            options: ['exciting', 'making you feel tired', 'confusing', 'short'],
            correctAnswer: 'making you feel tired',
            explanation: '"Tiring" means causing fatigue or draining energy.',
          },
          {
            id: 'f_mcq3',
            prompt: '3. Fluent readers focus on meaning instead of decoding.',
            word: 'decoding',
            options: ['writing ideas', 'figuring out words', 'memorizing text', 'skipping lines'],
            correctAnswer: 'figuring out words',
            explanation: '"Decoding" in reading refers to sounding out and identifying individual letters and words.',
          },
        ],
      },
      {
        id: 's3-act5',
        activityNumber: 'Activity 5',
        title: 'Read the Passage',
        instructions: 'Read the passage aloud on your phone or silently to prepare for the self-assessment.',
        type: 'reading_timed',
        storyTitle: 'Why Reading Fluency Matters',
        passageParagraphs: [
          'Reading fluency is the ability to read smoothly, accurately, and with proper expression. Fluent readers do not stop often to sound out words. Instead, they recognize words quickly, which helps them understand the text better.',
          'When students read fluently, their minds can focus on meaning instead of decoding. This allows them to learn new information, follow instructions, and enjoy reading more. Poor fluency, on the other hand, can slow down understanding and make reading feel tiring.',
          'Practicing reading every day helps improve fluency. Reading aloud, repeating short passages, and paying attention to punctuation are simple ways to become a stronger reader. Over time, fluent reading builds confidence and helps students succeed in all subject areas.',
        ],
      },
      {
        id: 's3-act6',
        activityNumber: 'Activity 6',
        title: 'Self-Assessment for Reading Fluency',
        instructions: 'Read the text on your own again. This time, try to improve speed and expression. Lastly, reflect on your reading using the checklist. Tap each statement that is true for you.',
        type: 'checklist',
        questions: [
          { id: 'c1', prompt: 'I read most words correctly.' },
          { id: 'c2', prompt: 'I did not stop too often while reading.' },
          { id: 'c3', prompt: 'My voice sounded clear and smooth.' },
          { id: 'c4', prompt: 'I respected punctuation (pauses, periods).' },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 4
  // ==========================================
  {
    id: 4,
    sessionNumber: 4,
    title: 'Understanding Meaning through Structural Analysis and Use of General References',
    pageNumberDisplay: 'Pages 8 – 11',
    competency: 'Word building, root words, prefixes/suffixes, and dictionary guide words',
    description: 'Deconstruct words into roots and affixes, anagram letters from "SANG KANCIL", and master dictionary lookup skills.',
    themeColor: 'amber',
    activities: [
      {
        id: 's4-act1',
        activityNumber: 'Activity 1',
        title: 'Word Detective Challenge',
        instructions: 'Use the letters from SANG KANCIL to form as many words as you can. Remember This! You may not add new letters. Tap or type as many words as you can.',
        type: 'anagram',
        customConfig: {
          sourceLetters: ['S', 'A', 'N', 'G', 'K', 'A', 'N', 'C', 'I', 'L'],
          minimumLength: 2,
        },
      },
      {
        id: 's4-act2',
        activityNumber: 'Activity 2',
        title: 'Read, Mark, and Guess',
        instructions: 'Read the passage. Write down the unfamiliar words you find. Look for clues in the sentences or passage. Write down the clues that helped you understand each word. Write the meaning of each unfamiliar word based on the clues.',
        type: 'table_qa',
        storyTitle: 'The School Fair Eco-Booth',
        passageParagraphs: [
          'During the school fair, a group of students planned an eco-friendly booth. They were resourceful, using old boxes and bottles to decorate. Together, they worked to construct a display that explained how recycling works. Because the fair happens every month, students are frequent participants. Each group member worked independently on their task, but they followed the same process to finish on time.',
        ],
        tableData: {
          headers: ['Word', 'Clue from the Sentence', 'Meaning based on Guess'],
          rows: [
            {
              id: 'row1',
              word: 'resourceful',
              fields: [
                { key: 'clue', label: 'Clue', placeholder: 'using old boxes and bottles to decorate' },
                { key: 'meaning', label: 'Meaning based on Guess', placeholder: 'able to solve problems creatively with available items' },
              ],
            },
            {
              id: 'row2',
              word: 'construct',
              fields: [
                { key: 'clue', label: 'Clue', placeholder: 'worked to construct a display' },
                { key: 'meaning', label: 'Meaning based on Guess', placeholder: 'to build or assemble something' },
              ],
            },
            {
              id: 'row3',
              word: 'frequent',
              fields: [
                { key: 'clue', label: 'Clue', placeholder: 'fair happens every month' },
                { key: 'meaning', label: 'Meaning based on Guess', placeholder: 'happening often or repeatedly' },
              ],
            },
            {
              id: 'row4',
              word: 'independently',
              fields: [
                { key: 'clue', label: 'Clue', placeholder: 'on their own task' },
                { key: 'meaning', label: 'Meaning based on Guess', placeholder: 'working alone without constant supervision' },
              ],
            },
          ],
        },
      },
      {
        id: 's4-act3',
        activityNumber: 'Activity 3',
        title: 'Read and Get the Meaning (Root Word & Affix)',
        instructions: 'Choose three words from the text. Write each word in the Word column. Break the word into parts by writing the root word and affix (prefix or suffix). Use the meanings of the word parts to find the meaning of the whole word.',
        type: 'root_affix',
        passageParagraphs: [
          'During the group project, Marco became disorganized when he forgot his notes. He tried to rebuild the plan with his teammates. At first, the task seemed hopeless, but they stayed focused and worked together. Their cooperation helped them finish the project on time.',
        ],
        tableData: {
          headers: ['Word', 'Root Word', 'Affix (Prefix/Suffix)', 'Meaning of Whole Word'],
          rows: [
            {
              id: 'ra1',
              word: 'disorganized',
              fields: [
                { key: 'root', label: 'Root Word', placeholder: 'organize' },
                { key: 'affix', label: 'Affix', placeholder: 'dis- (prefix) / -ed (suffix)' },
                { key: 'meaning', label: 'Meaning', placeholder: 'not organized; messy or confused' },
              ],
            },
            {
              id: 'ra2',
              word: 'rebuild',
              fields: [
                { key: 'root', label: 'Root Word', placeholder: 'build' },
                { key: 'affix', label: 'Affix', placeholder: 're- (prefix)' },
                { key: 'meaning', label: 'Meaning', placeholder: 'to build or reconstruct again' },
              ],
            },
            {
              id: 'ra3',
              word: 'hopeless',
              fields: [
                { key: 'root', label: 'Root Word', placeholder: 'hope' },
                { key: 'affix', label: 'Affix', placeholder: '-less (suffix)' },
                { key: 'meaning', label: 'Meaning', placeholder: 'without hope or having little chance of success' },
              ],
            },
            {
              id: 'ra4',
              word: 'cooperation',
              fields: [
                { key: 'root', label: 'Root Word', placeholder: 'operate' },
                { key: 'affix', label: 'Affix', placeholder: 'co- (prefix) / -tion (suffix)' },
                { key: 'meaning', label: 'Meaning', placeholder: 'working together collaboratively' },
              ],
            },
          ],
        },
      },
      {
        id: 's4-act4',
        activityNumber: 'Activity 4',
        title: 'Dictionary Dash',
        instructions: 'Use a digital dictionary or reference to complete the chart with definition and guide words.',
        type: 'dictionary',
        tableData: {
          headers: ['Word', 'Meaning', 'Guide Words'],
          rows: [
            { id: 'd1', word: 'resourceful', fields: [{ key: 'meaning', label: 'Meaning', placeholder: 'Having ability to find clever ways...' }, { key: 'guideWords', label: 'Guide Words', placeholder: 'e.g., reserve – respect' }] },
            { id: 'd2', word: 'construct', fields: [{ key: 'meaning', label: 'Meaning', placeholder: 'To build, make, or form...' }, { key: 'guideWords', label: 'Guide Words', placeholder: 'e.g., constant – contain' }] },
            { id: 'd3', word: 'frequent', fields: [{ key: 'meaning', label: 'Meaning', placeholder: 'Occurring often...' }, { key: 'guideWords', label: 'Guide Words', placeholder: 'e.g., freedom – frog' }] },
            { id: 'd4', word: 'independent', fields: [{ key: 'meaning', label: 'Meaning', placeholder: 'Free from outside control...' }, { key: 'guideWords', label: 'Guide Words', placeholder: 'e.g., include – index' }] },
            { id: 'd5', word: 'process', fields: [{ key: 'meaning', label: 'Meaning', placeholder: 'A series of actions or steps...' }, { key: 'guideWords', label: 'Guide Words', placeholder: 'e.g., pride – project' }] },
            { id: 'd6', word: 'observe', fields: [{ key: 'meaning', label: 'Meaning', placeholder: 'To notice or watch carefully...' }, { key: 'guideWords', label: 'Guide Words', placeholder: 'e.g., oasis – obvious' }] },
            { id: 'd7', word: 'responsibility', fields: [{ key: 'meaning', label: 'Meaning', placeholder: 'The state or fact of having a duty...' }, { key: 'guideWords', label: 'Guide Words', placeholder: 'e.g., rescue – restart' }] },
          ],
        },
      },
      {
        id: 's4-act5',
        activityNumber: 'Activity 5',
        title: 'Comprehension Check',
        instructions: 'Read the passage carefully in your Activity Sheet. Then, answer the questions that follow by choosing the correct answer.',
        type: 'mcq',
        questions: [
          {
            id: 'c_mcq1',
            prompt: '1. What does the word resourceful most nearly mean in the story?',
            options: ['A. Having many materials', 'B. Able to find smart solutions', 'C. Working alone', 'D. Doing tasks'],
            correctAnswer: 'B. Able to find smart solutions',
            explanation: 'Resourceful means finding smart ways to overcome difficulties with available items.',
          },
          {
            id: 'c_mcq2',
            prompt: '2. What did the students construct?',
            options: ['A. A rule', 'B. A process', 'C. A display', 'D. A problem'],
            correctAnswer: 'C. A display',
            explanation: 'The passage explicitly says they worked to construct a display that explained recycling.',
          },
          {
            id: 'c_mcq3',
            prompt: '3. The word frequent tells us that the school fair happens:',
            options: ['A. Only once', 'B. Every few years', 'C. Many times', 'D. At night'],
            correctAnswer: 'C. Many times',
            explanation: 'Frequent means happening repeatedly or many times.',
          },
          {
            id: 'c_mcq4',
            prompt: '4. How did the students work independently?',
            options: ['A. They copied each other’s answers', 'B. They waited for help', 'C. They worked on their own tasks', 'D. They argued with each other'],
            correctAnswer: 'C. They worked on their own tasks',
            explanation: 'Each group member worked on their own individual task.',
          },
          {
            id: 'c_mcq5',
            prompt: '5. In the text, the word process refers to:',
            options: ['A. A mistake', 'B. A finished product', 'C. A series of steps', 'D. A decoration'],
            correctAnswer: 'C. A series of steps',
            explanation: 'A process is an organized series of actions or steps.',
          },
        ],
      },
      {
        id: 's4-act6',
        activityNumber: 'Reflection',
        title: 'Word Power Reflection',
        instructions: 'Answer the questions below to reflect on your learning:',
        type: 'qa',
        questions: [
          {
            id: 'ref1',
            prompt: '1. Which activity helped you understand words the most?',
            placeholder: 'Share which activity worked best for you...',
          },
          {
            id: 'ref2',
            prompt: '2. How can knowing word parts help you in other subjects, like Science or Math?',
            placeholder: 'e.g., Scientific terms often have Greek or Latin roots and affixes...',
          },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 5
  // ==========================================
  {
    id: 5,
    sessionNumber: 5,
    title: 'Reading with Proper Pacing, Expression, and Non-Verbal Cues',
    pageNumberDisplay: 'Pages 12 – 17',
    competency: 'Expressive delivery, pacing adjustments, and echo reading interpretation',
    description: 'Listen to and deliver lines with feeling, practice echo reading with "The Honest Woodcutter", and evaluate pacing and non-verbal cues.',
    themeColor: 'purple',
    activities: [
      {
        id: 's5-act1',
        activityNumber: 'Activity 1',
        title: '“Say It with Feeling!”',
        instructions: 'Compare the line “I can’t believe it!” delivered flatly versus with expressive tone and emotion. Then answer the questions below.',
        type: 'qa',
        audioScript: {
          withoutExpression: 'I can’t believe it. (monotone, flat, robotic)',
          withExpression: 'I can’t believe it! (gasping with wide eyes, amazed and joyful!)',
        },
        questions: [
          {
            id: 's5q1',
            prompt: '• Which version sounded more interesting?',
            placeholder: 'State whether the flat or expressive version caught your attention and why...',
          },
          {
            id: 's5q2',
            prompt: '• How did the gestures or expressions help you understand the sentence? Write your answer:',
            placeholder: 'Explain how facial cues and vocal inflection transmit emotional meaning...',
          },
        ],
      },
      {
        id: 's5-act2',
        activityNumber: 'Activity 2',
        title: '“What Do You Already Know?”',
        instructions: 'Write your answers discussing reading fluency, pacing, and non-verbal cues:',
        type: 'qa',
        questions: [
          {
            id: 'know1',
            prompt: '1. Reading fluency:',
            placeholder: 'Define what reading fluency means to you...',
          },
          {
            id: 'know2',
            prompt: '2. Effect of reading too fast/slow:',
            placeholder: 'What happens when someone rushes or reads too slowly?',
          },
          {
            id: 'know3',
            prompt: '3. Non-verbal cues:',
            placeholder: 'What are non-verbal cues (gestures, posture, eye contact)?',
          },
        ],
      },
      {
        id: 's5-act3',
        activityNumber: 'Activity 3 & 4',
        title: '“Let’s Talk About It!”',
        instructions: 'After reading or practicing with your classmates, answer the reflection questions:',
        type: 'qa',
        questions: [
          {
            id: 'act4_q1',
            prompt: '1. What emotions did you hear in your group’s reading?',
            placeholder: 'e.g., excitement, grief, astonishment...',
          },
          {
            id: 'act4_q2',
            prompt: '2. Which facial expressions or gestures helped show these emotions?',
            placeholder: 'Describe raised eyebrows, hands on chest, smiles...',
          },
          {
            id: 'act4_q3',
            prompt: '3. What did you notice about your pacing and expression when you read punctuation marks?',
            placeholder: 'How did periods, exclamation points, and commas change your tempo?',
          },
          {
            id: 'act4_q4',
            prompt: '4. How did the pacing affect the meaning of the passage?',
            placeholder: 'Explain how speeding up or slowing down highlighted tension...',
          },
        ],
      },
      {
        id: 's5-act5',
        activityNumber: 'Activity 5',
        title: 'Fluency Practice and Echo Reading',
        instructions: 'Read along with "The Honest Woodcutter". Practice repeating with proper pacing and expression, then write your reflection below.',
        type: 'qa',
        storyTitle: 'The Honest Woodcutter',
        passageParagraphs: [
          'There once lived a poor woodcutter who earned his living by chopping wood in the forest. Every day, he worked hard to make just enough money to feed his family. Though he was poor, the woodcutter was known for being honest and kind.',
          'One afternoon, while chopping trees near a river, the woodcutter’s axe slipped from his hands and fell into the deep water. Shocked and worried, he sat beside the river and began to cry.',
          '“How will I earn money now without my axe?” he said sadly.',
          'Hearing his cries, a fairy appeared from the river and asked him what was wrong. The woodcutter explained what had happened and honestly said that he had lost his only axe.',
          'The fairy decided to help him. She went into the river and came back holding a golden axe. “Is this your axe?” she asked. The woodcutter shook his head. “No, that is not my axe,” he answered.',
          'The fairy went back into the river and returned with a silver axe. “Is this yours?” she asked again. “No,” said the woodcutter. “My axe is made of iron.”',
          'Finally, the fairy brought out the iron axe. The woodcutter smiled with relief. “Yes! That is my axe,” he said. The fairy was pleased with the woodcutter’s honesty. As a reward, she gave him all three axes—the gold, the silver, and the iron ones.',
          '“Your honesty has been rewarded,” the fairy said before disappearing. The woodcutter returned home happily and used his reward wisely. Moral of the story: Honesty is always rewarded.',
        ],
        questions: [
          {
            id: 'echo_ref',
            prompt: 'How did echo reading help you improve your reading?',
            placeholder: 'Reflect on how listening and echoing improved your rhythm and confidence...',
          },
        ],
      },
      {
        id: 's5-act6',
        activityNumber: 'Activity 6',
        title: '“Show What You Can Do!”',
        instructions: 'Deliver your favorite line from The Honest Woodcutter. Then complete the self-assessment checklist.',
        type: 'checklist',
        questions: [
          { id: 'sa1', prompt: 'I read clearly.' },
          { id: 'sa2', prompt: 'I maintained proper pacing.' },
          { id: 'sa3', prompt: 'I used facial expressions.' },
          { id: 'sa4', prompt: 'I used gestures.' },
          { id: 'sa5', prompt: 'I understood the meaning of the text.' },
          {
            id: 'sa_open',
            prompt: 'Reflection Question: What will you improve the next time you read aloud?',
            placeholder: 'Type your planned improvement...',
          },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 6
  // ==========================================
  {
    id: 6,
    sessionNumber: 6,
    title: 'Story Elements, Identifying Plot Type, Sequencing of Events',
    pageNumberDisplay: 'Pages 18 – 25',
    competency: 'Analyze plot architecture, identify narrative conflict, and sequence chronological events',
    description: 'Deconstruct O. Henry’s classic "The Gift of the Magi", classify plot structures, and sequence the dramatic journey of "The Little Match Boy".',
    themeColor: 'rose',
    activities: [
      {
        id: 's6-act1',
        activityNumber: 'Activity 1',
        title: '“What Would You Do?”',
        instructions: 'Think about this: What is your most valuable possession? Imagine that you have something very special, and you have only a little money. Would you sell it to buy a gift for someone you love? Write your answer below.',
        type: 'qa',
        questions: [
          {
            id: 'wwyd1',
            prompt: 'My Answer:',
            placeholder: 'Share your personal thought and reasoning...',
          },
        ],
      },
      {
        id: 's6-act2',
        activityNumber: 'Activity 2',
        title: '“Read to Discover” – The Gift of the Magi',
        instructions: 'Read “The Gift of the Magi” by O. Henry. Identify and write the story elements in the spaces provided.',
        type: 'qa',
        storyTitle: 'The Gift of the Magi',
        storyAuthor: 'O. Henry',
        passageParagraphs: [
          'Della and Jim were a young married couple who cared about each other very much. They did not have much money, and they lived in a small, simple apartment. Even though they worked hard, they still found it difficult to save.',
          'Christmas was coming soon, and Della wanted to buy Jim a nice gift. She counted her money. She had only one dollar and eighty-seven cents. It wasn’t enough to buy anything special, and this made her feel sad.',
          'Della had one thing she loved a lot—her long, beautiful hair. Jim also had something important to him—a gold pocket watch that had been passed down from his father and grandfather.',
          'Because Della loved Jim so much, she made a brave choice. She went to a shop and sold her hair to earn more money. With the money she got, she bought a fine chain for Jim’s watch. She knew he would like it.',
          'When Jim came home and saw that Della’s hair was very short, he did not expect it. He was surprised, but he still cared about her just the same. Jim gave Della her present: a set of beautiful combs she had wanted for a long time. Della was happy with the gift, but also a little sad because she could not use the combs yet.',
          'Then Della gave Jim the watch chain she bought for him. Jim smiled, but he looked a little shy. He told her that he has sold his watch so he could buy the combs for her. Both Della and Jim had given up something special to buy a gift for the other. Even though they could not use the gifts, they had learned something important: Their love for each other was the greatest gift of all.',
        ],
        questions: [
          { id: 'el_chars', prompt: 'Characters:', placeholder: 'Who are the main characters in the story?' },
          { id: 'el_setting', prompt: 'Setting:', placeholder: 'Where and when does the story take place?' },
          { id: 'el_conflict', prompt: 'Conflict:', placeholder: 'What dilemma or struggle do the characters face?' },
          { id: 'el_resolution', prompt: 'Resolution:', placeholder: 'How is the dilemma resolved at the end?' },
        ],
      },
      {
        id: 's6-act3',
        activityNumber: 'Activity 3',
        title: '“What Kind of Story?” (Plot Type)',
        instructions: 'Based on the story you just read, what type of plot does the story have? Select the plot type and explain why.',
        type: 'mcq',
        questions: [
          {
            id: 'plot_type',
            prompt: 'Select the plot type for "The Gift of the Magi":',
            options: [
              'Straight Plot (Beginning to End) - goes in order from start to finish',
              'Flashback Plot - the character remembers something that already happened',
              'Adventure/Journey Plot - goes on a trip/mission to reach a goal',
              'Problem–Solution Plot - there is a problem, and the character tries to solve it',
            ],
            correctAnswer: 'Problem–Solution Plot - there is a problem, and the character tries to solve it',
            explanation: 'Both characters face the problem of having no money for Christmas gifts and take specific actions to solve it.',
          },
          {
            id: 'plot_reason',
            prompt: 'Write your reasoning for this plot classification:',
            placeholder: 'Explain why you chose this plot type based on the text...',
          },
        ],
      },
      {
        id: 's6-act4',
        activityNumber: 'Activity 4 & 5',
        title: '“What Did You Learn?” & “Connect to Me”',
        instructions: 'Answer the comprehension questions and write your personal connection to the story:',
        type: 'qa',
        questions: [
          { id: 'learn_a', prompt: 'a. What do you think the story is really about?', placeholder: 'Explain the deeper meaning...' },
          { id: 'learn_b', prompt: 'b. What important ideas or lessons did you notice?', placeholder: 'Describe lessons about sacrifice and love...' },
          { id: 'learn_c', prompt: 'c. How do Della and Jim show love for each other?', placeholder: 'Explain what each sacrificed...' },
          { id: 'connect_me', prompt: 'My Connection: Write a short paragraph about a time you gave up something important for someone you care about. Compare your experience to Della and Jim.', placeholder: 'Write your story here...' },
        ],
      },
      {
        id: 's6-act6',
        activityNumber: 'Activity 6',
        title: 'Story Master Challenge: “The Little Match Boy”',
        instructions: 'Read the story and complete the story elements, plot type, and interactive sequence of events below.',
        type: 'sequencing',
        storyTitle: 'The Little Match Boy',
        storyAuthor: 'Adapted and expanded from Dean Stanley',
        passageParagraphs: [
          'One very cold evening in the busy streets of Edinburgh, two well-dressed gentlemen stood at the door of a grand hotel, waiting for their carriage. The snow was falling heavily, and the wind howled through the narrow streets.',
          'Just then, a little boy came up to them. His face was pale and blue from the cold. His feet were bare and red, and the only thing covering him was a thin bundle of rags. Despite his misery, he looked at the gentlemen with hope and said softly, “Please, sir, buy some matches?”',
          'The men turned and looked at him. “No, I don’t want any,” replied one of the gentlemen. But the boy did not give up. “They’re only a penny a box, sir,” he pleaded. “Yes, but you see, we don’t want a box,” answered the man again, impatiently. The boy’s voice trembled, but he bravely tried once more. “Then… I’ll give you two boxes for a penny!”',
          'The gentleman sighed. To get rid of him, he said, “All right, give me one box.” He reached into his pocket but realized he had no small coins. “I’ll buy a box from you tomorrow, then,” he said kindly. The boy’s eyes filled with worry. “Oh, please buy them tonight, sir,” he begged. “I’ll run and get you the change—for I’m very hungry.”',
          'The gentleman felt pity for the boy. He reached into his coat and gave him a shiny shilling. “Here, take this,” he said kindly. “I’ll wait here while you get me the change.” The boy’s face brightened. “Thank you, sir! I’ll be quick!” he said, and he ran down the snowy street as fast as his bare feet would let him. The gentleman waited. Minutes passed… then an hour. But the boy never came back.',
          '“I’ve lost my shilling,” the man sighed, though he couldn’t help thinking of the boy’s honest eyes. “Still,” he said to himself, “I can’t believe he would cheat me.” That night, while the gentleman sat by the warm fire in the hotel, he couldn’t stop thinking of the little match boy, out there in the cold.',
          'Just then, a servant entered and said, “Sir, there’s a little boy asking to see you.” When the little visitor entered, the gentleman saw that it was someone smaller—perhaps his younger brother. The child’s clothes were even more torn, and his little hands shook as he searched through his rags.',
          '“Are you the gentleman who bought matches from Sandy?” he asked shyly. “Yes,” replied the man. “Where is he?” The boy pulled out a few coins and said softly, “Here are four pence out of your shilling, sir. Sandy can’t come. He’s very sick. He lost his cap, his matches, and sevenpence of your money. Both his legs are broken, and the doctor says he’ll die soon… and that’s all.”',
          'The gentleman was speechless. His heart ached for the two poor boys who had no one in the world. He fed the little one, whose name was Reuby, and asked to be taken to his brother. The gentleman followed Reuby to a small, dark alley where the two boys lived. Inside a broken-down hut, Sandy lay on a pile of wood shavings, weak and pale.',
          '“I got the change, sir,” he whispered. “I was coming back to you… but a horse knocked me down. Both my legs are broken. Oh, Reuby, my little brother! I’m sure I’m dying. Who will take care of you when I’m gone?” The gentleman knelt beside him and took his cold hand. “Don’t worry, Sandy,” he said softly. “I will take care of Reuby for you—always.” A faint smile spread across the boy’s face. He looked up as if to thank him, then slowly closed his eyes.',
        ],
        customConfig: {
          sequenceItems: [
            { key: 'B', text: 'B. The little boy asked the gentlemen to buy matches.', correctPos: 1 },
            { key: 'C', text: 'C. The gentleman gave the boy a coin to get the change.', correctPos: 2 },
            { key: 'A', text: 'A. Sandy fell while bringing the change and broke his legs.', correctPos: 3 },
            { key: 'D', text: 'D. Reuby came and told the man what happened to Sandy.', correctPos: 4 },
            { key: 'E', text: 'E. Sandy smiled and closed his eyes, resting peacefully.', correctPos: 5 },
          ],
        },
        questions: [
          { id: 'mb_chars', prompt: 'Characters in "The Little Match Boy":', placeholder: 'Sandy, Reuby, the Gentleman...' },
          { id: 'mb_setting', prompt: 'Setting:', placeholder: 'Streets of Edinburgh, cold snowy winter, hotel...' },
          { id: 'mb_conflict', prompt: 'Conflict:', placeholder: 'Sandy wants to return the change honestly despite tragedy...' },
          { id: 'mb_resolution', prompt: 'Resolution:', placeholder: 'The gentleman promises to care for Reuby...' },
          { id: 'mb_plot', prompt: 'What is the plot type of the story? Why do you think so?', placeholder: 'State plot type and reasons...' },
          { id: 'mb_personal', prompt: 'Share your personal connection to the story. Have you ever experienced something that made you feel the same way?', placeholder: 'Write your reflection...' },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 7
  // ==========================================
  {
    id: 7,
    sessionNumber: 7,
    title: 'Identifying Speaker’s Point of View, Theme, and Author’s Purpose',
    pageNumberDisplay: 'Pages 26 – 31',
    competency: 'Point of View (1st, 2nd, 3rd person), central themes, and author purpose analysis',
    description: 'Explore perspective through visual street scenes, examine pronouns, study epic heroic literature in "Beowulf", and discover filial devotion in "The Aged Mother".',
    themeColor: 'cyan',
    activities: [
      {
        id: 's7-act1',
        activityNumber: 'Activity 1',
        title: '“Whose Eyes Are We Seeing Through?”',
        instructions: 'Look at the crowded city intersection with vibrant billboards and pedestrians. Then answer the questions from different perspectives.',
        type: 'qa',
        questions: [
          {
            id: 'pov_q1',
            prompt: '1. Imagine you are the person in the picture. Write one sentence describing what is happening (First-Person POV):',
            placeholder: 'e.g., I walked through the bustling avenue with colorful billboards towering above me...',
          },
          {
            id: 'pov_q2',
            prompt: '2. Imagine someone else is telling the story. Write another sentence showing what they notice (Third-Person POV):',
            placeholder: 'e.g., Hundreds of pedestrians crowded the Shibuya-style crossing beneath flashing screens...',
          },
        ],
      },
      {
        id: 's7-act2',
        activityNumber: 'Activity 2',
        title: 'Spot the POV',
        instructions: 'Copy the pronouns in each sentence, then write the POV type: First, Second, or Third.',
        type: 'table_qa',
        tableData: {
          headers: ['Sentence', 'Pronouns', 'POV Type (First, Second, or Third)'],
          rows: [
            {
              id: 'pov_row1',
              sentence: 'I helped my friend carry the bag.',
              fields: [
                { key: 'pronouns', label: 'Pronouns', placeholder: 'I, my' },
                { key: 'povType', label: 'POV Type', placeholder: 'First Person' },
              ],
            },
            {
              id: 'pov_row2',
              sentence: 'You walk into the room and see a surprise.',
              fields: [
                { key: 'pronouns', label: 'Pronouns', placeholder: 'You' },
                { key: 'povType', label: 'POV Type', placeholder: 'Second Person' },
              ],
            },
            {
              id: 'pov_row3',
              sentence: 'She faced the dragon bravely.',
              fields: [
                { key: 'pronouns', label: 'Pronouns', placeholder: 'She' },
                { key: 'povType', label: 'POV Type', placeholder: 'Third Person' },
              ],
            },
          ],
        },
      },
      {
        id: 's7-act3',
        activityNumber: 'Activity 3',
        title: 'Read and Identify – Beowulf',
        instructions: 'Read the short summary of Beowulf and answer the questions below.',
        type: 'qa',
        storyTitle: 'Beowulf',
        passageParagraphs: [
          'Hrothgar, King of the Danes, built a magnificent mead-hall called Heorot to celebrate his success and wealth. But the joy and music angered Grendel, a monster descended from Cain. Grendel raided the hall killing warriors each night for twelve years.',
          'Beowulf, a young warrior of the Geats, heard of Grendel and sailed to Denmark with fifteen companions to fight him. That night, Beowulf battled Grendel and tore off the monster’s arm, causing Grendel to flee and die. Hrothgar rewarded Beowulf with treasure, and the hall celebrated.',
          'Grendel’s mother came seeking revenge, killing Aeschere, Hrothgar’s adviser. Beowulf swam to her underwater lair, killed her with a giant-forged sword, and took Grendel’s head and the sword hilt back to Heorot. Another celebration honored Beowulf before he returned home to Geatland, where his uncle, King Hygelac, rewarded him. Beowulf later became king and ruled for fifty years.',
          'In his old age, a dragon attacked after a thief stole treasure from its barrow. Beowulf fought the dragon with Wiglaf’s help, killing it but receiving mortal wounds. Before dying, Beowulf instructed Wiglaf to rule and have a funeral barrow built overlooking the sea. The Geats cremated him and buried the dragon’s treasure with him.',
        ],
        questions: [
          { id: 'bw_q1', prompt: '1. Who is telling the story?', placeholder: 'Is it a character or an outside third-person narrator?' },
          { id: 'bw_q2', prompt: '2. What lesson or message does the story give?', placeholder: 'Describe courage, sacrifice, and protecting one’s people...' },
          { id: 'bw_q3', prompt: '3. Why do you think the author wrote it?', placeholder: 'Explain the purpose of ancient epics in celebrating heroic virtues...' },
        ],
      },
      {
        id: 's7-act4',
        activityNumber: 'Activity 4',
        title: 'Read Like the Author (Reader’s Theater)',
        instructions: 'Select a character role (Narrator, Beowulf, Hrothgar, Grendel’s Mother, Wiglaf, All) and read aloud with dramatic expression!',
        type: 'script_theater',
        customConfig: {
          characters: ['Narrator', 'Beowulf', 'Hrothgar', "Grendel's Mother", 'Wiglaf', 'All'],
          scenes: [
            {
              sceneNumber: 1,
              dialogues: [
                { speaker: 'Narrator', line: 'Hrothgar, King of the Danes, had built a magnificent hall called Heorot. But peace did not last long. Grendel, a fearsome monster, was angered by the men’s joy and music.' },
                { speaker: 'Hrothgar', line: 'No one dares sleep in my hall! This terror must end.' },
                { speaker: 'Narrator', line: 'Twelve years of raids passed. Then came Beowulf, a young warrior of the Geats.' },
                { speaker: 'Beowulf', line: 'I have heard of your troubles, King Hrothgar. I will fight Grendel and rid your hall of this monster.' },
                { speaker: 'Hrothgar', line: 'You are welcome, Beowulf. We honor your courage. Come, have a feast before tonight.' },
              ],
            },
            {
              sceneNumber: 2,
              dialogues: [
                { speaker: 'Narrator', line: 'Beowulf fought bravely. All his men fled except Wiglaf. Together, they killed the dragon, but Beowulf was mortally wounded.' },
                { speaker: 'Beowulf', line: 'Wiglaf, lead the Geats after me. Build me a funeral barrow by the sea...' },
                { speaker: 'Wiglaf', line: 'I will honor you, my lord.' },
                { speaker: 'Narrator', line: 'Beowulf died as a hero. The Geats mourned, cremated him, and built a barrow overlooking the sea.' },
                { speaker: 'All', line: 'Beowulf’s courage, loyalty, and heroism will never be forgotten!' },
              ],
            },
            {
              sceneNumber: 3,
              dialogues: [
                { speaker: 'Narrator', line: 'But peace was short-lived. Grendel’s mother came to avenge her son.' },
                { speaker: "Grendel's Mother", line: 'He took my son... I will take one of yours!' },
                { speaker: 'Narrator', line: 'She seized Aeschere, Hrothgar’s favorite warrior. Beowulf followed her to her underwater lair.' },
                { speaker: 'Beowulf', line: 'I will defeat you, as I did your son!' },
                { speaker: 'Narrator', line: 'The sword Unferth lent Beowulf failed, but then he found a giant-forged sword and killed her.' },
                { speaker: 'Beowulf', line: 'Justice is done. The hall is safe once more.' },
              ],
            },
          ],
        },
      },
      {
        id: 's7-act5',
        activityNumber: 'Activity 5',
        title: 'POV, Theme, Purpose Challenge – The Aged Mother',
        instructions: 'Read the story by Matsuo Basho and answer the questions below.',
        type: 'qa',
        storyTitle: 'The Aged Mother',
        storyAuthor: 'Matsuo Basho',
        passageParagraphs: [
          'Long ago, at the foot of a mountain, a poor farmer lived with his aged mother. They were humble, peaceful, and happy, working their small land to feed themselves. One day, the governor of Shining, a cruel man afraid of weakness, issued a terrible law: all old people must be abandoned and left to die.',
          'The farmer loved his mother dearly. “Mother, they may take you away,” he said with worry. “Do not fear, my son,” she replied gently. “I will help you.”',
          'That evening, the farmer cooked some rice, packed it in a cloth, filled a gourd with water, and lifted his mother onto his back. He began the long climb up Obatsuyama, the mountain of abandoning the aged. The paths were many and confusing. The mother, though old, watched carefully. Quietly, she dropped small piles of twigs along the path to mark the way for their return.',
          'Finally, they reached the summit. Exhausted, the farmer laid his mother on soft pine needles, wrapped her in her coat, and tearfully said goodbye. “Son,” she said with a trembling voice, “do not lose your way. Follow the path marked with twigs.” The farmer’s heart broke. “Oh, honored mother! Your love is too great. I will not leave you. Together we will follow the path and return home.”',
          'He carried her back down the mountain, following the twigs. At their hut, he hid his mother in a secret closet under the kitchen floor, giving her food and care, always fearing discovery. Time passed. Then the governor sent another impossible order: the people must present him with a rope of ashes.',
          'The farmer whispered the news to his mother. “Wait!” she said. “I will think. I will think.” The next day she instructed him: “Make a rope of twisted straw. Lay it on flat stones and burn it on a windless night.” The farmer did as she said. When the fire died, the rope lay perfectly in ashes. The governor praised the farmer’s wisdom and demanded to know its source.',
          '“The truth must be told,” said the farmer. Bowing deeply, he explained how his mother guided him. The governor meditated in silence, then said gravely, “Shining needs more than youth and strength. With age comes wisdom.” At that moment, the cruel law was abolished. The villagers never again abandoned their elders, and the story of the aged mother became a legend.',
        ],
        questions: [
          { id: 'am_q1', prompt: '1. What is the author’s POV?', placeholder: 'e.g., Third-person omniscient...' },
          { id: 'am_q2', prompt: '2. What is the theme of the story?', placeholder: 'e.g., Respect for elders; wisdom comes with age...' },
          { id: 'am_q3', prompt: '3. What was the purpose of the author in writing the story? Cite evidence from the text.', placeholder: 'Cite text lines showing why the author shared this legend...' },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 8
  // ==========================================
  {
    id: 8,
    sessionNumber: 8,
    title: 'Making Inferences and Predictions',
    pageNumberDisplay: 'Pages 32 – 35',
    competency: 'Formulate predictions and construct textual inferences',
    description: 'Use clue stops in "The Gift of the Magi", map out inferences using a Meaning-Making organizer, and complete vocabulary cloze items.',
    themeColor: 'teal',
    activities: [
      {
        id: 's8-act1',
        activityNumber: 'Activity 1',
        title: 'Prediction Worksheet Chart',
        instructions: 'Read each event from the story. Write your prediction of what will happen next and what clue or evidence from the story supports it.',
        type: 'table_qa',
        storyTitle: 'The Gift of the Magi (Prediction Stops)',
        tableData: {
          headers: ['Event from the Story', 'My Prediction (What will happen next?)', 'What Clue/Evidence from the Story?'],
          rows: [
            {
              id: 'pred1',
              event: 'Della counted her savings, only one dollar and eighty-seven cents.',
              fields: [
                { key: 'prediction', label: 'My Prediction', placeholder: 'What will Della do to get money?' },
                { key: 'clue', label: 'Clue/Evidence', placeholder: 'She is desperate to buy Jim a Christmas gift...' },
              ],
            },
            {
              id: 'pred2',
              event: 'Della had one thing she treasured: her long, beautiful hair.',
              fields: [
                { key: 'prediction', label: 'My Prediction', placeholder: 'What will she do with her hair?' },
                { key: 'clue', label: 'Clue/Evidence', placeholder: 'Hair could be sold to wig makers...' },
              ],
            },
            {
              id: 'pred3',
              event: 'She went to a hair shop and sold her hair for money.',
              fields: [
                { key: 'prediction', label: 'My Prediction', placeholder: 'What gift will she search for?' },
                { key: 'clue', label: 'Clue/Evidence', placeholder: 'Jim treasures his gold pocket watch...' },
              ],
            },
            {
              id: 'pred4',
              event: 'Jim gave Della his Christmas gift.',
              fields: [
                { key: 'prediction', label: 'My Prediction', placeholder: 'How will Della react to the combs?' },
                { key: 'clue', label: 'Clue/Evidence', placeholder: 'Her hair is now cropped short...' },
              ],
            },
          ],
        },
      },
      {
        id: 's8-act2',
        activityNumber: 'Activity 2',
        title: 'Inference Graphic Organizer (Meaning-Making Map)',
        instructions: 'Fill in the graphic organizer. Select an action/event in the story, provide the clue or textual evidence, then make your inference.',
        type: 'table_qa',
        tableData: {
          headers: ['Event in the Story', 'Clue: The why (What We See/Read)', 'Inference (Meaning)'],
          rows: [
            {
              id: 'inf_ex',
              event: 'Ex. Della sells her hair',
              fields: [
                { key: 'clue', label: 'Clue: The why', placeholder: 'e.g., She has little money...' },
                { key: 'meaning', label: 'Inference (Meaning)', placeholder: 'e.g., She loves Jim deeply...' },
              ],
            },
            {
              id: 'inf_1',
              fields: [
                { key: 'event', label: 'Event in the Story', placeholder: 'Enter an event (e.g. Jim sells his watch)' },
                { key: 'clue', label: 'Clue: The why', placeholder: 'What text shows why he did it?' },
                { key: 'meaning', label: 'Inference (Meaning)', placeholder: 'What does this reveal about his character?' },
              ],
            },
            {
              id: 'inf_2',
              fields: [
                { key: 'event', label: 'Event in the Story', placeholder: 'Enter an event (e.g. Della cries after counting coins)' },
                { key: 'clue', label: 'Clue: The why', placeholder: 'What text shows why she cried?' },
                { key: 'meaning', label: 'Inference (Meaning)', placeholder: 'What does this reveal?' },
              ],
            },
          ],
        },
      },
      {
        id: 's8-act3',
        activityNumber: 'Activity 3',
        title: 'Fill Me In (Word Bank)',
        instructions: 'Fill in the blanks with the correct word from the word bank. Use context clues to decide which word fits best.',
        type: 'fillblank',
        customConfig: {
          wordBank: ['treasured', 'savings', 'surprised', 'embarrassed', 'struggled', 'admired', 'decision', 'special', 'possessions'],
        },
        questions: [
          { id: 'fb1', prompt: '1. Della and Jim worked hard, but they still ______ to save money.', correctAnswer: 'struggled' },
          { id: 'fb2', prompt: '2. Della counted her ______. She had only one dollar and eighty-seven cents.', correctAnswer: 'savings' },
          { id: 'fb3', prompt: '3. Della had one thing she ______ her long, beautiful hair.', correctAnswer: 'treasured' },
          { id: 'fb4', prompt: '4. Jim also had something important to him: a gold watch passed down through his family. It was one of his most important ______.', correctAnswer: 'possessions' },
          { id: 'fb5', prompt: '5. Della made a brave ______ to sell her hair so she could buy Jim a gift.', correctAnswer: 'decision' },
          { id: 'fb6', prompt: '6. She wanted to buy Jim a ______ present for Christmas.', correctAnswer: 'special' },
          { id: 'fb7', prompt: '7. She bought a fine chain for Jim’s watch, a gift she knew he would love and had always ______.', correctAnswer: 'admired' },
          { id: 'fb8', prompt: '8. When Jim came home and saw Della’s short hair, he was ______.', correctAnswer: 'surprised' },
          { id: 'fb9', prompt: '9. Jim explained that he had sold his watch to buy the combs. He looked a little ______ when he told her.', correctAnswer: 'embarrassed' },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 9
  // ==========================================
  {
    id: 9,
    sessionNumber: 9,
    title: 'Differentiating Fantasy from Reality',
    pageNumberDisplay: 'Pages 36 – 39',
    competency: 'Distinguish between realistic facts and fantasy elements in literature and daily occurrences',
    description: 'Differentiate real human traits from mythological monsters in Beowulf, categorize vocabulary into Reality vs Fantasy, and analyze "The Flood in the Barangay".',
    themeColor: 'indigo',
    activities: [
      {
        id: 's9-act1',
        activityNumber: 'Activity 1',
        title: 'Reality / Fantasy Chart – Beowulf',
        instructions: 'Read the excerpt. Identify if each event in the chart is Real or Fantasy, then explain why in the right column.',
        type: 'table_qa',
        passageParagraphs: [
          'One quiet night, the warriors in the great hall were fast asleep. Only Beowulf stayed awake to guard them. Suddenly, a scary monster named Grendel came creeping through the dark. He wanted to attack the sleeping men. Beowulf, brave and strong, watched Grendel enter the hall and prepared himself to fight.',
          'When Grendel jumped toward the men, Beowulf quickly grabbed the monster’s arm with all his strength. Grendel was shocked because no human had ever been strong enough to stop him before. The two struggled fiercely, shaking the whole hall as they fought—a real warrior facing a monster creature.',
        ],
        tableData: {
          headers: ['What Happened?', 'Real or Fantasy?', 'Why?'],
          rows: [
            {
              id: 'rf_ex',
              event: 'Ex. Beowulf stayed awake to guard the sleeping warriors.',
              fields: [
                { key: 'category', label: 'Real or Fantasy', placeholder: 'e.g., Real or Fantasy' },
                { key: 'why', label: 'Why', placeholder: 'e.g., People can stay awake to protect others.' },
              ],
            },
            {
              id: 'rf_1',
              event: 'A monster named Grendel entered the hall.',
              fields: [
                { key: 'category', label: 'Real or Fantasy', placeholder: 'Real or Fantasy' },
                { key: 'why', label: 'Why', placeholder: 'Monsters with superhuman traits are mythical...' },
              ],
            },
            {
              id: 'rf_2',
              event: 'Beowulf grabbed Grendel’s arm and fought him.',
              fields: [
                { key: 'category', label: 'Real or Fantasy', placeholder: 'Real or Fantasy' },
                { key: 'why', label: 'Why', placeholder: 'Tearing off a giant monster’s arm with bare hands is fantasy...' },
              ],
            },
            {
              id: 'rf_3',
              event: 'The men were sleeping.',
              fields: [
                { key: 'category', label: 'Real or Fantasy', placeholder: 'Real or Fantasy' },
                { key: 'why', label: 'Why', placeholder: 'Sleeping is a natural biological human reality.' },
              ],
            },
          ],
        },
      },
      {
        id: 's9-act2',
        activityNumber: 'Activity 2',
        title: 'Categorize Me (Reality vs Fantasy)',
        instructions: 'Tap each word from the pool to place it in either the Reality or Fantasy column.',
        type: 'categorize',
        customConfig: {
          categories: ['Reality', 'Fantasy'],
          items: [
            { word: 'Real', category: 'Reality' },
            { word: 'fact', category: 'Reality' },
            { word: 'truthful', category: 'Reality' },
            { word: 'imaginary', category: 'Fantasy' },
            { word: 'nonfiction', category: 'Reality' },
            { word: 'magical', category: 'Fantasy' },
            { word: 'Fictional', category: 'Fantasy' },
            { word: 'Actual', category: 'Reality' },
            { word: 'true', category: 'Reality' },
            { word: 'make-believe', category: 'Fantasy' },
            { word: 'monster', category: 'Fantasy' },
            { word: 'evidenced-based', category: 'Reality' },
          ],
        },
      },
      {
        id: 's9-act3',
        activityNumber: 'Activity 3',
        title: 'What I Have Learned – The Flood in the Barangay',
        instructions: 'Read the text below and answer the 10 questions by deciding if each is Reality/Fact or Fantasy/Non-Fact.',
        type: 'mcq',
        storyTitle: 'The Flood in the Barangay',
        passageParagraphs: [
          'One afternoon, heavy rain fell in the barangay. The drainage canals became full, and soon the streets were flooded. People worked together to move their belongings to higher places.',
          'The barangay captain reminded everyone to clean their surroundings and avoid throwing garbage in canals to prevent flooding.',
          'That evening, some children said the flood happened because a giant water monster was angry and caused the rain to fall harder.',
          'However, the adults explained that flooding happens when there is too much rain and blocked drainage systems.',
          'The children realized that while the story of the water monster was interesting, the real cause of flooding was improper waste disposal and heavy rainfall.',
        ],
        questions: [
          { id: 'q_fl1', prompt: '1. Heavy rain caused flooding in the barangay.', options: ['a. Reality/Fact', 'b. Fantasy/Non-Fact'], correctAnswer: 'a. Reality/Fact' },
          { id: 'q_fl2', prompt: '2. Garbage blocking canals can cause flooding.', options: ['a. Reality/Fact', 'b. Fantasy/Non-Fact'], correctAnswer: 'a. Reality/Fact' },
          { id: 'q_fl3', prompt: '3. A giant water monster caused the flood.', options: ['a. Reality/Fact', 'b. Fantasy/Non-Fact'], correctAnswer: 'b. Fantasy/Non-Fact' },
          { id: 'q_fl4', prompt: '4. People helped each other during the flood.', options: ['a. Reality/Fact', 'b. Fantasy/Non-Fact'], correctAnswer: 'a. Reality/Fact' },
          { id: 'q_fl5', prompt: '5. Cleaning surroundings helps prevent flooding.', options: ['a. Reality/Fact', 'b. Fantasy/Non-Fact'], correctAnswer: 'a. Reality/Fact' },
          { id: 'q_fl6', prompt: '6. Flooding can happen because of too much rain.', options: ['a. Reality/Fact', 'b. Fantasy/Non-Fact'], correctAnswer: 'a. Reality/Fact' },
          { id: 'q_fl7', prompt: '7. The children created an imaginative explanation.', options: ['a. Reality/Fact', 'b. Fantasy/Non-Fact'], correctAnswer: 'a. Reality/Fact' },
          { id: 'q_fl8', prompt: '8. Monsters control the weather in real life.', options: ['a. Reality/Fact', 'b. Fantasy/Non-Fact'], correctAnswer: 'b. Fantasy/Non-Fact' },
          { id: 'q_fl9', prompt: '9. Blocked drainage systems can cause water to rise.', options: ['a. Reality/Fact', 'b. Fantasy/Non-Fact'], correctAnswer: 'a. Reality/Fact' },
          { id: 'q_fl10', prompt: '10. Real-life problems have scientific or logical causes.', options: ['a. Reality/Fact', 'b. Fantasy/Non-Fact'], correctAnswer: 'a. Reality/Fact' },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 10
  // ==========================================
  {
    id: 10,
    sessionNumber: 10,
    title: 'Drawing Conclusions and Making Generalizations',
    pageNumberDisplay: 'Pages 40 – 45',
    competency: 'Synthesize details to draw sound conclusions and construct broad generalizations',
    description: 'Reflect on mindset quotes, examine stress management, define coping strategies, and construct generalizations about time management.',
    themeColor: 'emerald',
    activities: [
      {
        id: 's10-act1',
        activityNumber: 'Activity 1',
        title: 'Unlocking Mindset',
        instructions: 'Reflect on the meaning of the quote below: “The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence.” – Confucius. After, answer the questions.',
        type: 'qa',
        questions: [
          {
            id: 'mind1',
            prompt: '1. What does the quote suggest about the qualities needed to achieve personal excellence?',
            placeholder: 'Discuss desire, effort, and determination...',
          },
          {
            id: 'mind2',
            prompt: '2. How does this quote help you conclude why some people succeed despite challenges?',
            placeholder: 'Draw your conclusion based on the mindset...',
          },
        ],
      },
      {
        id: 's10-act2',
        activityNumber: 'Activity 2',
        title: 'Read and Explore – Managing Stress Among Learners',
        instructions: 'Read the text carefully and answer the comprehension and generalization questions that follow.',
        type: 'qa',
        storyTitle: 'Managing Stress Among Learners',
        passageParagraphs: [
          'Stress is common among learners today. Many students feel stressed because of exams, projects, deadlines, and expectations from teachers and parents. Personal responsibilities, friendships, and too much use of gadgets can also cause stress. Because of this, it is important for learners to know how to manage stress.',
          'One way to manage stress is through good time management. When students plan their tasks and use their time wisely, they can avoid rushing and cramming. Finishing schoolwork on time helps students feel ready and confident, especially during tests and presentations.',
          'Another way to reduce stress is by living a healthy lifestyle. Getting enough sleep, eating healthy food, and exercising help the body and mind stay strong. Simple activities like walking, stretching, or playing sports can help students feel relaxed and happy.',
          'Learners can also manage stress by using positive coping strategies. Talking to friends, teachers, or family members about problems can help lessen stress. Doing relaxing activities such as deep breathing, listening to music, or taking short breaks can calm the mind.',
          'Lastly, having a positive mindset helps learners handle stress better. Students who believe in themselves and see challenges as chances to learn are more likely to stay focused and motivated. Understanding that mistakes are part of learning helps reduce fear and anxiety.',
        ],
        questions: [
          { id: 'st1', prompt: '1. What are the main causes of stress among learners according to the text?', placeholder: 'Exams, deadlines, expectations, gadget overuse...' },
          { id: 'st2', prompt: '2. How does good time management help students reduce stress?', placeholder: 'Avoids rushing and cramming...' },
          { id: 'st3', prompt: '3. If a student exercises regularly, eats well, and sleeps enough, what can you conclude about their stress levels?', placeholder: 'I can conclude that...' },
          { id: 'st4', prompt: '4. What can you conclude about students who have a positive mindset when facing challenges?', placeholder: 'I can conclude that...' },
          { id: 'st5', prompt: '5. What general statement can you make about how healthy lifestyle habits affect mental and physical well-being?', placeholder: 'In general...' },
          { id: 'st6', prompt: '6. Based on the coping strategies mentioned, what general idea can you form about handling difficult situations?', placeholder: 'I can generalize that...' },
          { id: 'st7', prompt: '7. What generalization can you make about the role of mindset in learning and achieving goals?', placeholder: 'A positive mindset enables...' },
        ],
      },
      {
        id: 's10-act3',
        activityNumber: 'Activity 3',
        title: 'Context Clue Challenge',
        instructions: 'Read each sentence silently, use the clues in the sentence to determine the meaning of the underlined word, and write the definition in your own words in the space provided.',
        type: 'qa',
        questions: [
          {
            id: 'cc_stress',
            prompt: '1. Stress is a common experience among learners today, due to multiple tasks that include exams, projects, deadlines, and expectations from teachers and parents, which can sometimes feel overwhelming. (Clue: feeling tired or tense because of too many tasks.)',
            placeholder: 'Definition of Stress in your own words...',
          },
          {
            id: 'cc_cramming',
            prompt: '2. Students plan their tasks and set priorities well to avoid cramming. (Clue: doing many tasks all at once at the last minute.)',
            placeholder: 'Definition of Cramming in your own words...',
          },
          {
            id: 'cc_coping',
            prompt: '3. Talking to friends, teachers, or family members, practicing relaxation techniques, listening to music, or taking short breaks are coping strategies to reduce stress. (Clue: ways to handle or manage stress.)',
            placeholder: 'Definition of Coping Strategies in your own words...',
          },
        ],
      },
      {
        id: 's10-act4',
        activityNumber: 'Activity 4',
        title: 'Read to Learn & Generalization Chart',
        instructions: 'Read the text on Time Management. Then complete each conclusion and generalization using the sentence starter provided.',
        type: 'qa',
        storyTitle: 'How Does Time Management Help Students?',
        passageParagraphs: [
          'Time management helps students use their time wisely for studying, doing schoolwork, and resting. When students plan their tasks and follow a schedule, they can finish their work on time and understand their lessons better. This also helps them avoid rushing and feeling pressured. Students who manage their time well feel less stressed because they know what to do and when to do it. They also learn important skills such as being organized, responsible, and disciplined, which are useful in school and everyday life.',
          'Time management is important because it helps students perform better in school, feel less stressed, and become more responsible.',
          'In general, students who practice good time management are more organized, confident, and successful in their studies and daily activities.',
        ],
        questions: [
          {
            id: 'gen1',
            prompt: 'What happens to students who plan their tasks and follow a schedule?\nSentence starter: "I can conclude that ______ because ______."',
            placeholder: 'I can conclude that... because...',
          },
          {
            id: 'gen2',
            prompt: 'What can you conclude about the skills students develop when they manage their time well?\nSentence starter: "I can conclude that ______ because ______."',
            placeholder: 'I can conclude that... because...',
          },
          {
            id: 'gen3',
            prompt: 'If a student does not manage their time, what might happen to their school performance or stress levels?\nSentence starter: "I can conclude that ______ because ______."',
            placeholder: 'I can conclude that... because...',
          },
          {
            id: 'gen4',
            prompt: 'From the passage, what general statement can you make about the relationship between time management and student success?\nSentence starter: "From this text, I can generalize that ______."',
            placeholder: 'From this text, I can generalize that...',
          },
          {
            id: 'gen5',
            prompt: 'Based on the passage, what generalization can you make about students who use time wisely?\nSentence starter: "From this text, I can generalize that ______."',
            placeholder: 'From this text, I can generalize that...',
          },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 11
  // ==========================================
  {
    id: 11,
    sessionNumber: 11,
    title: 'Figure of Speech and Sound Devices',
    pageNumberDisplay: 'Pages 46 – 51',
    competency: 'Identify similes, metaphors, personification, onomatopoeia, alliteration, and sensory imagery',
    description: 'Explore "The Guardians of the Deep", contrast dull vs dramatic descriptions, analyze poetic sound devices, and create your own Deep Sea Monster profile.',
    themeColor: 'sky',
    activities: [
      {
        id: 's11-act1',
        activityNumber: 'Warm-up',
        title: 'Evidence or Guess',
        instructions: 'Say if each sentence is a Proof (Fact) or a Big Guess (Conclusion):',
        type: 'mcq',
        questions: [
          { id: 'eg1', prompt: '1. The sky is dark and grey, so it is probably going to rain.', options: ['Proof (Fact)', 'Big Guess (Conclusion)'], correctAnswer: 'Big Guess (Conclusion)' },
          { id: 'eg2', prompt: '2. Everyone in this room hates Mondays.', options: ['Proof (Fact)', 'Big Guess (Conclusion)'], correctAnswer: 'Big Guess (Conclusion)' },
          { id: 'eg3', prompt: '3. The school cafeteria served pizza today, so the cafeteria ran out of pizza.', options: ['Proof (Fact)', 'Big Guess (Conclusion)'], correctAnswer: 'Big Guess (Conclusion)' },
          { id: 'eg4', prompt: '4. All teenagers love playing video games.', options: ['Proof (Fact)', 'Big Guess (Conclusion)'], correctAnswer: 'Big Guess (Conclusion)' },
          { id: 'eg5', prompt: '5. Teachers are always grumpy.', options: ['Proof (Fact)', 'Big Guess (Conclusion)'], correctAnswer: 'Big Guess (Conclusion)' },
        ],
      },
      {
        id: 's11-act2',
        activityNumber: 'Activity 1',
        title: 'Read and Explore – The Guardians of the Deep',
        instructions: 'Read the text carefully and answer the questions that follow.',
        type: 'qa',
        storyTitle: 'The Guardians of the Deep',
        passageParagraphs: [
          'The ocean is a vast, blue museum of secrets. Along the jagged coastline, the waves whistle and wash against the ancient rocks. To a scientist, the ocean is a body of saltwater covering 70% of the Earth—this is the reality of our planet. However, to the ancient explorers, the deep was a place where sea serpents swallowed ships whole.',
          'Deep below the surface, the "midnight zone" is as dark as a closed coffin. Here, fish have glowing lights on their heads to lure prey. This bioluminescence is a living flashlight, a miracle of nature that seems like it belongs in a storybook. While we know these fish are real, the idea of a mermaid singing to sailors remains a beautiful piece of fantasy.',
          'In the silence of the deep, the water thumps and throbs with the heartbeat of the Earth. Whether we look at the ocean through a microscope or a telescope of imagination, it remains the world\'s greatest mystery.',
        ],
        questions: [
          { id: 'gd1', prompt: '1. According to the text, what percentage of the Earth is covered by the ocean?', placeholder: '70%...' },
          { id: 'gd2', prompt: '2. What did ancient explorers believe happened to ships in the deep ocean?', placeholder: 'Sea serpents swallowed ships whole...' },
          { id: 'gd3', prompt: '3. How do fish in the "midnight zone" attract their prey?', placeholder: 'Glowing lights on their heads (bioluminescence)...' },
        ],
      },
      {
        id: 's11-act3',
        activityNumber: 'Activity 2',
        title: 'Lesson 2 – Dull vs Dramatic',
        instructions: 'Which sentence makes you see a clearer picture in your mind, and why? Tap the better choice and explain.',
        type: 'mcq',
        questions: [
          {
            id: 'dull_pair1',
            prompt: 'Pair 1: Which makes you see a vivid picture?',
            options: ['A: The ocean was dark.', 'B: The ocean was a vast, blue museum of secrets.'],
            correctAnswer: 'B: The ocean was a vast, blue museum of secrets.',
            explanation: 'Sentence B uses metaphor ("museum of secrets") to spark visual imagination.',
          },
          {
            id: 'dull_pair2',
            prompt: 'Pair 2: Which makes you see a vivid picture?',
            options: ['A: The waves moved against the rocks.', 'B: The waves whistled and washed against the rocks.'],
            correctAnswer: 'B: The waves whistled and washed against the rocks.',
            explanation: 'Sentence B incorporates auditory imagery and alliteration ("whistled and washed").',
          },
          {
            id: 'dull_pair3',
            prompt: 'Pair 3: Which makes you see a vivid picture?',
            options: ['A: The deep sea is very, very dark.', 'B: The midnight zone is as dark as a closed coffin.'],
            correctAnswer: 'B: The midnight zone is as dark as a closed coffin.',
            explanation: 'Sentence B uses a striking simile ("as dark as a closed coffin").',
          },
        ],
      },
      {
        id: 's11-act4',
        activityNumber: 'Activity 3',
        title: 'Figure It Out! & Sound Devices Practice',
        instructions: 'Classify each line (Simile, Metaphor, Personification) and give its meaning. Then answer the sound device practice questions.',
        type: 'qa',
        questions: [
          {
            id: 'fig1',
            prompt: '“The waves whistle and wash against the ancient rocks.”\nClassification (Simile, Metaphor, or Personification) and Meaning:',
            placeholder: 'Personification (waves whistle like a human) / shows the lively sound of the waves...',
          },
          {
            id: 'fig2',
            prompt: '“The ‘midnight zone’ is as dark as a closed coffin.”\nClassification and Meaning:',
            placeholder: 'Simile (uses "as") / emphasizes complete and suffocating darkness...',
          },
          {
            id: 'fig3',
            prompt: '“The water thumps and throbs with the heartbeat of the earth.”\nClassification and Meaning:',
            placeholder: 'Personification / gives the ocean a rhythmic living pulse...',
          },
          {
            id: 'rewrite_rain',
            prompt: 'Rewrite using at least one figure of speech to make it "come alive":\nBoring: The rain hit the window.\nAlive!:',
            placeholder: 'e.g., The raindrops tapped impatient fingers against my glass window.',
          },
          {
            id: 'rewrite_crab',
            prompt: 'Boring: The crab moved across the sand.\nAlive!:',
            placeholder: 'e.g., The armored crab scuttled like a miniature clockwork soldier across the golden dunes.',
          },
          {
            id: 'sound_practice',
            prompt: 'Sound Devices: Complete with onomatopoeia, alliteration, or imagery:\n1. The monster went ______ (splash) into the water.\n2. It had a ______ (slimy, spiky) body.\n3. Its skin felt ______ (as cold as ice).',
            placeholder: 'Type your sound device answers...',
          },
        ],
      },
      {
        id: 's11-act5',
        activityNumber: 'Creative Task',
        title: 'The Deep Sea Monster Profile',
        instructions: 'Create your own sea creature! Give it a name, draw it on the touch canvas, and write three sentences about it using one literary device (figure of speech or sound device) for each sentence.',
        type: 'drawing_profile',
        questions: [
          { id: 'monster_name', prompt: 'Creature Name:', placeholder: 'e.g. Abyssal Leviathan' },
          { id: 'monster_s1', prompt: 'Sentence 1 (e.g. using Simile or Metaphor):', placeholder: 'Write sentence 1...' },
          { id: 'monster_s2', prompt: 'Sentence 2 (e.g. using Personification or Alliteration):', placeholder: 'Write sentence 2...' },
          { id: 'monster_s3', prompt: 'Sentence 3 (e.g. using Onomatopoeia or Sensory Imagery):', placeholder: 'Write sentence 3...' },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 12
  // ==========================================
  {
    id: 12,
    sessionNumber: 12,
    title: 'Fact, Opinion, Fact-Based Opinion',
    pageNumberDisplay: 'Pages 52 – 56',
    competency: 'Analyze information credibility by distinguishing objective facts from subjective and evidence-supported opinions',
    description: 'Read the proposed nationwide cellphone ban in schools, classify survey data vs personal feelings, and reflect on combating fake news.',
    themeColor: 'orange',
    activities: [
      {
        id: 's12-act1',
        activityNumber: 'Activity 1',
        title: 'Read and Explore – Public Support for a Cellphone Ban',
        instructions: 'Read the news analysis and answer the comprehension check questions.',
        type: 'qa',
        storyTitle: 'Public Support for a Cellphone Ban in Schools',
        passageParagraphs: [
          'The use of cellphones in schools has become a growing issue in the Philippines. Many people believe that cellphones can distract students from learning. According to a Pulse Asia survey, almost 8 out of 10 Filipinos support a ban on cellphones in schools.',
          'The survey was conducted nationwide from June 17 to 24, 2024, with 1,200 adult respondents. The results showed that 76 percent of the respondents agree with banning cellphones inside schools. Meanwhile, 13 percent disagree, and 11 percent are unsure. These results show that most Filipinos support limiting cellphone use during school hours.',
          'Senator Sherwin Gatchalian, Chairman of the Senate Committee on Basic Education, believes that the survey results show how Filipinos understand the benefits of a cellphone ban. He thinks that mobile phones often distract students and affect their school performance. This belief is supported by a study from the 2022 Programme for International Student Assessment (PISA). The study found that 8 out of 10 Filipino learners aged 15 were distracted in class by using their own smartphones, while another 8 out of 10 were distracted by other students’ phone use.',
          'Because of these findings, Senator Gatchalian filed the Electronic Gadget Free Schools Act (Senate Bill No. 2706) in June. This proposed law aims to ban the use of mobile phones and electronic gadgets from Kindergarten to Senior High School inside school grounds during school hours. The goal of the bill is to help students focus better and improve learning by reducing distractions.',
          'Overall, survey results and research studies show that cellphone use can interfere with learning. Although some people do not agree with a complete ban, the strong public support and research findings suggest that limiting cellphone use in schools may help create a better and more focused learning environment.',
        ],
        questions: [
          { id: 'ban_q1', prompt: '1. According to the survey, do most people agree with banning cellphones in schools?', placeholder: 'Yes, 76% agree according to Pulse Asia...' },
          { id: 'ban_q2', prompt: '2. What is one thing that distracts students during class?', placeholder: 'Using their own smartphones or other students using phones...' },
          { id: 'ban_q3', prompt: '3. Why does the Senator want to ban phones in schools?', placeholder: 'To help students focus better and improve learning outcomes...' },
        ],
      },
      {
        id: 's12-act2',
        activityNumber: 'Activity 2 & 3',
        title: 'Think Pair Share – Classification & Fact-Based Opinions',
        instructions: 'Examine lines from the text. Classify each as Fact, Opinion, or Fact-Based Opinion and add your comments.',
        type: 'table_qa',
        tableData: {
          headers: ['Line from the Text', 'Classification (Fact / Opinion / Fact-Based Opinion)', 'Group / Student Comments'],
          rows: [
            {
              id: 'c_row1',
              sentence: 'The survey showed that 76 percent of respondents agree with banning cellphones.',
              fields: [
                { key: 'type', label: 'Classification', placeholder: 'Fact' },
                { key: 'comments', label: 'Comments', placeholder: 'Verifiable with Pulse Asia research data' },
              ],
            },
            {
              id: 'c_row2',
              sentence: 'Mobile phones often distract students and ruin their high school experience.',
              fields: [
                { key: 'type', label: 'Classification', placeholder: 'Opinion' },
                { key: 'comments', label: 'Comments', placeholder: 'Expresses personal subjective feeling' },
              ],
            },
            {
              id: 'c_row3',
              sentence: 'Limiting cellphone use in schools may help create a better learning environment, based on survey and research findings.',
              fields: [
                { key: 'type', label: 'Classification', placeholder: 'Fact-Based Opinion' },
                { key: 'comments', label: 'Comments', placeholder: 'Combines a recommendation with empirical PISA & survey evidence' },
              ],
            },
          ],
        },
      },
      {
        id: 's12-act4',
        activityNumber: 'Reflection',
        title: 'Reflection Time: Combating Fake News',
        instructions: 'Answer the question below reflecting on real-world media literacy:',
        type: 'qa',
        questions: [
          {
            id: 'fake_news_ref',
            prompt: 'How can I help others distinguish facts from opinions especially in the time of social media and fake news?',
            placeholder: 'Discuss checking credible sources, verifying statistics, examining author bias...',
          },
        ],
      },
    ],
  },

  // ==========================================
  // SESSION 13
  // ==========================================
  {
    id: 13,
    sessionNumber: 13,
    title: 'Propaganda Techniques',
    pageNumberDisplay: 'Pages 57 – 60',
    competency: 'Recognize persuasive devices (Bandwagon, Testimonial, Glittering Generalities, Name-Calling, Plain Folks)',
    description: 'Deconstruct how social media influencers persuade audiences, test your critical discernment in "Buy or Bye?", and match propaganda techniques.',
    themeColor: 'pink',
    activities: [
      {
        id: 's13-act1',
        activityNumber: 'Activity 1',
        title: 'Read and Explore – Social Media Influencers',
        instructions: 'Read the two-part text on influencers and answer the comprehension questions.',
        type: 'qa',
        storyTitle: 'Social Media Influencers (Part 1 & 2)',
        passageParagraphs: [
          'Part 1: It is estimated that about 40 per cent of the world’s population use social media, and many of these billions of social media users look up to influencers to help them decide what to buy and what trends to follow. An influencer is a person who can influence the decisions of their followers because of their relationship with their audience and their knowledge and expertise in a particular area, e.g. fashion, travel or technology.',
          'Influencers often have a large following of people who pay close attention to their views. They have the power to persuade people to buy things, and influencers are now seen by many companies as a direct way to customers’ hearts. Brands are now asking powerful influencers to market their products. With some influencers charging up to $25,000 for one social media post, it is no surprise that more and more people are keen to become influencers too.',
          'Part 2: If you are one of them, then here are five tips on how to do it: 1) Choose your niche (find the specific area you know most about and develop it); 2) Choose your medium and write an interesting bio; 3) Post regularly and consistently.',
          'Understanding Propaganda Techniques: Propaganda techniques are special tricks used in advertisements, speeches, or posters to jump-start your emotions and change the way you think. The goal isn\'t just to give you facts; it is to persuade or make you believe something or buy something.',
        ],
        questions: [
          { id: 'inf_q1', prompt: '• What does an influencer help their followers decide?', placeholder: 'What to buy and what trends to follow...' },
          { id: 'inf_q2', prompt: '• What is one thing an influencer knows a lot about (like fashion or travel)?', placeholder: 'Their specialized niche area...' },
          { id: 'inf_q3', prompt: '• Why do companies want to work with powerful influencers?', placeholder: 'Direct connection to audience trust and purchasing decisions...' },
          { id: 'inf_q4', prompt: '• How much money can some influencers get for making one post?', placeholder: 'Up to $25,000 per post...' },
        ],
      },
      {
        id: 's13-act2',
        activityNumber: 'Activity 2',
        title: 'Buy or Bye? (10 Critical Statements)',
        instructions: 'Tap BUY if you agree with the statement. Tap BYE if you disagree with the statement.',
        type: 'buy_or_bye',
        questions: [
          { id: 'bob1', prompt: '1. Some posts online are made to make people feel scared or worried.', correctAnswer: 'BUY' },
          { id: 'bob2', prompt: '2. If many people support something online, it must always be correct.', correctAnswer: 'BYE' },
          { id: 'bob3', prompt: '3. Famous people can influence what others believe or buy.', correctAnswer: 'BUY' },
          { id: 'bob4', prompt: '4. The words used in a post can affect how we feel about an issue.', correctAnswer: 'BUY' },
          { id: 'bob5', prompt: '5. Some posts are created to convince people, not just to inform them.', correctAnswer: 'BUY' },
          { id: 'bob6', prompt: '6. Posts that repeat the same message many times can make people believe it more.', correctAnswer: 'BUY' },
          { id: 'bob7', prompt: '7. Seeing our friends like or share something online can make us want to do the same.', correctAnswer: 'BUY' },
          { id: 'bob8', prompt: '8. Sometimes, posts use exciting or powerful words to make an idea seem better than it is.', correctAnswer: 'BUY' },
          { id: 'bob9', prompt: '9. Not everything we see online is completely true or honest.', correctAnswer: 'BUY' },
          { id: 'bob10', prompt: '10. Some posts are designed to make people act quickly without thinking.', correctAnswer: 'BUY' },
        ],
      },
      {
        id: 's13-act3',
        activityNumber: 'Activity 3',
        title: 'Match and Explain (Propaganda Techniques)',
        instructions: 'Match each propaganda technique in Column A to its correct definition/example in Column B.',
        type: 'matching',
        customConfig: {
          columnA: [
            { id: 't1', label: 'Bandwagon' },
            { id: 't2', label: 'Testimonial' },
            { id: 't3', label: 'Glittering Generalities' },
            { id: 't4', label: 'Name-Calling' },
            { id: 't5', label: 'Plain Folks' },
          ],
          columnB: [
            { id: 'd1', label: 'Says everyone is doing it, so you should too.' },
            { id: 'd2', label: 'Uses a famous person or respected figure to promote an idea.' },
            { id: 'd3', label: 'Uses big, positive words that sound nice but are vague.' },
            { id: 'd4', label: 'Attacks a person or idea instead of giving facts.' },
            { id: 'd5', label: 'Shows ordinary people doing it to make it relatable.' },
          ],
          correctPairs: {
            t1: 'd1',
            t2: 'd2',
            t3: 'd3',
            t4: 'd4',
            t5: 'd5',
          },
        },
      },
    ],
  },

  // ==========================================
  // SESSION 14
  // ==========================================
  {
    id: 14,
    sessionNumber: 14,
    title: 'Infographics',
    pageNumberDisplay: 'Pages 61 – 67',
    competency: 'Interpret visual-textual infographics, unscramble cultural vocabulary, and design multimedia content',
    description: 'Solve Philippine province rebuses, study the "Indigenous Peoples of the Philippines" infographic, rearrange jumbled letters, and create your own mobile infographic.',
    themeColor: 'rose',
    activities: [
      {
        id: 's14-act1',
        activityNumber: 'Activity 1',
        title: 'Guess the Province (Rebus Puzzle)',
        instructions: 'Use the given visual clues to identify the Philippine provinces they represent.',
        type: 'rebus',
        questions: [
          {
            id: 'reb1',
            prompt: '1. Visual Clue: 🐝 Bee + 📞 Phone Call',
            placeholder: 'Type the Philippine province name...',
            correctAnswer: 'Bicol',
            explanation: 'Bee + Call = Bicol (or Albay/Bataan depending on pronunciation, Bicol is the standard rebus answer).',
          },
          {
            id: 'reb2',
            prompt: '2. Visual Clue: 👎 Boo (thumbs down) + 👕 Shirt / Sando',
            placeholder: 'Type the Philippine province name...',
            correctAnswer: 'Basilan',
            explanation: 'Boo + Sando / Basilan.',
          },
          {
            id: 'reb3',
            prompt: '3. Visual Clue: 🪸 Sea / Coral reef + 👎 Boo',
            placeholder: 'Type the Philippine province name...',
            correctAnswer: 'Cebu',
            explanation: 'Sea + Boo = Cebu!',
          },
          {
            id: 'reb4',
            prompt: '4. Visual Clue: 🫧 Bubbles + 🥫 Can',
            placeholder: 'Type the Philippine province name...',
            correctAnswer: 'Bulacan',
            explanation: 'Bubble + Can = Bulacan!',
          },
          {
            id: 'reb5',
            prompt: '5. Visual Clue: 🕊️ Dove (Kalapati) + 🐕 Dog (Aso)',
            placeholder: 'Type the Philippine province name...',
            correctAnswer: 'Cavite',
            explanation: 'Kalapati + Aso / Cavite.',
          },
        ],
      },
      {
        id: 's14-act2',
        activityNumber: 'Activity 2',
        title: 'Indigenous Peoples of the Philippines (Infographic Study)',
        instructions: 'Study the infographic details on the Indigenous Peoples of the Philippines and answer the questions below.',
        type: 'qa',
        storyTitle: 'Indigenous Peoples of the Philippines',
        passageParagraphs: [
          'Around 10 MILLION people (15% of the population) belong to over 100 distinct ethnic groups.',
          'Governing Law: Republic Act 8371 (IPRA) - Protects Ancestral Land Rights, overseen by the National Commission on Indigenous Peoples (NCIP).',
          'LUZON: IGOROT (Mountain tribes of the Cordillera, skilled in rice terracing, wear traditional woven attire) & DUMAGAT (Forest dwellers of the Sierra Madre, expert hunters and fishers, nomadic lifestyle).',
          'VISAYAS: NEGRITOS (Ata Negritos of Negros Oriental, small-statured and curly-haired, practice forest survival skills) & SULODNON (Panay-Bukidnon of Capiz, keep ancient epic chants, skilled in traditional crafts).',
          'MINDANAO: MARANAO (People of Lake Lanao, rich in Islamic art and epics, live in grand torogan houses) & T’BOLI (Highland dwellers of Lake Sebu, spiritual beliefs and many gods, known for T’nalak weaving).',
        ],
        questions: [
          { id: 'ip1', prompt: '1. How many indigenous groups are there in the Philippines?', placeholder: 'Over 100 distinct ethnic groups (around 10 million people)...' },
          { id: 'ip2', prompt: '2. Who are the indigenous people of Luzon, Visayas, and Mindanao?', placeholder: 'Luzon: Igorot, Dumagat; Visayas: Negritos, Sulodnon; Mindanao: Maranao, T’boli...' },
          { id: 'ip3', prompt: '3. Who are the forest dwellers of Sierra Madre? Who are the people of Lake Lanao?', placeholder: 'Sierra Madre: Dumagat; Lake Lanao: Maranao...' },
          { id: 'ip4', prompt: '4. In what ways are these groups similar, and how do they differ from one another?', placeholder: 'Similar: deep bond with land/culture; Differ: attire, housing, arts, traditions...' },
          { id: 'ip5', prompt: '5. Does the illustration help you understand the information easily? Why?', placeholder: 'Explain how maps, regional grouping, and traditional attire illustrations aid recall...' },
        ],
      },
      {
        id: 's14-act3',
        activityNumber: 'Activity 3',
        title: 'Arrange the Jumbled Letters',
        instructions: 'Rearrange the jumbled letters below to reveal the correct vocabulary word. Use the given definition as your clue.',
        type: 'jumbled_letters',
        questions: [
          { id: 'j1', prompt: '1. little natives; cultural minorities', jumbled: 'ONIGIDENUS', correctAnswer: 'INDIGENOUS' },
          { id: 'j2', prompt: '2. scattering and wandering people', jumbled: 'MACIDNO', correctAnswer: 'NOMADIC' },
          { id: 'j3', prompt: '3. persons that lives in a particular place', jumbled: 'WEDERLLS', correctAnswer: 'DWELLERS' },
          { id: 'j4', prompt: '4. something which is passed down from earlier generations', jumbled: 'CESANLART', correctAnswer: 'ANCESTRAL' },
          { id: 'j5', prompt: '5. very old; from a long time ago', jumbled: 'CINETAN', correctAnswer: 'ANCIENT' },
        ],
      },
      {
        id: 's14-act4',
        activityNumber: 'Activity 4',
        title: 'Practice: “5 Reasons to Stay in the Philippines”',
        instructions: 'Study the infographic “5 Reasons to Stay in the Philippines” and answer the processing questions.',
        type: 'qa',
        storyTitle: '5 Reasons to Stay in the Philippines',
        passageParagraphs: [
          '1. ENGLISH SPEAKING COUNTRY: 3rd Top English speaking country in the world; 93% of the population are English speakers.',
          '2. DIVERSE CULTURE: Diversity produces culturally vibrant communities.',
          '3. RICH IN RESOURCES: More resources lead to higher per capita income potential.',
          '4. TROPICAL COUNTRY: The fair and tropical climate permits enjoyable outdoor activities year-round.',
          '5. TOP TOURIST DESTINATIONS: With 7,107 islands housing the best tourist spots in Asia (Taal Volcano, People\'s Park, Twin Lakes Shopping Village).',
        ],
        questions: [
          { id: 'ph1', prompt: '1. What is the infographic about?', placeholder: '5 reasons why living/staying in the Philippines is rewarding and enjoyable...' },
          { id: 'ph2', prompt: '2. How many Filipinos are English speakers?', placeholder: '93% of the population...' },
          { id: 'ph3', prompt: '3. Based on the infographic, why is it more fun to stay in the Philippines?', placeholder: 'Tropical weather, diverse culture, rich nature, top tourist spots...' },
          { id: 'ph4', prompt: '4. What elements of multimedia did you observe in this infographic?', placeholder: 'Numbered hierarchy (1-5), icons, national flags, bold headers, photos...' },
          { id: 'ph5', prompt: '5. How do these elements help you understand the meaning of the text easily?', placeholder: 'Visual chunking reduces text overload and makes information memorable...' },
        ],
      },
      {
        id: 's14-act5',
        activityNumber: 'Activity 5',
        title: 'Create Your Own Mobile Infographic',
        instructions: 'Design your own mini-infographic right on your phone! Choose a topic, color palette, key statistics, and visual callouts.',
        type: 'infographic_builder',
      },
    ],
  },
];
