import { useState } from 'react';
import { FileText, Layers, Zap, CheckCircle, MessageCircle } from 'lucide-react';
import PlaybookCard from '../../components/PlaybookCard/PlaybookCard';
import PlaybookModal from '../../components/PlaybookModal/PlaybookModal';
import { playbooks } from '../../data/playbooks';
import './Playbooks.scss';

const Playbooks = () => {
  const [searchPlaybook, setSearchPlaybook] = useState('');
  const [persona, setPersona] = useState('Todas as personas');
  const [selectedPlaybook, setSelectedPlaybook] = useState<number | null>(null);

  const filteredPlaybooks = playbooks.filter(pb =>
    (persona === 'Todas as personas' || pb.persona === persona) &&
    pb.title.toLowerCase().includes(searchPlaybook.toLowerCase())
  );

  return (
    <div className="playbooks-page">
      <div className="page-header">
        <h1>Playbooks de Negócio</h1>
        <p>Guias práticos para POs, BAs e times de produto usarem IA no dia a dia.</p>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Buscar playbook..."
          value={searchPlaybook}
          onChange={e => setSearchPlaybook(e.target.value)}
        />
        <select value={persona} onChange={(e) => setPersona(e.target.value)}>
          <option>Todas as personas</option>
          <option>Product Owner</option>
          <option>Business Analyst</option>
        </select>
      </div>

      <div className="cards-grid">
        {filteredPlaybooks.map((pb, idx) => (
          <PlaybookCard 
            key={idx} 
            {...pb} 
            onClick={() => setSelectedPlaybook(playbooks.findIndex(p => p.title === pb.title))} 
          />
        ))}
      </div>

      {selectedPlaybook !== null && (
        <PlaybookModal
          playbook={playbooks[selectedPlaybook]}
          onClose={() => setSelectedPlaybook(null)}
        />
      )}
    </div>
  );
};

export default Playbooks;