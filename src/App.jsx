import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { AuthProvider, useAuth } from './utils/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Lazy loading components for performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CreateTest = lazy(() => import('./pages/CreateTest'));
const SavedTests = lazy(() => import('./pages/SavedTests'));
const PastPapers = lazy(() => import('./pages/PastPapers'));
const ViewTest = lazy(() => import('./pages/ViewTest'));
const Settings = lazy(() => import('./pages/Settings'));
const ManageQuestions = lazy(() => import('./pages/ManageQuestions'));
const TestSchedule = lazy(() => import('./pages/TestSchedule'));
const Billing = lazy(() => import('./pages/Billing'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Admin = lazy(() => import('./pages/Admin'));
const Landing = lazy(() => import('./pages/Landing'));

const AppContent = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  const isLandingPage = !user && location.pathname === '/';

  return (
    <div className={user && !isAuthPage ? "dashboard-layout" : (isLandingPage ? "" : "auth-layout")}>
      {user && !isAuthPage && <Navbar />}
      <main className={user && !isAuthPage ? "main-content" : (isLandingPage ? "" : "auth-content")}>
        <Suspense fallback={
          <div className="premium-loader-container">
            <div className="premium-loader"></div>
            <div className="premium-loader-text">Loading Portal...</div>
          </div>
        }>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

            {/* Protected Routes */}
            <Route path="/" element={!user ? <Landing /> : <ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><CreateTest /></ProtectedRoute>} />
            <Route path="/saved" element={<ProtectedRoute><SavedTests /></ProtectedRoute>} />
            <Route path="/past-papers" element={<ProtectedRoute><PastPapers /></ProtectedRoute>} />
            <Route path="/manage-questions" element={<ProtectedRoute><ManageQuestions /></ProtectedRoute>} />
            <Route path="/test-schedule" element={<ProtectedRoute><TestSchedule /></ProtectedRoute>} />
            <Route path="/test/:id" element={<ProtectedRoute><ViewTest /></ProtectedRoute>} />
            <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
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
