import React from 'react';
import { Quote } from 'lucide-react';
import { Mood, EnergyLevel } from '../types';

interface MotivationalQuoteProps {
  mood: Mood;
  energy: EnergyLevel;
}

const quotes: Record<Mood, Record<EnergyLevel, string[]>> = {
  anxious: {
    low: [
      "Start with something simple. Small wins build confidence! 🌱",
      "Take breaks when needed. Progress over perfection! 💙"
    ],
    medium: [
      "Take it one problem at a time. You've got this! 🌟",
      "Every small step forward is progress. Breathe and code. 💪"
    ],
    high: [
      "Channel that nervous energy into focused problem-solving! ⚡",
      "Your alertness is an advantage. Use it wisely! 🎯"
    ]
  },
  calm: {
    low: [
      "Perfect time for gentle practice. Steady wins the race! 🐢",
      "Your calm approach will lead to solid understanding. 🌊"
    ],
    medium: [
      "Perfect mindset for methodical problem-solving. 🧘‍♂️",
      "Steady progress beats rushed solutions. Keep going! 🌊"
    ],
    high: [
      "Calm and energized - the perfect coding combination! 🚀",
      "Your balanced state is ideal for tackling complex problems! ⚖️"
    ]
  },
  frustrated: {
    low: [
      "Take it easy. Sometimes the best solutions come when we're relaxed. 😌",
      "Frustration fades, but the skills you build last forever! 💎"
    ],
    medium: [
      "Channel that energy into conquering these challenges! 🔥",
      "Frustration means you're pushing boundaries. That's growth! 🚀"
    ],
    high: [
      "Use that fire to power through! You're stronger than any problem! 💪",
      "High energy + determination = unstoppable coding force! ⚡"
    ]
  },
  focused: {
    low: [
      "Focused but tired? Perfect for reviewing concepts thoroughly. 📚",
      "Quality focus beats high energy. You're in the zone! 🎯"
    ],
    medium: [
      "Your focus is your superpower. Time to tackle the challenges! 🎯",
      "Perfect mindset for systematic problem-solving! 🧠"
    ],
    high: [
      "Focused AND energized? Nothing can stop you now! 🚀",
      "This is your moment to shine. Tackle the hardest problems! ⭐"
    ]
  }
};

const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({ mood, energy }) => {
  const relevantQuotes = quotes[mood][energy];
  const randomQuote = relevantQuotes[Math.floor(Math.random() * relevantQuotes.length)];

  return (
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 shadow-lg border border-purple-200">
      <div className="flex items-start gap-4">
        <Quote className="text-purple-600 mt-1" size={24} />
        <div>
          <p className="text-lg text-gray-800 font-medium leading-relaxed">
            {randomQuote}
          </p>
          <p className="text-sm text-purple-600 mt-2 font-semibold">
            - Your MindDSA Coach
          </p>
        </div>
      </div>
    </div>
  );
};

export default MotivationalQuote;