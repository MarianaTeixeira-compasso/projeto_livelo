import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import ChatModal from './components/ChatModal/ChatModal';
import Container from './components/Container/Container';
import Home from './pages/home/Home';
import Playbooks from './pages/playbooks/Playbooks';
import GuiaDesenvolvedor from './pages/guia-desenvolvedor/GuiaDesenvolvedor';
import PromptsTecnicos from './pages/prompts-tecnicos/PromptsTecnicos';
import MCPs from './pages/mcps/MCPs';
import Rules from './pages/rules/Rules';

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('theme');
      return (saved === 'light' || saved === 'dark') ? (saved as 'light' | 'dark') : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
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

  return (
    <Router>
      <div className={`main-bg ${theme}`}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <div className="content">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/playbooks" element={<Playbooks />} />
              <Route path="/guia-desenvolvedor" element={<GuiaDesenvolvedor />} />
              <Route path="/prompts-tecnicos" element={<PromptsTecnicos />} />
              <Route path="/mcps" element={<MCPs />} />
              <Route path="/rules" element={<Rules />} />
            </Routes>
          </Container>
        </div>

        <button 
          aria-label="IA Assistant"
          onClick={() => setChatOpen(!chatOpen)}
          style={{
            position: 'fixed', 
            right: '48px', 
            bottom: '48px', 
            background: '#f72585', 
            border: 'none', 
            outline: 'none', 
            borderRadius: '50%', 
            width: '64px', 
            height: '64px', 
            boxShadow: '0 4px 32px rgba(247,37,133,0.18)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            cursor: 'pointer', 
            zIndex: 1000
          }}
        >
          <svg width="96" height="96" viewBox="0 0 24 24" fill="none" style={{display: 'block', margin: '0 auto'}} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="17" cy="6" r="1.5" stroke="white" strokeWidth="1.5"/>
          </svg>
        </button>

        {chatOpen && <ChatModal onClose={() => setChatOpen(false)} />}
      </div>
    </Router>
  );
}

export default App;