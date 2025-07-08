import React from 'react';
import { Clock, Brain, CheckCircle } from 'lucide-react';
import { SessionLog as SessionLogType } from '../types';

interface SessionLogProps {
  sessions: SessionLogType[];
}

const SessionLog: React.FC<SessionLogProps> = ({ sessions }) => {
  if (sessions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Clock className="text-blue-600" />
          Session Log
        </h2>
        <div className="text-center text-gray-500 py-8">
          <CheckCircle size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No problems solved yet. Start your coding journey!</p>
        </div>
      </div>
    );
  }

  const moodEmojis = {
    anxious: '😰',
    calm: '😌',
    frustrated: '😤',
    focused: '😎'
  };

  const energyEmojis = {
    low: '🔋',
    medium: '⚡',
    high: '🚀'
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Clock className="text-blue-600" />
        Session Log
      </h2>
      
      <div className="space-y-4">
        {sessions.map((session, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                <div className="text-xl">{moodEmojis[session.mood as keyof typeof moodEmojis]}</div>
                <div className="text-xl">{energyEmojis[session.energy as keyof typeof energyEmojis]}</div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{session.problemTitle}</h3>
                <p className="text-sm text-gray-600">{session.topic}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {new Date(session.timestamp).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(session.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionLog;