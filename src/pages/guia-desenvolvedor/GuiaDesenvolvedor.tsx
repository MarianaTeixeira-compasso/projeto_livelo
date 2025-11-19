import { useState } from 'react';
import { Rocket, TestTube, Settings, Bot, Wrench, FileText, Code2, Activity } from 'lucide-react';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import FeatureModal from '../../components/FeatureModal/FeatureModal';
import { featuresDetails } from '../../data/features';
import './GuiaDesenvolvedor.scss';

const GuiaDesenvolvedor = () => {
  const [guideTab, setGuideTab] = useState<'overview' | 'features' | 'setup' | 'troubleshooting' | 'sdlc'>('overview');
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  return (
    <div className="guia-page dev-guide">
      <div className="guide-hero">
        <h1 className="guide-title">
          {/* Rocket emoji removido, apenas SVG permanece */}
          <span style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 6, marginRight: 6 }}>
            <Rocket size={32} color="#111827" strokeWidth={2.2} />
          </span>
          Guia do Desenvolvedor
        </h1>
        <p className="guide-subtitle">Guia completo de IA para desenvolvimento na Livelo</p>
        <div className="guide-tabs">
          <span className={`tab-pill ${guideTab === 'overview' ? 'active' : ''}`} onClick={() => setGuideTab('overview')}>📘 Overview</span>
          <span className={`tab-pill ${guideTab === 'features' ? 'active' : ''}`} onClick={() => setGuideTab('features')}>⚡ Features</span>
          <span className={`tab-pill ${guideTab === 'setup' ? 'active' : ''}`} onClick={() => setGuideTab('setup')}>⚙️ Setup</span>
          <span className={`tab-pill ${guideTab === 'troubleshooting' ? 'active' : ''}`} onClick={() => setGuideTab('troubleshooting')}>🆘 Troubleshooting</span>
          <span className={`tab-pill ${guideTab === 'sdlc' ? 'active' : ''}`} onClick={() => setGuideTab('sdlc')}>📊 IA no SDLC</span>
        </div>
      </div>

      {guideTab === 'overview' && (
        <>
          <section className="guide-section">
            <h2>O que é Amazon Q Developer?</h2>
            <p>Amazon Q Developer é a ferramenta de IA da AWS para desenvolvimento de software. É um assistente inteligente que acelera o desenvolvimento através de:</p>
            <div className="info-grid">
              <div className="info-card">
                <h3>Geração de Código</h3>
                <p>Cria código baseado em descrições naturais</p>
              </div>
              <div className="info-card">
                <h3>Documentação</h3>
                <p>Gera documentação automática do código</p>
              </div>
              <div className="info-card">
                <h3>Testes</h3>
                <p>Cria testes unitários e de integração</p>
              </div>
              <div className="info-card">
                <h3>Debug</h3>
                <p>Ajuda a identificar e corrigir problemas</p>
              </div>
            </div>
          </section>

          <section className="guide-section">
            <h2>Features Principais</h2>
            <div className="feature-cards-grid">
              {featuresDetails.map((feature, idx) => (
                <FeatureCard 
                  key={idx} 
                  {...feature} 
                  onClick={() => setSelectedFeature(idx)}
                />
              ))}
            </div>
          </section>

          <section className="guide-section">
            <h2>Getting Started</h2>
            <div className="steps">
              <div className="step-card">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Instale o Amazon Q</h4>
                  <p><span className="label-gray">VS Code:</span> Extensão "Amazon Q"</p>
                  <p><span className="label-gray">IntelliJ:</span> Plugin "Amazon Q"</p>
                </div>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Configure Acesso</h4>
                  <p><span className="label-gray">URL:</span> https://auth-livelo.awsapps.com/start</p>
                  <p><span className="label-gray">Região:</span> sa-east-1</p>
                </div>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Comece a Usar</h4>
                  <p>"Explique este código"</p>
                  <p>"Crie testes para esta classe"</p>
                </div>
              </div>
            </div>
          </section>

          <section className="guide-section">
            <h2>Métricas de Uso na Livelo</h2>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-value">190</div>
                <div className="metric-label">Usuários Ativos</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">3</div>
                <div className="metric-label">Prompts Validados</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">1</div>
                <div className="metric-label">MCPs Integrados</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">80%</div>
                <div className="metric-label">Economia de Tempo</div>
              </div>
            </div>
          </section>
        </>
      )}

      {guideTab === 'features' && (
        <section className="guide-section">
          <h2>
            <span style={{ verticalAlign: 'middle', marginRight: 8 }}>⚡</span>
            Features Principais
          </h2>
          <div className="feature-cards-grid">
              <div className="feature-card">
                <div className="feature-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span className="emoji" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                    <svg className="chat-icon-svg" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 21.5C4.5 19.5 2.5 16.5 2.5 13C2.5 7.75 7.25 3.5 14 3.5C20.75 3.5 25.5 7.75 25.5 13C25.5 18.25 20.75 22.5 14 22.5C13.1 22.5 12.22 22.42 11.37 22.27C10.7 22.15 9.99 22.19 9.36 22.41L7.5 23V21.5Z" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <h3 style={{ marginTop: 6 }}>Chat e Conversação</h3>
                </div>
                <p>Interação natural com código para explicações, geração e debug</p>
                <div className="chip-row">
                  <span className="chip" style={{ color: '#7E0543', fontWeight: 'bold' }}>Linguagem natural</span>
                  <span className="chip" style={{ color: '#7E0543', fontWeight: 'bold' }}>Contexto inteligente</span>
                  <span className="chip" style={{ color: '#7E0543', fontWeight: 'bold' }}>Comandos especiais</span>
                </div>
              </div>
            <div className="feature-card">
              <div className="feature-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span className="emoji" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                  <TestTube size={28} strokeWidth={2} className="feature-icon test-icon-svg" />
                </span>
                <h3 style={{ marginTop: 6 }}>Testes Unitários</h3>
              </div>
              <p>Geração automática de testes para acelerar desenvolvimento</p>
              <div className="chip-row">
                <span className="chip" style={{ color: '#7E0543', fontWeight: 'bold' }}>Geração automática</span>
                <span className="chip" style={{ color: '#7E0543', fontWeight: 'bold' }}>Mocks inteligentes</span>
                <span className="chip" style={{ color: '#7E0543', fontWeight: 'bold' }}>Múltiplos frameworks</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span className="emoji" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                  <Settings size={28} strokeWidth={2} className="feature-icon rules-icon-svg" />
                </span>
                <h3 style={{ marginTop: 6 }}>Rules</h3>
              </div>
              <p>Define padrões automaticamente para garantir consistência no time</p>
              <div className="chip-row">
                <span className="chip" style={{ color: '#7E0543', fontWeight: 'bold' }}>Padrões automáticos</span>
                <span className="chip" style={{ color: '#7E0543', fontWeight: 'bold' }}>Arquivos Markdown</span>
                <span className="chip" style={{ color: '#7E0543', fontWeight: 'bold' }}>Contexto global</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span className="emoji" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                  <Bot size={28} strokeWidth={2} className="feature-icon custom-agents-icon-svg" />
                </span>
                <h3 style={{ marginTop: 6 }}>Custom Agents</h3>
              </div>
              <p>Assistentes personalizáveis para workflows especializados</p>
              <div className="chip-row">
                <span className="chip" style={{ color: '#7E0543', fontWeight: 'bold' }}>Workflows específicos</span>
                <span className="chip" style={{ color: '#7E0543', fontWeight: 'bold' }}>Ferramentas pré-configuradas</span>
                <span className="chip" style={{ color: '#7E0543', fontWeight: 'bold' }}>Contexto personalizado</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span className="emoji" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                  <Wrench size={28} strokeWidth={2} className="feature-icon customizacao-icon-svg" />
                </span>
                <h3 style={{ marginTop: 6 }}>Customização</h3>
              </div>
              <p>Personalize o Amazon Q com seu código organizacional</p>
              <div className="chip-row">
                <span className="chip" style={{ color: '#7E0543', fontWeight: 'bold' }}>Código organizacional</span>
                <span className="chip" style={{ color: '#7E0543', fontWeight: 'bold' }}>Sugestões personalizadas</span>
                <span className="chip" style={{ color: '#7E0543', fontWeight: 'bold' }}>Integração com repositórios</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {guideTab === 'setup' && (
        <section className="guide-section">
          <h2><span className="emoji">⚙️</span> Instalação e Setup</h2>
          <div className="setup-grid">
            <div className="setup-card">
              <div className="setup-header">
                <span className="emoji">🔧</span>
                <h3>VS Code</h3>
              </div>
              <ol className="setup-steps">
                <li>Abra o VS Code</li>
                <li>Vá em Extensions (Ctrl+Shift+X)</li>
                <li>Busque por 'Amazon Q'</li>
                <li>Clique em 'Install'</li>
              </ol>
              <div className="config-box">
                <h4>Configuração:</h4>
                <p><span className="label-gray">URL:</span> https://auth-livelo.awsapps.com/start</p>
                <p><span className="label-gray">Região:</span> sa-east-1</p>
              </div>
            </div>

            <div className="setup-card">
              <div className="setup-header">
                <span className="emoji">💻</span>
                <h3>IntelliJ/PyCharm</h3>
              </div>
              <ol className="setup-steps">
                <li>File → Settings</li>
                <li>Plugins → Marketplace</li>
                <li>Busque 'Amazon Q'</li>
                <li>Install e restart</li>
              </ol>
            </div>

            <div className="setup-card">
              <div className="setup-header">
                <span className="emoji">💻</span>
                <h3>CLI</h3>
              </div>
              <div className="cli-section">
                <h4>Instalação:</h4>
                <div className="code-snippet">
                  <code>npm install -g @aws/amazon-q-developer-cli</code>
                </div>
                <div className="code-snippet">
                  <code>brew install amazon-q-cli</code>
                </div>
              </div>
              <div className="cli-section">
                <h4>Configuração:</h4>
                <div className="code-snippet">
                  <code>q auth login</code>
                </div>
                <div className="code-snippet">
                  <code>q configure set region sa-east-1</code>
                </div>
                <div className="code-snippet">
                  <code>q chat</code>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {guideTab === 'troubleshooting' && (
        <section className="guide-section">
          <h2><span className="emoji">🔧</span> Troubleshooting</h2>
          
          <div className="troubleshoot-category">
            <h3>Autenticação</h3>
            <div className="troubleshoot-item">
              <div className="problem">
                <strong>Problema:</strong> Amazon Q não conecta
              </div>
              <div className="solution">
                <strong>Solução:</strong> q auth logout && q auth clear-cache && q auth login
              </div>
            </div>
            <div className="troubleshoot-item">
              <div className="problem">
                <strong>Problema:</strong> Token expirado
              </div>
              <div className="solution">
                <strong>Solução:</strong> Configure refresh automático e verifique conectividade
              </div>
            </div>
          </div>

          <div className="troubleshoot-category">
            <h3>IDE</h3>
            <div className="troubleshoot-item">
              <div className="problem">
                <strong>Problema:</strong> Extensão não carrega
              </div>
              <div className="solution">
                <strong>Solução:</strong> Reinstalar extensão e reiniciar IDE
              </div>
            </div>
            <div className="troubleshoot-item">
              <div className="problem">
                <strong>Problema:</strong> Sugestões não aparecem
              </div>
              <div className="solution">
                <strong>Solução:</strong> Verificar tamanho do arquivo e adicionar contexto
              </div>
            </div>
          </div>

          <div className="troubleshoot-category">
            <h3>Performance</h3>
            <div className="troubleshoot-item">
              <div className="problem">
                <strong>Problema:</strong> Respostas lentas
              </div>
              <div className="solution">
                <strong>Solução:</strong> Reduzir contexto e fechar arquivos desnecessários
              </div>
            </div>
            <div className="troubleshoot-item">
              <div className="problem">
                <strong>Problema:</strong> Alto uso de recursos
              </div>
              <div className="solution">
                <strong>Solução:</strong> Configurar limites de arquivos e análise
              </div>
            </div>
          </div>
        </section>
      )}

      {guideTab === 'sdlc' && (
        <section className="guide-section sdlc-section">
          <h2><span className="emoji">📊</span> IA no SDLC</h2>
          <p className="sdlc-subtitle">Como usar IA em cada etapa do ciclo de desenvolvimento</p>
          
          <div className="sdlc-carousel">
            <div className="sdlc-card">
              <div className="sdlc-header">
                <div className="sdlc-icon" style={{background: '#ff0080'}}>
                  <FileText size={32} color="#fff" strokeWidth={2.2} />
                </div>
                <div className="sdlc-title-group">
                  <h3>Refinamento da Atividade</h3>
                  <span className="efficiency-badge">~60% mais rápido</span>
                </div>
              </div>
              <div className="sdlc-tools">
                <div className="tool-item">
                  <span style={{ fontWeight: 'bold' }}>MCP Jira</span>
                  <span className="tool-icon">🔌</span>
                </div>
                <div className="tool-item">
                  <span style={{ fontWeight: 'bold' }}>Prompts de análise</span>
                  <span className="tool-icon">📝</span>
                </div>
                <div className="tool-item">
                  <span style={{ fontWeight: 'bold' }}>Amazon Q Chat</span>
                  <span className="tool-icon">⚡</span>
                </div>
                <div className="tool-item">
                  <span style={{ fontWeight: 'bold' }}>Critérios de aceite</span>
                  <span className="tool-icon">📝</span>
                </div>
              </div>
            </div>

            <div className="sdlc-card">
              <div className="sdlc-header">
                <div className="sdlc-icon" style={{background: '#ff0080'}}>
                  <Code2 size={32} color="#fff" strokeWidth={2.2} />
                </div>
                <div className="sdlc-title-group">
                  <h3>Desenvolvimento</h3>
                  <span className="efficiency-badge">~80% economia</span>
                </div>
              </div>
              <div className="sdlc-tools">
                <div className="tool-item">
                  <span style={{ fontWeight: 'bold' }}>Amazon Q Code Gen</span>
                  <span className="tool-icon">⚡</span>
                </div>
                <div className="tool-item">
                  <span style={{ fontWeight: 'bold' }}>Rules (.amazonq/rules/)</span>
                  <span className="tool-icon">⚡</span>
                </div>
                <div className="tool-item">
                  <span style={{ fontWeight: 'bold' }}>Prompts customizados</span>
                  <span className="tool-icon">📝</span>
                </div>
                <div className="tool-item">
                  <span style={{ fontWeight: 'bold' }}>Análise de estrutura</span>
                  <span className="tool-icon">⚡</span>
                </div>
              </div>
            </div>

            <div className="sdlc-card">
              <div className="sdlc-header">
                <div className="sdlc-icon" style={{background: '#ff0080'}}>
                  <TestTube size={32} color="#fff" strokeWidth={2.2} />
                </div>
                <div className="sdlc-title-group">
                  <h3>Testes</h3>
                  <span className="efficiency-badge">~70% mais rápido</span>
                </div>
              </div>
              <div className="sdlc-tools">
                <div className="tool-item">
                  <span style={{ fontWeight: 'bold' }}>Testes unitários auto</span>
                  <span className="tool-icon">⚡</span>
                </div>
                <div className="tool-item">
                  <span style={{ fontWeight: 'bold' }}>Cypress automation</span>
                  <span className="tool-icon">📝</span>
                </div>
                <div className="tool-item">
                  <span style={{ fontWeight: 'bold' }}>Cobertura de testes</span>
                  <span className="tool-icon">📝</span>
                </div>
                <div className="tool-item">
                  <span style={{ fontWeight: 'bold' }}>Amazon Q Test Gen</span>
                  <span className="tool-icon">⚡</span>
                </div>
              </div>
            </div>

            <div className="sdlc-card">
              <div className="sdlc-header">
                <div className="sdlc-icon" style={{background: '#ff0080'}}>
                  <Activity size={32} color="#fff" strokeWidth={2.2} />
                </div>
                <div className="sdlc-title-group">
                  <h3>Monitoramento</h3>
                  <span className="efficiency-badge">~50% mais rápido</span>
                </div>
              </div>
              <div className="sdlc-tools">
                <div className="tool-item">
                  <span style={{ fontWeight: 'bold' }}>MCP Dynatrace</span>
                  <span className="tool-icon">🔌</span>
                </div>
                <div className="tool-item">
                  <span style={{ fontWeight: 'bold' }}>Dashboard prompts</span>
                  <span className="tool-icon">📝</span>
                </div>
                <div className="tool-item">
                  <span style={{ fontWeight: 'bold' }}>Análise de logs</span>
                  <span className="tool-icon">⚡</span>
                </div>
                <div className="tool-item">
                  <span style={{ fontWeight: 'bold' }}>Investigação incidentes</span>
                  <span className="tool-icon">📝</span>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-progress">
            <div className="progress-bar"></div>
          </div>

          <div className="sdlc-legend">
            <h4>Legenda:</h4>
            <div className="legend-items">
              <div className="legend-item">
                <span className="legend-icon">🔌</span>
                <span>MCP (Model Context Protocol)</span>
              </div>
              <div className="legend-item">
                <span className="legend-icon">🎨</span>
                <span>Prompt Validado</span>
              </div>
              <div className="legend-item">
                <span className="legend-icon">⚡</span>
                <span>Feature Amazon Q</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {selectedFeature !== null && (
        <FeatureModal
          feature={featuresDetails[selectedFeature]}
          onClose={() => setSelectedFeature(null)}
        />
      )}
    </div>
  );
};

export default GuiaDesenvolvedor;