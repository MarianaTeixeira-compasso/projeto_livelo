import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Container from './components/Container/Container';
import Home from './pages/home/Home';
import Playbooks from './pages/playbooks/Playbooks';
import GuiaDesenvolvedor from './pages/guia-desenvolvedor/GuiaDesenvolvedor';
import PromptsTecnicos from './pages/prompts-tecnicos/PromptsTecnicos';
import MCPs from './pages/mcps/MCPs';
import Rules from './pages/rules/Rules';

function App() {
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
      try { localStorage.setItem('theme', next); } catch { }
      return next;
    });
  };

  return (
    <Container>
      <Router>
        <div className={`main-bg ${theme}`}>
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/playbooks" element={<Playbooks />} />
              <Route path="/guia-desenvolvedor" element={<GuiaDesenvolvedor />} />
              <Route path="/prompts-tecnicos" element={<PromptsTecnicos />} />
              <Route path="/mcps" element={<MCPs />} />
              <Route path="/rules" element={<Rules />} />
            </Routes>
          </div>

        </div>
      </Router>
    </Container>

  );
}

export default App;