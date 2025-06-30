export interface GameResult {
  id: string;
  gameType: string;
  score: number;
  errors: number;
  timeSpent: number;
  date: Date;
  details: {
    correctAnswers: number;
    incorrectAnswers: number;
    patterns: string[];
    reactions: string[];
  };
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  createdAt: Date;
  gameResults: GameResult[];
}

export interface GameProps {
  onGameComplete: (result: GameResult) => void;
  childName: string;
}