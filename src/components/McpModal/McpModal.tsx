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
              <h4>🎯 Overview</h4>
              <p>{mcp.details.overview}</p>
            </div>
            <div className="modal-section">
              <h4>⚡ Features</h4>
              <ul>
                {mcp.details.features.map((feature: string, i: number) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="modal-section">
              <h4>🚀 Como Usar</h4>
              <ol className="feature-steps">
                {mcp.details.howToUse.map((step: string, i: number) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="modal-section">
            <h4>📋 Requisitos</h4>
            <ul>
              {mcp.details.requirements.map((req: string, i: number) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default McpModal;