import React from 'react';
import { Check, Star, Puzzle, Brain, BarChart3, Users, Crown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Pricing() {
  const { user } = useAuth();

  const handlePurchase = () => {
    if (user) {
      // Redireciona diretamente para o link do Mercado Pago
      window.location.href = 'https://mpago.li/2JzDceu';
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <Puzzle className="h-16 w-16 text-white mr-4 animate-bounce" />
            <div className="text-6xl font-bold text-white">MindKids</div>
            <Crown className="h-16 w-16 text-yellow-300 ml-4 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            🚀 Desbloqueie Todo o Potencial da Plataforma
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Acesso completo aos jogos especializados, relatórios detalhados e ferramentas 
            avançadas para acompanhar o desenvolvimento infantil.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-4">
              ⭐ OFERTA ESPECIAL ⭐
            </div>
            <div className="text-6xl font-bold text-gray-800 mb-2">R$ 19,90</div>
            <div className="text-xl text-gray-600 mb-4">Pagamento único • Acesso vitalício</div>
            <div className="text-sm text-green-600 font-semibold bg-green-100 px-4 py-2 rounded-full inline-block">
              💰 Sem mensalidades • Sem taxas extras
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Brain className="h-6 w-6 text-purple-600 mr-2" />
                Jogos Especializados
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Jogo da Memória Avançado</div>
                    <div className="text-sm text-gray-600">Avalia memória visual e padrões de atenção</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Sequências Complexas</div>
                    <div className="text-sm text-gray-600">Testa capacidade de seguir instruções ordenadas</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Reconhecimento Visual</div>
                    <div className="text-sm text-gray-600">Observa velocidade de processamento visual</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
                Relatórios Detalhados
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Análise de Padrões</div>
                    <div className="text-sm text-gray-600">Identifica tendências comportamentais</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Relatórios Imprimíveis</div>
                    <div className="text-sm text-gray-600">Documentos profissionais para compartilhar</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Acompanhamento Temporal</div>
                    <div className="text-sm text-gray-600">Evolução do desenvolvimento ao longo do tempo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recursos adicionais */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Users className="h-6 w-6 text-green-600 mr-2" />
              Recursos Adicionais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>Múltiplos perfis de crianças</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>Backup automático dos dados</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>Suporte técnico prioritário</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>Atualizações gratuitas vitalícias</span>
              </div>
            </div>
          </div>

          {/* Botão de ativar */}
          <div className="text-center">
            <button
              onClick={handlePurchase}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              🎯 Ativar Acesso Premium Agora
            </button>
            <div className="mt-4 text-sm text-gray-600">
              💳 Pagamento seguro • ✅ Ativação imediata • 🔒 Dados protegidos
            </div>
          </div>
        </div>

        {/* Aviso */}
        <div className="bg-amber-100/90 backdrop-blur-sm border-l-4 border-amber-500 p-6 rounded-r-2xl">
          <div className="flex items-start">
            <Puzzle className="h-6 w-6 text-amber-600 mr-3 mt-1" />
            <div>
              <h3 className="font-bold text-amber-800 mb-2">
                ⚠️ Importante: Ferramenta Educativa
              </h3>
              <p className="text-amber-700 text-sm">
                O MindKids é uma plataforma educativa que auxilia na observação do desenvolvimento infantil. 
                <strong> Não fornece diagnósticos médicos</strong> e não substitui consultas com profissionais 
                especializados. Os relatórios servem como observações educativas complementares.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
