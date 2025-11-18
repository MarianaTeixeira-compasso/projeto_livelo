import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const location = useLocation();

  const tabs = [
    { id: '/', label: 'Início' },
    { id: '/playbooks', label: 'Playbooks' },
    { id: '/guia-desenvolvedor', label: 'Guia do Desenvolvedor' },
    { id: '/prompts-tecnicos', label: 'Prompts Técnicos' },
    { id: '/mcps', label: 'MCPs' },
    { id: '/rules', label: 'Rules' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-left"></div>
      <ul className="nav-list">
        {tabs.map(tab => (
          <li key={tab.id}>
            <Link 
              to={tab.id}
              className={location.pathname === tab.id ? 'active' : ''}
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="navbar-right">
        <span
          className="icon theme-toggle"
          role="button"
          aria-label="Alternar tema"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
        >
          {theme === 'dark' ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;