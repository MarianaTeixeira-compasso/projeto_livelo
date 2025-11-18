import { useState } from 'react';
import './PlaybookModal.scss';

interface PlaybookModalProps {
  playbook: any;
  onClose: () => void;
}

const PlaybookModal = ({ playbook, onClose }: PlaybookModalProps) => {
  const [modalTab, setModalTab] = useState<'rule' | 'installation'>('rule');
  const [copied, setCopied] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);

  const handleCopyContent = () => {
    const content = [
      playbook.details.objective,
      playbook.details.whenToUse.join('\n'),
      playbook.details.promptBase,
      playbook.details.example
    ].join('\n\n');
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyInstallation = () => {
    navigator.clipboard.writeText('Instalação do playbook');
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{playbook.title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-tabs">
          <span 
            className={`modal-tab ${modalTab === 'rule' ? 'active' : ''}`}
            onClick={() => setModalTab('rule')}
          >
            Project Rule
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
              <div className="user-stories-bg prompt-base-block user-stories-expanded">
                <h3>
                  {['Sprint Planning com IA','Análise de Requisitos'].includes(playbook.title)
                    ? `${playbook.title} com IA`
                    : playbook.title === 'Análise de Feedback'
                      ? 'Análise de Feedback de Clientes'
                      : playbook.title === 'Refinamento de Backlog com IA'
                        ? 'Refinamento de Backlog com IA'
                        : `Como ${playbook.title}`
                  }
                </h3>
                
                <div className="modal-section">
                  <h4>Objetivo</h4>
                  <p>{playbook.details.objective}</p>
                </div>

                <div className="modal-section">
                  <h4>Quando Usar</h4>
                  <ul>
                    {playbook.details.whenToUse.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {playbook.details.promptBase.includes('\n---\n') ? (
                  (() => {
                    const parts = playbook.details.promptBase.split(/\n---\n/);
                    return (
                      <>
                        {parts.map((part: string, idx: number) => {
                          const lines = part.split('\n');
                          const heading = (lines[0] || 'Prompt').trim();
                          const content = lines.slice(1).join('\n').trim();
                          return (
                            <div className="modal-section" key={idx}>
                              <h4>{heading}</h4>
                              <pre className="code-block">{content}</pre>
                            </div>
                          );
                        })}
                      </>
                    );
                  })()
                ) : (
                  <div className="modal-section">
                    <h4>Prompt Base</h4>
                    <pre className="code-block">{playbook.details.promptBase}</pre>
                  </div>
                )}

                {playbook.details.example && (
                  <div className="modal-section">
                    <h4>Exemplo Prático</h4>
                    <div className="example-box">
                      <strong>Input:</strong>
                      <pre className="code-block">{playbook.details.example}</pre>
                    </div>
                  </div>
                )}

                {playbook.details.tips && playbook.details.tips.length > 0 && (
                  <div className="modal-section">
                    <h4>Dicas</h4>
                    <ul>
                      {playbook.details.tips.map((tip: string, i: number) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="modal-section time-section">
                  <h4>Tempo Economizado</h4>
                  <p className="efficiency-note">{playbook.details.timeEconomized}</p>
                </div>
              </div>

              <button className="copy-button" onClick={handleCopyContent}>
                {copied ? 'Copiado!' : 'Copiar conteúdo'}
              </button>
            </>
          ) : (
            <>
              <div className="user-stories-bg" style={{ padding: 0 }}>
                <div className="prompt-base-block install-empty-box"></div>
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

export default PlaybookModal;