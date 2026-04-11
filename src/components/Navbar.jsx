import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileSignature, Save, Settings, Library, Moon, Sun, CalendarDays, LogOut, ShieldAlert } from 'lucide-react';
import { useAuth } from '../utils/AuthContext';
import appLogo from '../assets/logo.png';
import './Navbar.css';
const Navbar = () => {
    const { user, signOut } = useAuth();
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

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      try {
        console.log('Attempting sign out...');
        const { error } = await signOut();
        if (error) throw error;
        localStorage.clear(); // Clear local state for a fresh start
        console.log('Sign out successful.');
      } catch (err) {
        console.error('Logout error:', err);
        alert('Logout failed: ' + (err.message || 'Unknown error'));
      }
    }
  };

  return (
    <div className="navbar glass no-print">
      <div className="navbar-logo">
        <img src={appLogo} alt="Smart Test Generator" style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'contain' }} />
        <h2>Smart Test Generator</h2>
      </div>

      <nav className="navbar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Home size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/create" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FileSignature size={18} />
          <span>Create Test</span>
        </NavLink>

        <NavLink to="/saved" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Save size={18} />
          <span>Saved Tests</span>
        </NavLink>

        <NavLink to="/past-papers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Library size={18} />
          <span>Past Papers</span>
        </NavLink>

        <NavLink to="/manage-questions" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Library size={18} />
          <span>Question Bank</span>
        </NavLink>

        <NavLink to="/test-schedule" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <CalendarDays size={18} />
          <span>Test Schedule</span>
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>

        {user && user.email?.toLowerCase().trim() === 'king333khan@gmail.com' && (
          <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ color: 'var(--primary-color)' }}>
            <ShieldAlert size={18} />
            <span>Master Admin</span>
          </NavLink>
        )}
      </nav>

      <div className="navbar-actions">
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            <>
              <Sun size={20} />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={20} />
              <span>Dark Mode</span>
            </>
          )}
        </button>

        <button
          onClick={handleLogout}
          className="theme-toggle-btn logout-btn"
          style={{ color: '#ef4444' }}
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
