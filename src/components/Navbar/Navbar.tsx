import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.scss';
import logoLivelo from '../../assets/logo-livelo.png';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: '/', label: 'Início' },
    { id: '/playbooks', label: 'Playbooks' },
    { id: '/guia-desenvolvedor', label: 'Guia do Desenvolvedor' },
    { id: '/prompts-tecnicos', label: 'Prompts Técnicos' },
    { id: '/mcps', label: 'MCPs' },
    { id: '/rules', label: 'Rules' },
  ];

  return (
    <>
      <nav className="nav">
        <div className="nav-content">
          <button
            className="hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="nav-logo">
            <img src={logoLivelo} alt="Livelo" />
          </div>

          <div className="nav-links-desktop">
            {tabs.map(tab => (
              <Link
                key={tab.id}
                to={tab.id}
                className={`nav-link ${location.pathname === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </Link>
            ))}
          </div>



          <button
            className="theme-toggle"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun" aria-hidden="true">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-logo">
            <img src={logoLivelo} alt="Livelo" />
          </div>
          {tabs.map(tab => (
            <Link
              key={tab.id}
              to={tab.id}
              className={`mobile-nav-link ${location.pathname === tab.id ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;