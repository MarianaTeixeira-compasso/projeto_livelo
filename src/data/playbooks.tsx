import { FileText, Layers, Zap, CheckCircle, MessageCircle } from 'lucide-react';

export const playbooks = [
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
      promptBase: `Prompt: Análise de Épico

Analise este épico e sugira:

Épico: [descrever o épico]

1. Quebra em user stories menores
2. Dependências técnicas
3. Riscos potenciais
4. Ordem sugerida de implementação
5. Estimativa de esforço (P/M/G)

Considere: [contexto técnico ou de negócio relevante]

---
Prompt: Priorização

Tenho estas stories no backlog:

[listar stories]

Critérios de priorização:
- Valor de negócio: [alto/médio/baixo]
- Urgência: [alta/média/baixa]
- Esforço técnico: [alto/médio/baixo]
- Dependências: [listar se houver]

Sugira ordem de priorização com justificativa.`,
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
      promptBase: `Prompt: Objetivo de Sprint

Contexto do Sprint:
- Duração: [X dias]
- Capacidade do time: [X pontos ou dias]
- Prioridades: [listar]

Stories candidatas:
[listar stories com estimativas]

Gere:
1. Objetivo claro do sprint
2. Seleção de stories que cabem na capacidade
3. Riscos e mitigações
4. Métricas de sucesso

---
Prompt: Análise de Capacidade

Time: [X desenvolvedores]
Velocidade média: [X pontos]
Ausências planejadas: [listar]
Dívidas técnicas: [listar]

Stories propostas:
[listar com estimativas]

Analise se o sprint está balanceado e sugira ajustes.`,
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
      promptBase: `Prompt: Análise de Requisito

Requisito recebido:
[descrever requisito]

Analise e forneça:
1. Requisitos funcionais detalhados
2. Requisitos não-funcionais
3. Casos de uso principais
4. Perguntas para stakeholders
5. Possíveis gaps ou ambiguidades

---
Prompt: Documentação

Feature: [nome]
Objetivo: [descrever]
Stakeholders: [listar]

Gere documentação incluindo:
- Visão geral
- Fluxos principais
- Regras de negócio
- Critérios de aceite
- Casos de teste sugeridos`,
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
      promptBase: `Prompt: Categorização

Feedbacks recebidos:
[colar lista de feedbacks]

Categorize por:
1. Tipo (Bug, Feature Request, Melhoria, Elogio)
2. Severidade (Alta, Média, Baixa)
3. Área do produto
4. Sentimento (Positivo, Neutro, Negativo)

Identifique padrões e tendências.

---
Prompt: Insights Acionáveis

Feedbacks categorizados:
[resumo das categorias]

Gere:
1. Top 5 problemas mais mencionados
2. Sugestões de melhorias prioritárias
3. Quick wins (fácil implementação, alto impacto)
4. Riscos de churn identificados`,
      example: ``,
      tips: [],
      timeEconomized: '~75% mais rápido na análise'
    }
  },
];