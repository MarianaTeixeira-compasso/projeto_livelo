import { useState } from 'react';
import './PromptModal.scss';

interface PromptModalProps {
  prompt: any;
  onClose: () => void;
}

const PromptModal = ({ prompt, onClose }: PromptModalProps) => {
  const [modalTab, setModalTab] = useState<'rule' | 'installation'>('rule');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const content = [
      `📊 ${prompt.title}`,
      prompt.details.context,
      prompt.details.objective,
      prompt.details.strategy || prompt.details.promptContent,
      prompt.details.results ? prompt.details.results.join('\n') : '',
      prompt.details.tags ? prompt.details.tags.join(' ') : ''
    ].filter(Boolean).join('\n\n');
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{prompt.title}</h2>
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
        
        <div className="modal-body modal-body-compact">
          {modalTab === 'rule' ? (
            <>
              <div className="user-stories-bg prompt-base-block">
                <div className="modal-title-with-icon">
                  <span style={{fontSize: '2.5rem', lineHeight: 1}}>⚙️</span>
                  <h3>{prompt.details.subtitle}</h3>
                </div>
                
                <div className="modal-section">
                  <h4>📝 Estratégia</h4>
                  <pre className="code-block">{prompt.details.strategy || prompt.details.promptContent}</pre>
                </div>

                {prompt.details.results && (
                  <div className="modal-section">
                    <h4>📊 Resultados</h4>
                    <ul>
                      {prompt.details.results.map((r: string, i: number) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button className="copy-button" onClick={handleCopy}>
                {copied ? 'Copiado!' : 'Copiar conteúdo'}
              </button>
            </>
          ) : (
            <>
              <div className="user-stories-bg prompt-base-block">
                {prompt.details.installation ? (
                  <div className="modal-section">
                    <div className="installation-content">
                      {prompt.details.installation.split(/\n\n(?=[🚀✅💡]|Pré-requisitos|Setup Inicial|Execução)/).map((section: string, idx: number) => {
                        const lines = section.split('\n').filter((l: string) => l.trim());
                        if (lines.length === 0) return null;
                        
                        return (
                          <div key={idx} className="modal-section">
                            {lines.map((line: string, lineIdx: number) => {
                              if (line.match(/^[🚀✅💡]/) || line.match(/^(Pré-requisitos|Setup Inicial|Execução)$/)) {
                                return <h3 key={lineIdx} className="section-heading">{line}</h3>;
                              }
                              if (line.match(/^[1-3]️⃣/)) {
                                return <h4 key={lineIdx} className="subsection-heading">{line}</h4>;
                              }
                              if (line.startsWith('•')) {
                                return <div key={lineIdx} className="bullet-item">{line}</div>;
                              }
                              if (line.includes('=') && (line.includes('bucket_name') || line.includes('container_name'))) {
                                return <pre key={lineIdx} className="code-line">{line}</pre>;
                              }
                              if (line.startsWith('Sou tech lead') || line.startsWith('Ótimo resultado') || line.startsWith('Agora crie')) {
                                return <pre key={lineIdx} className="code-block">{line}</pre>;
                              }
                              return <p key={lineIdx} className="regular-text">{line}</p>;
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="prompt-base-block install-empty-box">
                    <p>Conteúdo de instalação não disponível para este prompt.</p>
                  </div>
                )}
              </div>
              <button className="copy-button" onClick={() => {
                if (prompt.details.installation) {
                  navigator.clipboard.writeText(prompt.details.installation);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }
              }}>
                {copied ? 'Copiado!' : 'Copiar instalação'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptModal;