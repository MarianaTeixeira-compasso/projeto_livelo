import './RuleCard.scss';

interface RuleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  category: string;
  onClick: () => void;
}

const RuleCard = ({ icon, title, description, tags, onClick }: RuleCardProps) => {
  return (
    <div className="rule-card" onClick={onClick}>
      <div className="rule-icon">{icon}</div>
      <h3 className="rule-title">{title}</h3>
      <div className="rule-tags">
        <span className="rule-tag">{tags[0]}</span>
        <span>{tags[1]}</span>
      </div>
      <p className="rule-desc">{description}</p>
    </div>
  );
};

export default RuleCard;