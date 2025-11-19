import { BarChart3, FileText, Settings } from 'lucide-react';

export const prompts = [
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
      strategy: `Prompt 1: Levantamento de Métricas
Sou tech lead do time responsável pelo micro serviço que está aberto no workspace.
Para ganhar contexto sobre o projeto leia o arquivo @documentação_do_projeto
Estou criando um dashboard no dynatrace baseado em logs do código, avalie todos log.info, e crie métricas baseada neles, consolide em um arquivo markdown.

---
Prompt 2: Geração de DQLs
Ótimo resultado.
Atualize o documento markdown criado, para cada métrica crie uma DQL(Dynatrace Query Language) baseada em logs do código(log.inf()).
Utilize o markdown @DQL-Best-Practices.md para padrões e melhores práticas a serem seguidas para DQLs.

---
Prompt 3: Construção do Dashboard
Ótimo resultado.
Agora crie um dashboard, um arquivo json para ser importado no dynatrace, utilizando os DQL do arquivo markdown que você criou @arquivo_criado_de_métricas.md
Utilize o arquivo @Dashboard-Layout-Patterns.md para padrões e boas práticas que devem serem seguidas no dahsboard.`,
      results: [
        'Eficiência operacional de 90%',
        'Tempo: 5h → 30min',
        'Dashboard completo com métricas técnicas e de negócio'
      ],
      tags: ['#dynatrace', '#observabilidade', '#dashboard', '#monitoramento', '#sre', '#devops'],
      installation: `🚀 Como Usar

Pré-requisitos

• Amazon Q Developer instalado na IDE
• Acesso ao repositório do microserviço
• Arquivos de knowledge base na raiz do projeto

Setup Inicial

1. Crie os arquivos de apoio na raiz do projeto:

• DQL-Best-Practices.md - Padrões para queries DQL
• Dashboard-Layout-Patterns.md - Padrões de layout

2. Configure as variáveis:

• bucket_name = nome do seu bucket
• container_name = nome do seu container

Execução

Execute os 3 prompts sequencialmente no Amazon Q:

1️⃣ Levantamento de Métricas

Sou tech lead do time responsável pelo micro serviço que está aberto no workspace.
Para ganhar contexto sobre o projeto leia o arquivo @documentação_do_projeto 
Estou criando um dashboard no dynatrace baseado em logs do código, avalie todos log.info, e crie métricas baseada neles, consolide em um arquivo markdown.

2️⃣ Geração de DQLs

Ótimo resultado.
Atualize o documento markdown criado, para cada métrica crie uma DQL(Dynatrace Query Language) baseada em logs do código(log.inf()).
Utilize o markdown @DQL-Best-Practices.md para padrões e melhores práticas a serem seguidas para DQLs.
bucket_name = [SEU_BUCKET]
container_name = [SEU_CONTAINER]

3️⃣ Construção do Dashboard

Ótimo resultado.
Agora crie um dashboard, um arquivo json para ser importado no dynatrace, utilizando os DQL do arquivo markdown que você criou @arquivo_criado_de_métricas.md 
Utilize o arquivo @Dashboard-Layout-Patterns.md para padrões e boas práticas que devem serem seguidas no dahsboard.

✅ Resultado

• Arquivo JSON pronto para upload no Dynatrace
• Dashboard otimizado seguindo melhores práticas

💡 Dicas

• Substitua @documentação_do_projeto pela referência real
• Valide cada etapa antes de prosseguir
• Mantenha logs estruturados no código`
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
      tags: ['#cypress', '#testes', '#qualidade', '#mfe', '#cobertura', '#automacao'],
      installation: `🚀 Como Usar

Pré-requisitos

• Amazon Q Developer na IDE
• Projeto MFE com pasta src/ e cypress/
• Testes existentes para referência

Execução

1. Abra o Amazon Q na sua IDE
2. Navegue até o projeto do Micro Frontend
3. Cole o prompt no chat do Amazon Q
4. Adicione contexto usando:

• @folder src - código fonte do MFE
• @folder cypress - testes existentes

Prompt Completo

Contexto: Você tem acesso à página src de um Micro Frontend (MFE) e à pasta cypress com testes já existentes.

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

Resultado Esperado: Uma cobertura de testes mais abrangente que contribua para a melhoria contínua da qualidade do software.

✅ Resultado

• Novos testes Cypress gerados
• Cobertura aumentada significativamente
• Lacunas críticas identificadas automaticamente

💡 Dicas

• Execute os testes gerados para validar
• Ajuste seletores se necessário
• Mantenha testes organizados por funcionalidade`
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
      context: 'Criar estrutura organizada de arquivos de contexto (.amazonq/) para maximizar eficiência do Amazon Q.',
      objective: 'Criar estrutura completa de contexto inteligente do AmazonQ para projetos, conforme estrutura Base.',
      promptContent: `Analise este projeto usando @workspace e crie a estrutura completa de contexto inteligente do AmazonQ.

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
  - Exceções: [casos especiais]`,
      results: [
        'Estrutura .amazonq/ completa',
        'Contexto inteligente configurado',
        'Tempo: 6h → 1h'
      ],
      tags: ['#amazonq', '#contexto', '#rules', '#documentação', '#bdd', '#arquitetura'],
      installation: `🚀 Como Usar

Pré-requisitos

• Amazon Q Developer instalado na IDE
• Acesso ao repositório do projeto
• Permissões para criar arquivos na raiz do projeto

Execução

1. Abra o Amazon Q na sua IDE
2. Navegue até a raiz do projeto
3. Cole o prompt no chat do Amazon Q
4. Adicione contexto usando @workspace para análise completa

Prompt Completo

Analise este projeto usando @workspace e crie a estrutura completa de contexto inteligente do AmazonQ.

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
  - Exceções: [casos especiais]

✅ Resultado Esperado

Estrutura criada:

.amazonq/
└── rules/
    ├── project-overview.md
    ├── coding-standards.md
    ├── architecture-patterns.md
    ├── business-rules.md
    └── scenarios.md

💡 Dicas

• Execute em projetos com código existente para melhor análise
• Revise e ajuste os arquivos gerados conforme necessário
• Mantenha os arquivos atualizados conforme projeto evolui
• Use como referência para onboarding de novos desenvolvedores

🔄 Manutenção

• Atualize após mudanças significativas na arquitetura
• Revise regras de negócio periodicamente
• Adicione novos cenários conforme features são implementadas
• Integre revisão das rules no processo de code review`
    }
  }
];