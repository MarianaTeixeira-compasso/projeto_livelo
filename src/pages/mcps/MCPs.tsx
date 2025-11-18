import { useState } from 'react';
import McpCard from '../../components/McpCard/McpCard';
import McpModal from '../../components/McpModal/McpModal';
import { mcps } from '../../data/mcps';
import './MCPs.scss';

const MCPs = () => {
  const [selectedMcp, setSelectedMcp] = useState<number | null>(null);

  return (
    <div className="mcps-page">
      <div className="page-header">
        <h1>Catálogo MCP</h1>
        <p>Model Context Protocols disponíveis para integração com Amazon Q</p>
      </div>

      <section className="mcp-section">
        <h2 className="section-title">MCPs Homologados</h2>
        <p className="section-subtitle">MCPs testados e aprovados para uso na Livelo.</p>
        
        <div className="mcp-cards-grid">
          {mcps.filter(m => m.status === 'Homologado').map((mcp, idx) => (
            <McpCard 
              key={idx} 
              {...mcp} 
              onClick={() => setSelectedMcp(mcps.findIndex(m => m.title === mcp.title))} 
            />
          ))}
        </div>
      </section>

      <section className="mcp-section">
        <h2 className="section-title">Em Exploração</h2>
        <p className="section-subtitle">MCPs sendo testados pela equipe.</p>
        
        <div className="mcp-cards-grid">
          {mcps.filter(m => m.status === 'Em teste').map((mcp, idx) => (
            <McpCard 
              key={idx} 
              {...mcp} 
              onClick={() => setSelectedMcp(mcps.findIndex(m => m.title === mcp.title))} 
            />
          ))}
        </div>
      </section>

      <section className="mcp-section quick-start">
        <h2 className="section-title">Quick Start</h2>
        
        <div className="quick-start-grid">
          <div className="quick-start-card">
            <h3>1. Escolha um MCP</h3>
            <p>Clique em um MCP acima para ver o guia de configuração.</p>
          </div>

          <div className="quick-start-card">
            <h3>2. Siga o guia de setup</h3>
            <p>Cada MCP tem instruções detalhadas de configuração.</p>
          </div>

          <div className="quick-start-card">
            <h3>3. Teste a integração</h3>
            <p>Exemplo: "Liste as issues do sprint atual do projeto LIV"</p>
          </div>
        </div>
      </section>

      {selectedMcp !== null && (
        <McpModal
          mcp={mcps[selectedMcp]}
          onClose={() => setSelectedMcp(null)}
        />
      )}
    </div>
  );
};

export default MCPs;