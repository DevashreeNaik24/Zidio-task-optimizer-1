import React, { useState } from 'react';
import { MoodInput } from './components/MoodInput';
import { MoodHistory } from './components/MoodHistory';
import { TeamMood } from './components/TeamMood';
import { TaskRecommendation } from './components/TaskRecommendation';
import { Brain } from 'lucide-react';

function App() {
  const [currentMood, setCurrentMood] = useState<string>('');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Brain size={32} className="text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Zidio Task Optimizer
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <MoodInput onMoodDetected={setCurrentMood} />
            <TaskRecommendation currentMood={currentMood} />
          </div>
          <div className="space-y-8">
            <MoodHistory />
            <TeamMood />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;