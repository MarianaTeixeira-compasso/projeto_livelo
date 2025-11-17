# 📘 Amazon Q Helper UI (React + TypeScript + Vite)

Interface interna para acelerar o uso do Amazon Q Developer através de um catálogo de prompts, playbooks, regras de contexto inteligente (.amazonq), MCPs homologados e guias de instalação/execução. Construída em React + Vite + TypeScript.

## 🧭 Visão Geral
Esta aplicação oferece uma experiência unificada para desenvolvedores e analistas:
- Centralizar prompts técnicos reutilizáveis (Observabilidade, Qualidade, Configuração etc.)
- Exibir playbooks por persona (PO, BA, etc.) com objetivos e exemplos
- Guiar configuração de contexto inteligente (estrutura `.amazonq/rules`)
- Consultar MCPs homologados e em teste
- Facilitar cópia rápida de prompts e blocos de instalação
- Servir como base para expansão de rules e automações

## 🔑 Principais Funcionalidades
| Área | Descrição | Ação principal |
|------|-----------|----------------|
| Prompts Técnicos | Estratégias prontas (Dynatrace, Cypress, Contexto Inteligente) | Copiar prompt completo |
| Playbooks | Fluxos por persona (User Stories, Refinamento, Sprint Planning, Requisitos, Feedback) | Abrir e adaptar texto |
| Contexto Inteligente | Modelo de estrutura `.amazonq` + guidelines | Copiar estrutura/base |
| MCPs | Catálogo de integrações (Jira, Figma, Dynatrace) | Ver status e requisitos |
| Rules | (Expansível) Regras internas de desenvolvimento | Referência rápida |
| Chat Mock | Futuro ponto de integração com Amazon Q | Interação simples |

## 🚀 Instalação & Execução
Pré-requisitos: Node.js LTS (>= 18), npm ou yarn.
```bash
# Instalar dependências
npm install

# Ambiente de desenvolvimento (HMR)
npm run dev

# Build produção
npm run build

# Preview da build
npm run preview
```
A aplicação normalmente roda em `http://localhost:5173` (confirme a porta exibida no terminal).

## 🗂 Estrutura de Pastas (resumida)
```
src/
  App.tsx        # Componente raiz: tabs, modais, catálogo
  App.css        # Estilos principais (cards, modais, tema)
  main.tsx       # Bootstrap React/Vite
  Header/Footer/Sidebar/MainContent.tsx  # Layout (se aplicável)
public/          # Assets estáticos
vite.config.ts   # Configuração Vite
```
Em `App.tsx` ficam arrays de definição: `playbooks`, `prompts`, `mcps`.

## ✍️ Adicionando um Novo Prompt Técnico
1. Abrir `App.tsx`
2. Localizar array `prompts`
3. Inserir objeto seguindo o padrão:
```ts
{
  icon: <SeuIcone size={24} strokeWidth={2} />,
  title: 'Nome do Prompt',
  badge: 'Categoria',
  speed: '~X% (tempo antigo → tempo novo)',
  description: 'Resumo curto',
  details: {
    subtitle: 'Explicação expandida',
    context: 'Contexto dado ao Amazon Q',
    objective: 'Objetivo principal',
    steps: ['Passo 1', 'Passo 2'],
    promptContent: `Texto completo para colar no chat`,
    results: ['Benefício 1', 'Benefício 2'],
    howToUse: ['Ação 1', 'Ação 2']
  }
}
```
4. Salvar; o card aparecerá automaticamente.

## 🧩 Expandindo Playbooks
1. Encontrar `playbooks`
2. Adicionar objeto com: `icon`, `title`, `persona`, `speed`, `description`, `tags`, `details` (inclui `objective`, `whenToUse`, `promptBase`, `tips`).
3. Para multi-prompts, separar blocos com `---` dentro de `promptBase`.

## 🏗 Estrutura `.amazonq` (Contexto Inteligente)
```
.amazonq/
└── rules/
    ├── project-overview.md
    ├── coding-standards.md
    ├── architecture-patterns.md
    ├── business-rules.md
    └── scenarios.md
```
Cada arquivo concentra conhecimento do projeto (regras de negócio, arquitetura, padrões, cenários BDD) para melhorar respostas do Amazon Q.

## 🔌 MCPs (Model Context Protocols)
Cada MCP inclui: `status` (Homologado/Em teste), `ide`, `testedBy`, lista de features, requisitos e instruções de uso.

## 🌗 Tema
Alternância claro/escuro via state `theme` (persistido em `localStorage`). Ajustes de cores em `App.css`.

## ✅ Boas Práticas ao Criar Prompts
- Defina contexto preciso (arquivos, objetivo, tecnologia)
- Solicite formato de saída estruturado (Markdown, JSON, lista)
- Limite escopo / peça etapas claras
- Inclua critérios de validação / qualidade esperada
- Use separadores `---` para fluxos multi-etapas

## 🧪 Testes
Sugestões iniciais:
- `vitest` para testes unitários de componentes
- Cypress para E2E (relacionado ao prompt de cobertura)

## 🛠 Scripts
| Script | Função |
|--------|--------|
| `npm run dev` | Servidor de desenvolvimento (HMR) |
| `npm run build` | Build de produção otimizada |
| `npm run preview` | Servir build para validação |

## 🔄 Fluxo de Contribuição
1. Criar branch feature
2. Adicionar/ajustar prompt/playbook/MCP/rule
3. Atualizar README se necessário
4. Abrir PR descrevendo ganho (ex.: tempo economizado)

## 📦 Dependências Principais
- React 18 + TypeScript
- Vite (bundler/dev server)
- `lucide-react` (ícones)

## 🧹 Lint & Qualidade
Expanda regras em `eslint.config.js` para: imports ordenados, evitar variáveis não usadas, padrões de complexidade.

## 🗺 Roadmap Futuro
- Persistir catálogo via JSON externo ou API
- Integração real do chat com Amazon Q
- Upload/parse automático de `.amazonq/`
- Métricas de uso e dashboard interno

## ❓ FAQ
| Pergunta | Resposta |
|----------|----------|
| Posso adicionar ícones novos? | Importe de `lucide-react` em `App.tsx`. |
| Onde altero tema? | Classes em `App.css` + state `theme`. |
| Como filtrar prompts? | Dropdown de categoria + busca textual. |
| O que é `speed`? | Indicador estimado de ganho de produtividade. |

## 📝 Licença
Uso interno. Ajuste conforme políticas da organização.

---
Dúvidas: comece pelo catálogo de Prompts e copie o que melhor se encaixa no seu fluxo de trabalho
