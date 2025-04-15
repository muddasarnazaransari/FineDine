'use client';

export default function AdminDashboard() {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p className="text-lg text-gray-600 mb-6">This is the admin dashboard.</p>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
