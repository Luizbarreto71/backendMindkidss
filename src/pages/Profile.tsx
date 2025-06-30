import React, { useState } from 'react';
import { User, Calendar, Trophy, TrendingUp } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ChildProfile } from '../types';

export default function Profile() {
  const [profiles, setProfiles] = useLocalStorage<ChildProfile[]>('childProfiles', []);
  const [selectedProfile, setSelectedProfile] = useState<ChildProfile | null>(
    profiles.length > 0 ? profiles[0] : null
  );

  if (profiles.length === 0) {
    return (
      <div className="text-center py-16">
        <User className="h-24 w-24 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Nenhum Perfil Encontrado</h2>
        <p className="text-gray-600">Crie um perfil na página inicial para começar!</p>
      </div>
    );
  }

  const getAverageScore = (profile: ChildProfile) => {
    if (profile.gameResults.length === 0) return 0;
    const total = profile.gameResults.reduce((sum, result) => sum + result.score, 0);
    return Math.round(total / profile.gameResults.length);
  };

  const getTotalPlayTime = (profile: ChildProfile) => {
    return profile.gameResults.reduce((sum, result) => sum + result.timeSpent, 0);
  };

  const getGameTypeStats = (profile: ChildProfile) => {
    const stats: { [key: string]: { played: number; avgScore: number } } = {};
    
    profile.gameResults.forEach(result => {
      if (!stats[result.gameType]) {
        stats[result.gameType] = { played: 0, avgScore: 0 };
      }
      stats[result.gameType].played++;
      stats[result.gameType].avgScore += result.score;
    });

    Object.keys(stats).forEach(gameType => {
      stats[gameType].avgScore = Math.round(stats[gameType].avgScore / stats[gameType].played);
    });

    return stats;
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Perfis das Crianças</h1>
        
        {/* Profile Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {profiles.map(profile => (
            <button
              key={profile.id}
              onClick={() => setSelectedProfile(profile)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedProfile?.id === profile.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="text-center">
                <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">
                    {profile.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="font-semibold text-lg">{profile.name}</p>
                <p className="text-sm text-gray-600">
                  {profile.gameResults.length} jogos
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedProfile && (
        <>
          {/* Profile Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800">Pontuação Média</h3>
              <p className="text-3xl font-bold text-yellow-600">
                {getAverageScore(selectedProfile)}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800">Jogos Realizados</h3>
              <p className="text-3xl font-bold text-blue-600">
                {selectedProfile.gameResults.length}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800">Tempo Total</h3>
              <p className="text-3xl font-bold text-green-600">
                {Math.round(getTotalPlayTime(selectedProfile) / 60)}min
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <User className="h-12 w-12 text-purple-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800">Membro desde</h3>
              <p className="text-sm font-bold text-purple-600">
                {new Date(selectedProfile.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          {/* Game Statistics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Estatísticas por Jogo</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(getGameTypeStats(selectedProfile)).map(([gameType, stats]) => (
                <div key={gameType} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{gameType}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jogos:</span>
                      <span className="font-semibold">{stats.played}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Média:</span>
                      <span className="font-semibold">{stats.avgScore} pts</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Games */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Jogos Recentes</h2>
            
            {selectedProfile.gameResults.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Nenhum jogo realizado ainda</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedProfile.gameResults
                  .slice(-5)
                  .reverse()
                  .map((result) => (
                    <div key={result.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-800">{result.gameType}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(result.date).toLocaleDateString('pt-BR')} às{' '}
                            {new Date(result.date).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">{result.score} pts</p>
                          <p className="text-sm text-gray-600">{result.timeSpent}s</p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}