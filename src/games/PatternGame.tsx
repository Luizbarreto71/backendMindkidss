import React, { useState, useEffect } from 'react';
import { GameProps, GameResult } from '../types';
import { Square, Circle, Triangle } from 'lucide-react';

const shapes = [
  { component: Square, name: 'quadrado', color: 'bg-red-500' },
  { component: Circle, name: 'círculo', color: 'bg-blue-500' },
  { component: Triangle, name: 'triângulo', color: 'bg-green-500' }
];

export default function PatternGame({ onGameComplete, childName }: GameProps) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (gameStarted) {
      generateSequence();
    }
  }, [level, gameStarted]);

  const generateSequence = () => {
    const newSequence = [];
    for (let i = 0; i < level + 2; i++) {
      newSequence.push(Math.floor(Math.random() * 3));
    }
    setSequence(newSequence);
    setUserSequence([]);
    showSequence(newSequence);
  };

  const showSequence = (seq: number[]) => {
    setShowingSequence(true);
    let index = 0;
    
    const interval = setInterval(() => {
      setCurrentStep(index);
      index++;
      
      if (index > seq.length) {
        clearInterval(interval);
        setShowingSequence(false);
        setCurrentStep(-1);
      }
    }, 800);
  };

  const handleShapeClick = (shapeIndex: number) => {
    if (showingSequence) return;
    
    const newUserSequence = [...userSequence, shapeIndex];
    setUserSequence(newUserSequence);
    
    if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
      // Wrong answer
      setErrors(prev => prev + 1);
      setTimeout(() => {
        if (errors >= 2) {
          endGame();
        } else {
          generateSequence(); // Try again
        }
      }, 1000);
      return;
    }
    
    if (newUserSequence.length === sequence.length) {
      // Level completed
      setScore(prev => prev + level * 10);
      setLevel(prev => prev + 1);
      
      if (level >= 5) {
        setTimeout(() => endGame(), 1000);
      }
    }
  };

  const endGame = () => {
    const endTime = Date.now();
    const timeSpent = Math.round((endTime - startTime) / 1000);
    
    const result: GameResult = {
      id: Date.now().toString(),
      gameType: 'Jogo de Sequências',
      score,
      errors,
      timeSpent,
      date: new Date(),
      details: {
        correctAnswers: level - 1,
        incorrectAnswers: errors,
        patterns: ['Memória sequencial', 'Reconhecimento de padrões'],
        reactions: level >= 4 ? ['Ótima capacidade de sequenciamento'] : ['Pode melhorar a atenção aos padrões']
      }
    };
    
    onGameComplete(result);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Jogo de Sequências</h2>
        <p className="text-gray-600 mb-8">
          Olá {childName}! Vou mostrar uma sequência de formas. Depois você deve repetir na mesma ordem.
        </p>
        <button
          onClick={startGame}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 transition-all"
        >
          Começar Jogo
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Jogo de Sequências</h2>
        <p className="text-gray-600">Nível {level} - Repita a sequência, {childName}!</p>
        
        <div className="flex justify-center space-x-8 mt-4">
          <div className="bg-blue-100 px-4 py-2 rounded-lg">
            <span className="text-blue-800 font-semibold">Pontos: {score}</span>
          </div>
          <div className="bg-red-100 px-4 py-2 rounded-lg">
            <span className="text-red-800 font-semibold">Erros: {errors}/3</span>
          </div>
        </div>
      </div>

      {showingSequence && (
        <div className="text-center mb-4">
          <p className="text-lg font-semibold text-gray-700">Observe a sequência:</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-8">
        {shapes.map((shape, index) => {
          const ShapeComponent = shape.component;
          const isHighlighted = showingSequence && currentStep < sequence.length && sequence[currentStep] === index;
          
          return (
            <button
              key={index}
              onClick={() => handleShapeClick(index)}
              disabled={showingSequence}
              className={`
                aspect-square rounded-xl flex items-center justify-center transform transition-all duration-300
                ${isHighlighted 
                  ? `${shape.color} scale-110 shadow-2xl` 
                  : `${shape.color} hover:scale-105 shadow-lg opacity-70 hover:opacity-100`
                }
                ${showingSequence ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <ShapeComponent className="h-16 w-16 text-white" />
            </button>
          );
        })}
      </div>

      <div className="text-center">
        <p className="text-gray-600">
          {showingSequence 
            ? 'Memorize a sequência...' 
            : `Clique nas formas na ordem correta (${userSequence.length}/${sequence.length})`
          }
        </p>
      </div>
    </div>
  );
}