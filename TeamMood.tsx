import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users } from 'lucide-react';
import type { TeamMoodData } from '../types';

const API_URL = 'http://localhost:5001';

export const TeamMood: React.FC = () => {
  const [teamMood, setTeamMood] = useState<TeamMoodData['team_mood']>({});

  useEffect(() => {
    const fetchTeamMood = async () => {
      try {
        const response = await axios.get(`${API_URL}/team_mood`);
        setTeamMood(response.data.team_mood);
      } catch (error) {
        console.error('Error fetching team mood:', error);
      }
    };

    fetchTeamMood();
    const interval = setInterval(fetchTeamMood, 30000);
    return () => clearInterval(interval);
  }, []);

  const total = Object.values(teamMood).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Users size={24} className="text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Team Mood</h2>
      </div>

      <div className="space-y-4">
        {Object.entries(teamMood).map(([mood, count]) => (
          <div key={mood} className="space-y-1">
            <div className="flex justify-between text-sm font-medium">
              <span className="capitalize">{mood}</span>
              <span>{Math.round((count / total) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full bg-blue-600"
                style={{ width: `${(count / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};