import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CreateTest from './pages/CreateTest';
import SavedTests from './pages/SavedTests';
import ViewTest from './pages/ViewTest';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="dashboard-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateTest />} />
            <Route path="/saved" element={<SavedTests />} />
            <Route path="/test/:id" element={<ViewTest />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
