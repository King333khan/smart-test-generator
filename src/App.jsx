import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CreateTest from './pages/CreateTest';
import SavedTests from './pages/SavedTests';
import PastPapers from './pages/PastPapers';
import ViewTest from './pages/ViewTest';
import Settings from './pages/Settings';
import ManageQuestions from './pages/ManageQuestions';

function App() {
  return (
    <Router>
      <div className="dashboard-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateTest />} />
            <Route path="/saved" element={<SavedTests />} />
            <Route path="/past-papers" element={<PastPapers />} />
            <Route path="/manage-questions" element={<ManageQuestions />} />
            <Route path="/test/:id" element={<ViewTest />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
