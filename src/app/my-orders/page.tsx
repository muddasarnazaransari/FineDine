'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

type Booking = {
  _id: string;
  date: string;
  startTime: string;
  guests: number;
  meals: string[];
  seating: string;
  amount: number;
};

export default function MyOrdersPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        setError('Unauthorized');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/bookings?type=upcoming', {
        headers: {
          'x-user-email': userEmail,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId: string) => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      toast.error('Unauthorized');
      return;
    }

    setCancellingId(bookingId);

    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'x-user-email': userEmail,
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Booking cancelled');
        // Refresh the bookings list
        fetchBookings();
      } else {
        toast.error(data.message || 'Failed to cancel booking');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Your Upcoming Reservations</h1>

        {loading && <p className="text-center text-gray-400">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {!loading &&
            bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="bg-neutral-800 rounded-2xl shadow-xl p-6 space-y-3"
              >
                <div className="text-lg">
                  <strong>🗓️ Date:</strong>{' '}
                  {new Date(booking.date).toLocaleDateString()} at {booking.startTime}
                </div>
                <div>
                  <strong>👥 Guests:</strong> {booking.guests}
                </div>
                <div>
                  <strong>💺 Seating:</strong> {booking.seating}
                </div>
                <div>
                  <strong>🍽️ Meals:</strong> {booking.meals.join(', ')}
                </div>
                <div className="text-lg font-semibold text-yellow-400">
                  🧾 Total: ₹{booking.amount}
                </div>

                <div className="flex justify-between mt-4 gap-3">
                  <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-xl transition">
                    Edit
                  </button>
                  <button
                    onClick={() => handleCancel(booking._id)}
                    disabled={cancellingId === booking._id}
                    className={`flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition ${
                      cancellingId === booking._id ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {cancellingId === booking._id ? 'Cancelling...' : 'Cancel'}
                  </button>
                </div>
              </motion.div>
            ))}
        </div>

        {!loading && bookings.length === 0 && (
          <p className="text-center text-gray-400 mt-10">No upcoming reservations found.</p>
        )}
      </div>
    </div>
  );
}
