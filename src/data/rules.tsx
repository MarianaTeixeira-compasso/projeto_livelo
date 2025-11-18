import { FileText, BookOpen } from 'lucide-react';

export const rules = [
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