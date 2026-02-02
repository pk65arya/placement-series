import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NoteDetail from './pages/ProjectDetails';

function App() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Auto-navigate to last opened section on refresh
    const lastPath = localStorage.getItem('lastPath');
    if (user && lastPath) {
      navigate(lastPath);
    }
  }, [user]);

  return (
    <div className="main-layout">
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Vault Routes */}
        <Route path="/" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/notes/:noteId" element={
          <ProtectedRoute><NoteDetail /></ProtectedRoute>
        } />
        {/* Add Projects and Profile similarly */}
      </Routes>
    </div>
  );
}

export default App;