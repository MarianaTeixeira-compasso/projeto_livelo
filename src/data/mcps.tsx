import { Target, Palette, Activity } from 'lucide-react';

export const mcps = [
  {
    icon: <Target size={24} strokeWidth={2} />,
    title: 'Jira',
    status: 'Homologado',
    description: 'Consultar e criar issues',
    ide: 'VS Code, Amazon Q',
    testedBy: '@marcilio.cobel',
    details: {
      subtitle: '🎫 Jira MCP',
      overview: `Integração com Jira para consultar e criar issues via Amazon Q

🎯 O que faz

O Jira MCP permite que você:

- Consulte issues e projetos
- Crie novas issues
- Atualize status de issues
- Busque por filtros específicos
- Acesse informações de sprints

Tudo isso diretamente do Amazon Q, sem sair da sua IDE!`,
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
    description: 'Integração com Figma para acessar design system e componentes',
    ide: 'VS Code, Amazon Q',
    testedBy: 'Time DX',
    details: {
      subtitle: '🎨 Figma MCP',
      overview: `Integração com Figma para acessar design system e componentes

🎯 O que faz

O Figma MCP permite que você:

- Acesse componentes do design system
- Consulte tokens de design
- Extraia especificações de UI
- Sincronize designs com código`,
      features: [
        'Acesse componentes do design system',
        'Consulte tokens de design',
        'Extraia especificações de UI',
        'Sincronize designs com código'
      ],
      requirements: [
        'Acesso ao Figma da Livelo',
        'Token de API do Figma',
        'Amazon Q ou VS Code configurado'
      ],
      howToUse: [
        '1. Gerar Token do Figma',
        'Acesse Figma Settings',
        'Vá para "Personal access tokens"',
        'Clique em "Create new token"',
        'Copie o token gerado',
        '2. Configuração',
        '{',
        '  "servers": {',
        '    "figma": {',
        '      "command": "npx",',
        '      "args": ["@modelcontextprotocol/server-figma"],',
        '      "env": {',
        '        "FIGMA_TOKEN": "${FIGMA_TOKEN}",',
        '        "FIGMA_TEAM_ID": "livelo-team-id"',
        '      }',
        '    }',
        '  }',
        '}',
        '🔬 Status',
        'Em exploração pelo Time DX'
      ]
    }
  },
  {
    icon: <Activity size={24} strokeWidth={2} />,
    title: 'Dynatrace',
    status: 'Em teste',
    description: 'Observabilidade e monitoramento em tempo real',
    ide: 'VS Code, Amazon Q',
    testedBy: 'Em análise - aguardando validação',
    details: {
      subtitle: '📊 Dynatrace MCP',
      overview: `Integração com Dynatrace para observabilidade e monitoramento

🎯 O que faz

O Dynatrace MCP permite que você:

- Consulte métricas de aplicação
- Acesse logs e traces
- Monitore performance
- Crie alertas personalizados`,
      features: [
        'Consulte métricas de aplicação',
        'Acesse logs e traces',
        'Monitore performance',
        'Crie alertas personalizados'
      ],
      requirements: [
        'Acesso ao Dynatrace da Livelo',
        'Token de API do Dynatrace',
        'Amazon Q ou VS Code configurado'
      ],
      howToUse: [
        '1. Gerar Token do Dynatrace',
        'Acesse Dynatrace Settings',
        'Vá para "Access tokens"',
        'Crie novo token com permissões necessárias',
        '2. Configuração',
        '{',
        '  "servers": {',
        '    "dynatrace": {',
        '      "command": "npx",',
        '      "args": ["@modelcontextprotocol/server-dynatrace"],',
        '      "env": {',
        '        "DYNATRACE_TOKEN": "${DYNATRACE_TOKEN}",',
        '        "DYNATRACE_URL": "https://livelo.dynatrace.com"',
        '      }',
        '    }',
        '  }',
        '}',
        '🔬 Status',
        'Em análise - aguardando validação'
      ]
    }
  }
];