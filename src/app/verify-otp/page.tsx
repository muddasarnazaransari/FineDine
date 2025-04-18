// src/app/verify-otp/page.tsx
'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Create a simple fallback component
function LoadingSearchParams() {
  return <p>Loading verification page...</p>;
}

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // Extract email from query params
  useEffect(() => {
    const queryEmail = searchParams.get('email');
    if (queryEmail) {
      setEmail(queryEmail);
    }
  }, [searchParams]);

  // Handle OTP verification
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !otp) {
      setMessage('Email and OTP are required.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      setMessage(data.message || data.error);
      setIsSuccess(res.ok);

      if (res.ok) {
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('Verification error:', error);
      setMessage('Something went wrong. Please try again.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResend = async () => {
    if (!email) return;

    setResending(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message || data.error);
      setIsSuccess(res.ok);
    } catch (error) {
      console.error('Resend error:', error);
      setMessage('Failed to resend OTP. Try again.');
      setIsSuccess(false);
    } finally {
      setResending(false);
    }
  };

  return (
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
      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className={`w-full py-2 rounded transition ${
          loading ? 'bg-yellow-400' : 'bg-yellow-500 hover:bg-yellow-600'
        } text-black font-medium`}
      >
        {loading ? 'Verifying...' : 'Verify'}
      </button>
      <button
        type="button"
        onClick={handleResend}
        disabled={resending}
        className="w-full py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-sm"
      >
        {resending ? 'Resending...' : 'Resend OTP'}
      </button>
      {message && (
        <p
          className={`mt-4 text-center text-sm ${
            isSuccess ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}

export default function VerifyOtpPage() {
  return (
    <div className="max-w-md mx-auto p-6 min-h-screen flex flex-col justify-center bg-neutral-950 text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Verify OTP</h1>
      <Suspense fallback={<LoadingSearchParams />}>
        <VerifyOtpForm />
      </Suspense>
    </div>
  );
}
