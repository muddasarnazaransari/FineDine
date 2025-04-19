'use client';

import { useEffect, useState } from "react";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  Twitter,
  CalendarCheck,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const res = await fetch('/api/auth/status');
        const data = await res.json();
        setIsLoggedIn(data?.isLoggedIn || false);
      } catch (err) {
        console.error("Footer auth check failed", err);
        setIsLoggedIn(false);
      }
    }

    checkAuthStatus();
  }, []);

  return (
    <footer className="bg-neutral-900 text-neutral-200 py-10 px-6 mt-20" id="contact">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">FineDine</h2>
          <p className="text-sm mt-2 text-neutral-400">
            Experience fine dining with traditional Indian flavors in the heart of Kota.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-neutral-400">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Contact Us</h3>
          <ul className="space-y-1 text-sm text-neutral-400">
            <li className="flex items-center gap-2"><Phone size={16} /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail size={16} /> contact@finedine.com</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Auth Section (Login/Register or Book a Table) */}
        <div>
          {isLoggedIn ? (
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-3">Ready to Dine?</h3>
              <p className="text-sm text-neutral-400 mb-4">
                Book your table now and indulge in an unforgettable experience.
              </p>
              <Link href="#booking">
                <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black text-sm font-semibold px-5 py-3 rounded-xl w-full flex items-center justify-center gap-2 shadow-lg transition-all duration-300">
                  <CalendarCheck size={18} /> Book a Table
                </button>
              </Link>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-white mb-2">Join Us</h3>
              <p className="text-sm text-neutral-400 mb-3">
                Create an account or sign in to manage your bookings.
              </p>
              <div className="flex gap-2">
                <Link href="/login">
                  <button className="bg-gold-600 hover:bg-gold-700 text-white text-sm px-4 py-2 rounded-md w-full transition">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="bg-neutral-800 hover:bg-neutral-700 text-white text-sm px-4 py-2 rounded-md w-full transition">
                    Register
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-neutral-700 mt-10 pt-4 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} FineDine. All rights reserved.
      </div>
    </footer>
  );
}
