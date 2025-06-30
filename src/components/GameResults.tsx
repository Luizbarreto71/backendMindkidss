import React from 'react';
import { GameResult } from '../types';
import { Trophy, Clock, Target, AlertCircle } from 'lucide-react';

interface GameResultsProps {
  result: GameResult;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export default function GameResults({ result, onPlayAgain, onBackToMenu }: GameResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceMessage = (score: number, errors: number) => {
    if (score >= 90 && errors <= 1) return '🌟 Excelente trabalho!';
    if (score >= 70 && errors <= 3) return '👍 Muito bem!';
    if (score >= 50) return '😊 Bom trabalho!';
    return '💪 Continue praticando!';
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Parabéns!</h2>
        <p className="text-lg text-gray-600 mb-6">
          {getPerformanceMessage(result.score, result.errors)}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Pontuação</p>
            <p className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
              {result.score}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Tempo</p>
            <p className="text-2xl font-bold text-green-600">
              {result.timeSpent}s
            </p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <Trophy className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Acertos</p>
            <p className="text-2xl font-bold text-yellow-600">
              {result.details.correctAnswers}
            </p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <AlertCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Erros</p>
            <p className="text-2xl font-bold text-red-600">
              {result.errors}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Habilidades Trabalhadas:</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {result.details.patterns.map((pattern, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {pattern}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onPlayAgain}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Jogar Novamente
          </button>
          <button
            onClick={onBackToMenu}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Menu Principal
          </button>
        </div>
      </div>
    </div>
  );
}