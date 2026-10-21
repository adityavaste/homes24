"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SellEstimator from "@/components/SellEstimator";
import { 
  ShieldCheck, 
  ArrowRight, 
  Star, 
  Truck, 
  Sparkles, 
  CheckCircle,
  PackageCheck,
  Percent,
  Wrench,
  Award
} from "lucide-react";

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navigation Bar */}
      <Navbar cartCount={cartCount} wishlistCount={wishlistCount} />

      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
              <PackageCheck className="w-4 h-4 text-blue-600" /> Authorized Retail & Factory Direct
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Brand New Furniture & Home Electronics.
            </h1>
            <span className="text-blue-600 text-2xl sm:text-3xl font-bold block">
              Direct from Showroom with Official Brand Warranty & Express Setup.
            </span>
            
            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              Transform your modern living space with factory-fresh furniture, smart home appliances, and premium electronics at unbeatable store prices.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <Link
                href="/products"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Explore Store Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick Store Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-xl font-black text-slate-900">100%</p>
                <p className="text-xs text-slate-500">Brand New Sealed</p>
              </div>
              <div>
                <p className="text-xl font-black text-slate-900">Brand</p>
                <p className="text-xs text-slate-500">Official Warranty</p>
              </div>
              <div>
                <p className="text-xl font-black text-slate-900">0% EMI</p>
                <p className="text-xs text-slate-500">Easy Finance Options</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
              alt="Homes24 Furniture Showroom"
              className="rounded-2xl shadow-xl border border-slate-200 object-cover w-full h-[400px]"
            />
            <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-xl border border-slate-200 shadow-lg hidden sm:flex items-center gap-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Direct Showroom Price</p>
                <p className="text-[11px] text-slate-500">No middlemen commission</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why Shop Brand New Section */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-bold text-xs tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
              Store Guarantees
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
              Why Choose Homes24 Showroom?
            </h2> 
            <p className="text-slate-500 text-sm mt-2">
              Get the best deals on new furniture and appliances with complete peace of mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/60 text-center space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center mx-auto text-lg shadow-md">
                <PackageCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">100% Box-Packed Original</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Directly sourced from top manufacturers. Guaranteed factory-sealed condition with all original manuals and accessories.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/60 text-center space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center mx-auto text-lg shadow-md">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Free Assembly & Setup</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Our technicians handle delivery, unboxing, room placement, and instant installation for your new furniture and electronics.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/60 text-center space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center mx-auto text-lg shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Official Brand Warranty</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Enjoy manufacturer-backed warranty on all appliances and structural warranty on solid wood furniture collections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Special Offers Section */}
      <section id="features" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Showroom Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Premium Shopping Experience
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              Explore our latest sofa sets, dining tables, smart TVs, refrigerators, and laundry appliances with full service support.
            </p>
          </div>

          {/* 3-Step Buying Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-blue-300 transition shadow-sm hover:shadow-md relative space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white font-black text-lg rounded-xl flex items-center justify-center shadow-md">
                <Percent className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Flexible 0% EMI Options</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Upgrade your home without budget stress. Instant credit approvals and easy monthly installment plans available at checkout.
              </p>
              <div className="pt-2 text-xs font-bold text-blue-600 flex items-center gap-1">
                <span>Credit & Debit Card EMI Available</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-blue-300 transition shadow-sm hover:shadow-md relative space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white font-black text-lg rounded-xl flex items-center justify-center shadow-md">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Express Safe Delivery</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Same-day or scheduled delivery directly from our store warehouse in protective transit packaging.
              </p>
              <div className="pt-2 text-xs font-bold text-blue-600 flex items-center gap-1">
                <span>Zero Transit Damage Guarantee</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-blue-300 transition shadow-sm hover:shadow-md relative space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white font-black text-lg rounded-xl flex items-center justify-center shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Doorstep Service & Repairs</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Full after-sales support with brand-certified technicians for maintenance and installation guidance.
              </p>
              <div className="pt-2 text-xs font-bold text-blue-600 flex items-center gap-1">
                <span>Dedicated Customer Support</span>
              </div>
            </div>

          </div>

          {/* Call-to-Action Bar */}
          <div className="mt-12 bg-slate-900 text-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-extrabold">Looking for new home furniture & appliances?</h4>
              <p className="text-xs text-slate-400">Discover factory outlet discounts on leading furniture designs and top electronics brands.</p>
            </div>
            <Link
              href="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow-md whitespace-nowrap flex items-center gap-2"
            >
              <span>Explore Store Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Showroom Quality & Customization Banner */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20">
                PREMIUM CRAFTSMANSHIP & BUILD
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Crafted for Durability & <br />
                <span className="text-blue-400">Modern Living</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Our furniture is constructed from high-grade solid Sheesham wood, premium upholstery fabrics, and termite-resistant engineered wood built to last generations.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Seasoned Solid Wood Construction",
                  "High-Density Foam Cushioning",
                  "Energy Efficient 5-Star Rated Electronics",
                  "Comprehensive Manufacturer Backing",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80"
                alt="New Furniture Collection"
                className="rounded-2xl shadow-2xl border border-slate-800 object-cover w-full h-[380px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Exchange / Upgrade Estimator Section */}
      <SellEstimator />

      {/* Verified Customer Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-emerald-600 font-bold text-xs tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full">
              Happy Customers
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
              What Our Buyers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ananya Sharma",
                city: "Mumbai",
                review: "Bought a brand new 6-seater solid wood dining table set and a smart TV. Delivery was prompt and the installation team set everything up perfectly!",
                rating: 5,
              },
              {
                name: "Rohan Mehta",
                city: "Pune",
                review: "Got a great deal on a new L-shaped fabric sofa and a double door refrigerator with easy 0% EMI options. Excellent showroom service!",
                rating: 5,
              },
              {
                name: "Pooja Deshmukh",
                city: "Bangalore",
                review: "Purchased a brand-new front load washing machine and king-size bed. Highly satisfied with the quality and official brand warranty support.",
                rating: 5,
              },
            ].map((testi, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(testi.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed">
                  "{testi.review}"
                </p>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">{testi.name}</span>
                  <span className="text-slate-400 text-[10px]">{testi.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}