import React, { useState, useEffect } from 'react';
import { GameProps, GameResult } from '../types';

const colors = [
  { name: 'Vermelho', value: 'bg-red-500', textColor: 'text-red-700' },
  { name: 'Azul', value: 'bg-blue-500', textColor: 'text-blue-700' },
  { name: 'Verde', value: 'bg-green-500', textColor: 'text-green-700' },
  { name: 'Amarelo', value: 'bg-yellow-500', textColor: 'text-yellow-700' },
  { name: 'Rosa', value: 'bg-pink-500', textColor: 'text-pink-700' },
  { name: 'Roxo', value: 'bg-purple-500', textColor: 'text-purple-700' }
];

export default function ColorGame({ onGameComplete, childName }: GameProps) {
  const [currentColor, setCurrentColor] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [round, setRound] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime] = useState(Date.now());
  const [feedback, setFeedback] = useState<string>('');

  const nextRound = () => {
    if (round >= 10) {
      endGame();
      return;
    }
    
    setCurrentColor(Math.floor(Math.random() * colors.length));
    setRound(prev => prev + 1);
    setFeedback('');
  };

  const handleColorClick = (selectedIndex: number) => {
    if (selectedIndex === currentColor) {
      setScore(prev => prev + 10);
      setFeedback('Correto! 🎉');
      setTimeout(nextRound, 1500);
    } else {
      setErrors(prev => prev + 1);
      setFeedback('Ops! Tente novamente. 🤔');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const endGame = () => {
    const endTime = Date.now();
    const timeSpent = Math.round((endTime - startTime) / 1000);
    
    const result: GameResult = {
      id: Date.now().toString(),
      gameType: 'Jogo das Cores',
      score,
      errors,
      timeSpent,
      date: new Date(),
      details: {
        correctAnswers: score / 10,
        incorrectAnswers: errors,
        patterns: ['Reconhecimento de cores', 'Coordenação visual'],
        reactions: errors < 3 ? ['Excelente reconhecimento de cores'] : ['Pode praticar mais o reconhecimento']
      }
    };
    
    onGameComplete(result);
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentColor(Math.floor(Math.random() * colors.length));
  };

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Jogo das Cores</h2>
        <p className="text-gray-600 mb-8">
          Olá {childName}! Vou mostrar o nome de uma cor. Clique na cor correta!
        </p>
        <button
          onClick={startGame}
          className="bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 hover:from-red-500 hover:via-yellow-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 transition-all"
        >
          Começar Jogo
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Jogo das Cores</h2>
        <p className="text-gray-600">Rodada {round}/10</p>
        
        <div className="flex justify-center space-x-8 mt-4">
          <div className="bg-blue-100 px-4 py-2 rounded-lg">
            <span className="text-blue-800 font-semibold">Pontos: {score}</span>
          </div>
          <div className="bg-red-100 px-4 py-2 rounded-lg">
            <span className="text-red-800 font-semibold">Erros: {errors}</span>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <div className="bg-white p-8 rounded-xl shadow-lg inline-block">
          <p className="text-gray-600 mb-4">Clique na cor:</p>
          <h3 className={`text-4xl font-bold ${colors[currentColor].textColor}`}>
            {colors[currentColor].name}
          </h3>
        </div>
      </div>

      {feedback && (
        <div className="text-center mb-6">
          <p className="text-xl font-semibold text-gray-700">{feedback}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorClick(index)}
            className={`
              ${color.value} aspect-square rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300
              hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50
            `}
            aria-label={color.name}
          />
        ))}
      </div>
    </div>
  );
}