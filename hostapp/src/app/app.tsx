// MainApp.tsx
import { Suspense, lazy, useState } from 'react';
import { AuthProvider, useAuth } from './auth';
import {
  Music,
  LogOut,
  User,
  Shield,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import type { Role } from './types';
// import './styles.css';

const MusicApp = lazy(() => import('musicapp/Module')); // "musicapp" + "./Module"

const Login = () => {
  const { login } = useAuth();
  const [role, setRole] = useState<Role>('user');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLogin = () => {
    setIsAnimating(true);
    setTimeout(() => login(role), 300);
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div
        className={`relative w-full max-w-md transform transition-all duration-500 ${
          isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="backdrop-blur-xl bg-black/40 rounded-3xl shadow-2xl p-8 border border-white/10">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
              <div className="relative p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                <Music className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center mb-2 text-white">
            Music Library
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Select your role to continue
          </p>

          <div className="space-y-4">
            <div className="relative group">
              <label htmlFor="role-select" className="sr-only">
                Select Role
              </label>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
              <select
                id="role-select"
                className="relative w-full appearance-none bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-white/10"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                aria-label="Select user role"
              >
                <option value="user" className="bg-gray-900">
                  👤 User (view & filter)
                </option>
                <option value="admin" className="bg-gray-900">
                  🛡️ Admin (full access)
                </option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            <button
              onClick={handleLogin}
              className="relative w-full group"
              aria-label={`Continue as ${role}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur group-hover:blur-md transition-all duration-300"></div>
              <div className="relative w-full rounded-2xl px-4 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50">
                <span className="flex items-center justify-center gap-2">
                  {role === 'admin' ? (
                    <Shield className="w-5 h-5" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                  Continue as {role}
                </span>
              </div>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500 text-center">
              React • Module Federation • Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-[600px]">
    <div className="text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-75 animate-pulse"></div>
        <div className="relative p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-spin">
          <Music className="w-8 h-8 text-white" />
        </div>
      </div>
      <p className="text-gray-400 mt-6 flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading music library...
      </p>
    </div>
  </div>
);

const Shell = () => {
  const { role, token, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      logout();
      setIsLoggingOut(false);
    }, 300);
  };

  if (!role || !token) return <Login />;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black transition-opacity duration-300 ${
        isLoggingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <header className="relative bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75"></div>
                <div className="relative p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                  <Music className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="font-bold text-xl text-white">Music Library</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur border border-white/10">
                {role === 'admin' ? (
                  <>
                    <Shield className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-purple-400">
                      Admin
                    </span>
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">
                      User
                    </span>
                  </>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="group px-4 py-2 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                <span className="hidden md:inline text-gray-400 group-hover:text-white transition-colors">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main role="main" className="relative">
        <Suspense fallback={<LoadingScreen />}>
          <MusicApp role={role} token={token} />
        </Suspense>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}
