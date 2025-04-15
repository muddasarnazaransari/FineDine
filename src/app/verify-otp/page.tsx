'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const queryEmail = searchParams.get('email');
    if (queryEmail) {
      setEmail(queryEmail);
    }
  }, [searchParams]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);

    if (res.ok) {
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 min-h-screen flex flex-col justify-center bg-neutral-950 text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Verify OTP</h1>
      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          disabled
          className="w-full p-2 border border-neutral-700 rounded bg-neutral-800 text-neutral-300"
        />
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 border border-neutral-700 rounded bg-neutral-800 text-white"
          required
        />
        <button type="submit" className="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-600 transition">
          Verify
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500 text-sm">{message}</p>}
    </div>
  );
}
