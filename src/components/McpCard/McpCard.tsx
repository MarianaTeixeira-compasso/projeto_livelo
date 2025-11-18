import './McpCard.scss';

interface McpCardProps {
  icon: React.ReactNode;
  title: string;
  status: string;
  description: string;
  ide: string;
  testedBy: string;
  onClick: () => void;
}

const McpCard = ({ icon, title, status, description, ide, testedBy, onClick }: McpCardProps) => {
  return (
    <div className="mcp-card-new" onClick={onClick}>
      <div className="mcp-card-header">
        <h3>{title}</h3>
        <span className={`status-badge ${status === 'Homologado' ? 'approved' : 'testing'}`}>
          {status === 'Homologado' ? '✓ Homologado' : '⚠ Em teste'}
        </span>
      </div>
      <p className="mcp-description">{description}</p>
      <div className="mcp-details">
        <p><strong>IDE:</strong> {ide}</p>
        <p><strong>Testado por:</strong> {testedBy}</p>
      </div>
    </div>
  );
};

export default McpCard;