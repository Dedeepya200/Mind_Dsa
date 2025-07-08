import React from 'react';
import { Code, Hash, Layers, Link, Type, Zap, Brain, Network } from 'lucide-react';

interface TopicSelectorProps {
  selectedTopic: string | null;
  onTopicSelect: (topic: string) => void;
}

const topics = [
  { key: 'Arrays', icon: Code, label: 'Arrays', color: 'bg-blue-100 border-blue-300 hover:bg-blue-200' },
  { key: 'Hashing', icon: Hash, label: 'Hashing', color: 'bg-purple-100 border-purple-300 hover:bg-purple-200' },
  { key: 'Stacks', icon: Layers, label: 'Stacks', color: 'bg-green-100 border-green-300 hover:bg-green-200' },
  { key: 'Linked Lists', icon: Link, label: 'Linked Lists', color: 'bg-orange-100 border-orange-300 hover:bg-orange-200' },
  { key: 'Strings', icon: Type, label: 'Strings', color: 'bg-pink-100 border-pink-300 hover:bg-pink-200' },
  { key: 'Greedy', icon: Zap, label: 'Greedy', color: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200' },
  { key: 'Dynamic Programming', icon: Brain, label: 'Dynamic Programming', color: 'bg-indigo-100 border-indigo-300 hover:bg-indigo-200' },
  { key: 'Graphs', icon: Network, label: 'Graphs', color: 'bg-red-100 border-red-300 hover:bg-red-200' }
];

const TopicSelector: React.FC<TopicSelectorProps> = ({ selectedTopic, onTopicSelect }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Choose your DSA topic
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {topics.map(topic => {
          const IconComponent = topic.icon;
          return (
            <button
              key={topic.key}
              onClick={() => onTopicSelect(topic.key)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                ${selectedTopic === topic.key 
                  ? `${topic.color} ring-2 ring-offset-2 ring-blue-500 shadow-lg` 
                  : `${topic.color} hover:shadow-md`
                }
              `}
            >
              <div className="flex flex-col items-center gap-2">
                <IconComponent size={24} className="text-gray-700" />
                <div className="text-sm font-semibold text-gray-800 text-center">{topic.label}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TopicSelector;