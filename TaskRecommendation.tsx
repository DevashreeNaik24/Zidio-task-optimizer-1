import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListTodo } from 'lucide-react';
import type { TaskRecommendation } from '../types';

const API_URL = 'http://localhost:5001';

interface Props {
  currentMood: string;
}

export const TaskRecommendation: React.FC<Props> = ({ currentMood }) => {
  const [recommendation, setRecommendation] = useState<string>('');

  useEffect(() => {
    const getRecommendation = async () => {
      try {
        const response = await axios.post<TaskRecommendation>(
          `${API_URL}/recommend_task`,
          { emotion: currentMood }
        );
        setRecommendation(response.data.recommended_task);
      } catch (error) {
        console.error('Error getting task recommendation:', error);
      }
    };

    if (currentMood) {
      getRecommendation();
    }
  }, [currentMood]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <ListTodo size={24} className="text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Task Recommendation</h2>
      </div>

      <div className="mt-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-lg font-medium text-blue-900">
            Based on your current mood ({currentMood}):
          </p>
          <p className="mt-2 text-blue-800">
            {recommendation || 'Waiting for mood detection...'}
          </p>
        </div>
      </div>
    </div>
  );
};