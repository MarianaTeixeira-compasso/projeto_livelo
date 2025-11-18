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
              <div className="user-stories-bg">
                <div className="prompt-base-block install-empty-box"></div>
              </div>
              <button className="copy-button" onClick={handleCopy}>
                Copiar instalação
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptModal;