import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { LoginCredentials } from '@/types/auth';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
    server: 'wss://example.com:5280/ws',
    domain: 'example.com'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-glass p-8 rounded-2xl shadow-glass">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          XMPP Chat Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">XMPP Server</label>
            <input
              type="text"
              value={credentials.server}
              onChange={(e) => setCredentials({ ...credentials, server: e.target.value })}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Domain</label>
            <input
              type="text"
              value={credentials.domain}
              onChange={(e) => setCredentials({ ...credentials, domain: e.target.value })}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;