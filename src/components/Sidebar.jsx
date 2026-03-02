import { NavLink } from 'react-router-dom';
import { Home, FileSignature, Save, Settings } from 'lucide-react';
import appLogo from '../assets/logo.png';
import './Sidebar.css';

const Sidebar = () => {
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

        <div className="nav-divider"></div>

        <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <p className="text-muted text-sm">v1.0.0</p>
      </div>
    </div>
  );
};

export default Sidebar;
