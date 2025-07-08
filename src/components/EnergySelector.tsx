import React from 'react';
import { EnergyLevel } from '../types';

interface EnergySelectorProps {
  selectedEnergy: EnergyLevel | null;
  onEnergySelect: (energy: EnergyLevel) => void;
}

const energyLevels: { key: EnergyLevel; emoji: string; label: string; color: string; description: string }[] = [
  { 
    key: 'low', 
    emoji: '🔋', 
    label: 'Low Energy', 
    color: 'bg-gray-100 border-gray-300 hover:bg-gray-200',
    description: 'Feeling tired or drained'
  },
  { 
    key: 'medium', 
    emoji: '⚡', 
    label: 'Medium Energy', 
    color: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200',
    description: 'Moderate energy levels'
  },
  { 
    key: 'high', 
    emoji: '🚀', 
    label: 'High Energy', 
    color: 'bg-green-100 border-green-300 hover:bg-green-200',
    description: 'Feeling energetic and motivated'
  }
];

const EnergySelector: React.FC<EnergySelectorProps> = ({ selectedEnergy, onEnergySelect }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        What's your energy level?
      </h2>
      <div className="space-y-4">
        {energyLevels.map(energy => (
          <button
            key={energy.key}
            onClick={() => onEnergySelect(energy.key)}
            className={`
              w-full p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 text-left
              ${selectedEnergy === energy.key 
                ? `${energy.color} ring-2 ring-offset-2 ring-blue-500 shadow-lg` 
                : `${energy.color} hover:shadow-md`
              }
            `}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{energy.emoji}</div>
              <div>
                <div className="text-lg font-semibold text-gray-800">{energy.label}</div>
                <div className="text-sm text-gray-600">{energy.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EnergySelector;