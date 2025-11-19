import './PlaybookCard.scss';

interface PlaybookCardProps {
  icon: React.ReactNode;
  title: string;
  persona: string;
  speed: string;
  description: string;
  tags: string[];
  onClick: () => void;
}

const PlaybookCard = ({ icon, title, persona, speed, description, tags, onClick }: PlaybookCardProps) => {
  return (
    <div className="playbook-card" onClick={onClick}>
      <div className="playbook-icon">{icon}</div>
      <h3 className="playbook-title">{title}</h3>
      <div className="playbook-meta">
        <span className="persona-badge">{persona}</span>
        <span className="speed-badge">{speed}</span>
      </div>
      <p className="playbook-desc">{description}</p>
      <div className="playbook-tags">
        {tags.map((tag: string, idx: number) => {
          let extraClass = '';
          if (tag === 'Fácil') extraClass = 'playbook-tag-easy';
          if (tag === 'Médio') extraClass = 'playbook-tag-medium';
          if (idx === 1) extraClass += ' playbook-tag-highlight';
          return (
            <span key={idx} className={`playbook-tag${extraClass ? ' ' + extraClass : ''}`}>
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PlaybookCard;