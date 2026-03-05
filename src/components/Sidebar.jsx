import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileSignature, Save, Settings, Library, Moon, Sun } from 'lucide-react';
import appLogo from '../assets/logo.png';
import './Sidebar.css';

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage for theme preference on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="sidebar glass no-print">
      <div className="sidebar-logo">
        <img src={appLogo} alt="Smart Test Generator" style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'contain' }} />
        <h2 style={{ fontSize: '1.05rem', lineHeight: '1.2' }}>Smart Test<br />Generator</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Home size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/create" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FileSignature size={20} />
          <span>Create Test</span>
        </NavLink>

        <NavLink to="/saved" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Save size={20} />
          <span>Saved Tests</span>
        </NavLink>

        <NavLink to="/past-papers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Library size={20} />
          <span>Past Papers</span>
        </NavLink>

        <div className="nav-divider"></div>

        <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <p className="text-muted text-sm">v1.0.0</p>
        <button
          onClick={toggleTheme}
          className="btn btn-secondary"
          style={{ padding: '0.5rem', border: 'none', background: 'transparent' }}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun size={18} className="text-muted" /> : <Moon size={18} className="text-muted" />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
