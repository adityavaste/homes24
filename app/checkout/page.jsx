"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { ShieldCheck, Truck, CreditCard, CheckCircle2, AlertCircle } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Address Form State
  const [addressData, setAddressData] = useState({
    fullName: "",
    phone: "",
    street: "",
    pincode: "",
    city: "Pune",
  });

  useEffect(() => {
    // 1. Verify user authentication
    const savedUser = localStorage.getItem("homes24_user");
    if (!savedUser) {
      router.push("/login?redirect=/checkout");
      return;
    }
    
    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);

    // Pre-fill user name/phone if available
    setAddressData((prev) => ({
      ...prev,
      fullName: parsedUser.name || "",
      phone: parsedUser.phone || "",
    }));

    // 2. Load cart items
    const savedCart = localStorage.getItem("homes24_cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, [router]);

  const handleInputChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Form Validation and Order Submission
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Mandatory Field Checks
    if (!addressData.fullName.trim()) {
      setErrorMessage("Full Name is mandatory.");
      return;
    }

    if (!addressData.phone.trim() || addressData.phone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit Phone Number.");
      return;
    }

    if (!addressData.street.trim()) {
      setErrorMessage("Street Address / Flat No is mandatory.");
      return;
    }

    if (!addressData.pincode.trim() || addressData.pincode.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit Pincode.");
      return;
    }

    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          items: cartItems,
          totalAmount: subtotal,
          ...addressData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Order placement failed");
      }

      // Clear Cart on Successful Order
      localStorage.removeItem("homes24_cart");
      window.dispatchEvent(new Event("cartUpdated"));
      setOrderPlaced(true);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500 font-semibold text-sm">Verifying session & loading checkout...</p>
      </div>
    );
  }

  // Order Success Screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Order Confirmed!</h1>
            <p className="text-xs text-slate-500">
              Thank you for shopping with Homes24. Your certified pre-owned items will be delivered & installed at:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-1">
              <p className="font-bold text-slate-900">{addressData.fullName}</p>
              <p className="text-slate-600">{addressData.street}</p>
              <p className="text-slate-600">{addressData.city} - {addressData.pincode}</p>
              <p className="text-slate-600 font-semibold">Phone: +91 {addressData.phone}</p>
            </div>
            <button
              onClick={() => router.push("/catalog")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl transition shadow"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              AUTHENTICATED SESSION
            </span>
            <h1 className="text-xl font-black text-slate-900 mt-1">Order Checkout</h1>
            <p className="text-xs text-slate-500">Logistics & delivery details for {user?.email}</p>
          </div>
          <ShieldCheck className="w-8 h-8 text-blue-600" />
        </div>

        {/* Validation Alert */}
        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-3 gap-6">
          {/* Address & Payment Steps */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Step 1: Address Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600" /> 1. Delivery & Setup Address
                </h2>
                <span className="text-[10px] font-bold text-red-500 uppercase">* Required</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* Full Name */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block font-bold text-slate-700 uppercase text-[10px] mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={addressData.fullName}
                    onChange={handleInputChange}
                    placeholder="Aditya Verma"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Phone Number */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block font-bold text-slate-700 uppercase text-[10px] mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    maxLength={10}
                    value={addressData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Street Address */}
                <div className="col-span-2">
                  <label className="block font-bold text-slate-700 uppercase text-[10px] mb-1">
                    Street Address / Flat & Building <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={addressData.street}
                    onChange={handleInputChange}
                    placeholder="Flat No 402, Royal Palms, Wakad"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase text-[10px] mb-1">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    maxLength={6}
                    value={addressData.pincode}
                    onChange={handleInputChange}
                    placeholder="e.g. 411018"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase text-[10px] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={addressData.city}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl font-medium text-slate-500 cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-extrabold text-sm text-slate-900 flex items-center gap-2 border-b pb-3">
                <CreditCard className="w-4 h-4 text-emerald-600" /> 2. Payment Method
              </h2>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="accent-blue-600" />
                  <span className="font-bold">UPI / Credit / Debit Card (Razorpay Gateway)</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                  <input type="radio" name="payment" className="accent-blue-600" />
                  <span className="font-bold">Pay on Delivery (Token Deposit Required)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Checkout Summary & CTA */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b pb-3">Order Summary</h3>
            <div className="text-xs space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span className="font-bold text-slate-900">{cartItems.length}</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-sm font-black text-slate-900">
                <span>Total Payable</span>
                <span className="text-blue-600">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Place Order</span>
            </button>

            <p className="text-[10px] text-center text-slate-400">
              1-Year Warranty & 3-Day Return Policy included with every order.
            </p>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}