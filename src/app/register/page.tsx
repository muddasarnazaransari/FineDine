'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, Calendar, Home } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    dob: '',
    address: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.fullName,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
        dob: form.dob,
        address: form.address,
      }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);

    if (res.ok) {
      router.push(`/verify-otp?email=${form.email}`);
    }
    
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <User className="absolute top-3 left-3 text-neutral-500" size={18} />
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute top-3 left-3 text-neutral-500" size={18} />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="relative">
            <Phone className="absolute top-3 left-3 text-neutral-500" size={18} />
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute top-3 left-3 text-neutral-500" size={18} />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="relative">
            <Calendar className="absolute top-3 left-3 text-neutral-500" size={18} />
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-md bg-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="relative">
            <Home className="absolute top-3 left-3 text-neutral-500" size={18} />
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full pl-10 pr-4 py-2 h-24 rounded-md bg-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors text-black font-medium py-2 rounded-md"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-red-500">{message}</p>
        )}

        <p className="mt-6 text-sm text-center text-neutral-400">
          Already have an account?{' '}
          <a href="/login" className="text-yellow-400 hover:text-yellow-300 transition-colors">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
