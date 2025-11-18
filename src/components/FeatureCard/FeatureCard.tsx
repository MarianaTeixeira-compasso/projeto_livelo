import './FeatureCard.scss';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

const FeatureCard = ({ icon, title, description, onClick }: FeatureCardProps) => {
  return (
    <div className="feature-card" onClick={onClick}>
      <div className="feature-header">
        <span className="emoji">{icon}</span>
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;