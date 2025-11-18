import './FeatureModal.scss';

interface FeatureModalProps {
  feature: any;
  onClose: () => void;
}

const FeatureModal = ({ feature, onClose }: FeatureModalProps) => {
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
        <div className="modal-body">
          <p className="feature-subtitle">{feature.subtitle}</p>
          
          <div className="modal-section">
            <h4>🎯 Overview</h4>
            <p>{feature.overview}</p>
          </div>

          <div className="modal-section">
            <h4>🚀 Como Usar</h4>
            <ol className="feature-steps">
              {feature?.howToUse?.map((step: string, i: number) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureModal;