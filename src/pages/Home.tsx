import React, { useState } from 'react';
import { Brain, Palette, Zap, Users, Lock, Star, CheckCircle, Puzzle } from 'lucide-react';
import DisclaimerBanner from '../components/DisclaimerBanner';
import GameCard from '../components/GameCard';
import MemoryGame from '../games/MemoryGame';
import PatternGame from '../games/PatternGame';
import ColorGame from '../games/ColorGame';
import GameResults from '../components/GameResults';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from '../hooks/useAuth';
import { ChildProfile, GameResult } from '../types';

type GameType = 'memory' | 'pattern' | 'color' | null;

export default function Home() {
  const [currentGame, setCurrentGame] = useState<GameType>(null);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [profiles, setProfiles] = useLocalStorage<ChildProfile[]>('childProfiles', []);
  const [selectedProfile, setSelectedProfile] = useState<ChildProfile | null>(null);
  const [showNameInput, setShowNameInput] = useState(false);
  const [childName, setChildName] = useState('');
  const { user, hasPremiumAccess } = useAuth();

  const handleGameComplete = (result: GameResult) => {
    setGameResult(result);
    
    if (selectedProfile) {
      const updatedProfiles = profiles.map(profile =>
        profile.id === selectedProfile.id
          ? { ...profile, gameResults: [...profile.gameResults, result] }
          : profile
      );
      setProfiles(updatedProfiles);
    }
    
    setCurrentGame(null);
  };

  const handlePlayAgain = () => {
    setGameResult(null);
  };

  const handleBackToMenu = () => {
    setGameResult(null);
    setCurrentGame(null);
  };

  const handleStartGame = (gameType: GameType) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    if (!hasPremiumAccess()) {
      window.location.href = '/pricing';
      return;
    }

    if (!selectedProfile) {
      setShowNameInput(true);
      return;
    }
    setCurrentGame(gameType);
  };

  const handleCreateProfile = () => {
    if (!childName.trim()) return;
    
    const newProfile: ChildProfile = {
      id: Date.now().toString(),
      name: childName,
      age: 0,
      createdAt: new Date(),
      gameResults: []
    };
    
    setProfiles([...profiles, newProfile]);
    setSelectedProfile(newProfile);
    setShowNameInput(false);
    setChildName('');
  };

  if (gameResult) {
    return (
      <GameResults
        result={gameResult}
        onPlayAgain={handlePlayAgain}
        onBackToMenu={handleBackToMenu}
      />
    );
  }

  if (currentGame === 'memory') {
    return (
      <MemoryGame
        onGameComplete={handleGameComplete}
        childName={selectedProfile?.name || 'Criança'}
      />
    );
  }

  if (currentGame === 'pattern') {
    return (
      <PatternGame
        onGameComplete={handleGameComplete}
        childName={selectedProfile?.name || 'Criança'}
      />
    );
  }

  if (currentGame === 'color') {
    return (
      <ColorGame
        onGameComplete={handleGameComplete}
        childName={selectedProfile?.name || 'Criança'}
      />
    );
  }

  return (
    <div className="space-y-8">
      <DisclaimerBanner />
      
      {/* Hero Section */}
      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-3xl"></div>
        <div className="relative z-10 py-12 px-8">
          <div className="flex justify-center items-center mb-6">
            <Puzzle className="h-16 w-16 text-blue-500 mr-4 animate-bounce" />
            <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              MindKids
            </div>
            <Puzzle className="h-16 w-16 text-purple-500 ml-4 animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧠 Plataforma Educativa Premium para Desenvolvimento Infantil
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Uma ferramenta inovadora que utiliza <strong>jogos interativos especializados</strong> para 
            auxiliar pais e educadores na <strong>observação de padrões de desenvolvimento</strong> e 
            possíveis sinais relacionados ao <strong>Transtorno do Espectro Autista (TEA)</strong>.
          </p>
          
          <div className="mt-8 flex justify-center space-x-4">
            <div className="flex items-center bg-white/80 px-4 py-2 rounded-full shadow-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm font-semibold">Jogos Especializados</span>
            </div>
            <div className="flex items-center bg-white/80 px-4 py-2 rounded-full shadow-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm font-semibold">Relatórios Detalhados</span>
            </div>
            <div className="flex items-center bg-white/80 px-4 py-2 rounded-full shadow-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm font-semibold">Acompanhamento Contínuo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Access Required */}
      {!user || !hasPremiumAccess() ? (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center shadow-2xl">
          <Lock className="h-20 w-20 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">🔒 Acesso Premium Necessário</h2>
          <p className="text-xl mb-6 opacity-90">
            Para acessar os jogos especializados e relatórios detalhados, você precisa de uma assinatura premium.
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
            <div className="text-4xl font-bold mb-2">R$ 19,90</div>
            <div className="text-lg opacity-90">Pagamento único • Acesso vitalício</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
            <div className="flex items-start">
              <Star className="h-5 w-5 text-yellow-300 mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold">Jogos Especializados</div>
                <div className="text-sm opacity-80">Atividades desenvolvidas para observar padrões comportamentais</div>
              </div>
            </div>
            <div className="flex items-start">
              <Star className="h-5 w-5 text-yellow-300 mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold">Relatórios Detalhados</div>
                <div className="text-sm opacity-80">Análises completas do desempenho e padrões observados</div>
              </div>
            </div>
            <div className="flex items-start">
              <Star className="h-5 w-5 text-yellow-300 mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold">Múltiplos Perfis</div>
                <div className="text-sm opacity-80">Acompanhe o desenvolvimento de várias crianças</div>
              </div>
            </div>
            <div className="flex items-start">
              <Star className="h-5 w-5 text-yellow-300 mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold">Suporte Especializado</div>
                <div className="text-sm opacity-80">Orientações sobre como interpretar os resultados</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {!user ? (
              <>
                <a
                  href="/pricing"
                  className="inline-block bg-white text-purple-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  🚀 Assinar Agora por R$ 19,90
                </a>
                <div className="text-sm opacity-80">
                  Já tem uma conta? <a href="/login" className="underline hover:text-yellow-300">Faça login aqui</a>
                </div>
              </>
            ) : (
              <a
                href="/pricing"
                className="inline-block bg-white text-purple-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🚀 Ativar Acesso Premium
              </a>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Profile Selection */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <Users className="h-8 w-8 text-purple-600 mr-3" />
              Selecionar Perfil da Criança
            </h2>
            
            {profiles.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <Users className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Nenhum Perfil Criado</h3>
                <p className="text-gray-600 mb-6">Crie o primeiro perfil para começar a usar a plataforma</p>
                <button
                  onClick={() => setShowNameInput(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  ➕ Criar Primeiro Perfil
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {profiles.map(profile => (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedProfile(profile)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedProfile?.id === profile.id
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-lg'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        selectedProfile?.id === profile.id
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                          : 'bg-gradient-to-r from-blue-400 to-purple-400'
                      }`}>
                        <span className="text-white font-bold text-xl">
                          {profile.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <p className="font-bold text-lg text-gray-800">{profile.name}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        🎮 {profile.gameResults.length} jogos realizados
                      </p>
                    </div>
                  </button>
                ))}
                
                <button
                  onClick={() => setShowNameInput(true)}
                  className="p-6 rounded-xl border-2 border-dashed border-gray-300 hover:border-purple-400 transition-all duration-300 transform hover:scale-105 bg-white hover:bg-purple-50"
                >
                  <div className="text-center">
                    <div className="h-16 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-600 text-3xl">+</span>
                    </div>
                    <p className="font-bold text-gray-700">Novo Perfil</p>
                    <p className="text-sm text-gray-500 mt-1">Adicionar criança</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Name Input Modal */}
          {showNameInput && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  👶 Criar Novo Perfil
                </h3>
                <input
                  type="text"
                  placeholder="Nome da criança"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateProfile()}
                />
                <div className="flex space-x-4">
                  <button
                    onClick={handleCreateProfile}
                    disabled={!childName.trim()}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    ✅ Criar Perfil
                  </button>
                  <button
                    onClick={() => {
                      setShowNameInput(false);
                      setChildName('');
                    }}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                  >
                    ❌ Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GameCard
              title="🧠 Jogo da Memória"
              description="Desenvolve memória visual e concentração através de pares de formas coloridas. Observa padrões de atenção e capacidade de retenção."
              icon={Brain}
              color="bg-gradient-to-br from-purple-500 via-pink-500 to-red-400"
              onClick={() => handleStartGame('memory')}
              difficulty="Fácil"
            />
            
            <GameCard
              title="⚡ Jogo de Sequências"
              description="Treina memória sequencial e reconhecimento de padrões. Avalia capacidade de seguir instruções e processar informações ordenadas."
              icon={Zap}
              color="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400"
              onClick={() => handleStartGame('pattern')}
              difficulty="Médio"
            />
            
            <GameCard
              title="🎨 Jogo das Cores"
              description="Aprimora reconhecimento visual e coordenação. Observa velocidade de processamento e precisão na identificação de estímulos."
              icon={Palette}
              color="bg-gradient-to-br from-green-500 via-emerald-500 to-lime-400"
              onClick={() => handleStartGame('color')}
              difficulty="Fácil"
            />
          </div>

          {!selectedProfile && (
            <div className="text-center p-8 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl border-2 border-yellow-300">
              <Puzzle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <p className="text-yellow-800 font-bold text-lg">
                👆 Selecione ou crie um perfil para começar a usar os jogos especializados!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}