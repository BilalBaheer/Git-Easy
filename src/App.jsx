import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import Navbar from './components/Navbar';
import Tutorial from './pages/Tutorial';
import Practice from './pages/Practice';
import Progress from './pages/Progress';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './pages/Home';
import { useAuth } from './context/AuthContext';
import './App.css';

// Protected Route component
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/tutorial"
                  element={
                    <ProtectedRoute>
                      <Tutorial />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tutorial/:section"
                  element={
                    <ProtectedRoute>
                      <Tutorial />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/practice"
                  element={
                    <ProtectedRoute>
                      <Practice />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/progress"
                  element={
                    <ProtectedRoute>
                      <Progress />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
