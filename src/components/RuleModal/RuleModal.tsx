import { useState } from 'react';
import './RuleModal.scss';

interface RuleModalProps {
  rule: any;
  onClose: () => void;
}

const RuleModal = ({ rule, onClose }: RuleModalProps) => {
  const [modalTab, setModalTab] = useState<'rule' | 'installation'>('rule');
  const [copied, setCopied] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);

  const handleCopyContent = () => {
    const content = [
      rule.title,
      rule.details.subtitle,
      rule.details.overview,
      (rule.details.structure || rule.details.guidelines).join('\n'),
      rule.details.benefits.join('\n'),
      rule.details.howToImplement.join('\n')
    ].filter(Boolean).join('\n\n');
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyInstallation = () => {
    const fileName = rule.title === 'Amazon Q Learning Files' ? 'amazon-q-learning-files.md' : 'markdown-best-practices.md';
    const urlPath = rule.title === 'Amazon Q Learning Files' ? 'amazon-q-learning-files' : 'markdown-best-practices';
    const content = `🚀 Como Instalar

Método 1: Download Automático

mkdir -p .amazonq/rules && curl -o .amazonq/rules/${fileName} https://promptz.dev/rules/general/${urlPath}/

Método 2: Criação Manual

1. Criar estrutura: mkdir -p .amazonq/rules && touch .amazonq/rules/${fileName}
2. Adicionar conteúdo da rule no arquivo

✅ Resultado Esperado

${rule.title === 'Amazon Q Learning Files' ? 
  '- Rule aparece na lista de rules ativas do Amazon Q\n- Amazon Q começa a seguir as convenções automaticamente\n- Sugestões ficam mais consistentes com os padrões' : 
  '- Documentação consistente em todo projeto\n- Amazon Q segue padrões automaticamente\n- Linter valida qualidade dos arquivos'}`;
    navigator.clipboard.writeText(content);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{rule.title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-tabs">
          <span 
            className={`modal-tab ${modalTab === 'rule' ? 'active' : ''}`}
            onClick={() => setModalTab('rule')}
          >
            Prompt
          </span>
          <span 
            className={`modal-tab ${modalTab === 'installation' ? 'active' : ''}`}
            onClick={() => setModalTab('installation')}
          >
            Installation
          </span>
        </div>
        
        <div className="modal-body">
          {modalTab === 'rule' ? (
            <>
              <div className="user-stories-bg prompt-base-block">
                <h3>📚 {rule.title}</h3>
                <p>{rule.details.subtitle}</p>
                
                <div className="rule-content">
                  {rule.details.overview.split(/\n\n(?=[📚🎯📁🚀📝🏷️📄📑✏️📋💻🔗📊📏])/).map((section: string, idx: number) => {
                    const lines = section.split('\n').filter((l: string) => l.trim());
                    if (lines.length === 0) return null;
                    
                    if (idx === 0 && lines.length <= 2 && (lines[0].includes('Guia de Estilo Markdown') || lines[0].includes('Amazon Q Learning Files') || lines[0].match(/^📚/))) {
                      return null;
                    }
                    
                    return (
                      <div key={idx} className="modal-section">
                        {lines.map((line: string, lineIdx: number) => {
                          if (line.match(/^[📚🎯📁🚀📝🏷️📄📑✏️📋💻🔗📊📏]/)) {
                            return <h3 key={lineIdx} className="section-heading">{line}</h3>;
                          }
                          if (line.match(/^(Regras Básicas|Exemplo|Diretrizes|Regras|Formato|Citações|Linhas Horizontais|HTML Inline|Princípios|Checklist de Qualidade)$/)) {
                            return <h4 key={lineIdx} className="subsection-heading">{line}</h4>;
                          }
                          if (line.startsWith('|')) {
                            return <pre key={lineIdx} className="table-line">{line}</pre>;
                          }
                          if (line.startsWith('q-learning-') || line.match(/^(#|##|###|-|\d\.|>|---|```|\*\*|__)/)) {
                            return <pre key={lineIdx} className="code-line">{line}</pre>;
                          }
                          if (line.startsWith('[ ]')) {
                            return <div key={lineIdx} className="checkbox-item">{line}</div>;
                          }
                          if (line.startsWith('•')) {
                            return <div key={lineIdx} className="bullet-item">{line}</div>;
                          }
                          if (line.includes(':') && !line.startsWith('>')) {
                            const parts = line.split(':');
                            if (parts.length === 2) {
                              return <div key={lineIdx} className="definition-item"><strong>{parts[0]}:</strong>{parts[1]}</div>;
                            }
                          }
                          return <p key={lineIdx} className="regular-text">{line}</p>;
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <button className="copy-button" onClick={handleCopyContent}>
                {copied ? 'Copiado!' : 'Copiar conteúdo'}
              </button>
            </>
          ) : (
            <>
              <div className="user-stories-bg prompt-base-block">
                <h3>🚀 Como Instalar</h3>
                
                <div className="modal-section">
                  <h4>Método 1: Download Automático</h4>
                  <pre className="code-block">{`# Criar pasta de rules e baixar arquivo
mkdir -p .amazonq/rules && curl -o .amazonq/rules/${rule.title === 'Amazon Q Learning Files' ? 'amazon-q-learning-files.md' : 'markdown-best-practices.md'} https://promptz.dev/rules/general/${rule.title === 'Amazon Q Learning Files' ? 'amazon-q-learning-files' : 'markdown-best-practices'}/`}</pre>
                </div>

                <div className="modal-section">
                  <h4>Método 2: Criação Manual</h4>
                  <ol className="feature-steps">
                    <li>Crie a estrutura:
                      <pre className="code-block">{`mkdir -p .amazonq/rules
touch .amazonq/rules/${rule.title === 'Amazon Q Learning Files' ? 'amazon-q-learning-files.md' : 'markdown-best-practices.md'}`}</pre>
                    </li>
                    <li>Adicione o conteúdo da rule no arquivo</li>
                  </ol>
                </div>

                <div className="modal-section">
                  <h4>✅ Resultado Esperado</h4>
                  <ul>
                    {rule.title === 'Amazon Q Learning Files' ? (
                      <>
                        <li>Rule aparece na lista de rules ativas do Amazon Q</li>
                        <li>Amazon Q começa a seguir as convenções automaticamente</li>
                        <li>Sugestões ficam mais consistentes com os padrões</li>
                      </>
                    ) : (
                      <>
                        <li>Documentação consistente em todo projeto</li>
                        <li>Amazon Q segue padrões automaticamente</li>
                        <li>Linter valida qualidade dos arquivos</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              <button className="copy-button" onClick={handleCopyInstallation}>
                {copiedInstall ? 'Copiado!' : 'Copiar instalação'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RuleModal;