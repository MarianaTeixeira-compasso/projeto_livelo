import { FileText, Layers, MessageCircle, CheckCircle } from 'lucide-react';
import './Home.scss';

const Home = () => {
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

      {/* Seção de soluções em destaque */}
      <section className="highlight-section">
        <h2>SOLUÇÕES EM DESTAQUE</h2>
        <div className="solutions-grid">
          <div className="solution-text">
            <p>
              Enfrentando desafios de escala no seu time? A parceria entre <span className="highlight">Automação</span> e <span className="highlight">Inteligência Artificial</span> é a solução!<br /><br />
              Juntas, elas não só replicam o que já existe, mas adicionam inteligência, aprendizado e adaptabilidade.<br />
              Libere seu time para o que realmente importa: <strong>estratégia</strong> e <strong>criatividade</strong>.<br />
              Com essa parceria, sua empresa será mais ágil, inteligente e competitiva.
            </p>
          </div>
          <div className="solution-image">
            <img src="/n8n.webp" alt="Automação com n8n" />
          </div>
        </div>
      </section>

      {/* Seção da plataforma de IA */}
      <section className="highlight-section">
        <div className="solutions-grid">
          <div className="solution-text">
            <p>
              Cansado de tarefas repetitivas e falta de inspiração? Nossa Plataforma de IA Generativa é seu copiloto criativo e estratégico, liberando seu tempo e potencial!<br /><br />
              Com ela, você não só tem uma ferramenta tecnológica avançada, mas uma extensão da sua capacidade de criar e resolver. Prepare-se para mais eficiência, criatividade e conquistas em seu dia a dia.<br /><br />
              <a href="#" className="platform-link">Mais detalhes sobre a Plataforma de IA</a>
            </p>
          </div>
          <div className="solution-image">
            <img src="/suaequipe.webp" alt="Plataforma de IA" />
          </div>
        </div>
      </section>

      {/* Seção SEO+ */}
      <section className="highlight-section seo-section">
        <div className="solutions-grid reverse">
          <div className="solution-text">
            <p>
              O SEO+ é uma solução interna para otimizar a criação e publicação de páginas de viagens, com o objetivo de publicar 700 páginas em 2025. Resultados expressivos de semana para minutos.
            </p>
          </div>
          <div className="solution-image">
            <img src="/seoplus.webp" alt="SEO+" />
          </div>
        </div>
      </section>

      {/* Seção GitHub Copilot + LiteLLM */}
      <section className="highlight-section">
        <div className="solutions-grid reverse">
          <div className="solution-text">
            <p>
              Sua equipe de desenvolvimento está sobrecarregada e com dificuldade de escalar? O GitHub Copilot é a solução que você precisa!
            </p>
            <p>
              Ele não é apenas uma ferramenta de autocompletar; é seu parceiro de programação com IA.<br /><br />
              O GitHub Copilot acelera a escrita de código, sugere funções inteiras e até mesmo ajuda a encontrar erros, liberando seus desenvolvedores para focar em desafios mais complexos e na inovação.
            </p>
            <p>
              LiteLLM, o gateway universal para todos os Modelos de Linguagem Grandes (LLMs), traz eficiência na implementação, flexibilidade para testar e alternar entre modelos, e a capacidade de escalar suas aplicações de IA sem se prender a uma única plataforma ou se afogar em integrações.
            </p>
          </div>
          <div className="solution-image">
            <img src="/litellm.webp" alt="LiteLLM Dashboard" />
          </div>
        </div>
      </section>

      {/* Seção de vídeos */}
      <section className="highlight-section videos-section">
        <h2>INTERAJA COM AGENTES DE IA!</h2>
        <p className="videos-subtitle">
          Prepare-se para redefinir o que é possível. Agentes de IA via Plataforma de IA são a chave<br />
          para otimizar processos, gerar insights poderosos e impulsionar o seu sucesso.
        </p>
        <div className="videos-grid">
          <div className="video-item">
            <video controls>
              <source src="/Lawra.mp4" type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </video>
            <div className="video-title">Lawra</div>
          </div>
          <div className="video-item">
            <video controls>
              <source src="/DataLiv.mp4" type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </video>
            <div className="video-title">DataLiv</div>
          </div>
        </div>
      </section>

      {/* Seção jornada de IA */}
      <section className="highlight-section journey-section">
        <h2>SUA JORNADA DE<br />IA COMEÇA AGORA</h2>
        <p>
          Desvende o futuro da IA na Livelo! Sua jornada para inovar e transformar ideias em realidade começa agora. Aprenda, crie, use e lidere com inteligência artificial.
        </p>
        <div className="play-books">
          <h2>PLAYBOOKS PARA TIMES DE PRODUTO</h2>
          <p className="section-subtitle">
            Guias práticos para POs e BAs usarem IA no dia a dia
          </p>
          <div className="playbooks-grid">
            <div className="playbook-card">
              <div className="playbook-icon">
                <FileText size={48} strokeWidth={2} color="#fff" />
              </div>
              <h3>User Stories com IA</h3>
              <p>Crie stories bem estruturadas 70% mais rápido</p>
              <span className="persona-badge">Product Owner</span>
            </div>
            <div className="playbook-card">
              <div className="playbook-icon">
                <Layers size={48} strokeWidth={2} color="#fff" />
              </div>
              <h3>Refinamento de Backlog</h3>
              <p>Analise e priorize com eficiência</p>
              <span className="persona-badge">Product Owner</span>
            </div>
            <div className="playbook-card">
              <div className="playbook-icon">
                <MessageCircle size={48} strokeWidth={2} color="#fff" />
              </div>
              <h3>Análise de Feedback</h3>
              <p>Extraia insights automaticamente</p>
              <span className="persona-badge">Product Owner</span>
            </div>
            <div className="playbook-card">
              <div className="playbook-icon">
                <CheckCircle size={48} strokeWidth={2} color="#fff" />
              </div>
              <h3>Análise de Requisitos</h3>
              <p>Documente requisitos 65% mais rápido</p>
              <span className="persona-badge">Business Analyst</span>
            </div>
          </div>
          <div className="playbooks-cta">
            <button className="cta-button">
              Ver Todos os Playbooks →
            </button>
          </div>
        </div>
      </section>


      {/* Seção navegação */}
      <section className="highlight-section navigation-section">
        <h2>NAVEGUE NO TEMA</h2>
        <p>Para facilitar sua jornada navegue pelos seguintes links:</p>
        <div className="navigation-buttons">
          <button>Playbooks para POs</button>
          <button>Guia do Desenvolvedor</button>
          <button>Prompts Técnicos</button>
          <button>Integrações (MCPs)</button>
        </div>
      </section>
    </div>
  );
};

export default Home;