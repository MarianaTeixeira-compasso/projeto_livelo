import { useEffect, useState } from 'react';
import './App.css';
import { FileText, Layers, Zap, CheckCircle, MessageCircle, BarChart3, Settings, Target, Palette, Activity, BookOpen } from 'lucide-react';

type Tab = 'inicio' | 'playbooks' | 'guia' | 'prompts' | 'mcps' | 'rules';

type PromptCardProps = {
  icon: React.ReactNode;
  title: string;
  badge: string;
  speed: string;
  description: string;
  onClick: () => void;
};

function PromptCard({ icon, title, badge, speed, description, onClick }: PromptCardProps) {
  return (
    <div className="prompt-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="prompt-icon">{icon}</div>
      <h3 className="prompt-title">{title}</h3>
      <div className="prompt-meta">
        <span className="prompt-badge">{badge}</span>
        <span className="prompt-speed">{speed}</span>
      </div>
      <p className="prompt-desc">{description}</p>
    </div>
  );
}

type PlaybookCardProps = {
  icon: React.ReactNode;
  title: string;
  persona: string;
  speed: string;
  description: string;
  tags: string[];
  onClick: () => void;
};

function PlaybookCard({ icon, title, persona, speed, description, tags, onClick }: PlaybookCardProps) {
  return (
    <div className="playbook-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="playbook-icon">{icon}</div>
      <h3 className="playbook-title">{title}</h3>
      <div className="playbook-meta">
        <span className="persona-badge">{persona}</span>
        <span className="speed-badge">{speed}</span>
      </div>
      <p className="playbook-desc">{description}</p>
      <div className="playbook-tags">
        {tags.map((tag: string, idx: number) => (
          <span key={idx} className={`playbook-tag ${idx === 1 ? 'playbook-tag-highlight' : ''}`}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

function App() {
    const [copiedInstall, setCopiedInstall] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('inicio');
  const [searchPlaybook, setSearchPlaybook] = useState('');
  const [persona, setPersona] = useState('Todas as personas');
  const [searchPrompt, setSearchPrompt] = useState('');
  const [promptType, setPromptType] = useState('Todos os prompts');
  const [searchRule, setSearchRule] = useState('');
  const [ruleFilter, setRuleFilter] = useState('Todas as rules');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [selectedPlaybook, setSelectedPlaybook] = useState<number | null>(null);
  const [modalTab, setModalTab] = useState<'rule' | 'installation'>('rule');
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);
  const [selectedMcp, setSelectedMcp] = useState<number | null>(null);
  const [selectedRule, setSelectedRule] = useState<number | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('theme');
      return (saved === 'light' || saved === 'dark') ? (saved as 'light' | 'dark') : 'dark';
    } catch {
      return 'dark';
    }
  });

  // Estado para feedback do botão copiar
  const [copied, setCopied] = useState(false);

  // Estado para mensagens do chat
  const [chatMessages, setChatMessages] = useState<{text: string; isUser: boolean}[]>([
    { text: 'Olá! Como posso ajudar você hoje? Posso te ajudar a encontrar prompts, explicar MCPs ou guiar você no uso do Amazon Q.', isUser: false }
  ]);

  useEffect(() => {
    // Reflect theme on body for full-screen background coverage
    const body = document.body;
    body.classList.toggle('light-theme', theme === 'light');
    body.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', next); } catch {}
      return next;
    });
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Adiciona mensagem do usuário
      setChatMessages(prev => [...prev, { text: chatMessage, isUser: true }]);
      
      // Simula resposta do assistente
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          text: 'Desculpe, ainda estou aprendendo. Tente navegar pelas seções do menu!',
          isUser: false
        }]);
      }, 1000);
      
      setChatMessage('');
    }
  };

  const tabs = [
    { id: 'inicio' as Tab, label: 'Início' },
    { id: 'playbooks' as Tab, label: 'Playbooks' },
    { id: 'guia' as Tab, label: 'Guia do Desenvolvedor' },
    { id: 'prompts' as Tab, label: 'Prompts Técnicos' },
    { id: 'mcps' as Tab, label: 'MCPs' },
    { id: 'rules' as Tab, label: 'Rules' },
  ];

  const playbooks = [
    {
      icon: <FileText size={24} strokeWidth={2} />,
      title: 'Escrever User Stories com IA',
      persona: 'Product Owner',
      speed: '~70% mais rápido',
      description: 'Acelere a criação de user stories bem estruturadas com critérios de aceite claros',
      tags: ['Fácil', 'Refinamento'],
      details: {
        objective: 'Acelerar a criação de user stories bem estruturadas usando Amazon Q.',
        whenToUse: [
          'Durante refinamento de backlog',
          'Ao quebrar épicos em histórias menores',
          'Quando precisar de critérios de aceite claros'
        ],
        promptBase: `Contexto: Sou Product Owner de [nome do produto/feature]

Tarefa: Preciso criar user stories para [descrever a funcionalidade]

Público-alvo: [perfil do usuário]

Formato esperado:
- Título da story
- Como [persona], eu quero [ação] para [benefício]
- Critérios de aceite (Given/When/Then)
- Estimativa de complexidade

Restrições:
- Stories devem ser independentes
- Cada story deve ser testável
- Máximo de 3 dias de desenvolvimento`,
        example: `Contexto: Sou PO do app Livelo

Tarefa: Criar stories para implementar filtro de busca de produtos por categoria

Público-alvo: Clientes que buscam produtos específicos no catálogo`,
        tips: [
          'Seja específico sobre o contexto do negócio',
          'Mencione restrições técnicas conhecidas',
          'Peça para incluir casos de erro',
          'Solicite priorização sugerida'
        ],
        timeEconomized: '~70% mais rápido que escrita manual'
      }
    },
    {
      icon: <Layers size={24} strokeWidth={2} />,
      title: 'Refinamento de Backlog com IA',
      persona: 'Product Owner',
      speed: '~60% mais rápido',
      description: 'Analise, priorize e refine itens do backlog de forma eficiente',
      tags: ['Médio', 'Planejamento'],
      details: {
        objective: 'Usar IA para analisar, priorizar e refinar itens do backlog de forma eficiente.',
        whenToUse: [
          'Antes de sprint planning',
          'Ao revisar backlog acumulado',
          'Para identificar dependências'
        ],
        promptBase: `Prompt: Análise de Épico\n\nAnalise este épico e sugira:\n\nÉpico: [descrever o épico]\n\n1. Quebra em user stories menores\n2. Dependências técnicas\n3. Riscos potenciais\n4. Ordem sugerida de implementação\n5. Estimativa de esforço (P/M/G)\n\nConsidere: [contexto técnico ou de negócio relevante]\n\n---\nPrompt: Priorização\n\nTenho estas stories no backlog:\n\n[listar stories]\n\nCritérios de priorização:\n- Valor de negócio: [alto/médio/baixo]\n- Urgência: [alta/média/baixa]\n- Esforço técnico: [alto/médio/baixo]\n- Dependências: [listar se houver]\n\nSugira ordem de priorização com justificativa.`,
        example: ``,
        tips: [],
        timeEconomized: '~60% mais rápido no refinamento'
      }
    },
    {
      icon: <Zap size={24} strokeWidth={2} />,
      title: 'Sprint Planning com IA',
      persona: 'Product Owner',
      speed: '~50% mais rápido',
      description: 'Otimize o planejamento de sprint com análise de capacidade e priorização',
      tags: ['Médio', 'Planejamento'],
      details: {
        objective: 'Otimizar o planejamento de sprint usando análise de IA.',
        whenToUse: [
          'No início de cada sprint',
          'Ao definir objetivos de sprint',
          'Para balancear carga do time'
        ],
        promptBase: `Prompt: Objetivo de Sprint\n\nContexto do Sprint:\n- Duração: [X dias]\n- Capacidade do time: [X pontos ou dias]\n- Prioridades: [listar]\n\nStories candidatas:\n[listar stories com estimativas]\n\nGere:\n1. Objetivo claro do sprint\n2. Seleção de stories que cabem na capacidade\n3. Riscos e mitigações\n4. Métricas de sucesso\n\n---\nPrompt: Análise de Capacidade\n\nTime: [X desenvolvedores]\nVelocidade média: [X pontos]\nAusências planejadas: [listar]\nDívidas técnicas: [listar]\n\nStories propostas:\n[listar com estimativas]\n\nAnalise se o sprint está balanceado e sugira ajustes.`,
        example: ``,
        tips: [],
        timeEconomized: '~50% mais rápido no planning'
      }
    },
    {
      icon: <CheckCircle size={24} strokeWidth={2} />,
      title: 'Análise de Requisitos',
      persona: 'Business Analyst',
      speed: '~65% mais rápido',
      description: 'Acelere análise e documentação de requisitos com IA',
      tags: ['Médio', 'Discovery'],
      details: {
        objective: 'Acelerar análise e documentação de requisitos usando IA.',
        whenToUse: [
          'Ao receber novos requisitos',
          'Durante discovery de features',
          'Para validar completude de requisitos'
        ],
        promptBase: `Prompt: Análise de Requisito\n\nRequisito recebido:\n[descrever requisito]\n\nAnalise e forneça:\n1. Requisitos funcionais detalhados\n2. Requisitos não-funcionais\n3. Casos de uso principais\n4. Perguntas para stakeholders\n5. Possíveis gaps ou ambiguidades\n\n---\nPrompt: Documentação\n\nFeature: [nome]\nObjetivo: [descrever]\nStakeholders: [listar]\n\nGere documentação incluindo:\n- Visão geral\n- Fluxos principais\n- Regras de negócio\n- Critérios de aceite\n- Casos de teste sugeridos`,
        example: ``,
        tips: [],
        timeEconomized: '~65% mais rápido na análise'
      }
    },
    {
      icon: <MessageCircle size={24} strokeWidth={2} />,
      title: 'Análise de Feedback',
      persona: 'Product Owner',
      speed: '~75% mais rápido',
      description: 'Categorize e extraia insights de feedback de clientes automaticamente',
      tags: ['Fácil', 'Análise'],
      details: {
        objective: 'Usar IA para categorizar e extrair insights de feedback de clientes.',
        whenToUse: [
          'Após releases',
          'Revisão mensal de feedback',
          'Para identificar tendências'
        ],
        promptBase: `Prompt: Categorização\n\nFeedbacks recebidos:\n[colar lista de feedbacks]\n\nCategorize por:\n1. Tipo (Bug, Feature Request, Melhoria, Elogio)\n2. Severidade (Alta, Média, Baixa)\n3. Área do produto\n4. Sentimento (Positivo, Neutro, Negativo)\n\nIdentifique padrões e tendências.\n\n---\nPrompt: Insights Acionáveis\n\nFeedbacks categorizados:\n[resumo das categorias]\n\nGere:\n1. Top 5 problemas mais mencionados\n2. Sugestões de melhorias prioritárias\n3. Quick wins (fácil implementação, alto impacto)\n4. Riscos de churn identificados`,
        example: ``,
        tips: [],
        timeEconomized: '~75% mais rápido na análise'
      }
    },
  ];

  const prompts = [
    {
      icon: <BarChart3 size={24} strokeWidth={2} />,
      title: 'Dashboard Dynatrace',
      badge: 'Observabilidade',
      speed: '~90% (5h → 30min)',
      description: 'Estratégia de 3 prompts para criar dashboards de observabilidade no Dynatrace',
      details: {
        subtitle: 'Estratégia de 3 prompts para criar dashboards de observabilidade no Dynatrace',
        context: 'Criar dashboards Dynatrace para microserviços demanda tempo significativo: análise de código, definição de métricas, criação de DQLs e estruturação do layout. Esta estratégia reduz o tempo de 5 horas para 30 minutos.',
        objective: 'Gerar dashboards completos no Dynatrace através de uma abordagem estruturada em 3 etapas: levantamento de métricas, geração de DQLs e construção do dashboard.',
        steps: [
          'Análise do Código e Identificação de Métricas',
          'Geração de DQLs',
          'Estruturação do Dashboard'
        ],
        strategy:
`Prompt 1: Levantamento de Métricas\nSou tech lead do time responsável pelo micro serviço que está aberto no workspace.\nPara ganhar contexto sobre o projeto leia o arquivo @documentação_do_projeto\nEstou criando um dashboard no dynatrace baseado em logs do código, avalie todos log.info, e crie métricas baseada neles, consolide em um arquivo markdown.\n\n---\nPrompt 2: Geração de DQLs\nÓtimo resultado.\nAtualize o documento markdown criado, para cada métrica crie uma DQL(Dynatrace Query Language) baseada em logs do código(log.inf()).\nUtilize o markdown @DQL-Best-Practices.md para padrões e melhores práticas a serem seguidas para DQLs.\n\n---\nPrompt 3: Construção do Dashboard\nÓtimo resultado.\nAgora crie um dashboard, um arquivo json para ser importado no dynatrace, utilizando os DQL do arquivo markdown que você criou @arquivo_criado_de_métricas.md\nUtilize o arquivo @Dashboard-Layout-Patterns.md para padrões e boas práticas que devem serem seguidas no dahsboard.`,
        results: [
          'Eficiência operacional de 90%',
          'Tempo: 5h → 30min',
          'Dashboard completo com métricas técnicas e de negócio'
        ],
        tags: ['#dynatrace', '#observabilidade', '#dashboard', '#monitoramento', '#sre', '#devops'],
        tips: [
          'Execute os prompts em sequência',
          'Revise as métricas sugeridas antes de gerar DQLs',
          'Ajuste o layout conforme necessidade do time'
        ],
        timeEconomized: '~90% mais rápido (5h → 30min)'
      }
    },
    {
      icon: <FileText size={24} strokeWidth={2} />,
      title: 'Cobertura Testes Cypress',
      badge: 'Qualidade',
      speed: '~80% (4h → 45min)',
      description: 'Prompt para aumentar cobertura de testes automatizados em Micro Frontends',
      details: {
        subtitle: 'Prompt para aumentar cobertura de testes automatizados em Micro Frontends',
        context: 'Você tem acesso à página src de um Micro Frontend (MFE) e à pasta cypress com testes já existentes.',
        objective: 'Aumentar a cobertura de testes automatizados para garantir uma melhor qualidade do software.',
        steps: [
          'Analisar componentes sem cobertura',
          'Identificar fluxos críticos',
          'Gerar casos de teste',
          'Implementar testes E2E'
        ],
        promptContent: `Contexto: Você tem acesso à página src de um Micro Frontend (MFE) e à pasta cypress com testes já existentes.

Objetivo: Aumentar a cobertura de testes automatizados para garantir uma melhor qualidade do software.

Tarefa: Analise o contexto do MFE para entender o objetivo de negócio e, em seguida, implemente novos testes no Cypress que ainda não foram automatizados.

Instruções:

Análise do Contexto:
- Examine a estrutura e o conteúdo da página src para identificar componentes, funcionalidades e fluxos de usuário críticos.
- Revise os testes existentes na pasta cypress para entender quais cenários já estão cobertos.
- Revise os testes unitários existentes para entender quais cenários já estão cobertos.

Identificação de Lacunas:
- Identifique funcionalidades e fluxos de usuário que não estão cobertos pelos testes existentes.
- Priorize a implementação de testes para funcionalidades críticas e de alto impacto.

Implementação de Novos Testes:
- Escreva novos testes no Cypress para cobrir as lacunas identificadas.
- Garanta que os novos testes sejam robustos, legíveis e bem documentados.

Validação:
- Execute todos os testes (existentes e novos) para garantir que o MFE funcione conforme esperado.
- Revise os resultados dos testes e faça ajustes conforme necessário.

Resultado Esperado: Uma cobertura de testes mais abrangente que contribua para a melhoria contínua da qualidade do software.`,
        results: [
          'Tempo economizado: ~80% (4h → 45min)',
          'Cobertura de testes: Aumenta significativamente',
          'Qualidade: Identifica lacunas críticas automaticamente'
        ],
        howToUse: [
          'Abra o Amazon Q no VS Code',
          'Cole o prompt acima',
          'Inclua o contexto do seu MFE usando @folder src e @folder cypress',
          'Execute e revise os testes gerados'
        ],
        validated: [
          'Equipe de Qualidade Livelo',
          'Testado em múltiplos MFEs',
          'Aprovado em outubro 2024'
        ],
        exampleTitle: 'Exemplo de Saída',
        exampleDescription: 'O prompt gera testes estruturados cobrindo:',
        exampleItems: [
          'Validação de campos: Testes para campos inválidos/incompletos',
          'Comportamento dinâmico: Atualização de componentes em tempo real',
          'Cenários de erro: Falhas de API e tratamento de erros',
          'Acessibilidade: Verificação de atributos aria-label'
        ],
        exampleCode: `describe('Form Field Validations', () => {
  it('should show an error for invalid card number', () => {
    cy.get(SELECTORS.CARD_NUMBER_INPUT).type('1234');
    cy.get(SELECTORS.BUTTON_ADD_CARD).should('be.disabled');
    cy.get(SELECTORS.CARD_NUMBER_INPUT).blur();
    cy.contains('Número do cartão inválido').should('be.visible');
  });
});`,
        tags: ['#cypress', '#testes', '#qualidade', '#mfe', '#cobertura', '#automacao'],
        timeEconomized: '~80% mais rápido (4h → 45min)'
      }
    },
    {
      icon: <Settings size={24} strokeWidth={2} />,
      title: 'Contexto Inteligente AmazonQ',
      badge: 'Configuração',
      speed: '~85% (6h → 1h)',
      description: 'Crie estrutura completa de contexto inteligente do AmazonQ para projetos',
      details: {
        subtitle: 'Crie estrutura completa de contexto inteligente do AmazonQ para projetos',
        context: `🎯 Objetivo

Crie estrutura completa de contexto inteligente do AmazonQ para projetos, conforme estrutura Base:

.amazonq/
└── rules/
    ├── project-overview.md
    ├── coding-standards.md
    ├── architecture-patterns.md
    ├── business-rules.md
    └── scenarios.md

🔍 Análise Prévia

Antes de criar as regras, analise:

• Código existente: Padrões, arquitetura, tecnologias
• Documentação: README, ADRs, design docs
• Configurações: package.json, pom.xml, requirements.txt
• Testes: Estrutura e padrões de teste
• Integrações: APIs, bancos, serviços externos

📋 Regras Detalhadas

1. project-overview.md

Conteúdo essencial:

• Propósito e objetivos do projeto
• Stack tecnológico completo
• Arquitetura de alto nível
• Principais funcionalidades
• Dependências e bibliotecas
• Configuração de desenvolvimento
• Comandos essenciais (build, test, deploy)
• APIs internas e externas utilizadas
• Formato de requests/responses
• Autenticação e autorização
• Rate limits e retry policies
• Mapeamento de erros e fallbacks
• Configurações de timeout
• Monitoramento e health checks

2. coding-standards.md

Conteúdo essencial:

• Convenções de nomenclatura (classes, métodos, variáveis)
• Estrutura de diretórios e organização de código
• Padrões de formatação e linting
• Convenções de commit e branching
• Padrões de documentação inline
• Tratamento de erros e logging
• Validações e sanitização de dados

3. architecture-patterns.md

Conteúdo essencial:

• Padrões arquiteturais utilizados (MVC, Clean Architecture, Hexagonal, etc.)
• Design patterns implementados
• Estrutura de camadas e responsabilidades
• Padrões de comunicação entre componentes
• Estratégias de cache e performance
• Padrões de segurança e autenticação
• Configuração de ambientes e deployment

4. business-rules.md

Conteúdo essencial:

• Regras de negócio por domínio/módulo
• Validações específicas do negócio
• Fluxos de aprovação e workflows
• Cálculos e fórmulas de negócio
• Restrições e limitações
• Estados e transições de entidades
• Políticas de acesso e permissões

5. scenarios.md

Formato BDD obrigatório:

Feature: [Nome da Feature]

Scenario: [Cenário de sucesso]
  Given [contexto inicial]
  When [ação do usuário]
  Then [resultado esperado]

Scenario: [Cenário de erro]
  Given [contexto inicial]
  When [ação inválida]
  Then [mensagem de erro esperada]

📝 Templates Específicos

Template para Regras de Negócio

## [Domínio/Módulo]

### Regras Principais

- **RN001**: [Descrição da regra]
  - Condição: [quando aplicar]
  - Ação: [o que fazer]
  - Exceções: [casos especiais]

### Validações

- Campo X deve [critério]
- Status Y só pode [transições permitidas]

### Cálculos

- Fórmula Z: [expressão matemática]
- Considerações: [casos especiais]

🎯 Diretrizes de Implementação

Análise de Código

• Identifique padrões existentes antes de documentar
• Extraia regras implícitas do código
• Documente exceções e casos especiais
• Mantenha consistência com implementação atual

Cenários BDD

• Foque nos fluxos principais de cada feature
• Inclua cenários de erro e validação
• Use linguagem de negócio, não técnica
• Mantenha cenários independentes e testáveis

Regras de Negócio

• Organize por domínio/contexto
• Use numeração para referência (RN001, RN002)
• Inclua exemplos práticos
• Documente exceções e casos especiais

Integrações

• Documente contratos de API
• Inclua exemplos de payload
• Mapeie códigos de erro
• Defina estratégias de fallback

✅ Validação e Manutenção

• Mantenha sincronizado com código
• Atualize conforme evolução do projeto
• Use como referência para novos desenvolvimentos
• Integre com processo de code review

🏷️ Tags

#amazonq #contexto #rules #documentação #bdd #arquitetura`,
        objective: 'Criar estrutura organizada de arquivos de contexto (.amazonq/) para maximizar eficiência.',
        steps: [
          'Criar estrutura de diretórios',
          'Definir rules e guidelines',
          'Documentar arquitetura',
          'Configurar learning files'
        ],
        tips: [
          'Mantenha documentação atualizada',
          'Use Markdown para melhor leitura',
          'Inclua exemplos práticos'
        ],
        timeEconomized: '~85% mais rápido (6h → 1h)'
      }
    },
  ];

  const mcps = [
    {
      icon: <Target size={24} strokeWidth={2} />,
      title: 'Jira',
      status: 'Homologado',
      description: 'Consultar e criar issues',
      ide: 'VS Code, Amazon Q',
      testedBy: '@marcilio.cobel',
      details: {
          subtitle: '🎫 Jira MCP',
          overview: `Integração com Jira para consultar e criar issues via Amazon Q\n\n🎯 O que faz\n\nO Jira MCP permite que você:\n\n- Consulte issues e projetos\n- Crie novas issues\n- Atualize status de issues\n- Busque por filtros específicos\n- Acesse informações de sprints\n\nTudo isso diretamente do Amazon Q, sem sair da sua IDE!`,
          features: [
            'Consulte issues e projetos',
            'Crie novas issues',
            'Atualize status de issues',
            'Busque por filtros específicos',
            'Acesse informações de sprints',
            'Tudo isso diretamente do Amazon Q, sem sair da sua IDE!'
          ],
          requirements: [
            'Acesso ao Jira da Livelo',
            'Token de API do Jira',
            'Amazon Q ou VS Code configurado'
          ],
          howToUse: [
            '1. Gerar Token do Jira',
            'Acesse Atlassian Account Settings',
            'Clique em "Create API token"',
            'Dê um nome (ex: "Amazon Q MCP")',
            'Copie o token gerado',
            '',
            '2. Configurar Variáveis de Ambiente',
            '# Adicione ao seu .bashrc/.zshrc',
            'export JIRA_TOKEN="seu-token-aqui"',
            'export JIRA_URL="https://livelo.atlassian.net"',
            'export JIRA_EMAIL="seu.email@livelo.com.br"',
            '',
            '3. Configuração por IDE',
            'VS Code - Arquivo: .vscode/mcp.json',
            '{',
            '  "servers": {',
            '    "jira": {',
            '      "command": "npx",',
            '      "args": ["@modelcontextprotocol/server-jira"],',
            '      "env": {',
            '        "JIRA_URL": "https://livelo.atlassian.net",',
            '        "JIRA_TOKEN": "${JIRA_TOKEN}",',
            '        "JIRA_EMAIL": "${JIRA_EMAIL}"',
            '      }',
            '    }',
            '  }',
            '}',
            '',
            '💡 Exemplos de Uso',
            '',
            'Consultar Issues',
            '"Liste as issues do projeto LIV que estão em progresso"',
            '"Mostre detalhes da issue LIV-1234"',
            '"Quais são os bugs críticos em aberto?"',
            '',
            'Criar Issues',
            '"Crie uma task para implementar testes unitários no UserService"',
            '"Abra um bug: Login falha quando usuário tem caracteres especiais no email"',
            '',
            '✅ Testado por',
            '@marcilio.cobel - Time Backend - 15/10/2024',
            'Status: ✅ Homologado para uso'
          ]
      }
    },
    {
      icon: <Palette size={24} strokeWidth={2} />,
      title: 'Figma',
      status: 'Em teste',
      description: 'Acessar design system e componentes Livelo',
      ide: 'Em desenvolvimento',
      testedBy: 'Time DX',
      details: {
        subtitle: 'Acesso ao design system e componentes do Figma',
        overview: 'MCP em fase de testes para integrar designs do Figma com desenvolvimento, facilitando acesso a componentes e tokens do design system.',
        features: [
          'Consultar componentes do design system',
          'Extrair tokens de design',
          'Gerar código a partir de designs',
          'Sincronizar com biblioteca de componentes'
        ],
        howToUse: [
          'Aguardando homologação',
          'Testes em andamento pelo Time DX'
        ],
        requirements: [
          'Amazon Q Developer',
          'Acesso ao Figma da Livelo',
          'Plugins do Figma configurados'
        ]
      }
    },
    {
      icon: <Activity size={24} strokeWidth={2} />,
      title: 'Dynatrace',
      status: 'Em teste',
      description: 'Observabilidade e monitoramento em tempo real',
      ide: 'Em desenvolvimento',
      testedBy: '-',
      details: {
        subtitle: 'Integração com Dynatrace para observabilidade',
        overview: 'MCP para consultar métricas, logs e traces do Dynatrace diretamente pelo Amazon Q.',
        features: [
          'Consultar métricas em tempo real',
          'Analisar logs e traces',
          'Criar alertas',
          'Gerar dashboards'
        ],
        howToUse: [
          'Aguardando desenvolvimento completo'
        ],
        requirements: [
          'Amazon Q Developer',
          'Acesso ao Dynatrace',
          'API tokens configurados'
        ]
      }
    }
  ];

  const rules = [
    {
      icon: <FileText size={24} strokeWidth={2} />,
      title: 'Amazon Q Learning Files',
      description: 'Convenção padronizada para arquivos de aprendizado do Amazon Q em projetos',
      tags: ['Organização', 'Melhora contexto e eficiência'],
      category: 'Organização',
      details: {
        subtitle: 'Convenção padronizada de nomenclatura para arquivos de aprendizado do Amazon Q',
        overview: `📚 Amazon Q Learning Files

Convenção padronizada de nomenclatura para arquivos de aprendizado do Amazon Q

🎯 Convenção de Nomenclatura

Todos os arquivos de aprendizado do Amazon Q seguem este padrão:

q-learning-{contexto}.md

Onde {contexto} é um descritor do projeto ou área (ex: "datalake", "streaming", "general").

📁 Localização dos Arquivos

| Nome do Arquivo | Localização | Propósito |
|-----------------|-------------|-----------|
| q-learning-general.md | Diretório home (~) | Aprendizados gerais em todos os projetos |
| q-learning-datalake.md | Diretório do projeto Data Lake | Aprendizados específicos do projeto Data Lake |
| q-learning-announcements.md | Diretório de anúncios | Aprendizados sobre workflows de comunicação |
| q-learning-streaming.md | Diretório do projeto Streaming | Aprendizados específicos de projetos de streaming |

🎯 Propósito

Estes arquivos servem como base de conhecimento para o Amazon Q:

• Entender melhor seu estilo de trabalho e preferências
• Melhorar colaboração e assistência
• Fornecer ajuda mais relevante e contextual
• Otimizar uso de tokens do Q CLI mantendo contexto

🚀 Como Usar

Quando trabalhar com Amazon Q em um contexto específico de projeto, ele automaticamente referenciará o arquivo de aprendizado relevante para fornecer assistência mais personalizada.

Você pode atualizar estes arquivos manualmente ou pedir ao Amazon Q para atualizá-los com novos insights das suas interações.

📝 Formato

Todos os arquivos usam formato Markdown (.md) para:

• Melhor estrutura e legibilidade
• Suporte a formatação rica (cabeçalhos, listas, blocos de código)
• Compatibilidade com sistemas de controle de versão
• Visualização fácil na maioria dos editores de texto

🏷️ Tags

#amazon-q #learning #organização #contexto #produtividade`,
        structure: [
          'q-learning-general.md - Diretório home (~)',
          'q-learning-{projeto}.md - Diretório do projeto específico',
          'Formato Markdown para melhor legibilidade',
          'Base de conhecimento para Amazon Q'
        ],
        benefits: [
          'Respostas mais contextualizadas',
          'Sugestões alinhadas com padrões do projeto',
          'Otimização de tokens mantendo contexto',
          'Assistência personalizada por projeto'
        ],
        howToImplement: [
          'Criar arquivo q-learning-{contexto}.md',
          'Documentar preferências e estilo de trabalho',
          'Atualizar com insights das interações',
          'Manter um por contexto/projeto'
        ]
      }
    },
    {
      icon: <BookOpen size={24} strokeWidth={2} />,
      title: 'Guia de Estilo Markdown',
      description: 'Guia conciso de estilo Markdown para documentação consistente e profissional',
      tags: ['Documentação', 'Padronização e qualidade'],
      category: 'Documentação',
      details: {
        subtitle: 'Guia conciso para documentação Markdown consistente e profissional',
        overview: `📖 Guia de Estilo Markdown

Guia conciso para documentação Markdown consistente e profissional

📑 Cabeçalhos

Regras Básicas

• Use estilo ATX com hash (#) e espaço após (# Cabeçalho)
• Incremente cabeçalhos por apenas um nível (não pule de # para ###)
• Sem texto duplicado de cabeçalho entre irmãos
• Um cabeçalho de nível superior (#) por documento como primeira linha
• Sem pontuação no final dos cabeçalhos
• Cerque com linha em branco antes de outro conteúdo

Exemplo

# Título Principal

## Seção

### Subseção

✏️ Formatação de Texto

Diretrizes

• Comprimento da linha: máximo 80 caracteres
• Ênfase consistente: *itálico* e **negrito**
• Sem espaços dentro dos marcadores de ênfase
• Linhas em branco simples entre seções
• Arquivos terminam com uma única quebra de linha
• Sem espaços finais (exceto dois espaços para quebras de linha)
• Use espaços para indentação, não tabs

Exemplo

Este é um texto *em itálico* e este é **em negrito**.

Esta é uma nova seção.

📋 Listas

Regras

• Listas não ordenadas: use marcador consistente (preferencialmente -)
• Listas ordenadas: números sequenciais ou todos 1.
• Indentação: 2 espaços para não ordenadas, 3 para ordenadas
• Um espaço após marcadores de lista
• Cerque listas com linhas em branco

Exemplo

- Item um
- Item dois
  - Subitem
  - Outro subitem

1. Primeiro item
2. Segundo item
3. Terceiro item

💻 Código

Diretrizes

• Blocos de código cercados (\`\`\`) com linguagem especificada
• Código inline: use crases sem espaços internos (\`código\`)
• Não use $ antes de comandos a menos que mostrando saída também
• Cerque blocos de código com linhas em branco

Exemplo

Use \`npm install\` para instalar dependências.

\`\`\`bash
npm install
npm start
\`\`\`

🔗 Links e Imagens

Formato

• Links: [texto](url)
• Imagens: ![texto alternativo](imagem.jpg)
• Sem texto de link vazio
• URLs em colchetes angulares ou formatados como links
• Sem espaços dentro dos colchetes de link
• Fragmentos de link devem apontar para cabeçalhos válidos

Exemplo

Visite o [site oficial](https://example.com) para mais informações.

![Logo da empresa](logo.png)

📊 Tabelas

Regras

• Estilo de pipe consistente com contagem igual de colunas
• Alinhamento claro dos pipes
• Cabeçalhos bem definidos

Exemplo

| Nome | Idade | Cidade |
|------|-------|--------|
| João | 25 | São Paulo |
| Maria | 30 | Rio de Janeiro |

📝 Outros Elementos

Citações

• Blockquotes: use > com um espaço após

> Esta é uma citação importante.
> Pode ter múltiplas linhas.

Linhas Horizontais

• Três hífens --- em linha separada

---

HTML Inline

• Evite HTML inline quando possível
• Mantenha capitalização adequada para nomes de produtos

📏 Diretrizes Gerais

Princípios

• Use estilo consistente em todo documento
• Priorize clareza e legibilidade
• Valide com linter Markdown
• Mantenha simplicidade na estrutura

Checklist de Qualidade

[ ] Cabeçalhos seguem hierarquia correta
[ ] Listas estão bem formatadas
[ ] Código está em blocos apropriados
[ ] Links funcionam corretamente
[ ] Tabelas estão alinhadas
[ ] Sem espaços finais desnecessários
[ ] Arquivo termina com quebra de linha

🏷️ Tags

#markdown #documentação #estilo #padronização #qualidade`,
        guidelines: [
          'Use títulos hierárquicos (H1-H6)',
          'Listas com marcadores ou números',
          'Código com blocos de syntax highlight',
          'Links e referências padronizados'
        ],
        benefits: [
          'Documentação uniforme',
          'Fácil manutenção',
          'Melhor legibilidade',
          'Profissionalismo'
        ],
        howToImplement: [
          'Seguir template de documentação',
          'Usar linters de Markdown',
          'Revisar PRs para conformidade',
          'Criar exemplos de referência'
        ]
      }
    }
  ];

  // Developer Guide sub-tabs
  const [guideTab, setGuideTab] = useState<'overview' | 'features' | 'setup' | 'troubleshooting' | 'sdlc'>('overview');

  const featuresDetails = [
    {
      icon: '💬',
      title: 'Chat e Conversação',
      description: 'Interação natural com código para explicações, geração e debug',
      subtitle: 'Como usar o chat do Amazon Q para interagir com seu código',
      overview: 'O chat do Amazon Q permite interação natural com seu código através de conversas em linguagem natural. É a interface principal para fazer perguntas, solicitar código e obter explicações.',
      howToUse: [
        'Abrir o Chat',
        'Fazer Perguntas',
        'Gerar Código',
        'Explicar Código Existente'
      ]
    },
    {
      icon: '🧩',
      title: 'Rules',
      description: 'Define padrões automaticamente para garantir consistência no time',
      subtitle: 'Como criar e usar Rules para padronizar seu desenvolvimento',
      overview: 'Rules permitem definir padrões e guidelines que o Amazon Q seguirá automaticamente em todas as interações, garantindo consistência no time.',
      howToUse: [
        'Criar arquivo .amazonq/rules/',
        'Definir padrões em Markdown',
        'Amazon Q aplica automaticamente',
        'Manter atualizado com evolução do projeto'
      ]
    },
    {
      icon: '🤖',
      title: 'Custom Agents',
      description: 'Assistentes personalizáveis para workflows especializados',
      subtitle: 'Crie agentes customizados para tarefas específicas',
      overview: 'Custom Agents são assistentes configurados para workflows específicos, com ferramentas e contexto pré-definidos.',
      howToUse: [
        'Definir objetivo do agente',
        'Configurar ferramentas disponíveis',
        'Adicionar contexto específico',
        'Testar e refinar comportamento'
      ]
    },
    {
      icon: '🛠️',
      title: 'Customização',
      description: 'Personalize o Amazon Q com seu código organizacional',
      subtitle: 'Adapte o Amazon Q ao contexto da sua organização',
      overview: 'A customização permite que o Amazon Q aprenda com o código e padrões da sua organização, oferecendo sugestões mais relevantes.',
      howToUse: [
        'Conectar repositórios da organização',
        'Configurar índices de código',
        'Definir preferências e padrões',
        'Treinar com exemplos específicos'
      ]
    },
    {
      icon: '🧪',
      title: 'Testes Unitários',
      description: 'Geração automática de testes para acelerar desenvolvimento',
      subtitle: 'Gere testes automaticamente com Amazon Q',
      overview: 'A geração automática de testes permite criar testes unitários completos rapidamente, aumentando a cobertura e qualidade do código.',
      howToUse: [
        'Selecionar função/classe para testar',
        'Usar comando de gerar testes',
        'Revisar testes gerados',
        'Ajustar casos de teste conforme necessário'
      ]
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inicio':
            {/* Nova seção com imagem seoplus.webp - movida para garantir exibição */}
            <section className="highlight-section" style={{marginBottom: '48px', background: '#f8f9fa', borderRadius: '32px', padding: '56px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 24px rgba(0,0,0,0.04)'}}>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                <div style={{flex: '1 1 340px', minWidth: '320px', maxWidth: '600px', textAlign: 'left'}}>
                  <p style={{fontSize: '1.35rem', color: '#444', marginBottom: '24px', lineHeight: '1.6', textAlign: 'justify'}}>
                    O SEO+ é uma solução interna para otimizar a criação e publicação de páginas de viagens, com o objetivo de publicar 700 páginas em 2025. Resultados expressivos de semana para minutos.
                  </p>
                </div>
                <div style={{flex: '1 1 340px', minWidth: '320px', maxWidth: '700px', display: 'flex', justifyContent: 'center'}}>
                  <img src="/seopluas.webp" alt="SEO+ Livelo" style={{width: '100%', maxWidth: '700px', borderRadius: '24px', boxShadow: '0 4px 32px rgba(0,0,0,0.10)'}} />
                </div>
              </div>
            </section>
              {/* Seção SEO+ */}
              <section className="highlight-section" style={{marginBottom: '48px', background: '#f8f9fa', borderRadius: '32px', padding: '56px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 24px rgba(0,0,0,0.04)'}}>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                  <div style={{flex: '1 1 340px', minWidth: '320px', maxWidth: '600px', textAlign: 'left'}}>
                    <p style={{fontSize: '1.35rem', color: '#444', marginBottom: '24px', lineHeight: '1.6', textAlign: 'justify'}}>
                      O SEO+ é uma solução interna para otimizar a criação e publicação de páginas de viagens, com o objetivo de publicar 700 páginas em 2025. Resultados expressivos de semana para minutos.
                    </p>
                  </div>
                  <div style={{flex: '1 1 340px', minWidth: '320px', maxWidth: '700px', display: 'flex', justifyContent: 'center'}}>
                    <img src="/seopluas.webp" alt="SEO+ Livelo" style={{width: '100%', maxWidth: '700px', borderRadius: '24px', boxShadow: '0 4px 32px rgba(0,0,0,0.10)'}} />
                  </div>
                </div>
              </section>
              {/* Nova seção SEO+ */}
              <section className="highlight-section" style={{marginBottom: '48px', background: '#f8f9fa', borderRadius: '32px', padding: '56px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 24px rgba(0,0,0,0.04)'}}>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                  <div style={{flex: '1 1 340px', minWidth: '320px', maxWidth: '600px', textAlign: 'left'}}>
                    <p style={{fontSize: '1.35rem', color: '#444', marginBottom: '24px', lineHeight: '1.6', textAlign: 'justify'}}>
                      O SEO+ é uma solução interna para otimizar a criação e publicação de páginas de viagens, com o objetivo de publicar 700 páginas em 2025. Resultados expressivos de semana para minutos.
                    </p>
                  </div>
                  <div style={{flex: '1 1 340px', minWidth: '320px', maxWidth: '700px', display: 'flex', justifyContent: 'center'}}>
                    <img src="/seopluas.webp" alt="SEO+ Livelo" style={{width: '100%', maxWidth: '700px', borderRadius: '24px', boxShadow: '0 4px 32px rgba(0,0,0,0.10)'}} />
                  </div>
                </div>
              </section>
        return (
          <div className="home-content">
            <div className="hero-section">
              <div className="hero-text">
                <h1 className="hero-title">
                  IA COMO SUA<br />NOVA ALIADA
                </h1>
                <p className="hero-description">
                  Explore como a integração da IA na Livelo está revolucionando a eficiência, otimizando decisões e abrindo caminho para soluções inovadoras que impulsionam o nosso crescimento.
                </p>
              </div>
              <div className="hero-image">
                <div className="ai-avatar">
                  <img src="/giff.gif" alt="IA Avatar" />
                </div>
              </div>
            </div>
            <div className="ia-footer">
              <h2 className="ia-title">INTELIGÊNCIA<br />ARTIFICIAL</h2>
              <p className="ia-subtitle">TRANSFORME SEU DIA E CRIE O FUTURO</p>
              <p className="ia-description">
                Desbloqueie um universo de possibilidades. Use a Inteligência Artificial Generativa para otimizar suas tarefas diárias e inovar na criação de novos produtos e serviços.
              </p>
            </div>
            {/* Conteúdo extra solicitado com imagem n8n.webp - layout aprimorado */}
            <section className="highlight-section" style={{marginTop: '48px', marginBottom: '48px', background: '#f8f9fa', borderRadius: '32px', padding: '56px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 24px rgba(0,0,0,0.04)'}}>
              <h2 style={{fontSize: '2.8rem', fontWeight: 900, color: '#222', marginBottom: '40px', textAlign: 'center', letterSpacing: '-2px'}}>SOLUÇÕES EM DESTAQUE</h2>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                <div style={{flex: '1 1 340px', minWidth: '320px', maxWidth: '600px', textAlign: 'left'}}>
                  <p style={{fontSize: '1.35rem', color: '#444', marginBottom: '24px', lineHeight: '1.6', textAlign: 'justify'}}>
                    Enfrentando desafios de escala no seu time? A parceria entre <span style={{fontWeight:700, color:'#d11778'}}>Automação</span> e <span style={{fontWeight:700, color:'#d11778'}}>Inteligência Artificial</span> é a solução!<br /><br />
                    Juntas, elas não só replicam o que já existe, mas adicionam inteligência, aprendizado e adaptabilidade.<br />
                    Libere seu time para o que realmente importa: <span style={{fontWeight:700}}>estratégia</span> e <span style={{fontWeight:700}}>criatividade</span>.<br />
                    Com essa parceria, sua empresa será mais ágil, inteligente e competitiva.
                  </p>
                </div>
                <div style={{flex: '1 1 340px', minWidth: '320px', maxWidth: '700px', display: 'flex', justifyContent: 'center'}}>
                  <img src="/n8n.webp" alt="Automação com n8n" style={{width: '100%', maxWidth: '700px', borderRadius: '24px', boxShadow: '0 4px 32px rgba(0,0,0,0.10)'}} />
                </div>
              </div>
            </section>

            {/* Nova seção com imagem suaequipe.webp */}
            <section className="highlight-section" style={{marginBottom: '48px', background: '#f8f9fa', borderRadius: '32px', padding: '56px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 24px rgba(0,0,0,0.04)'}}>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                <div style={{flex: '1 1 340px', minWidth: '320px', maxWidth: '600px', textAlign: 'left'}}>
                  <p style={{fontSize: '1.35rem', color: '#444', marginBottom: '24px', lineHeight: '1.6', textAlign: 'justify'}}>
                    Cansado de tarefas repetitivas e falta de inspiração? Nossa Plataforma de IA Generativa é seu copiloto criativo e estratégico, liberando seu tempo e potencial!<br /><br />
                    Com ela, você não só tem uma ferramenta tecnológica avançada, mas uma extensão da sua capacidade de criar e resolver. Prepare-se para mais eficiência, criatividade e conquistas em seu dia a dia.<br /><br />
                    <a href="#" style={{color: '#ffd600', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none'}}>Mais detalhes sobre a Plataforma de IA</a>
                  </p>
                </div>
                <div style={{flex: '1 1 340px', minWidth: '320px', maxWidth: '700px', display: 'flex', justifyContent: 'center'}}>
                  <img src="/suaequipe.webp" alt="Plataforma de IA" style={{width: '100%', maxWidth: '700px', borderRadius: '24px', boxShadow: '0 4px 32px rgba(0,0,0,0.10)'}} />
                </div>
              </div>
            </section>
          </div>
        );
      
      case 'playbooks':
        return (
          <div className="tab-content">
            <h1>Playbooks de Negócio</h1>
            <p>Guias práticos para POs, BAs e times de produto usarem IA no dia a dia.</p>
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
              {playbooks
                .filter(pb =>
                  (persona === 'Todas as personas' || pb.persona === persona) &&
                  pb.title.toLowerCase().includes(searchPlaybook.toLowerCase())
                )
                .map((pb, idx) => (
                  <PlaybookCard key={idx} {...pb} onClick={() => setSelectedPlaybook(idx)} />
                ))}
            </div>
            
            {selectedPlaybook !== null && (
              <div className="modal-overlay" onClick={() => { setSelectedPlaybook(null); setModalTab('rule'); }}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h2>{playbooks[selectedPlaybook].title}</h2>
                    <button className="modal-close" onClick={() => { setSelectedPlaybook(null); setModalTab('rule'); }}>×</button>
                  </div>
                  <div className="modal-tabs">
                    <span 
                      className={`modal-tab ${modalTab === 'rule' ? 'active' : ''}`}
                      onClick={() => setModalTab('rule')}
                    >
                      Project Rule
                    </span>
                    <span 
                      className={`modal-tab ${modalTab === 'installation' ? 'active' : ''}`}
                      onClick={() => setModalTab('installation')}
                    >
                      Installation
                    </span>
                  </div>
                  <div className="modal-body modal-body-compact">
                    {modalTab === 'rule' ? (
                      <>
                        <div className={`user-stories-bg prompt-base-block ${['Escrever User Stories com IA','Refinamento de Backlog com IA','Sprint Planning com IA','Análise de Requisitos','Análise de Feedback'].includes(playbooks[selectedPlaybook].title) ? 'user-stories-expanded' : ''}`}>
                          <h3>{
                            ['Sprint Planning com IA','Análise de Requisitos'].includes(playbooks[selectedPlaybook].title)
                              ? `${playbooks[selectedPlaybook].title} com IA`
                              : playbooks[selectedPlaybook].title === 'Análise de Feedback'
                                ? 'Análise de Feedback de Clientes'
                                : playbooks[selectedPlaybook].title === 'Refinamento de Backlog com IA'
                                  ? 'Refinamento de Backlog com IA'
                                  : `Como ${playbooks[selectedPlaybook].title}`
                          }</h3>
                          
                          <div className="modal-section">
                          <h4>Objetivo</h4>
                          <p>{playbooks[selectedPlaybook].details.objective}</p>
                        </div>

                        <div className="modal-section">
                          <h4>Quando Usar</h4>
                          <ul>
                            {playbooks[selectedPlaybook].details.whenToUse.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Prompts section: split into topics when promptBase has sections */}
                        {playbooks[selectedPlaybook].details.promptBase.includes('\n---\n') ? (
                          (() => {
                            const parts = playbooks[selectedPlaybook].details.promptBase.split(/\n---\n/);
                            return (
                              <>
                                {parts.map((part, idx) => {
                                  const lines = part.split('\n');
                                  const heading = (lines[0] || 'Prompt').trim();
                                  const content = lines.slice(1).join('\n').trim();
                                  return (
                                    <div className="modal-section" key={idx}>
                                      <h4>{heading}</h4>
                                      <pre className="code-block">{content}</pre>
                                    </div>
                                  );
                                })}
                              </>
                            );
                          })()
                        ) : (
                          <div className="modal-section">
                            <h4>Prompt Base</h4>
                            <pre className="code-block">{playbooks[selectedPlaybook].details.promptBase}</pre>
                          </div>
                        )}

                        {playbooks[selectedPlaybook].details.example ? (
                          <div className="modal-section">
                            <h4>Exemplo Prático</h4>
                            <div className="example-box">
                              <strong>Input:</strong>
                              <pre className="code-block">{playbooks[selectedPlaybook].details.example}</pre>
                            </div>
                          </div>
                        ) : null}

                        {playbooks[selectedPlaybook].details.tips && playbooks[selectedPlaybook].details.tips.length > 0 ? (
                          <div className="modal-section">
                            <h4>Dicas</h4>
                            <ul>
                              {playbooks[selectedPlaybook].details.tips.map((tip, i) => (
                                <li key={i}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}

                        <div className="modal-section time-section">
                          <h4>Tempo Economizado</h4>
                          <p className="efficiency-note">{playbooks[selectedPlaybook].details.timeEconomized}</p>
                        </div>
                        </div>

                        <button
                          className="copy-button"
                          onClick={() => {
                            const content = [
                              playbooks[selectedPlaybook].details.objective,
                              playbooks[selectedPlaybook].details.whenToUse.join('\n'),
                              playbooks[selectedPlaybook].details.promptBase,
                              playbooks[selectedPlaybook].details.example
                            ].join('\n\n');
                            navigator.clipboard.writeText(content);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                        >
                          {copied ? 'Copiado!' : 'Copiar conteúdo'}
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="user-stories-bg" style={{ padding: 0 }}>
                          <div className="prompt-base-block install-empty-box"></div>
                        </div>
                        <button
                          className="copy-button"
                          onClick={() => {
                            navigator.clipboard.writeText('Instalação do playbook');
                            setCopiedInstall(true);
                            setTimeout(() => setCopiedInstall(false), 2000);
                          }}
                        >
                          {copiedInstall ? 'Copiado!' : 'Copiar instalação'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'guia':
        return (
          <div className="tab-content dev-guide">
            {/* Hero */}
            <div className="guide-hero">
              <h1 className="guide-title"><span className="emoji">🧭</span> Guia do Desenvolvedor</h1>
              <p className="guide-subtitle">Guia completo de IA para desenvolvimento na Livelo</p>
              <div className="guide-tabs">
                <span className={`tab-pill ${guideTab === 'overview' ? 'active' : ''}`} onClick={() => setGuideTab('overview')}>📘 Overview</span>
                <span className={`tab-pill ${guideTab === 'features' ? 'active' : ''}`} onClick={() => setGuideTab('features')}>⚡ Features</span>
                <span className={`tab-pill ${guideTab === 'setup' ? 'active' : ''}`} onClick={() => setGuideTab('setup')}>⚙️ Setup</span>
                <span className={`tab-pill ${guideTab === 'troubleshooting' ? 'active' : ''}`} onClick={() => setGuideTab('troubleshooting')}>🔧 Troubleshooting</span>
                <span className={`tab-pill ${guideTab === 'sdlc' ? 'active' : ''}`} onClick={() => setGuideTab('sdlc')}>📊 IA no SDLC</span>
              </div>
            </div>
            {guideTab === 'overview' && (
              <>
                <section className="guide-section">
                  <h2>O que é Amazon Q Developer?</h2>
                  <p>Amazon Q Developer é a ferramenta de IA da AWS para desenvolvimento de software. É um assistente inteligente que acelera o desenvolvimento através de:</p>
                  <div className="info-grid">
                    <div className="info-card">
                      <h3>Geração de Código</h3>
                      <p>Cria código baseado em descrições naturais</p>
                    </div>
                    <div className="info-card">
                      <h3>Documentação</h3>
                      <p>Gera documentação automática do código</p>
                    </div>
                    <div className="info-card">
                      <h3>Testes</h3>
                      <p>Cria testes unitários e de integração</p>
                    </div>
                    <div className="info-card">
                      <h3>Debug</h3>
                      <p>Ajuda a identificar e corrigir problemas</p>
                    </div>
                  </div>
                </section>
                <section className="guide-section">
                  <h2>Features Principais</h2>
                  <div className="feature-cards-grid">
                    {featuresDetails.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="feature-card" 
                        onClick={() => setSelectedFeature(idx)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="feature-header">
                          <span className="emoji">{feature.icon}</span>
                          <h3>{feature.title}</h3>
                        </div>
                        <p>{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {selectedFeature !== null && (
                  <div className="modal-overlay" onClick={() => setSelectedFeature(null)}>
                    <div className="modal-content feature-modal" onClick={(e) => e.stopPropagation()}>
                      <div className="modal-header">
                        <div className="modal-title-with-icon">
                          <span className="emoji modal-emoji">{featuresDetails[selectedFeature].icon}</span>
                          <h2>{featuresDetails[selectedFeature].title}</h2>
                        </div>
                        <button className="modal-close" onClick={() => setSelectedFeature(null)}>×</button>
                      </div>
                      <div className="modal-body">
                        <p className="feature-subtitle">{featuresDetails[selectedFeature].subtitle}</p>
                        
                        <div className="modal-section">
                          <h4>🎯 Overview</h4>
                          <p>{featuresDetails[selectedFeature].overview}</p>
                        </div>

                        <div className="modal-section">
                          <h4>🚀 Como Usar</h4>
                          <ol className="feature-steps">
                            {featuresDetails[selectedFeature].howToUse.map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <section className="guide-section">
                  <h2>Getting Started</h2>
                  <div className="steps">
                    <div className="step-card">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Instale o Amazon Q</h4>
                        <p><strong>VS Code:</strong> Extensão "Amazon Q"</p>
                        <p><strong>IntelliJ:</strong> Plugin "Amazon Q"</p>
                      </div>
                    </div>
                    <div className="step-card">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Configure Acesso</h4>
                        <p><strong>URL:</strong> https://auth-livelo.awsapps.com/start</p>
                        <p><strong>Região:</strong> sa-east-1</p>
                      </div>
                    </div>
                    <div className="step-card">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Comece a Usar</h4>
                        <p>"Explique este código"</p>
                        <p>"Crie testes para esta classe"</p>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="guide-section">
                  <h2>Métricas de Uso na Livelo</h2>
                  <div className="metrics-grid">
                    <div className="metric-card">
                      <div className="metric-value">190</div>
                      <div className="metric-label">Usuários Ativos</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-value">3</div>
                      <div className="metric-label">Prompts Validados</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-value">1</div>
                      <div className="metric-label">MCPs Integrados</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-value">80%</div>
                      <div className="metric-label">Economia de Tempo</div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {guideTab === 'features' && (
              <section className="guide-section">
                <h2>Features Principais</h2>
                <div className="feature-cards-grid">
                  <div className="feature-card">
                    <div className="feature-header"><span className="emoji">💬</span><h3>Chat e Conversação</h3></div>
                    <p>Interação natural com código para explicações, geração e debug</p>
                    <div className="chip-row">
                      <span className="chip">Linguagem natural</span>
                      <span className="chip">Contexto inteligente</span>
                      <span className="chip">Comandos especiais</span>
                    </div>
                  </div>
                  <div className="feature-card">
                    <div className="feature-header"><span className="emoji">🧪</span><h3>Testes Unitários</h3></div>
                    <p>Geração automática de testes para acelerar desenvolvimento</p>
                    <div className="chip-row">
                      <span className="chip">Geração automática</span>
                      <span className="chip">Mocks inteligentes</span>
                      <span className="chip">Múltiplos frameworks</span>
                    </div>
                  </div>
                  <div className="feature-card">
                    <div className="feature-header"><span className="emoji">🧩</span><h3>Rules</h3></div>
                    <p>Define padrões automaticamente para garantir consistência no time</p>
                    <div className="chip-row">
                      <span className="chip">Padrões automáticos</span>
                      <span className="chip">Arquivos Markdown</span>
                      <span className="chip">Contexto global</span>
                    </div>
                  </div>
                  <div className="feature-card">
                    <div className="feature-header"><span className="emoji">🤖</span><h3>Custom Agents</h3></div>
                    <p>Assistentes personalizáveis para workflows especializados</p>
                    <div className="chip-row">
                      <span className="chip">Workflows específicos</span>
                      <span className="chip">Ferramentas pré-configuradas</span>
                      <span className="chip">Contexto personalizado</span>
                    </div>
                  </div>
                  <div className="feature-card">
                    <div className="feature-header"><span className="emoji">🛠️</span><h3>Customização</h3></div>
                    <p>Personalize o Amazon Q com seu código organizacional</p>
                    <div className="chip-row">
                      <span className="chip">Código organizacional</span>
                      <span className="chip">Sugestões personalizadas</span>
                      <span className="chip">Integração com repositórios</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {guideTab === 'setup' && (
              <section className="guide-section">
                <h2><span className="emoji">⚙️</span> Instalação e Setup</h2>
                <div className="setup-grid">
                  {/* VS Code */}
                  <div className="setup-card">
                    <div className="setup-header">
                      <span className="emoji">🔧</span>
                      <h3>VS Code</h3>
                    </div>
                    <ol className="setup-steps">
                      <li>Abra o VS Code</li>
                      <li>Vá em Extensions (Ctrl+Shift+X)</li>
                      <li>Busque por 'Amazon Q'</li>
                      <li>Clique em 'Install'</li>
                    </ol>
                    <div className="config-box">
                      <h4>Configuração:</h4>
                      <p><strong>URL:</strong> https://auth-livelo.awsapps.com/start</p>
                      <p><strong>Região:</strong> sa-east-1</p>
                    </div>
                  </div>

                  {/* IntelliJ/PyCharm */}
                  <div className="setup-card">
                    <div className="setup-header">
                      <span className="emoji">💻</span>
                      <h3>IntelliJ/PyCharm</h3>
                    </div>
                    <ol className="setup-steps">
                      <li>File → Settings</li>
                      <li>Plugins → Marketplace</li>
                      <li>Busque 'Amazon Q'</li>
                      <li>Install e restart</li>
                    </ol>
                  </div>

                  {/* CLI */}
                  <div className="setup-card">
                    <div className="setup-header">
                      <span className="emoji">💻</span>
                      <h3>CLI</h3>
                    </div>
                    <div className="cli-section">
                      <h4>Instalação:</h4>
                      <div className="code-snippet">
                        <code>npm install -g @aws/amazon-q-developer-cli</code>
                      </div>
                      <div className="code-snippet">
                        <code>brew install amazon-q-cli</code>
                      </div>
                    </div>
                    <div className="cli-section">
                      <h4>Configuração:</h4>
                      <div className="code-snippet">
                        <code>q auth login</code>
                      </div>
                      <div className="code-snippet">
                        <code>q configure set region sa-east-1</code>
                      </div>
                      <div className="code-snippet">
                        <code>q chat</code>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {guideTab === 'troubleshooting' && (
              <section className="guide-section">
                <h2><span className="emoji">🔧</span> Troubleshooting</h2>
                
                {/* Authentication */}
                <div className="troubleshoot-category">
                  <h3>Autenticação</h3>
                  <div className="troubleshoot-item">
                    <div className="problem">
                      <strong>Problema:</strong> Amazon Q não conecta
                    </div>
                    <div className="solution">
                      <strong>Solução:</strong> q auth logout && q auth clear-cache && q auth login
                    </div>
                  </div>
                  <div className="troubleshoot-item">
                    <div className="problem">
                      <strong>Problema:</strong> Token expirado
                    </div>
                    <div className="solution">
                      <strong>Solução:</strong> Configure refresh automático e verifique conectividade
                    </div>
                  </div>
                </div>

                {/* IDE */}
                <div className="troubleshoot-category">
                  <h3>IDE</h3>
                  <div className="troubleshoot-item">
                    <div className="problem">
                      <strong>Problema:</strong> Extensão não carrega
                    </div>
                    <div className="solution">
                      <strong>Solução:</strong> Reinstalar extensão e reiniciar IDE
                    </div>
                  </div>
                  <div className="troubleshoot-item">
                    <div className="problem">
                      <strong>Problema:</strong> Sugestões não aparecem
                    </div>
                    <div className="solution">
                      <strong>Solução:</strong> Verificar tamanho do arquivo e adicionar contexto
                    </div>
                  </div>
                </div>

                {/* Performance */}
                <div className="troubleshoot-category">
                  <h3>Performance</h3>
                  <div className="troubleshoot-item">
                    <div className="problem">
                      <strong>Problema:</strong> Respostas lentas
                    </div>
                    <div className="solution">
                      <strong>Solução:</strong> Reduzir contexto e fechar arquivos desnecessários
                    </div>
                  </div>
                  <div className="troubleshoot-item">
                    <div className="problem">
                      <strong>Problema:</strong> Alto uso de recursos
                    </div>
                    <div className="solution">
                      <strong>Solução:</strong> Configurar limites de arquivos e análise
                    </div>
                  </div>
                </div>
              </section>
            )}

            {guideTab === 'sdlc' && (
              <section className="guide-section sdlc-section">
                <h2><span className="emoji">📊</span> IA no SDLC</h2>
                <p className="sdlc-subtitle">Como usar IA em cada etapa do ciclo de desenvolvimento</p>
                
                <div className="sdlc-carousel">
                  {/* Refinamento da Atividade */}
                  <div className="sdlc-card">
                    <div className="sdlc-header">
                      <div className="sdlc-icon" style={{background: '#ff0080'}}>
                        <span className="emoji">📄</span>
                      </div>
                      <div className="sdlc-title-group">
                        <h3>Refinamento da Atividade</h3>
                        <span className="efficiency-badge">~60% mais rápido</span>
                      </div>
                    </div>
                    <div className="sdlc-tools">
                      <div className="tool-item">
                        <span>MCP Jira</span>
                        <span className="tool-icon">🔌</span>
                      </div>
                      <div className="tool-item">
                        <span>Prompts de análise</span>
                        <span className="tool-icon">🎨</span>
                      </div>
                      <div className="tool-item">
                        <span>Amazon Q Chat</span>
                        <span className="tool-icon">⚡</span>
                      </div>
                      <div className="tool-item">
                        <span>Critérios de aceite</span>
                        <span className="tool-icon">🎨</span>
                      </div>
                    </div>
                  </div>

                  {/* Desenvolvimento */}
                  <div className="sdlc-card">
                    <div className="sdlc-header">
                      <div className="sdlc-icon" style={{background: '#ff0080'}}>
                        <span className="emoji">💻</span>
                      </div>
                      <div className="sdlc-title-group">
                        <h3>Desenvolvimento</h3>
                        <span className="efficiency-badge">~80% economia</span>
                      </div>
                    </div>
                    <div className="sdlc-tools">
                      <div className="tool-item">
                        <span>Amazon Q Code Gen</span>
                        <span className="tool-icon">⚡</span>
                      </div>
                      <div className="tool-item">
                        <span>Rules (.amazonq/rules/)</span>
                        <span className="tool-icon">⚡</span>
                      </div>
                      <div className="tool-item">
                        <span>Prompts customizados</span>
                        <span className="tool-icon">🎨</span>
                      </div>
                      <div className="tool-item">
                        <span>Análise de estrutura</span>
                        <span className="tool-icon">⚡</span>
                      </div>
                    </div>
                  </div>

                  {/* Testes */}
                  <div className="sdlc-card">
                    <div className="sdlc-header">
                      <div className="sdlc-icon" style={{background: '#ff0080'}}>
                        <span className="emoji">🧪</span>
                      </div>
                      <div className="sdlc-title-group">
                        <h3>Testes</h3>
                        <span className="efficiency-badge">~70% mais rápido</span>
                      </div>
                    </div>
                    <div className="sdlc-tools">
                      <div className="tool-item">
                        <span>Testes unitários auto</span>
                        <span className="tool-icon">⚡</span>
                      </div>
                      <div className="tool-item">
                        <span>Cypress automation</span>
                        <span className="tool-icon">🎨</span>
                      </div>
                      <div className="tool-item">
                        <span>Cobertura de testes</span>
                        <span className="tool-icon">🎨</span>
                      </div>
                      <div className="tool-item">
                        <span>Amazon Q Test Gen</span>
                        <span className="tool-icon">⚡</span>
                      </div>
                    </div>
                  </div>

                  {/* Monitoramento */}
                  <div className="sdlc-card">
                    <div className="sdlc-header">
                      <div className="sdlc-icon" style={{background: '#ff0080'}}>
                        <span className="emoji">📈</span>
                      </div>
                      <div className="sdlc-title-group">
                        <h3>Monitoramento</h3>
                        <span className="efficiency-badge">~50% mais rápido</span>
                      </div>
                    </div>
                    <div className="sdlc-tools">
                      <div className="tool-item">
                        <span>MCP Dynatrace</span>
                        <span className="tool-icon">🔌</span>
                      </div>
                      <div className="tool-item">
                        <span>Dashboard prompts</span>
                        <span className="tool-icon">🎨</span>
                      </div>
                      <div className="tool-item">
                        <span>Análise de logs</span>
                        <span className="tool-icon">⚡</span>
                      </div>
                      <div className="tool-item">
                        <span>Investigação incidentes</span>
                        <span className="tool-icon">🎨</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="carousel-progress">
                  <div className="progress-bar"></div>
                </div>

                {/* Legend */}
                <div className="sdlc-legend">
                  <h4>Legenda:</h4>
                  <div className="legend-items">
                    <div className="legend-item">
                      <span className="legend-icon">🔌</span>
                      <span>MCP (Model Context Protocol)</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-icon">🎨</span>
                      <span>Prompt Validado</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-icon">⚡</span>
                      <span>Feature Amazon Q</span>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        );
      
      case 'prompts':
        return (
          <div className="tab-content">
            <h1>Biblioteca de Prompts</h1>
            <p>Prompts técnicos validados para desenvolvimento de software.</p>
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
              {prompts
                .filter(pb =>
                  (promptType === 'Todos os prompts' || pb.badge === promptType) &&
                  pb.title.toLowerCase().includes(searchPrompt.toLowerCase())
                )
                .map((pb, idx) => (
                  <PromptCard key={idx} {...pb} onClick={() => { setSelectedPrompt(idx); setModalTab('rule'); }} />
                ))}
            </div>

            {selectedPrompt !== null && (
              <div className="modal-overlay" onClick={() => setSelectedPrompt(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h2>{prompts[selectedPrompt].title}</h2>
                    <button className="modal-close" onClick={() => setSelectedPrompt(null)}>×</button>
                  </div>
                  <div className="modal-tabs">
                    <span 
                      className={`modal-tab ${modalTab === 'rule' ? 'active' : ''}`}
                      onClick={() => setModalTab('rule')}
                    >
                      Prompt
                    </span>
                    <span 
                      className={`modal-tab ${modalTab === 'installation' ? 'active' : ''}`}
                      onClick={() => setModalTab('installation')}
                    >
                      Installation
                    </span>
                  </div>
                  <div className="modal-body modal-body-compact">
                    {modalTab === 'rule' ? (
                      <>
                        <div className="user-stories-bg prompt-base-block">
                          <div className="modal-title-with-icon" style={{marginBottom: '20px'}}>
                            <span style={{fontSize: '2.5rem', lineHeight: 1}}>⚙️</span>
                            <h3 style={{margin: 0, fontSize: '1.8rem', fontWeight: 700, color: '#4b5563'}}>Configuração de Contexto Inteligente AmazonQ</h3>
                          </div>
                          <p style={{color: '#6b7280', fontSize: '1rem', marginBottom: '32px', lineHeight: 1.6}}>{prompts[selectedPrompt].details.subtitle}</p>
                          
                          {(() => {
                            const contextText = prompts[selectedPrompt].details.context;
                            const sections = contextText.split(/\n\n(?=[🎯🔍📋📝✅🏷️])/);
                            
                            return sections.map((section, idx) => {
                              const lines = section.split('\n').filter(l => l.trim());
                              if (lines.length === 0) return null;
                              
                              return (
                                <div key={idx} className="modal-section">
                                  {lines.map((line, lineIdx) => {
                                    // Headings with emojis
                                    if (line.match(/^[⚙️🎯🔍📋📝✅🏷️]/)) {
                                      return <h3 key={lineIdx} style={{fontSize: '1.3rem', fontWeight: 700, color: '#4b5563', marginTop: lineIdx > 0 ? '20px' : '0', marginBottom: '12px'}}>{line}</h3>;
                                    }
                                    // Numbered sections (1., 2., etc)
                                    if (line.match(/^\d+\.\s/)) {
                                      return <h4 key={lineIdx} style={{fontSize: '1.15rem', fontWeight: 700, color: '#4b5563', marginTop: '16px', marginBottom: '10px'}}>{line}</h4>;
                                    }
                                    // Bold sections (Análise de Código, etc)
                                    if (line.match(/^[A-Z][a-zá-ú]+(\s[A-Z][a-zá-ú]+)*$/)) {
                                      return <h5 key={lineIdx} style={{fontSize: '1.05rem', fontWeight: 600, color: '#4b5563', marginTop: '20px', marginBottom: '16px'}}>{line}</h5>;
                                    }
                                    // Code blocks (starting with .)
                                    if (line.startsWith('.amazonq') || line.startsWith('└') || line.startsWith('├') || line.startsWith('│') || line.startsWith('Feature:') || line.startsWith('Scenario:') || line.startsWith('  Given') || line.startsWith('  When') || line.startsWith('  Then') || line.startsWith('##') || line.startsWith('###') || line.startsWith('-') || line.startsWith('    ')) {
                                      return <pre key={lineIdx} style={{fontFamily: 'Courier New, monospace', fontSize: '0.88rem', color: '#4b5563', margin: '2px 0', lineHeight: '1.65', padding: '0', background: 'transparent'}}>{line}</pre>;
                                    }
                                    // Bullet points
                                    if (line.startsWith('•')) {
                                      return <div key={lineIdx} style={{marginLeft: '0', marginBottom: '12px', color: '#4b5563', lineHeight: '1.6', paddingLeft: '0'}}>{line}</div>;
                                    }
                                    // Regular text
                                    return <p key={lineIdx} style={{color: '#4b5563', lineHeight: '1.7', margin: '6px 0', fontSize: '0.95rem'}}>{line}</p>;
                                  })}
                                </div>
                              );
                            });
                          })()}
                          {prompts[selectedPrompt].details.strategy ? (
                            (() => {
                              const parts = (prompts[selectedPrompt].details.strategy as string).split(/\n---\n/);
                              return (
                                <div className="modal-section">
                                  <h4>📝 Estratégia de 3 Prompts</h4>
                                  {parts.map((part, idx) => {
                                    const lines = part.split('\n');
                                    const heading = (lines[0] || '').trim();
                                    const content = lines.slice(1).join('\n').trim();
                                    return (
                                      <div key={idx} style={{marginBottom: '14px'}}>
                                        <strong>{heading}</strong>
                                        <pre className="code-block">{content}</pre>
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })()
                          ) : null}
                          {(prompts[selectedPrompt].details as any).promptContent ? (
                            <div className="modal-section">
                              <h4>📝 Prompt</h4>
                              <pre className="code-block">{(prompts[selectedPrompt].details as any).promptContent}</pre>
                            </div>
                          ) : null}
                          {prompts[selectedPrompt].details.results ? (
                            <div className="modal-section">
                              <h4>📊 Resultados</h4>
                              <ul>
                                {(prompts[selectedPrompt].details.results as string[]).map((r, i) => (
                                  <li key={i}>{r}</li>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                          {(prompts[selectedPrompt].details as any).howToUse ? (
                            <div className="modal-section">
                              <h4>🔧 Como usar</h4>
                              <ol className="feature-steps">
                                {((prompts[selectedPrompt].details as any).howToUse as string[]).map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ol>
                            </div>
                          ) : null}
                          {(prompts[selectedPrompt].details as any).validated ? (
                            <div className="modal-section">
                              <h4>✅ Validado por</h4>
                              <ul>
                                {((prompts[selectedPrompt].details as any).validated as string[]).map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                          {(prompts[selectedPrompt].details as any).exampleCode ? (
                            <div className="modal-section">
                              <h4>📚 {(prompts[selectedPrompt].details as any).exampleTitle || 'Exemplo de Saída'}</h4>
                              {(prompts[selectedPrompt].details as any).exampleDescription ? (
                                <p>{(prompts[selectedPrompt].details as any).exampleDescription}</p>
                              ) : null}
                              {(prompts[selectedPrompt].details as any).exampleItems ? (
                                <ul>
                                  {((prompts[selectedPrompt].details as any).exampleItems as string[]).map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>
                              ) : null}
                              <pre className="code-block">{(prompts[selectedPrompt].details as any).exampleCode}</pre>
                            </div>
                          ) : null}
                          {prompts[selectedPrompt].details.tags ? (
                            <div className="modal-section">
                              <h4>🏷️ Tags</h4>
                              <p>{(prompts[selectedPrompt].details.tags as string[]).join(' ')}</p>
                            </div>
                          ) : null}
                        </div>
                        <button
                          className="copy-button"
                          onClick={() => {
                            const d = prompts[selectedPrompt].details as any;
                            const content = [
                              `📊 ${prompts[selectedPrompt].title}`,
                              d.context,
                              d.objective,
                              d.strategy,
                              d.results ? d.results.join('\n') : '',
                              d.tags ? d.tags.join(' ') : ''
                            ].filter(Boolean).join('\n\n');
                            navigator.clipboard.writeText(content);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                        >
                          {copied ? 'Copiado!' : 'Copiar conteúdo'}
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="user-stories-bg prompt-base-block">
                          {prompts[selectedPrompt].title === 'Cobertura Testes Cypress' ? (
                            <>
                              <h3>🚀 Como Usar</h3>
                              
                              <div className="modal-section">
                                <h4>Pré-requisitos</h4>
                                <ul>
                                  <li>Amazon Q Developer na IDE</li>
                                  <li>Projeto MFE com pasta src/ e cypress/</li>
                                  <li>Testes existentes para referência</li>
                                </ul>
                              </div>

                              <div className="modal-section">
                                <h4>Execução</h4>
                                <ol className="feature-steps">
                                  <li>Abra o Amazon Q na sua IDE</li>
                                  <li>Navegue até o projeto do Micro Frontend</li>
                                  <li>Cole o prompt no chat do Amazon Q</li>
                                  <li>Adicione contexto usando:</li>
                                </ol>
                                <ul style={{marginTop: '8px', marginLeft: '40px'}}>
                                  <li><code>@folder src</code> - código fonte do MFE</li>
                                  <li><code>@folder cypress</code> - testes existentes</li>
                                </ul>
                              </div>

                              <div className="modal-section">
                                <h4>Prompt Completo</h4>
                                <pre className="code-block">Contexto: Você tem acesso à página src de um Micro Frontend (MFE) e à pasta cypress com testes já existentes.

Objetivo: Aumentar a cobertura de testes automatizados para garantir uma melhor qualidade do software.

Tarefa: Analise o contexto do MFE para entender o objetivo de negócio e, em seguida, implemente novos testes no Cypress que ainda não foram automatizados.

Instruções:

Análise do Contexto:
- Examine a estrutura e o conteúdo da página src para identificar componentes, funcionalidades e fluxos de usuário críticos.
- Revise os testes existentes na pasta cypress para entender quais cenários já estão cobertos.
- Revise os testes unitários existentes para entender quais cenários já estão cobertos.

Identificação de Lacunas:
- Identifique funcionalidades e fluxos de usuário que não estão cobertos pelos testes existentes.
- Priorize a implementação de testes para funcionalidades críticas e de alto impacto.

Implementação de Novos Testes:
- Escreva novos testes no Cypress para cobrir as lacunas identificadas.
- Garanta que os novos testes sejam robustos, legíveis e bem documentados.

Validação:
- Execute todos os testes (existentes e novos) para garantir que o MFE funcione conforme esperado.
- Revise os resultados dos testes e faça ajustes conforme necessário.

Resultado Esperado: Uma cobertura de testes mais abrangente que contribua para a melhoria contínua da qualidade do software.</pre>
                              </div>

                              <div className="modal-section">
                                <h4>✅ Resultado</h4>
                                <ul>
                                  <li>Novos testes Cypress gerados</li>
                                  <li>Cobertura aumentada significativamente</li>
                                  <li>Lacunas críticas identificadas automaticamente</li>
                                </ul>
                              </div>

                              <div className="modal-section">
                                <h4>💡 Dicas</h4>
                                <ul>
                                  <li>Execute os testes gerados para validar</li>
                                  <li>Ajuste seletores se necessário</li>
                                  <li>Mantenha testes organizados por funcionalidade</li>
                                </ul>
                              </div>
                            </>
                          ) : prompts[selectedPrompt].title === 'Contexto Inteligente AmazonQ' ? (
                            <>
                              <h3>🚀 Como Usar</h3>
                              
                              <div className="modal-section">
                                <h4>Pré-requisitos</h4>
                                <ul>
                                  <li>Amazon Q Developer instalado na IDE</li>
                                  <li>Acesso ao repositório do projeto</li>
                                  <li>Permissões para criar arquivos na raiz do projeto</li>
                                </ul>
                              </div>

                              <div className="modal-section">
                                <h4>Execução</h4>
                                <ol className="feature-steps">
                                  <li>Abra o Amazon Q na sua IDE</li>
                                  <li>Navegue até a raiz do projeto</li>
                                  <li>Cole o prompt no chat do Amazon Q</li>
                                  <li>Adicione contexto usando <code>@workspace</code> para análise completa</li>
                                </ol>
                              </div>

                              <div className="modal-section">
                                <h4>Prompt Completo</h4>
                                <pre className="code-block">{`Analise este projeto usando @workspace e crie a estrutura completa de contexto inteligente do AmazonQ.

Crie os seguintes arquivos em .amazonq/rules/:

1. project-overview.md - Visão geral do projeto, stack, APIs e integrações
2. coding-standards.md - Padrões de código, nomenclatura e formatação
3. architecture-patterns.md - Padrões arquiteturais e design patterns
4. business-rules.md - Regras de negócio por domínio
5. scenarios.md - Cenários BDD das principais features

Para cada arquivo:
- Analise o código existente e extraia padrões
- Documente regras implícitas encontradas
- Use exemplos práticos do projeto
- Mantenha consistência com implementação atual

Para scenarios.md, use formato BDD:
Feature: [nome]
Scenario: [cenário]
  Given [contexto]
  When [ação]
  Then [resultado]

Para business-rules.md, use formato:
## [Domínio]
- **RN001**: [descrição]
  - Condição: [quando]
  - Ação: [o que]
  - Exceções: [casos especiais]`}</pre>
                              </div>

                              <div className="modal-section">
                                <h4>✅ Resultado Esperado</h4>
                                <p><strong>Estrutura criada:</strong></p>
                                <pre className="code-block">{`.amazonq/
└── rules/
    ├── project-overview.md
    ├── coding-standards.md
    ├── architecture-patterns.md
    ├── business-rules.md
    └── scenarios.md`}</pre>
                              </div>

                              <div className="modal-section">
                                <h4>💡 Dicas</h4>
                                <ul>
                                  <li>Execute em projetos com código existente para melhor análise</li>
                                  <li>Revise e ajuste os arquivos gerados conforme necessário</li>
                                  <li>Mantenha os arquivos atualizados conforme projeto evolui</li>
                                  <li>Use como referência para onboarding de novos desenvolvedores</li>
                                </ul>
                              </div>

                              <div className="modal-section">
                                <h4>🔄 Manutenção</h4>
                                <ul>
                                  <li>Atualize após mudanças significativas na arquitetura</li>
                                  <li>Revise regras de negócio periodicamente</li>
                                  <li>Adicione novos cenários conforme features são implementadas</li>
                                  <li>Integre revisão das rules no processo de code review</li>
                                </ul>
                              </div>
                            </>
                          ) : (
                            <>
                              <h3>🚀 Como Usar</h3>
                              
                              <div className="modal-section">
                                <h4>Pré-requisitos</h4>
                                <ul>
                                  <li>Amazon Q Developer instalado na IDE</li>
                                  <li>Acesso ao repositório do microserviço</li>
                                  <li>Arquivos de knowledge base na raiz do projeto</li>
                                </ul>
                              </div>

                              <div className="modal-section">
                                <h4>Setup Inicial</h4>
                                <p><strong>Crie os arquivos de apoio na raiz do projeto:</strong></p>
                                <ul>
                                  <li><code>DQL-Best-Practices.md</code> - Padrões para queries DQL</li>
                                  <li><code>Dashboard-Layout-Patterns.md</code> - Padrões de layout</li>
                                </ul>
                                <p style={{marginTop: '16px'}}><strong>Configure as variáveis:</strong></p>
                                <ul>
                                  <li><code>bucket_name</code> = nome do seu bucket</li>
                                  <li><code>container_name</code> = nome do seu container</li>
                                </ul>
                              </div>

                              <div className="modal-section">
                                <h4>Execução</h4>
                                <p>Execute os 3 prompts sequencialmente no Amazon Q:</p>
                                
                                <div style={{marginTop: '16px'}}>
                                  <p><strong>1️⃣ Levantamento de Métricas</strong></p>
                                  <pre className="code-block">Sou tech lead do time responsável pelo micro serviço que está aberto no workspace.
Para ganhar contexto sobre o projeto leia o arquivo @documentação_do_projeto 
Estou criando um dashboard no dynatrace baseado em logs do código, avalie todos log.info, e crie métricas baseada neles, consolide em um arquivo markdown.</pre>
                                </div>

                                <div style={{marginTop: '16px'}}>
                                  <p><strong>2️⃣ Geração de DQLs</strong></p>
                                  <pre className="code-block">Ótimo resultado.
Atualize o documento markdown criado, para cada métrica crie uma DQL(Dynatrace Query Language) baseada em logs do código(log.inf()).
Utilize o markdown @DQL-Best-Practices.md para padrões e melhores práticas a serem seguidas para DQLs.
bucket_name = [SEU_BUCKET]
container_name = [SEU_CONTAINER]</pre>
                                </div>

                                <div style={{marginTop: '16px'}}>
                                  <p><strong>3️⃣ Construção do Dashboard</strong></p>
                                  <pre className="code-block">Ótimo resultado.
Agora crie um dashboard, um arquivo json para ser importado no dynatrace, utilizando os DQL do arquivo markdown que você criou @arquivo_criado_de_métricas.md 
Utilize o arquivo @Dashboard-Layout-Patterns.md para padrões e boas práticas que devem serem seguidas no dahsboard.</pre>
                                </div>
                              </div>

                              <div className="modal-section">
                                <h4>✅ Resultado</h4>
                                <ul>
                                  <li>Arquivo JSON pronto para upload no Dynatrace</li>
                                  <li>Dashboard otimizado seguindo melhores práticas</li>
                                </ul>
                              </div>

                              <div className="modal-section">
                                <h4>💡 Dicas</h4>
                                <ul>
                                  <li>Substitua @documentação_do_projeto pela referência real</li>
                                  <li>Valide cada etapa antes de prosseguir</li>
                                  <li>Mantenha logs estruturados no código</li>
                                </ul>
                              </div>
                            </>
                          )}
                        </div>
                        <button
                          className="copy-button"
                          onClick={() => {
                            const installContent = `🚀 Como Usar\n\nPré-requisitos:\n- Amazon Q Developer instalado na IDE\n- Acesso ao repositório do microserviço\n- Arquivos de knowledge base na raiz do projeto\n\nSetup Inicial:\n- DQL-Best-Practices.md\n- Dashboard-Layout-Patterns.md\n- bucket_name = [SEU_BUCKET]\n- container_name = [SEU_CONTAINER]\n\nExecução:\n\n1️⃣ Levantamento de Métricas\n2️⃣ Geração de DQLs\n3️⃣ Construção do Dashboard\n\n✅ Resultado: Arquivo JSON pronto para upload no Dynatrace`;
                            navigator.clipboard.writeText(installContent);
                            setCopiedInstall(true);
                            setTimeout(() => setCopiedInstall(false), 2000);
                          }}
                        >
                          {copiedInstall ? 'Copiado!' : 'Copiar instalação'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'mcps':
        return (
          <div className="tab-content mcp-content">
            <h1>Catálogo MCP</h1>
            <p>Model Context Protocols disponíveis para integração com Amazon Q</p>
            
            <section className="mcp-section">
              <h2 className="section-title">MCPs {mcps.filter(m => m.status === 'Homologado').length > 0 ? 'Homologados' : ''}</h2>
              <p className="section-subtitle">MCPs testados e aprovados para uso na Livelo.</p>
              
              <div className="mcp-cards-grid">
                {mcps.filter(m => m.status === 'Homologado').map((mcp, idx) => (
                  <div 
                    key={idx} 
                    className="mcp-card-new"
                    onClick={() => setSelectedMcp(mcps.findIndex(m => m.title === mcp.title))}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="mcp-card-header">
                      <h3>{mcp.title}</h3>
                      <span className="status-badge approved">✓ Homologado</span>
                    </div>
                    <p className="mcp-description">{mcp.description}</p>
                    <div className="mcp-details">
                      <p><strong>IDE:</strong> {mcp.ide}</p>
                      <p><strong>Testado por:</strong> {mcp.testedBy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mcp-section">
              <h2 className="section-title">Em Exploração</h2>
              <p className="section-subtitle">MCPs sendo testados pela equipe.</p>
              
              <div className="mcp-cards-grid">
                {mcps.filter(m => m.status === 'Em teste').map((mcp, idx) => (
                  <div 
                    key={idx} 
                    className="mcp-card-new"
                    onClick={() => setSelectedMcp(mcps.findIndex(m => m.title === mcp.title))}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="mcp-card-header">
                      <h3>{mcp.title}</h3>
                      <span className="status-badge testing">⚠ Em teste</span>
                    </div>
                    <p className="mcp-description">{mcp.description}</p>
                    <div className="mcp-details">
                      <p><strong>Quem está testando:</strong> {mcp.testedBy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {selectedMcp !== null && (
              <div className="modal-overlay" onClick={() => setSelectedMcp(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <div className="modal-title-with-icon">
                      {mcps[selectedMcp].icon}
                      <h2>{mcps[selectedMcp].title}</h2>
                    </div>
                    <button className="modal-close" onClick={() => setSelectedMcp(null)}>×</button>
                  </div>
                  <div className="modal-body">
                    <p className="feature-subtitle">{mcps[selectedMcp].details.subtitle}</p>
                    
                    <div className="modal-section">
                      <h4>🎯 Overview</h4>
                      <p>{mcps[selectedMcp].details.overview}</p>
                    </div>

                    <div className="modal-section">
                      <h4>⚡ Features</h4>
                      <ul>
                        {mcps[selectedMcp].details.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="modal-section">
                      <h4>🚀 Como Usar</h4>
                      <ol className="feature-steps">
                        {mcps[selectedMcp].details.howToUse.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="modal-section">
                      <h4>📋 Requisitos</h4>
                      <ul>
                        {mcps[selectedMcp].details.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <section className="mcp-section quick-start">
              <h2 className="section-title">Quick Start</h2>
              
              <div className="quick-start-grid">
                <div className="quick-start-card">
                  <h3>1. Escolha um MCP</h3>
                  <p>Clique em um MCP acima para ver o guia de configuração.</p>
                </div>

                <div className="quick-start-card">
                  <h3>2. Siga o guia de setup</h3>
                  <p>Cada MCP tem instruções detalhadas de configuração.</p>
                </div>

                <div className="quick-start-card">
                  <h3>3. Teste a integração</h3>
                  <p>Exemplo: "Liste as issues do sprint atual do projeto LIV"</p>
                </div>
              </div>
            </section>
          </div>
        );
      
      case 'rules':
        return (
          <div className="tab-content">
            <h1>Biblioteca de Rules</h1>
            <p>Regras e padrões para uso eficiente do Amazon Q Developer.</p>
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
              {rules
                .filter(rule =>
                  (ruleFilter === 'Todas as rules' || rule.category === ruleFilter) &&
                  rule.title.toLowerCase().includes(searchRule.toLowerCase())
                )
                .map((rule, idx) => (
                  <div 
                    key={idx} 
                    className="prompt-card"
                    onClick={() => setSelectedRule(idx)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="prompt-icon">{rule.icon}</div>
                    <h3 className="prompt-title">{rule.title}</h3>
                    <div className="prompt-meta">
                      <span className="prompt-badge">{rule.tags[0]}</span>
                      <span className="prompt-speed">{rule.tags[1]}</span>
                    </div>
                    <p className="prompt-desc">{rule.description}</p>
                  </div>
                ))}
            </div>

            {selectedRule !== null && (
              <div className="modal-overlay" onClick={() => { setSelectedRule(null); setModalTab('rule'); }}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h2>{rules[selectedRule].title}</h2>
                    <button className="modal-close" onClick={() => { setSelectedRule(null); setModalTab('rule'); }}>×</button>
                  </div>
                  <div className="modal-tabs">
                    <span 
                      className={`modal-tab ${modalTab === 'rule' ? 'active' : ''}`}
                      onClick={() => setModalTab('rule')}
                    >
                      Prompt
                    </span>
                    <span 
                      className={`modal-tab ${modalTab === 'installation' ? 'active' : ''}`}
                      onClick={() => setModalTab('installation')}
                    >
                      Installation
                    </span>
                  </div>
                  <div className="modal-body" style={{paddingTop: '28px'}}>
                    {modalTab === 'rule' ? (
                      <>
                        <div className="user-stories-bg prompt-base-block" style={{paddingTop: '12px', marginTop: '0'}}>
                          <div className="modal-title-with-icon" style={{marginBottom: '2px'}}>
                            <h3 style={{margin: 0, fontSize: '1.8rem', fontWeight: 700, color: '#4b5563'}}>📖 {rules[selectedRule].title}</h3>
                          </div>
                          <p style={{color: '#6b7280', fontSize: '1rem', marginBottom: '6px', lineHeight: 1.6}}>{rules[selectedRule].details.subtitle}</p>
                          
                          {(() => {
                            const overviewText = rules[selectedRule].details.overview;
                            const sections = overviewText.split(/\n\n(?=[📚🎯📁🚀📝🏷️📄📑✏️📋💻🔗📊📏])/);
                            
                            return sections.map((section, idx) => {
                              const lines = section.split('\n').filter(l => l.trim());
                              if (lines.length === 0) return null;
                              
                              // Skip first section if it's just the title (already displayed above)
                              if (idx === 0 && lines.length <= 2 && (lines[0].includes('Guia de Estilo Markdown') || lines[0].includes('Amazon Q Learning Files') || lines[0].match(/^📖/))) {
                                return null;
                              }
                              
                              return (
                                <div key={idx} className="modal-section">
                                  {lines.map((line, lineIdx) => {
                                    // Main headings with emojis
                                    if (line.match(/^[📚🎯📁🚀📝🏷️📄📑✏️📋💻🔗📊📏]/)) {
                                      return <h3 key={lineIdx} style={{fontSize: '1.3rem', fontWeight: 700, color: '#4b5563', marginTop: lineIdx > 0 ? '20px' : '0', marginBottom: '12px'}}>{line}</h3>;
                                    }
                                    // Subheadings (bold text patterns)
                                    if (line.match(/^(Regras Básicas|Exemplo|Diretrizes|Regras|Formato|Citações|Linhas Horizontais|HTML Inline|Princípios|Checklist de Qualidade)$/)) {
                                      return <h4 key={lineIdx} style={{fontSize: '1.1rem', fontWeight: 600, color: '#6b7280', marginTop: '16px', marginBottom: '10px'}}>{line}</h4>;
                                    }
                                    // Table headers and rows
                                    if (line.startsWith('|')) {
                                      return <pre key={lineIdx} style={{fontFamily: 'Courier New, monospace', fontSize: '0.88rem', color: '#4b5563', margin: '2px 0', lineHeight: '1.65', padding: '0', background: 'transparent', overflowX: 'auto', whiteSpace: 'pre', maxWidth: '100%'}}>{line}</pre>;
                                    }
                                    // Code blocks (markdown examples)
                                    if (line.startsWith('q-learning-') || line.match(/^(#|##|###|-|\d\.|>|---|```|\*\*|__)/)) {
                                      return <pre key={lineIdx} style={{fontFamily: 'Courier New, monospace', fontSize: '0.88rem', color: '#4b5563', margin: '2px 0', lineHeight: '1.65', padding: '8px 12px', background: '#f9fafb', borderRadius: '4px', overflowX: 'auto', whiteSpace: 'pre', maxWidth: '100%'}}>{line}</pre>;
                                    }
                                    // Checkbox items
                                    if (line.startsWith('[ ]')) {
                                      return <div key={lineIdx} style={{marginLeft: '0', marginBottom: '8px', color: '#4b5563', lineHeight: '1.6', paddingLeft: '0', fontFamily: 'monospace'}}>{line}</div>;
                                    }
                                    // Bullet points
                                    if (line.startsWith('•')) {
                                      return <div key={lineIdx} style={{marginLeft: '0', marginBottom: '8px', color: '#4b5563', lineHeight: '1.6', paddingLeft: '0'}}>{line}</div>;
                                    }
                                    // Bold inline text (like "Comprimento da linha:")
                                    if (line.includes(':') && !line.startsWith('>')) {
                                      const parts = line.split(':');
                                      if (parts.length === 2) {
                                        return <div key={lineIdx} style={{marginBottom: '8px', color: '#4b5563', lineHeight: '1.6'}}><strong>{parts[0]}:</strong>{parts[1]}</div>;
                                      }
                                    }
                                    // Regular text
                                    return <p key={lineIdx} style={{color: '#4b5563', lineHeight: '1.7', margin: '6px 0', fontSize: '0.95rem'}}>{line}</p>;
                                  })}
                                </div>
                              );
                            });
                          })()}
                        </div>
                        <button
                          className="copy-button"
                          onClick={() => {
                            const content = [
                              rules[selectedRule].title,
                              rules[selectedRule].details.subtitle,
                              rules[selectedRule].details.overview,
                              (rules[selectedRule].details.structure || rules[selectedRule].details.guidelines).join('\n'),
                              rules[selectedRule].details.benefits.join('\n'),
                              rules[selectedRule].details.howToImplement.join('\n')
                            ].filter(Boolean).join('\n\n');
                            navigator.clipboard.writeText(content);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                        >
                          {copied ? 'Copiado!' : 'Copiar conteúdo'}
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="user-stories-bg prompt-base-block" style={{paddingTop: '12px', marginTop: '0'}}>
                          <h3>🚀 Como Instalar</h3>
                          
                          <div className="modal-section">
                            <h4>Método 1: Download Automático</h4>
                            <pre className="code-block">{`# Criar pasta de rules e baixar arquivo
mkdir -p .amazonq/rules && curl -o .amazonq/rules/${rules[selectedRule].title === 'Amazon Q Learning Files' ? 'amazon-q-learning-files.md' : 'markdown-best-practices.md'} https://promptz.dev/rules/general/${rules[selectedRule].title === 'Amazon Q Learning Files' ? 'amazon-q-learning-files' : 'markdown-best-practices'}/`}</pre>
                          </div>

                          <div className="modal-section">
                            <h4>Método 2: Criação Manual</h4>
                            <ol className="feature-steps">
                              <li>Crie a estrutura:
                                <pre className="code-block" style={{marginTop: '8px'}}>{`mkdir -p .amazonq/rules
touch .amazonq/rules/${rules[selectedRule].title === 'Amazon Q Learning Files' ? 'amazon-q-learning-files.md' : 'markdown-best-practices.md'}`}</pre>
                              </li>
                              <li>Adicione o conteúdo da rule no arquivo</li>
                            </ol>
                          </div>

                          <div className="modal-section">
                            <h4>✅ Resultado Esperado</h4>
                            <ul>
                              {rules[selectedRule].title === 'Amazon Q Learning Files' ? (
                                <>
                                  <li>Rule aparece na lista de rules ativas do Amazon Q</li>
                                  <li>Amazon Q começa a seguir as convenções automaticamente</li>
                                  <li>Sugestões ficam mais consistentes com os padrões</li>
                                </>
                              ) : (
                                <>
                                  <li>Documentação consistente em todo projeto</li>
                                  <li>Amazon Q segue padrões automaticamente</li>
                                  <li>Linter valida qualidade dos arquivos</li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                        <button
                          className="copy-button"
                          onClick={() => {
                            const fileName = rules[selectedRule].title === 'Amazon Q Learning Files' ? 'amazon-q-learning-files.md' : 'markdown-best-practices.md';
                            const urlPath = rules[selectedRule].title === 'Amazon Q Learning Files' ? 'amazon-q-learning-files' : 'markdown-best-practices';
                            const content = `🚀 Como Instalar

Método 1: Download Automático

mkdir -p .amazonq/rules && curl -o .amazonq/rules/${fileName} https://promptz.dev/rules/general/${urlPath}/

Método 2: Criação Manual

1. Criar estrutura: mkdir -p .amazonq/rules && touch .amazonq/rules/${fileName}
2. Adicionar conteúdo da rule no arquivo

✅ Resultado Esperado

${rules[selectedRule].title === 'Amazon Q Learning Files' ? 
  '- Rule aparece na lista de rules ativas do Amazon Q\n- Amazon Q começa a seguir as convenções automaticamente\n- Sugestões ficam mais consistentes com os padrões' : 
  '- Documentação consistente em todo projeto\n- Amazon Q segue padrões automaticamente\n- Linter valida qualidade dos arquivos'}`;
                            navigator.clipboard.writeText(content);
                            setCopiedInstall(true);
                            setTimeout(() => setCopiedInstall(false), 2000);
                          }}
                        >
                          {copiedInstall ? 'Copiado!' : 'Copiar instalação'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`main-bg ${theme}`}>
      <nav className="navbar">
        <div className="navbar-left">
        </div>
        <ul className="nav-list">
          {tabs.map(tab => (
            <li
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
        <div className="navbar-right">
          <span
            className="icon theme-toggle"
            role="button"
            aria-label="Alternar tema"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
          >
            {theme === 'dark' ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            )}
          </span>
        </div>
      </nav>
      <div className={`content ${activeTab === 'inicio' ? 'content-wide' : ''}`}>
        {renderTabContent()}
      </div>
      
      <button 
        className="floating-btn" 
        aria-label="IA Assistant"
        onClick={() => setChatOpen(!chatOpen)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
          <circle cx="17" cy="6" r="1.5" stroke="white" strokeWidth="1.5"/>
        </svg>
      </button>

      {chatOpen && (
            <div className="chat-modal">
              <div className="chat-header">
                <h3>Assistente IA</h3>
                <button 
                  className="chat-close" 
                  onClick={() => setChatOpen(false)}
                  aria-label="Fechar chat"
                >
                  ×
                </button>
              </div>
              <div className="chat-body">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`chat-message ${msg.isUser ? 'user-message' : 'assistant-message'}`}>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
              <div className="chat-footer">
                <input
                  type="text"
                  placeholder="Digite sua pergunta..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && chatMessage.trim()) {
                      handleSendMessage();
                    }
                  }}
                />
                <button 
                  className="chat-send-btn"
                  onClick={handleSendMessage}
                >
                  Enviar
                </button>
              </div>
            </div>
          )}
    </div>
  );
}

export default App;
