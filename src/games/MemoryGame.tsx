import React, { useState, useEffect } from 'react';
import { GameProps, GameResult } from '../types';
import { Smile, Star, Heart, Sun, Moon, Cloud } from 'lucide-react';

const icons = [Smile, Star, Heart, Sun, Moon, Cloud];
const colors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400'];

interface Card {
  id: number;
  iconIndex: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame({ onGameComplete, childName }: GameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [errors, setErrors] = useState(0);
  const [startTime] = useState(Date.now());
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameCards: Card[] = [];
    for (let i = 0; i < 6; i++) {
      gameCards.push(
        { id: i * 2, iconIndex: i, isFlipped: false, isMatched: false },
        { id: i * 2 + 1, iconIndex: i, isFlipped: false, isMatched: false }
      );
    }
    
    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    setCards(gameCards);
  };

  const handleCardClick = (cardId: number) => {
    if (!gameStarted) setGameStarted(true);
    
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);
      
      setAttempts(prev => prev + 1);
      
      setTimeout(() => {
        if (firstCard?.iconIndex === secondCard?.iconIndex) {
          // Match found
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isMatched: true } 
              : c
          ));
          setMatches(prev => prev + 1);
        } else {
          // No match
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false } 
              : c
          ));
          setErrors(prev => prev + 1);
        }
        setFlippedCards([]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (matches === 6) {
      const endTime = Date.now();
      const timeSpent = Math.round((endTime - startTime) / 1000);
      
      const result: GameResult = {
        id: Date.now().toString(),
        gameType: 'Jogo da Memória',
        score: Math.max(100 - errors * 10, 0),
        errors,
        timeSpent,
        date: new Date(),
        details: {
          correctAnswers: matches,
          incorrectAnswers: errors,
          patterns: ['Memória visual', 'Concentração'],
          reactions: errors < 3 ? ['Excelente memória'] : ['Precisa treinar mais']
        }
      };
      
      setTimeout(() => onGameComplete(result), 1000);
    }
  }, [matches, errors, startTime, onGameComplete]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Jogo da Memória</h2>
        <p className="text-gray-600">Encontre os pares iguais, {childName}!</p>
        
        <div className="flex justify-center space-x-8 mt-4">
          <div className="bg-blue-100 px-4 py-2 rounded-lg">
            <span className="text-blue-800 font-semibold">Pares: {matches}/6</span>
          </div>
          <div className="bg-red-100 px-4 py-2 rounded-lg">
            <span className="text-red-800 font-semibold">Erros: {errors}</span>
          </div>
          <div className="bg-green-100 px-4 py-2 rounded-lg">
            <span className="text-green-800 font-semibold">Tentativas: {attempts}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {cards.map((card) => {
          const IconComponent = icons[card.iconIndex];
          const colorClass = colors[card.iconIndex];
          
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                aspect-square rounded-xl cursor-pointer transform transition-all duration-300
                ${card.isFlipped || card.isMatched 
                  ? `${colorClass} scale-105` 
                  : 'bg-gray-300 hover:bg-gray-400 hover:scale-105'
                }
                ${card.isMatched ? 'ring-4 ring-green-400' : ''}
                flex items-center justify-center shadow-lg
              `}
            >
              {(card.isFlipped || card.isMatched) && (
                <IconComponent className="h-8 w-8 text-white" />
              )}
            </div>
          );
        })}
      </div>
      
      {matches === 6 && (
        <div className="text-center mt-8">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg inline-block">
            <p className="font-semibold">Parabéns, {childName}! Você completou o jogo! 🎉</p>
          </div>
        </div>
      )}
    </div>
  );
}