export type Language = 'en' | 'hi';

export type Difficulty = 'Easy' | 'Medium' | 'Challenging';

export interface GameMetadata {
  id: string;
  title: string;
  titleHi: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  subjectNameHi: string;
  topic: string;
  topicHi: string;
  chapterId: string;
  durationMinutes: number;
  difficulty: Difficulty;
  description: string;
  descriptionHi: string;
  instructions: string[];
  instructionsHi: string[];
  isAvailable: boolean;
  xpReward: number;
}

export interface PracticeQuestion {
  id: string;
  prompt: string;
  promptHi: string;
  visualType?: 'apples' | 'stars' | 'balloons' | 'pencils' | 'number-line';
  visualCount?: number;
  options: {
    id: string;
    text: string;
    textHi?: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  explanationHi: string;
  hint?: string;
  hintHi?: string;
}

export interface ChapterInfo {
  id: string;
  classId: string;
  subjectId: string;
  chapterNumber: number;
  title: string;
  titleHi: string;
  topic: string;
  topicHi: string;
  curriculumReference: string; // e.g. "Joyful Mathematics - NCERT Class 1 Chapter 2 & 5"
  description: string;
  descriptionHi: string;
  learningObjectives: string[];
  learningObjectivesHi: string[];
  explanation: {
    summary: string;
    summaryHi: string;
    keyPoints: string[];
    keyPointsHi: string[];
    examples: {
      question: string;
      answer: string;
      visualCount?: number;
      explanation: string;
    }[];
  };
  games: GameMetadata[];
  practiceQuestions: PracticeQuestion[];
  revisionNotes: {
    title: string;
    titleHi: string;
    content: string;
    contentHi: string;
  }[];
  isAvailable: boolean;
}

export interface SubjectInfo {
  id: string;
  name: string;
  nameHi: string;
  iconName: string;
  color: string;
  description: string;
  descriptionHi: string;
  availableClasses: string[];
  chapters: ChapterInfo[];
}

export interface ClassInfo {
  id: string;
  number: number;
  name: string;
  nameHi: string;
  ageRange: string;
  description: string;
  descriptionHi: string;
  isAvailable: boolean;
  subjects: SubjectInfo[];
}

export interface DailyChallenge {
  id: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ...
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  classId: string;
  subjectId: string;
  questionCount: number;
  xpReward: number;
  difficulty: Difficulty;
  questions: PracticeQuestion[];
}

export interface UserProgress {
  version: number;
  xp: number;
  level: number;
  streakDays: number;
  lastPlayedDate: string | null;
  completedGameIds: string[];
  gameHighScores: Record<string, number>;
  completedDailyChallenges: string[]; // dates like "YYYY-MM-DD"
  completedChapters: string[];
  unlockedBadgeIds: string[];
}

export interface Badge {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  requiredXp?: number;
  requiredGames?: number;
}
