import React, { useState } from 'react';
import { FileText, Download, Calendar, AlertTriangle, TrendingUp, Brain } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ChildProfile, GameResult } from '../types';

export default function Reports() {
  const [profiles] = useLocalStorage<ChildProfile[]>('childProfiles', []);
  const [selectedProfile, setSelectedProfile] = useState<ChildProfile | null>(
    profiles.length > 0 ? profiles[0] : null
  );

  const generateReport = (profile: ChildProfile) => {
    if (profile.gameResults.length === 0) return null;

    const totalGames = profile.gameResults.length;
    const averageScore = Math.round(
      profile.gameResults.reduce((sum, result) => sum + result.score, 0) / totalGames
    );
    const totalErrors = profile.gameResults.reduce((sum, result) => sum + result.errors, 0);
    const averageTime = Math.round(
      profile.gameResults.reduce((sum, result) => sum + result.timeSpent, 0) / totalGames
    );

    // Analyze patterns
    const memoryGames = profile.gameResults.filter(r => r.gameType === 'Jogo da Memória');
    const patternGames = profile.gameResults.filter(r => r.gameType === 'Jogo de Sequências');
    const colorGames = profile.gameResults.filter(r => r.gameType === 'Jogo das Cores');

    const memoryAvg = memoryGames.length > 0 
      ? Math.round(memoryGames.reduce((sum, r) => sum + r.score, 0) / memoryGames.length)
      : 0;
    const patternAvg = patternGames.length > 0 
      ? Math.round(patternGames.reduce((sum, r) => sum + r.score, 0) / patternGames.length)
      : 0;
    const colorAvg = colorGames.length > 0 
      ? Math.round(colorGames.reduce((sum, r) => sum + r.score, 0) / colorGames.length)
      : 0;

    return {
      totalGames,
      averageScore,
      totalErrors,
      averageTime,
      memoryAvg,
      patternAvg,
      colorAvg,
      memoryGames: memoryGames.length,
      patternGames: patternGames.length,
      colorGames: colorGames.length,
    };
  };

  const printReport = () => {
    if (!selectedProfile) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const report = generateReport(selectedProfile);
    if (!report) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Relatório MindKids - ${selectedProfile.name}</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3B82F6; padding-bottom: 20px; }
          .section { margin-bottom: 30px; }
          .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .stat-card { background: #f3f4f6; padding: 15px; border-radius: 8px; }
          .disclaimer { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin-top: 30px; }
          .warning { color: #92400e; font-weight: bold; }
          h1 { color: #3B82F6; }
          h2 { color: #374151; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; }
          .observations { background: #eff6ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3B82F6; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🧠 MindKids - Relatório de Desenvolvimento</h1>
          <p><strong>Criança:</strong> ${selectedProfile.name}</p>
          <p><strong>Data do Relatório:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
          <p><strong>Período:</strong> ${new Date(selectedProfile.createdAt).toLocaleDateString('pt-BR')} até ${new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        <div class="section">
          <h2>📊 Estatísticas Gerais</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <h3>Total de Jogos</h3>
              <p style="font-size: 24px; margin: 0; color: #3B82F6;">${report.totalGames}</p>
            </div>
            <div class="stat-card">
              <h3>Pontuação Média</h3>
              <p style="font-size: 24px; margin: 0; color: #10B981;">${report.averageScore} pontos</p>
            </div>
            <div class="stat-card">
              <h3>Total de Erros</h3>
              <p style="font-size: 24px; margin: 0; color: #EF4444;">${report.totalErrors}</p>
            </div>
            <div class="stat-card">
              <h3>Tempo Médio</h3>
              <p style="font-size: 24px; margin: 0; color: #8B5CF6;">${report.averageTime} segundos</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>🎮 Desempenho por Jogo</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <h3>Jogo da Memória</h3>
              <p>Jogos realizados: ${report.memoryGames}</p>
              <p>Média: ${report.memoryAvg} pontos</p>
            </div>
            <div class="stat-card">
              <h3>Jogo de Sequências</h3>
              <p>Jogos realizados: ${report.patternGames}</p>
              <p>Média: ${report.patternAvg} pontos</p>
            </div>
            <div class="stat-card">
              <h3>Jogo das Cores</h3>
              <p>Jogos realizados: ${report.colorGames}</p>
              <p>Média: ${report.colorAvg} pontos</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>🔍 Observações Educativas</h2>
          <div class="observations">
            <h3>Habilidades Desenvolvidas:</h3>
            <ul>
              ${report.memoryGames > 0 ? '<li><strong>Memória Visual:</strong> Trabalhada através do Jogo da Memória</li>' : ''}
              ${report.patternGames > 0 ? '<li><strong>Memória Sequencial:</strong> Desenvolvida no Jogo de Sequências</li>' : ''}
              ${report.colorGames > 0 ? '<li><strong>Reconhecimento de Cores:</strong> Praticado no Jogo das Cores</li>' : ''}
            </ul>
            
            <h3>Pontos de Atenção:</h3>
            <ul>
              ${report.averageScore < 50 ? '<li>Pontuação abaixo da média - considere mais prática</li>' : ''}
              ${report.totalErrors > report.totalGames * 2 ? '<li>Muitos erros - pode indicar necessidade de mais tempo ou explicações</li>' : ''}
              ${report.averageTime > 60 ? '<li>Tempo elevado para completar jogos - normal para aprendizado</li>' : ''}
            </ul>
            
            <h3>Recomendações:</h3>
            <ul>
              <li>Continue praticando regularmente para melhores resultados</li>
              <li>Varie os tipos de jogos para desenvolvimento abrangente</li>
              <li>Celebre os progressos, por menores que sejam</li>
              <li>Consulte profissionais especializados para avaliação completa</li>
            </ul>
          </div>
        </div>

        <div class="disclaimer">
          <h3 class="warning">⚠️ IMPORTANTE - APENAS FINS EDUCATIVOS</h3>
          <p><strong>Este relatório é baseado em jogos educativos e NÃO constitui diagnóstico médico.</strong></p>
          <p>Os dados apresentados servem apenas como observações sobre o desenvolvimento de habilidades cognitivas básicas através de atividades lúdicas.</p>
          <p>Para avaliação profissional e diagnósticos, consulte sempre pediatras, psicólogos ou outros profissionais de saúde especializados.</p>
          <p><strong>MindKids é uma ferramenta educativa complementar, não substitui acompanhamento profissional.</strong></p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };

  if (profiles.length === 0) {
    return (
      <div className="text-center py-16">
        <FileText className="h-24 w-24 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Nenhum Relatório Disponível</h2>
        <p className="text-gray-600">Crie um perfil e jogue alguns jogos para gerar relatórios!</p>
      </div>
    );
  }

  const report = selectedProfile ? generateReport(selectedProfile) : null;

  return (
    <div className="space-y-8">
      {/* Disclaimer */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-amber-800">
              Relatórios Educativos - Não são Diagnósticos Médicos
            </h3>
            <p className="mt-1 text-sm text-amber-700">
              Os relatórios apresentam observações sobre o desenvolvimento de habilidades através de jogos. 
              Para avaliações profissionais, consulte pediatras ou psicólogos especializados.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Relatórios de Desenvolvimento</h1>
          {selectedProfile && report && (
            <button
              onClick={printReport}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Imprimir Relatório
            </button>
          )}
        </div>
        
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
                  {profile.gameResults.length} jogos realizados
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedProfile && report && (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800">Total de Jogos</h3>
              <p className="text-3xl font-bold text-blue-600">{report.totalGames}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800">Pontuação Média</h3>
              <p className="text-3xl font-bold text-green-600">{report.averageScore}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800">Total de Erros</h3>
              <p className="text-3xl font-bold text-red-600">{report.totalErrors}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Brain className="h-12 w-12 text-purple-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800">Tempo Médio</h3>
              <p className="text-3xl font-bold text-purple-600">{report.averageTime}s</p>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Análise Detalhada</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-3">Jogo da Memória</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Jogos:</span>
                    <span className="font-semibold">{report.memoryGames}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Média:</span>
                    <span className="font-semibold">{report.memoryAvg} pts</span>
                  </div>
                  <div className="mt-3 text-xs text-purple-700">
                    <strong>Habilidade:</strong> Memória Visual
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-3">Jogo de Sequências</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Jogos:</span>
                    <span className="font-semibold">{report.patternGames}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Média:</span>
                    <span className="font-semibold">{report.patternAvg} pts</span>
                  </div>
                  <div className="mt-3 text-xs text-blue-700">
                    <strong>Habilidade:</strong> Memória Sequencial
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-3">Jogo das Cores</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Jogos:</span>
                    <span className="font-semibold">{report.colorGames}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Média:</span>
                    <span className="font-semibold">{report.colorAvg} pts</span>
                  </div>
                  <div className="mt-3 text-xs text-green-700">
                    <strong>Habilidade:</strong> Reconhecimento Visual
                  </div>
                </div>
              </div>
            </div>

            {/* Observations */}
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Observações Educativas</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Pontos Fortes:</h4>
                  <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
                    {report.averageScore >= 70 && <li>Boa performance geral nos jogos</li>}
                    {report.memoryAvg >= 70 && <li>Excelente memória visual</li>}
                    {report.patternAvg >= 70 && <li>Boa capacidade de reconhecimento de padrões</li>}
                    {report.colorAvg >= 70 && <li>Ótimo reconhecimento de cores</li>}
                    {report.averageTime <= 30 && <li>Resposta rápida aos estímulos</li>}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Áreas para Desenvolvimento:</h4>
                  <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
                    {report.averageScore < 50 && <li>Pontuação pode melhorar com mais prática</li>}
                    {report.totalErrors > report.totalGames * 2 && <li>Reduzir erros com mais atenção</li>}
                    {report.averageTime > 60 && <li>Pode trabalhar a velocidade de resposta</li>}
                    {report.memoryAvg < 50 && <li>Treinar mais a memória visual</li>}
                    {report.patternAvg < 50 && <li>Desenvolver reconhecimento de sequências</li>}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Recomendações:</h4>
                  <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
                    <li>Continue praticando regularmente</li>
                    <li>Varie os tipos de atividades</li>
                    <li>Celebre cada progresso</li>
                    <li>Para avaliação completa, consulte profissionais especializados</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedProfile && !report && (
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Nenhum Jogo Realizado</h3>
          <p className="text-gray-600">
            {selectedProfile.name} ainda não jogou nenhum jogo. 
            Comece jogando para gerar relatórios!
          </p>
        </div>
      )}
    </div>
  );
}