import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { History } from 'lucide-react';
import type { HistoricalMood } from '../types';

const API_URL = 'http://localhost:5001';

export const MoodHistory: React.FC = () => {
  const [history, setHistory] = useState<HistoricalMood[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/historical_mood`);
        setHistory(response.data.historical_mood);
      } catch (error) {
        console.error('Error fetching mood history:', error);
      }
    };

    fetchHistory();
  }, []);

  const moodToValue = (mood: string): number => {
    const moodMap: { [key: string]: number } = {
      positive: 1,
      neutral: 0,
      negative: -1,
    };
    return moodMap[mood] ?? 0;
  };

  const chartData = history.map(item => ({
    timestamp: new Date(item.timestamp).toLocaleTimeString(),
    value: moodToValue(item.mood),
    mood: item.mood,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <History size={24} className="text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Mood History</h2>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis
              ticks={[-1, 0, 1]}
              tickFormatter={(value) => {
                const moodMap: { [key: number]: string } = {
                  1: 'Positive',
                  0: 'Neutral',
                  [-1]: 'Negative',
                };
                return moodMap[value] ?? '';
              }}
            />
            <Tooltip
              content={({ payload, label }) => {
                if (payload && payload.length > 0) {
                  return (
                    <div className="bg-white p-2 border rounded shadow">
                      <p className="text-sm">{label}</p>
                      <p className="text-sm font-semibold capitalize">
                        Mood: {payload[0].payload.mood}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};