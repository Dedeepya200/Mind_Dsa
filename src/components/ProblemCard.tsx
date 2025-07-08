import React from 'react';
import { ExternalLink, Check } from 'lucide-react';
import { Problem } from '../types';

interface ProblemCardProps {
  problem: Problem;
  topic: string;
  onMarkSolved: (problem: Problem, topic: string) => void;
}

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800 border-green-200',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Hard: 'bg-red-100 text-red-800 border-red-200'
};

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, topic, onMarkSolved }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex-1 pr-4">
          {problem.title}
        </h3>
        <span className={`
          px-3 py-1 rounded-full text-sm font-medium border
          ${difficultyColors[problem.difficulty]}
        `}>
          {problem.difficulty}
        </span>
      </div>
      
      <div className="text-sm text-gray-600 mb-4">
        Topic: <span className="font-medium text-gray-800">{topic}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <a
          href={problem.leetcode_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <ExternalLink size={16} />
          <span>LeetCode</span>
        </a>
        
        <button
          onClick={() => onMarkSolved(problem, topic)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          <Check size={16} />
          <span>Mark as Solved</span>
        </button>
      </div>
    </div>
  );
};

export default ProblemCard;