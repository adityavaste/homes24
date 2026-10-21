"use client";

import { ShieldCheck, Check, X, ArrowRight, Award, Truck, HeartHandshake } from "lucide-react";

export default function SellEstimator() {
  return (
    <section id="why-us" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 me-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20">
            <Award className="w-4 h-4 text-blue-400" /> THE HOMES24 ASSURANCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Why Smart Homeowners Choose <br />
            <span className="text-blue-400">Homes24 Certified Standard</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Eliminate the risks of unverified classifieds. We bridge the gap with rigorous quality standards, guaranteed warranty, and seamless doorstep delivery.
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Unverified Classifieds / Local Sellers */}
          <div className="bg-slate-800/60 rounded-2xl p-6 sm:p-8 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-500/10 text-red-400 rounded-xl">
                  <X className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Unverified Classifieds & Local Dealers</h3>
                  <p className="text-xs text-slate-400">High Risk & Zero Warranty</p>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Hidden defects, motor damage, or structural weakness with no returns.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Unsanitized items that require expensive professional deep cleaning.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Self-managed logistics, risky transports, and unassisted home installation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Zero after-sales support or functional warranty if appliances fail.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700/60 text-xs text-slate-400 italic">
              *Requires high risk and time investment from the buyer.
            </div>
          </div>

          {/* Homes24 Certified Standard */}
          <div className="bg-blue-600 rounded-2xl p-6 sm:p-8 text-white relative shadow-2xl flex flex-col justify-between border border-blue-500">
            <span className="absolute -top-3 right-6 bg-emerald-400 text-slate-900 font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow">
              Recommended Choice
            </span>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Homes24 Certified Standard</h3>
                  <p className="text-xs text-blue-100">100% Peace of Mind Guaranteed</p>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-blue-50">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <span><strong>200-Point Inspection:</strong> Every mechanical & structural component verified.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <span><strong>Medical-Grade Deep Sanitization:</strong> Fully disinfected before delivery.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <span><strong>Free Doorstep Logistics:</strong> Delivered, unpacked, and assembled at your spot.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <span><strong>Comprehensive Protection:</strong> Backed by a 1-year warranty and 3-day money back guarantee.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-blue-500/80 flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-200">Ready to furnish your dream home?</p>
                <p className="text-sm font-bold">Explore Inspected Catalog</p>
              </div>

              <a
                href="/products"
                className="bg-white hover:bg-slate-100 text-blue-700 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl flex items-center gap-2 shadow transition"
              >
                <span>Explore Store Collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Key Values */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12 pt-12 border-t border-slate-800 text-center sm:text-left">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-800 rounded-xl text-blue-400 shrink-0 mx-auto sm:mx-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">White-Glove Delivery</h4>
              <p className="text-xs text-slate-400 mt-1">Carefully transported and set up in your preferred room.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-800 rounded-xl text-emerald-400 shrink-0 mx-auto sm:mx-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">1-Year Warranty Included</h4>
              <p className="text-xs text-slate-400 mt-1">Peace-of-mind coverage on electricals and appliances.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-800 rounded-xl text-amber-400 shrink-0 mx-auto sm:mx-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">3-Day Trial Period</h4>
              <p className="text-xs text-slate-400 mt-1">Love your item or return it hassle-free for a full refund.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}