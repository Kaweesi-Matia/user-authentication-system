import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { PasswordReset } from './components/PasswordReset';
import { Dashboard } from './components/Dashboard';

type AuthView = 'login' | 'register' | 'reset';

function AuthFlow() {
  const [view, setView] = useState<AuthView>('login');

  switch (view) {
    case 'register':
      return <Register onToggleView={setView} />;
    case 'reset':
      return <PasswordReset onToggleView={setView} />;
    default:
      return <Login onToggleView={setView} />;
  }
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return user ? <Dashboard /> : <AuthFlow />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
