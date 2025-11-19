import './FeatureModal.scss';

interface FeatureModalProps {
  feature: any;
  onClose: () => void;
}

const FeatureModal = ({ feature, onClose }: FeatureModalProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(feature.overview);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content feature-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-with-icon">
            <span className="emoji modal-emoji">{feature.icon}</span>
            <h2>{feature.title}</h2>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body modal-body-compact">
          <div className="user-stories-bg prompt-base-block user-stories-expanded">
            <h3>{feature.subtitle}</h3>
            
            {feature.overview.split(/\n\n(?=[🎯🚀💡📋⚙️🔧💻🔒🛠️📊📁🧪📝]|Abrir o Chat|Fazer Perguntas|Adicionar Contexto)/).map((section: string, idx: number) => {
              const lines = section.split('\n').filter((l: string) => l.trim());
              if (lines.length === 0) return null;
              
              return (
                <div key={idx} className="modal-section">
                  {lines.map((line: string, lineIdx: number) => {
                    if (line.match(/^[🎯🚀💡📋⚙️🔧💻🔒🛠️📊📁🧪📝]/)) {
                      return <h4 key={lineIdx}>{line}</h4>;
                    }
                    if (line.match(/^(Abrir o Chat|Fazer Perguntas|Adicionar Contexto|Explicação de Código|Geração de Código|Refatoração|Debug e Troubleshooting|Referências de Contexto|Comandos de Chat|Exemplo 1|Seja Específico|Forneça Contexto|Use Exemplos|Tipos de Perguntas Mais Comuns|Taxa de Satisfação)$/)) {
                      return <h4 key={lineIdx}>{line}</h4>;
                    }
                    if (line.startsWith('•')) {
                      return <p key={lineIdx}>{line}</p>;
                    }
                    if (line.startsWith('|')) {
                      return <pre key={lineIdx} className="code-block">{line}</pre>;
                    }
                    if (line.match(/^(Input:|Output:|❌|✅)/)) {
                      return <p key={lineIdx}><strong>{line}</strong></p>;
                    }
                    return <p key={lineIdx}>{line}</p>;
                  })}
                </div>
              );
            })}
          </div>
          
          <button className="copy-button" onClick={handleCopy}>
            Copiar conteúdo
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureModal;