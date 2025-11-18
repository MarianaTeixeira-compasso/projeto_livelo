import './PromptCard.scss';

interface PromptCardProps {
  icon: React.ReactNode;
  title: string;
  badge: string;
  speed: string;
  description: string;
  onClick: () => void;
}

const PromptCard = ({ icon, title, badge, speed, description, onClick }: PromptCardProps) => {
  return (
    <div className="prompt-card" onClick={onClick}>
      <div className="prompt-icon">{icon}</div>
      <h3 className="prompt-title">{title}</h3>
      <div className="prompt-meta">
        <span className="prompt-badge">{badge}</span>
        <span className="prompt-speed">{speed}</span>
      </div>
      <p className="prompt-desc">{description}</p>
    </div>
  );
};

export default PromptCard;