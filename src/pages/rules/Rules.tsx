import { useState } from 'react';
import { FileText, BookOpen } from 'lucide-react';
import RuleCard from '../../components/RuleCard/RuleCard';
import RuleModal from '../../components/RuleModal/RuleModal';
import { rules } from '../../data/rules';
import './Rules.scss';

const Rules = () => {
  const [searchRule, setSearchRule] = useState('');
  const [ruleFilter, setRuleFilter] = useState('Todas as rules');
  const [selectedRule, setSelectedRule] = useState<number | null>(null);

  const filteredRules = rules.filter(rule =>
    (ruleFilter === 'Todas as rules' || rule.category === ruleFilter) &&
    rule.title.toLowerCase().includes(searchRule.toLowerCase())
  );

  return (
    <div className="rules-page">
      <div className="page-header">
        <h1>Biblioteca de Rules</h1>
        <p>Regras e padrões para uso eficiente do Amazon Q Developer.</p>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchRule}
          onChange={e => setSearchRule(e.target.value)}
        />
        <select
          value={ruleFilter}
          onChange={e => setRuleFilter(e.target.value)}
        >
          <option>Todas as rules</option>
          <option>Organização</option>
          <option>Documentação</option>
          <option>Padrões</option>
        </select>
      </div>

      <div className="cards-grid">
        {filteredRules.map((rule, idx) => (
          <RuleCard 
            key={idx} 
            {...rule} 
            onClick={() => setSelectedRule(idx)} 
          />
        ))}
      </div>

      {selectedRule !== null && (
        <RuleModal
          rule={rules[selectedRule]}
          onClose={() => setSelectedRule(null)}
        />
      )}
    </div>
  );
};

export default Rules;