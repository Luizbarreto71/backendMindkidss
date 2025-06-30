import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
  difficulty?: 'Fácil' | 'Médio' | 'Difícil';
}

export default function GameCard({ title, description, icon: Icon, color, onClick, difficulty = 'Fácil' }: GameCardProps) {
  const difficultyColors = {
    'Fácil': 'bg-green-100 text-green-800 border border-green-200',
    'Médio': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    'Difícil': 'bg-red-100 text-red-800 border border-red-200'
  };

  return (
    <div
      onClick={onClick}
      className={`${color} p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden`}
    >
      {/* Decorative puzzle pieces */}
      <div className="absolute top-2 right-2 opacity-20">
        <div className="w-8 h-8 bg-white/30 rounded-sm transform rotate-12"></div>
      </div>
      <div className="absolute bottom-2 left-2 opacity-20">
        <div className="w-6 h-6 bg-white/30 rounded-sm transform -rotate-12"></div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <Icon className="h-14 w-14 text-white group-hover:scale-110 transition-transform drop-shadow-lg" />
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${difficultyColors[difficulty]} backdrop-blur-sm`}>
          {difficulty}
        </span>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">{title}</h3>
      <p className="text-white/95 text-sm leading-relaxed drop-shadow-sm">{description}</p>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
    </div>
  );
}