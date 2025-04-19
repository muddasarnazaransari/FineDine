'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Login failed. Please try again.');
        setLoading(false);
        return;
      }

      if (data.name && data.email) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
        }

        router.push(data.role === 'admin' ? '/admin' : '/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">Welcome Back</h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-neutral-500" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute top-3 left-3 text-neutral-500" size={18} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-medium py-2 rounded-md transition-colors ${
              loading
                ? 'bg-yellow-400 cursor-not-allowed text-black/70'
                : 'bg-yellow-500 hover:bg-yellow-600 text-black'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-red-500">{message}</p>
        )}

        <p className="mt-6 text-sm text-center text-neutral-400">
          Don’t have an account?{' '}
          <a href="/register" className="text-yellow-400 hover:text-yellow-300 transition-colors">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
