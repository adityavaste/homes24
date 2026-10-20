"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  ArrowRight,
  ShoppingBag,
  RotateCcw,
  Tag,
  CheckCircle2,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [pincode, setPincode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("homes24_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart items", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save updated cart to localStorage & trigger storage event
  const updateCartState = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("homes24_cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Quantity updates
  const updateQuantity = (id, delta) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    });
    updateCartState(updated);
  };

  // Remove item
  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCartState(updated);
  };

  // Clear entire cart
  const clearCart = () => {
    updateCartState([]);
  };

  // Pincode validation
  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setDeliveryStatus({
        available: true,
        message: "Free White-Glove Doorstep Delivery & Assembly Available!",
      });
    } else {
      setDeliveryStatus({
        available: false,
        message: "Please enter a valid 6-digit PIN code.",
      });
    }
  };

  // Promo code logic
  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === "HOMES24" || promoCode.toUpperCase() === "WELCOME1000") {
      setDiscountAmount(1000);
      setPromoApplied(true);
    } else {
      alert("Invalid promo code. Try using HOMES24");
    }
  };

  // Auth Protection for Checkout
  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;

    // Check if user is logged in
    const savedUser = localStorage.getItem("homes24_user");

    if (savedUser) {
      // User authenticated -> proceed to checkout page
      router.push("/checkout");
    } else {
      // User guest -> redirect to login with return redirect parameter
      router.push("/login?redirect=/checkout");
    }
  };

  // Summary calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalSavings = cartItems.reduce(
    (acc, item) => acc + (item.originalPrice - item.price) * item.quantity,
    0
  );
  const deliveryFee = subtotal > 15000 || subtotal === 0 ? 0 : 499;
  const finalTotal = Math.max(0, subtotal + deliveryFee - discountAmount);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500 font-semibold text-sm">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar cartCount={totalItemCount} />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Your Shopping Cart
            </h1>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-slate-400 hover:text-red-400 transition"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-5 max-w-lg mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-extrabold text-xl text-slate-900">Your Cart is Empty</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Looks like you haven't added any certified pre-loved furniture or appliances to your cart yet.
            </p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition"
            >
              <span>Explore Inspected Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Cart Grid Layout */
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left: Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Items Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="font-extrabold text-lg text-slate-900">
                    Cart Items ({totalItemCount})
                  </h2>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    Total Savings: ₹{totalSavings.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="divide-y divide-slate-100 space-y-6 divide-y-0">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-4 pt-4 first:pt-0 items-start sm:items-center justify-between"
                    >
                      {/* Image & Info */}
                      <div className="flex gap-4 items-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            {item.condition}
                          </span>
                          <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug max-w-sm">
                            {item.title}
                          </h3>
                          <p className="text-[11px] text-slate-400">
                            {item.brand ? `Brand: ${item.brand} • ` : ""}
                            <span className="text-slate-600">{item.warranty}</span>
                          </p>

                          <div className="flex items-baseline gap-2 pt-1 sm:hidden">
                            <span className="font-black text-sm text-slate-900">
                              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                            </span>
                            <span className="text-xs text-slate-400 line-through">
                              ₹{(item.originalPrice * item.quantity).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100 gap-3">
                        <div className="hidden sm:block text-right">
                          <span className="font-black text-base text-slate-900 block">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-slate-400 line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-l-lg transition"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-r-lg transition"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition"
                            title="Remove Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Pincode */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600" /> Check Doorstep Delivery & Assembly
                </h3>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit Pincode (e.g. 411018)"
                    className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                  >
                    Check
                  </button>
                </form>

                {deliveryStatus && (
                  <p
                    className={`text-xs font-semibold flex items-center gap-1.5 ${
                      deliveryStatus.available ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {deliveryStatus.available ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : (
                      <RotateCcw className="w-4 h-4 shrink-0" />
                    )}
                    {deliveryStatus.message}
                  </p>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">1-Year Warranty</h4>
                    <p className="text-[10px] text-slate-400">Full coverage on functional parts</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Free Setup</h4>
                    <p className="text-[10px] text-slate-400">Unpacked & installed in room</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
                  <RotateCcw className="w-6 h-6 text-amber-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">3-Day Trial</h4>
                    <p className="text-[10px] text-slate-400">100% Easy returns guarantee</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Order Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 sticky top-28">
                <h2 className="font-extrabold text-lg text-slate-900 border-b border-slate-100 pb-4">
                  Order Summary
                </h2>

                {/* Promo Code */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Have a Promo Code?
                  </label>
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Try 'HOMES24'"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium uppercase focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                    >
                      Apply
                    </button>
                  </form>
                  {promoApplied && (
                    <p className="text-xs text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Promo HOMES24 Applied (-₹1,000)
                    </p>
                  )}
                </div>

                {/* Breakdown */}
                <div className="space-y-3 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-slate-900">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery & Installation</span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      <span className="text-slate-900">₹{deliveryFee}</span>
                    )}
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Promo Discount</span>
                      <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between border-t border-slate-100 pt-3 text-sm font-black text-slate-900">
                    <span>Total Payable</span>
                    <span className="text-blue-600 text-xl">
                      ₹{finalTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  Safe & Secure Checkout • Encrypted Transactions
                </p>
              </div>
            </div>

          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}