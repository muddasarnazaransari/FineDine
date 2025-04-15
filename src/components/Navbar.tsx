'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // 👈 watch for route changes

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/status');
        const data = await res.json();
        if (res.ok && data.isLoggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    }

    checkAuth();
  }, [pathname]); // 👈 re-run on route change

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsLoggedIn(false);
    router.push('/');
  };

  const handleProfileClick = (path: string) => {
    router.push(path);
    setShowDropdown(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-black shadow-md text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide">
          <Link href="/" onClick={closeMenu}>🍽️ FineDine</Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <Link href="#hero" onClick={closeMenu}>Home</Link>
          <Link href="#about" onClick={closeMenu}>About Us</Link>
          <Link href="#menu" onClick={closeMenu}>Menu</Link>
          <Link href="#special-packs" onClick={closeMenu}>Offers</Link>
          <Link href="#contact" onClick={closeMenu}>Contact</Link>

          {!isLoggedIn ? (
            <>
              <Link href="/login" className="text-sm underline hover:text-yellow-400">Login</Link>
              <Link href="/register" className="text-sm underline hover:text-yellow-400">Register</Link>
            </>
          ) : (
            <div className="relative">
              <motion.button
                onClick={toggleDropdown}
                className="hover:text-yellow-400 transition duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={26} className="transition-transform duration-200" />
              </motion.button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white text-black rounded-xl shadow-lg ring-1 ring-gray-200 z-50 overflow-hidden"
                  >
                    <button onClick={() => handleProfileClick('/dashboard')} className="block w-full text-left px-4 py-3 hover:bg-gray-100">👤 View Profile</button>
                    <button disabled className="block w-full text-left px-4 py-3 text-gray-400 cursor-not-allowed">🛍️ Orders</button>
                    <button disabled className="block w-full text-left px-4 py-3 text-gray-400 cursor-not-allowed">📜 History</button>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-3 hover:bg-gray-100">🚪 Logout</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <Link href="#booking">
            <button className="ml-4 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 font-semibold transition duration-200">
              Book a Table
            </button>
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-95 p-6 space-y-4 text-center text-white font-medium">
          <Link href="#hero" onClick={closeMenu} className="block">Home</Link>
          <Link href="#about" onClick={closeMenu} className="block">About Us</Link>
          <Link href="#menu" onClick={closeMenu} className="block">Menu</Link>
          <Link href="#special-packs" onClick={closeMenu} className="block">Offers</Link>
          <Link href="#contact" onClick={closeMenu} className="block">Contact</Link>

          {!isLoggedIn ? (
            <>
              <Link href="/login" onClick={closeMenu} className="block text-sm underline">Login</Link>
              <Link href="/register" onClick={closeMenu} className="block text-sm underline">Register</Link>
            </>
          ) : (
            <div className="space-y-2">
              <button onClick={() => handleProfileClick('/dashboard')} className="block w-full text-left">View Profile</button>
              <button disabled className="block w-full text-left text-gray-400">Orders</button>
              <button disabled className="block w-full text-left text-gray-400">History</button>
              <button onClick={handleLogout} className="block w-full text-left">Logout</button>
            </div>
          )}

          <Link href="#booking" onClick={closeMenu}>
            <button className="w-full mt-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 font-semibold transition duration-200">
              Book a Table
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
