export interface Problem {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  leetcode_link: string;
}

export interface ProblemData {
  [topic: string]: Problem[];
}

export interface SolvedProblem {
  title: string;
  topic: string;
  link: string;
  date: string;
  mood: string;
  energy: string;
}

export interface SessionLog {
  mood: string;
  energy: string;
  timestamp: string;
  problemTitle: string;
  topic: string;
}

export type Mood = 'anxious' | 'calm' | 'frustrated' | 'focused';

export type EnergyLevel = 'low' | 'medium' | 'high';