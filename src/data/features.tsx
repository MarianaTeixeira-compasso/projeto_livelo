export const featuresDetails = [
  {
    icon: '💬',
    title: 'Chat e Conversação',
    description: 'Como usar o chat do Amazon Q para interagir com seu código',
    subtitle: '💬 Chat e Conversação',
    overview: `Como usar o chat do Amazon Q para interagir com seu código

🎯 Overview

O chat do Amazon Q permite interação natural com seu código através de conversas em linguagem natural. É a interface principal para fazer perguntas, solicitar código e obter explicações.

🚀 Como Usar

Abrir o Chat

• VS Code: Painel lateral do Amazon Q
• IntelliJ: Janela de ferramentas Amazon Q
• CLI: q chat

Fazer Perguntas

Digite perguntas em linguagem natural:

• "Explique este código"
• "Como posso otimizar esta função?"
• "Crie testes para esta classe"
• "Refatore este método seguindo SOLID"

Adicionar Contexto

Use @ para referenciar arquivos específicos:

• "Explique o @UserService.java"
• "Compare @UserController.java com @UserService.java"
• "Analise todos os arquivos em @src/main/java/com/livelo/user/"

💡 Tipos de Interação

Explicação de Código

• "O que faz este método?"
• "Explique a lógica desta classe"
• "Como funciona este algoritmo?"

Geração de Código

• "Crie um service para gerenciar usuários"
• "Implemente um endpoint REST para cadastro"
• "Gere um DTO para esta entidade"

Refatoração

• "Refatore este código seguindo Clean Code"
• "Aplique padrão Strategy nesta classe"
• "Extraia esta lógica para um método separado"

Debug e Troubleshooting

• "Por que este código não funciona?"
• "Como resolver este erro de NullPointer?"
• "Otimize esta query que está lenta"

🎯 Comandos Especiais

Referências de Contexto

| Comando | Descrição | Exemplo |
|---------|-----------|----------|
| @arquivo.java | Referencia arquivo específico | @UserService.java |
| @pasta/ | Referencia pasta inteira | @src/main/java/ |
| @workspace | Contexto do workspace | Automático |

Comandos de Chat

| Comando | Descrição |
|---------|----------|
| /clear | Limpa histórico do chat |
| /help | Mostra ajuda |
| /explain | Força modo explicação |

💻 Exemplos Práticos

Exemplo 1: Análise de Código

Input:

Analise este método e sugira melhorias:

@UserService.java

Output:

Analisando o UserService.java, identifiquei algumas oportunidades de melhoria:

1. Injeção de Dependência: Use constructor injection em vez de @Autowired
2. Validação: Adicione validação de entrada nos métodos públicos
3. Tratamento de Erro: Implemente tratamento específico para UserNotFoundException
4. Logs: Adicione logs estruturados para auditoria

Aqui está uma versão refatorada:
[código melhorado]

💡 Dicas para Melhores Resultados

Seja Específico

❌ "Melhore este código"
✅ "Refatore este método para reduzir complexidade ciclomática e melhorar legibilidade"

Forneça Contexto

❌ "Crie um service"
✅ "Crie um UserService que gerencie CRUD de usuários, integre com banco PostgreSQL e envie eventos para Kafka"

Use Exemplos

❌ "Implemente validação"
✅ "Implemente validação similar ao @UserController.java, mas para dados de produto"

📊 Métricas de Uso

Tipos de Perguntas Mais Comuns

• Explicação de código (40%)
• Geração de código (30%)
• Debug e troubleshooting (20%)
• Refatoração (10%)

Taxa de Satisfação

• Explicações: 95%
• Código gerado: 85%
• Soluções de debug: 80%`,
    howToUse: [
      'Abra o Amazon Q no VS Code',
      'Digite perguntas em linguagem natural',
      'Use @ para referenciar arquivos específicos',
      'Seja específico sobre o contexto do negócio'
    ]
  },
  {
    icon: '📏',
    title: 'Rules',
    description: 'Defina regras que o Amazon Q deve seguir automaticamente',
    subtitle: '📏 Rules',
    overview: `Rules são arquivos Markdown que descrevem:

- Padrões de código do seu time
- Convenções de nomenclatura
- Arquitetura e estrutura
- Boas práticas específicas

Amazon Q usa essas rules automaticamente como contexto em todas as conversas dentro do projeto.

🎯 O que são Rules?

Rules são arquivos Markdown que descrevem padrões, convenções, arquitetura e boas práticas do seu time.

🚀 Como Criar Rules

Opção 1: Via Interface do Amazon Q
- Abra o chat do Amazon Q
- Clique no botão Rules na caixa de entrada
- Selecione Create new rule
- Digite um nome para a rule (ex: livelo-standards.md)
- Escreva o conteúdo da rule no editor
- Salve o arquivo

Opção 2: Via Sistema de Arquivos
- Na raiz do projeto, crie a pasta: .amazonq/rules/
- Crie um arquivo Markdown (ex: coding-standards.md)
- Escreva as regras em linguagem natural
- Salve o arquivo

📁 Estrutura de Pastas

seu-projeto/
├── .amazonq/
│   └── rules/
│       ├── coding-standards.md
│       ├── security-rules.md
│       └── architecture-patterns.md
├── src/
└── README.md

⚙️ Gerenciar Rules

Ativar/Desativar rules:
- Abra o chat do Amazon Q
- Clique no botão Rules
- Clique em uma rule para ativar/desativar:
  - ✅ Com check = ativa
  - ⬜ Sem check = inativa

📝 Exemplos de Rules

Exemplo 1: Padrões Livelo
Arquivo: .amazonq/rules/livelo-standards.md

# Livelo Coding Standards

## Nomenclatura
- Use camelCase para variáveis e métodos
- Use PascalCase para classes
- Variáveis de negócio em português (ex: valorCashback)
- Variáveis técnicas em inglês (ex: httpClient)

## Arquitetura
- Siga Clean Architecture
- Controllers não devem acessar repositories diretamente
- Use casos de uso (UseCases) para lógica de negócio
- Domain não deve depender de frameworks

## Segurança
- Nunca logue dados sensíveis (CPF, email, senha)
- Use logger estruturado, não System.out.println
- Sempre valide inputs de usuário
- Anote dados pessoais com @PersonalData

## Testes
- Use padrão AAA (Arrange, Act, Assert)
- Nomes de testes em português descrevendo o cenário
- Sempre teste casos de erro
- Use Pact para testes de contrato

## Logs
- Sempre inclua correlation-id
- Use níveis apropriados (INFO, WARN, ERROR)
- Estruture logs em JSON

💡 Dicas de Uso

Seja específico
❌ "Use boas práticas"
✅ "Use logger estruturado com correlation-id em todos os logs"

Organize por tópicos
- Crie múltiplos arquivos para diferentes áreas
- Mantenha cada rule focada em um tema
- Use nomes descritivos para os arquivos

Mantenha atualizado
- Revise rules periodicamente
- Atualize conforme padrões evoluem
- Remova rules obsoletas`,
    howToUse: [
      'Crie pasta .amazonq/rules/ na raiz do projeto',
      'Adicione arquivos Markdown com suas regras',
      'Ative/desative rules pelo botão Rules no chat',
      'Mantenha rules atualizadas conforme padrões evoluem'
    ]
  },
  {
    icon: '🤖',
    title: 'Custom Agents',
    description: 'Assistentes IA personalizáveis para casos específicos',
    subtitle: '🤖 Custom Agents',
    overview: `Custom Agents são assistentes IA personalizáveis que você pode configurar para casos de uso e workflows específicos no Amazon Q Developer CLI.

Em vez de usar um assistente genérico que requer contexto extensivo, Custom Agents permitem pré-configurar o conjunto certo de ferramentas, permissões e contexto para diferentes cenários.

🎯 Exemplos de Uso

| Tipo de Agent | Descrição | Casos de Uso |
|---------------|-----------|---------------|
| AWS Specialist | Acesso a ferramentas e documentação AWS | Gerenciamento de infraestrutura |
| Code Reviewer | Ferramentas específicas de linting e análise | Revisão de código automatizada |
| Project-Specific | Documentação e scripts customizados do projeto | Workflows específicos do projeto |

🚀 Como Criar

Método 1: Geração com IA

# No chat do Amazon Q CLI
/agent generate

O Amazon Q irá:
- Perguntar nome e descrição do agent
- Solicitar escopo (local/global)
- Gerar configuração automaticamente
- Abrir editor para revisão

Método 2: Criação Manual

# No chat do Amazon Q CLI
/agent create --name meu-agent

📁 Localização dos Arquivos

Agents Globais
~/.aws/amazonq/cli-agents/{agent-name}.json
Disponíveis em todos os projetos

Agents do Projeto
.amazonq/cli-agents/{agent-name}.json
Disponíveis apenas no projeto atual

⚙️ Configuração Básica

Exemplo Simples

{
  "name": "meu-agent",
  "description": "Agent especializado em desenvolvimento Python",
  "tools": ["fs_read", "fs_write", "execute_bash"],
  "allowedTools": ["fs_read"],
  "toolsSettings": {
    "execute_bash": {
      "allowedCommands": ["git status", "pytest"]
    }
  }
}

Exemplo Avançado: AWS Specialist

{
  "name": "aws-specialist",
  "description": "Agent especializado em AWS com acesso a ferramentas específicas",
  "tools": ["fs_read", "fs_write", "execute_bash", "use_aws"],
  "allowedTools": ["fs_read", "use_aws"],
  "toolsSettings": {
    "use_aws": {
      "allowedServices": ["s3", "lambda", "ec2", "dynamodb"],
      "deniedServices": ["iam", "organizations"]
    },
    "execute_bash": {
      "allowedCommands": ["aws s3 ls", "aws lambda list-functions"],
      "allowReadOnly": true
    }
  },
  "resources": [
    "docs/aws-architecture.md",
    "infrastructure/**/*.tf"
  ]
}

🔧 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| /agent list | Lista todos os agents disponíveis |
| /agent create --name [nome] | Cria novo agent |
| /agent generate | Gera agent com IA |
| /agent schema | Mostra schema JSON |
| /agent edit [nome] | Edita agent existente |

💡 Benefícios

Otimização de Workflow
- Agents personalizados para tarefas específicas
- Pré-configuração de ferramentas necessárias
- Contexto automático relevante

Menos Interrupções
- Pré-aprovação de ferramentas confiáveis
- Redução de prompts de permissão
- Fluxo de trabalho mais fluido

Colaboração em Equipe
- Compartilhamento via controle de versão
- Padronização de ambientes
- Configurações consistentes

Controle de Segurança
- Limitação de acesso apenas ao necessário
- Controle granular de permissões
- Auditoria de ferramentas utilizadas`,
    howToUse: [
      'Use /agent generate no Amazon Q CLI',
      'Configure ferramentas e permissões necessárias',
      'Salve como agent global ou do projeto',
      'Compartilhe configuração com o time'
    ]
  },
  {
    icon: '⚙️',
    title: 'Customização',
    description: 'Personalize o Amazon Q com o código da sua organização para sugestões específicas',
    subtitle: '⚙️ Customização do Amazon Q',
    overview: `🎯 O que é Customização?

A customização permite que o Amazon Q aprenda com o código da sua organização para fornecer sugestões de código que seguem os padrões, convenções e estilo específicos da sua empresa.

🚀 Como Funciona

1. Conecte seus Repositórios
- GitHub, GitLab, Bitbucket via AWS CodeConnections
- Amazon S3 para outros repositórios
- Selecione repositórios específicos ou todos

2. Análise do Código
- Amazon Q analisa padrões do seu código
- Identifica convenções de nomenclatura
- Aprende estruturas arquiteturais
- Reconhece bibliotecas e frameworks usados

3. Sugestões Personalizadas
- Código gerado segue padrões da organização
- Sugestões específicas para suas bibliotecas
- Mantém consistência com base de código existente

📋 Pré-requisitos

Licenciamento
- Amazon Q Developer Pro (obrigatório)
- Perfil Amazon Q Developer instalado
- Usuários subscritos via IAM Identity Center

Requisitos de Código
- Mínimo: 10 arquivos por linguagem de programação
- Tamanho: Entre 2MB e 20GB de código fonte
- Máximo: 100 repositórios (seleção individual)
- Linguagens: Java, Python, JavaScript, TypeScript, etc.

⚙️ Criando uma Customização

Passo 1: Acesso ao Console
- Faça login no AWS Management Console
- Acesse o console do Amazon Q Developer
- No painel de navegação, escolha Customizations
- Clique em Create customization

Passo 2: Configuração Básica
- Nome da customização (obrigatório)
- Descrição (opcional, mas recomendado)
- Tags (opcional)

Passo 3: Conectar Fonte de Dados
Opção A: AWS CodeConnections
1. Selecione "AWS CodeStar CodeConnections"
2. Escolha conexão existente ou crie nova
3. Selecione repositórios:
   - "Use all repositories" (todos)
   - "Select specific repositories" (até 100)
Opção B: Amazon S3
1. Selecione "Amazon S3"
2. Clique em "Browse Amazon S3"
3. Navegue até sua base de código
4. Cole a URI do S3 (deve ser pasta, não raiz do bucket)

Passo 4: Finalizar
- Revise configurações
- Clique em Create customization
- Aguarde processamento (pode levar algumas horas)

🔒 Privacidade e Segurança

Proteção de Dados
- AWS não armazena seu código fora do contexto da customização
- Não compartilha sugestões com outros clientes
- Não referencia code reviews de outros clientes
- Uso exclusivo para sua organização

Controle de Acesso
- Apenas usuários autorizados veem a customização
- Visível na IDE através do plugin AWS
- Controle via IAM Identity Center

🛠️ Troubleshooting

Erro: "Total size exceeds maximum"
Solução: Remova alguns repositórios e tente novamente

Erro: "Insufficient data"
Causa: Menos de 10 arquivos por linguagem ou menos de 2MB total
Solução: Adicione mais arquivos de código nas linguagens desejadas

Erro: "Issue retrieving repositories"
Causa: Problemas de acesso aos repositórios via CodeConnections
Solução: Verifique permissões e tente novamente com repositórios válidos

💡 Melhores Práticas

Seleção de Repositórios
- Inclua repositórios representativos dos padrões da organização
- Priorize código bem estruturado e documentado
- Evite repositórios experimentais ou legados

Manutenção
- Atualize customizações periodicamente
- Remova repositórios obsoletos
- Adicione novos padrões conforme evoluem

Nomenclatura
- Use nomes descritivos para customizações
- Inclua descrições informativas
- Considere versionamento para diferentes contextos

📊 Benefícios

Para Desenvolvedores
- Sugestões consistentes com padrões da empresa
- Redução de tempo em code reviews
- Aprendizado automático de convenções

Para Organização
- Padronização automática de código
- Redução de débito técnico
- Onboarding mais rápido de novos desenvolvedores

Para Qualidade
- Consistência arquitetural
- Redução de bugs por padrões incorretos
- Melhoria contínua da base de código`,
    howToUse: [
      'Conecte seus repositórios via AWS CodeConnections ou Amazon S3',
      'Amazon Q analisa padrões, convenções e arquitetura do seu código',
      'Sugestões personalizadas para sua organização',
      'Pré-requisitos: licenciamento, perfil instalado, código suficiente',
      'Crie customizações pelo Console AWS',
      'Privacidade e controle de acesso garantidos',
      'Siga melhores práticas de seleção e manutenção de repositórios'
    ]
  },
  {
    icon: '🧪',
    title: 'Testes Unitários',
    description: 'Geração automática de testes unitários para acelerar desenvolvimento',
    subtitle: '🧪 Testes Unitários com Amazon Q',
    overview: `🎯 Overview

O Amazon Q Developer oferece geração automática de testes unitários que acelera o desenvolvimento mantendo a qualidade do código.

O agent automatiza:
- Identificação de casos de teste apropriados
- Criação de mocks e stubs para testes isolados
- Geração de código de teste baseado na estrutura do projeto

🚀 Como Usar

Método 1: Chat Natural
Generate unit tests for my application

Método 2: Menu Contextual
- Selecione o código que deseja testar
- Clique com botão direito
- Escolha "Generate tests"

Método 3: Comando Específico
Generate unit tests for the UserService class

📋 Processo Automático

1. Análise
- Amazon Q examina o arquivo ativo
- Analisa estrutura do projeto
- Identifica dependências e frameworks

2. Detecção
- Verifica se já existe arquivo de teste correspondente
- Analisa testes existentes para evitar duplicação
- Identifica lacunas na cobertura

3. Geração
- Cria novos testes ou adiciona aos existentes
- Gera mocks necessários automaticamente
- Segue convenções do framework detectado

4. Review
- Apresenta diff para aprovação
- Permite aceitar ou rejeitar mudanças
- Oferece opções de refinamento

💻 Linguagens e Frameworks Suportados

Java
- JUnit 4/5
- TestNG
- Mockito para mocks
- Spring Boot Test para testes de integração

Python
- pytest
- unittest
- mock/unittest.mock para mocks
- Django Test para projetos Django`,
    howToUse: [
      'Método 1: Chat Natural',
      'Método 2: Menu Contextual',
      'Método 3: Comando Específico',
      'Processo Automático: Análise, Detecção, Geração, Review',
      'Linguagens: Java, Python'
    ]
  }
];