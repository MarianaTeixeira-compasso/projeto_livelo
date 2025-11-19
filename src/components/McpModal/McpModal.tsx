import './McpModal.scss';

interface McpModalProps {
  mcp: any;
  onClose: () => void;
}

const McpModal = ({ mcp, onClose }: McpModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-with-icon">
            {mcp.icon}
            <h2>{mcp.title}</h2>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className={mcp.title === 'Jira' ? 'jira-popup-bg' : ''}>
            <p className="feature-subtitle">{mcp.details.subtitle}</p>
            <div className="modal-section">
              <p>{mcp.details.overview}</p>
            </div>
            <div className="modal-section">
              <ul>
                {mcp.details.features.map((feature: string, i: number) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="modal-section">
              <div className="feature-steps">
                {mcp.details.howToUse.map((step: string, i: number) => {
                  const lines = step.split('\n');
                  return (
                    <div key={i} style={{ margin: '1rem 0' }}>
                      <div style={{ fontWeight: 'bold' }}>{lines[0]}</div>
                      {lines.slice(1).map((line, lineIndex) => (
                        <div key={lineIndex}>{line}</div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="modal-section">
            <ul>
              {mcp.details.requirements.map((req: string, i: number) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="modal-actions">
            <button className="btn-primary" onClick={() => navigator.clipboard.writeText(mcp.details.installCommand || '')}>
              📋 Copiar Instalação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default McpModal;