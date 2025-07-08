import React from 'react';
import { Mood } from '../types';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
}

const moods: { key: Mood; emoji: string; label: string; color: string }[] = [
  { key: 'anxious', emoji: '😰', label: 'Anxious', color: 'bg-orange-100 border-orange-300 hover:bg-orange-200' },
  { key: 'calm', emoji: '😌', label: 'Calm', color: 'bg-blue-100 border-blue-300 hover:bg-blue-200' },
  { key: 'frustrated', emoji: '😤', label: 'Frustrated', color: 'bg-red-100 border-red-300 hover:bg-red-200' },
  { key: 'focused', emoji: '😎', label: 'Focused', color: 'bg-green-100 border-green-300 hover:bg-green-200' }
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodSelect }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        How are you feeling today?
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {moods.map(mood => (
          <button
            key={mood.key}
            onClick={() => onMoodSelect(mood.key)}
            className={`
              p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
              ${selectedMood === mood.key 
                ? `${mood.color} ring-2 ring-offset-2 ring-blue-500 shadow-lg` 
                : `${mood.color} hover:shadow-md`
              }
            `}
          >
            <div className="text-4xl mb-2">{mood.emoji}</div>
            <div className="text-lg font-semibold text-gray-800">{mood.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;