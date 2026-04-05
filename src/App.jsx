import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './utils/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CreateTest from './pages/CreateTest';
import SavedTests from './pages/SavedTests';
import PastPapers from './pages/PastPapers';
import ViewTest from './pages/ViewTest';
import Settings from './pages/Settings';
import ManageQuestions from './pages/ManageQuestions';
import TestSchedule from './pages/TestSchedule';
import Login from './pages/Login';
import Signup from './pages/Signup';

const AppContent = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className={user && !isAuthPage ? "dashboard-layout" : "auth-layout"}>
      {user && !isAuthPage && <Navbar />}
      <main className={user && !isAuthPage ? "main-content" : "auth-content"}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreateTest /></ProtectedRoute>} />
          <Route path="/saved" element={<ProtectedRoute><SavedTests /></ProtectedRoute>} />
          <Route path="/past-papers" element={<ProtectedRoute><PastPapers /></ProtectedRoute>} />
          <Route path="/manage-questions" element={<ProtectedRoute><ManageQuestions /></ProtectedRoute>} />
          <Route path="/test-schedule" element={<ProtectedRoute><TestSchedule /></ProtectedRoute>} />
          <Route path="/test/:id" element={<ProtectedRoute><ViewTest /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
