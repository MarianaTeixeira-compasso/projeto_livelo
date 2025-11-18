import { useState } from 'react';
import PromptCard from '../../components/PromptCard/PromptCard';
import PromptModal from '../../components/PromptModal/PromptModal';
import { prompts } from '../../data/prompts';
import './PromptsTecnicos.scss';

const PromptsTecnicos = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [promptType, setPromptType] = useState('Todos os prompts');
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);

  const filteredPrompts = prompts.filter(pb =>
    (promptType === 'Todos os prompts' || pb.badge === promptType) &&
    pb.title.toLowerCase().includes(searchPrompt.toLowerCase())
  );

  return (
    <div className="prompts-page">
      <div className="page-header">
        <h1>Biblioteca de Prompts</h1>
        <p>Prompts técnicos validados para desenvolvimento de software.</p>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchPrompt}
          onChange={e => setSearchPrompt(e.target.value)}
        />
        <select
          value={promptType}
          onChange={e => setPromptType(e.target.value)}
        >
          <option>Todos os prompts</option>
          <option>Observabilidade</option>
          <option>Qualidade</option>
          <option>Configuração</option>
        </select>
      </div>

      <div className="cards-grid prompts-grid">
        {filteredPrompts.map((pb, idx) => (
          <PromptCard key={idx} {...pb} onClick={() => setSelectedPrompt(idx)} />
        ))}
      </div>

      {selectedPrompt !== null && (
        <PromptModal
          prompt={prompts[selectedPrompt]}
          onClose={() => setSelectedPrompt(null)}
        />
      )}
    </div>
  );
};

export default PromptsTecnicos;