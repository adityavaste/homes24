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
  
  Heart, 
  CheckCircle, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  SlidersHorizontal,
  HelpCircle
} from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    title: "Urban Ladder L-Shaped Leatherette Sofa",
    category: "sofas",
    originalPrice: 42000,
    price: 18499,
    rating: 4.8,
    inspected: true,
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Samsung 345L Double Door Refrigerator (Inverter)",
    category: "appliances",
    originalPrice: 38900,
    price: 16200,
    rating: 4.9,
    inspected: true,
    condition: "Certified Excellent",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Bosch 7kg Fully Automatic Front Load Washer",
    category: "appliances",
    originalPrice: 34000,
    price: 14900,
    rating: 4.7,
    inspected: true,
    condition: "Mint Condition",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Solid Sheesham Wood Queen Size Bed with Storage",
    category: "beds",
    originalPrice: 29000,
    price: 12800,
    rating: 4.8,
    inspected: true,
    condition: "Refurbished Fine",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navigation Bar */}
      <Navbar cartCount={cartCount} wishlistCount={wishlistCount} />

      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> Certified Inspection Standard
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Luxury Living on a Smart Budget. <br />
              </h1>
              <span className="text-blue-600 text-3xl font-bold sm:text-3xl">Certified Home Essentials with Guaranteed Warranty & 3-Day Returns.</span>
            
            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              Elevate your home with fully tested, 200-point inspected pre-owned items backed by a 1-year warranty and guaranteed 3-day return policy.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <a
                href="#products"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-md transition"
              >
                Browse Inspected Inventory
              </a>
              <a
                href="#sell"
                className="bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm px-7 py-3.5 rounded-full border border-slate-300 transition"
              >
                Sell Your Furniture
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-xl font-black text-slate-900">200+</p>
                <p className="text-xs text-slate-500">Checkpoint Audit</p>
              </div>
              <div>
                <p className="text-xl font-black text-slate-900">1 Year</p>
                <p className="text-xs text-slate-500">Comprehensive Warranty</p>
              </div>
              <div>
                <p className="text-xl font-black text-slate-900">3 Days</p>
                <p className="text-xs text-slate-500">No-Questions Return</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
              alt="Homes24 Living Room"
              className="rounded-2xl shadow-xl border border-slate-200 object-cover w-full h-[400px]"
            />
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-bold text-xs tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
              Hassle-Free Experience
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
              How Homes24 Works
            </h2> 
            <p className="text-slate-500 text-sm mt-2">
              We bring complete transparency and reliability to pre-owned home acquisitions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/60 text-center space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center mx-auto text-lg shadow-md">
                1
              </div>
              <h3 className="font-bold text-lg text-slate-900">Select & Inspect Online</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Browse our high-definition catalog showcasing certified pre-owned items with detailed condition reports and warranty specs.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/60 text-center space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center mx-auto text-lg shadow-md">
                2
              </div>
              <h3 className="font-bold text-lg text-slate-900">Free Doorstep Delivery</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Our expert technicians deliver, assemble, and set up your furniture or appliance directly in your room of choice at zero extra cost.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/60 text-center space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center mx-auto text-lg shadow-md">
                3
              </div>
              <h3 className="font-bold text-lg text-slate-900">3-Day Trial & Warranty</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Experience your new items with total peace of mind backed by our 3-day money-back return policy and up to 1-year warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certified Products Grid */}
     <section id="how-it-works" className="py-20 bg-white border-y border-slate-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Section Header */}
    <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100 uppercase tracking-wider">
        <ShieldCheck className="w-3.5 h-3.5" /> Homes24 Assured Quality
      </span>
      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
        Why Buy Pre-Loved from Homes24?
      </h2>
      <p className="text-sm sm:text-base text-slate-500">
        Every sofa, refrigerator, washing machine, and bed undergoes a rigorous refurbishment protocol before reaching your doorstep.
      </p>
    </div>

    {/* 3-Step Quality & Buying Process */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
      
      {/* Step 1 */}
      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-blue-300 transition shadow-sm hover:shadow-md relative space-y-4">
        <div className="w-12 h-12 bg-blue-600 text-white font-black text-lg rounded-xl flex items-center justify-center shadow-md">
          01
        </div>
        <h3 className="text-lg font-bold text-slate-900">200-Point Inspection</h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Our certified technicians test functional motors, structural integrity, upholstery hygiene, and electronic components to ensure like-new performance.
        </p>
        <div className="pt-2 text-xs font-bold text-blue-600 flex items-center gap-1">
          <span>Sanitised & Deep Cleaned</span>
        </div>
      </div>

      {/* Step 2 */}
      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-blue-300 transition shadow-sm hover:shadow-md relative space-y-4">
        <div className="w-12 h-12 bg-blue-600 text-white font-black text-lg rounded-xl flex items-center justify-center shadow-md">
          02
        </div>
        <h3 className="text-lg font-bold text-slate-900">1-Year Warranty Protection</h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Buy with total peace of mind. Every product comes backed by our standard 1-year functional warranty and doorstep repair assistance.
        </p>
        <div className="pt-2 text-xs font-bold text-blue-600 flex items-center gap-1">
          <span>Free Parts Replacement</span>
        </div>
      </div>

      {/* Step 3 */}
      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-blue-300 transition shadow-sm hover:shadow-md relative space-y-4">
        <div className="w-12 h-12 bg-blue-600 text-white font-black text-lg rounded-xl flex items-center justify-center shadow-md">
          03
        </div>
        <h3 className="text-lg font-bold text-slate-900">White-Glove Delivery & Setup</h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Our logistics team handles heavy lifting, doorstep transit, room placement, and instant installation at zero extra cost.
        </p>
        <div className="pt-2 text-xs font-bold text-blue-600 flex items-center gap-1">
          <span>3-Day Easy Return Policy</span>
        </div>
      </div>

    </div>

    {/* Call-to-Action Bar */}
    <div className="mt-12 bg-slate-900 text-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
      <div className="space-y-1 text-center sm:text-left">
        <h4 className="text-lg font-extrabold">Ready to explore certified pre-owned items?</h4>
        <p className="text-xs text-slate-400">Save up to 70% off MRP on top brands like Samsung, Urban Ladder, IKEA & Bosch.</p>
      </div>
      <Link
        href="/products"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow-md whitespace-nowrap flex items-center gap-2"
      >
        <span>Browse Full Catalog</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>

  </div>
</section>

      {/* 200-Point Inspection Standard Showcase */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20">
                RIGOROUS QUALITY ASSURANCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Every Item Undergoes a <br />
                <span className="text-blue-400">200-Point Quality Audit</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Before any furniture or appliance reaches your home, our certified engineers inspect structural integrity, motor health, electrical wiring, and cosmetic perfection.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Deep Steam Sanitation & Anti-Bacterial Wash",
                  "Motor & Compressor Noise & Efficiency Tests",
                  "Wood Joint & Spring Tension Checks",
                  "Polishing & Minor Scratch Restoration",
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
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80"
                alt="Quality Inspection"
                className="rounded-2xl shadow-2xl border border-slate-800 object-cover w-full h-[380px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sell Estimator Section */}
      <SellEstimator />

      {/* Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-emerald-600 font-bold text-xs tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full">
              Verified Reviews
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
              Trusted by Thousands of Homeowners
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ananya Sharma",
                city: "Mumbai",
                review: "Bought a double door refrigerator and an L-shaped sofa. They look and function brand new! The delivery team assembled everything seamlessly.",
                rating: 5,
              },
              {
                name: "Rohan Mehta",
                city: "Pune",
                review: "Selling my old dining table was effortless. Got an instant quote and cash transferred right at my doorstep during pickup.",
                rating: 5,
              },
              {
                name: "Pooja Deshmukh",
                city: "Bangalore",
                review: "The 200-point inspection gave me immense confidence. Amazing savings compared to buying brand new retail prices.",
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