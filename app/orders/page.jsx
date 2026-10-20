"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Package, Truck, ShieldCheck, Calendar, ArrowRight } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const savedUser = localStorage.getItem("homes24_user");
      if (!savedUser) {
        setLoading(false);
        return;
      }

      const user = JSON.parse(savedUser);

      try {
        const res = await fetch(`/api/orders/user?userId=${user.id}`);
        const data = await res.json();
        if (res.ok) {
          setOrders(data.orders || []);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500 font-semibold text-sm">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      <div className="bg-slate-900 text-white py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <Package className="w-6 h-6 text-blue-400" />
          <h1 className="text-2xl font-extrabold">My Orders</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 max-w-md mx-auto">
            <Package className="w-12 h-12 text-slate-300 mx-auto" />
            <h2 className="font-extrabold text-lg">No Orders Placed Yet</h2>
            <p className="text-xs text-slate-500">You haven't purchased any certified pre-owned items yet.</p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-slate-50 p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Order ID</span>
                    <p className="font-extrabold text-slate-900">{order.id.slice(0, 8)}...</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Date</span>
                    <p className="font-semibold text-slate-700 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Total Amount</span>
                    <p className="font-extrabold text-blue-600 text-sm">₹{order.totalAmount.toLocaleString("en-IN")}</p>
                  </div>
                  <div>
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items & Address */}
                <div className="p-6 grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0" />
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                          <p className="text-[11px] text-slate-500">Qty: {item.quantity} • ₹{item.price.toLocaleString("en-IN")}</p>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mt-1">
                            <ShieldCheck className="w-3 h-3" /> 1-Year Warranty Included
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-1 h-fit">
                    <p className="font-bold text-slate-900 uppercase text-[10px] flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-blue-600" /> Delivery Address
                    </p>
                    <p className="font-extrabold text-slate-900 pt-1">{order.fullName}</p>
                    <p className="text-slate-600">{order.street}</p>
                    <p className="text-slate-600">{order.city} - {order.pincode}</p>
                    <p className="text-slate-600 font-semibold pt-1">Ph: +91 {order.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}