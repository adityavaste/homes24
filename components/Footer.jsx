"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="p-3 bg-slate-800 rounded-full text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-white font-bold text-sm">200-Point Inspected</h4>
            <p className="text-xs text-slate-400">Rigorous quality check on every single product.</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="p-3 bg-slate-800 rounded-full text-emerald-400">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="text-white font-bold text-sm">3-Day No Questions Return</h4>
            <p className="text-xs text-slate-400">Full refund if you are not 100% satisfied.</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="p-3 bg-slate-800 rounded-full text-purple-400">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="text-white font-bold text-sm">Free Delivery & Assembly</h4>
            <p className="text-xs text-slate-400">Delivered & installed at your doorstep safely.</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="p-3 bg-slate-800 rounded-full text-amber-400">
              <Headphones className="w-6 h-6" />
            </div>
            <h4 className="text-white font-bold text-sm">24/7 Dedicated Support</h4>
            <p className="text-xs text-slate-400">Peace of mind coverage & instant customer care.</p>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-slate-800">
          
          <div className="col-span-2 space-y-4">
            <Link href="/" className="text-2xl font-black text-white">
              homes<span className="text-blue-500">24</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Homes24 is India's most trusted pre-owned furniture and home appliance platform. We inspect, refurbish, and deliver certified quality items directly to your doorstep with guaranteed warranty.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              <a href="#" aria-label="Instagram" className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-full transition text-slate-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a href="#" aria-label="Facebook" className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-full transition text-slate-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>

              <a href="#" aria-label="X (Twitter)" className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-full transition text-slate-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              <a href="#" aria-label="LinkedIn" className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-full transition text-slate-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Shop Furniture</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/catalog" className="hover:text-white transition">Sofas & Recliners</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition">Beds & Mattresses</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition">Dining Sets</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition">Study Tables</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition">Wardrobes</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Shop Appliances</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/catalog" className="hover:text-white transition">Refrigerators</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition">Washing Machines</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition">Smart Televisions</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition">Air Conditioners</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition">Microwaves</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Company & Policy</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="#" className="hover:text-white transition">About Homes24</Link></li>
              <li><Link href="#" className="hover:text-white transition">Sell Your Furniture</Link></li>
              <li><Link href="#" className="hover:text-white transition">Inspection Process</Link></li>
              <li><Link href="#" className="hover:text-white transition">Warranty Policy</Link></li>
              <li><Link href="/admin/login" className="hover:text-white transition font-bold text-blue-400">Staff Portal</Link></li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {year} Homes24 Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-400">Terms of Service</Link>
            <Link href="#" className="hover:text-slate-400">Security</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}