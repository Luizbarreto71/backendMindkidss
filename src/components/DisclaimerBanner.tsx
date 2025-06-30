import React from 'react';
import { AlertTriangle, Puzzle } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-6 mb-8 rounded-r-xl shadow-lg">
      <div className="flex items-start">
        <div className="flex items-center mr-4">
          <AlertTriangle className="h-6 w-6 text-amber-500 mr-2" />
          <Puzzle className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-amber-800 mb-2">
            🧩 Importante: Plataforma Educativa - Não é Diagnóstico Médico
          </h3>
          <p className="text-amber-700 leading-relaxed">
            O <strong>MindKids</strong> é uma plataforma educativa premium que utiliza jogos interativos 
            para auxiliar pais e educadores na <strong>observação do desenvolvimento infantil</strong>. 
            <br /><br />
            <span className="font-semibold text-amber-800">
              ⚠️ Esta plataforma NÃO fornece diagnósticos médicos de autismo ou qualquer outra condição.
            </span>
            <br />
            Os relatórios gerados servem apenas como observações educativas sobre padrões de comportamento 
            e desenvolvimento cognitivo durante as atividades lúdicas.
            <br /><br />
            <strong>Para diagnósticos profissionais, sempre consulte pediatras, psicólogos ou 
            especialistas em desenvolvimento infantil.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}