export interface MoodData {
  id: number;
  employee_id: string;
  mood: string;
  timestamp: string;
}

export interface TeamMoodData {
  team_mood: {
    [key: string]: number;
  };
}

export interface HistoricalMood {
  mood: string;
  timestamp: string;
}

export interface TaskRecommendation {
  recommended_task: string;
}