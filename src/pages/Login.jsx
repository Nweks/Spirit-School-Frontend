import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Lock, User, AlertCircle } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const response = await API.post('/auth/login/', { username, password });
    
    console.log('Login Response Data:', response.data);

    // Read token regardless of whether backend returns 'access', 'token', or 'key'
    const token = 
      response.data.access || 
      response.data.token || 
      response.data.key || 
      response.data.access_token;

    if (token) {
      localStorage.setItem('accessToken', token);
      if (response.data.refresh) {
        localStorage.setItem('refreshToken', response.data.refresh);
      }
      // Redirect to upload page
      navigate('/upload');
    } else {
      setError('Token missing in login response.');
    }
  } catch (err) {
    console.error('Login Error:', err);
    setError('Invalid username or password.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-md mx-auto my-12 bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
          <Lock className="w-6 h-6 text-amber-500"/>
        </div>
        <h2 className="text-xl font-bold text-slate-100">Admin Login</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center gap-2 text-rose-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0"/>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Username</label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500"/>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500/50"
              placeholder="Enter admin username"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500"/>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500/50"
              placeholder="Enter password"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-lg transition-colors text-sm disabled:opacity-50 mt-2"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}