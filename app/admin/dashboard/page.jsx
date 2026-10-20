"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Package, Users, DollarSign, LogOut, Plus, Trash2, Tag, AlertCircle } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState("orders"); // "orders" | "inventory"
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "sofas",
    price: "",
    originalPrice: "",
    condition: "Mint Grade A+",
    warranty: "1-Year Warranty",
    image: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const loadData = async () => {
    try {
      const [resOrders, resProducts] = await Promise.all([
        fetch("/api/admin/orders"),
        fetch("/api/products"),
      ]);

      const dataOrders = await resOrders.json();
      const dataProducts = await resProducts.json();

      setOrders(dataOrders.orders || []);
      setProducts(dataProducts.products || []);
    } catch (err) {
      console.error("Failed to fetch admin data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedAdmin = localStorage.getItem("homes24_admin");
    if (!savedAdmin) {
      router.push("/admin/login");
      return;
    }

    const parsedAdmin = JSON.parse(savedAdmin);
    if (parsedAdmin.role !== "ADMIN") {
      router.push("/admin/login");
      return;
    }

    setAdmin(parsedAdmin);
    loadData();
  }, [router]);

  const handleAdminSignOut = () => {
    localStorage.removeItem("homes24_admin");
    router.push("/admin/login");
  };

  // Add Product Handler
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add product");

      setNewProduct({
        title: "",
        category: "sofas",
        price: "",
        originalPrice: "",
        condition: "Mint Grade A+",
        warranty: "1-Year Warranty",
        image: "",
      });

      loadData(); // Refresh list
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Product Handler
  const handleDeleteProduct = async (id) => {
  if (!confirm("Are you sure you want to remove this item from inventory?")) return;

  try {
    // Passes id as a query param directly to /api/products
    const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
    
    if (res.ok) {
      setProducts(products.filter((p) => p.id !== id));
      alert("Product removed from inventory!");
    } else {
      const data = await res.json();
      alert(data.message || "Failed to delete product.");
    }
  } catch (err) {
    console.error("Error deleting product:", err);
  }
};

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center font-sans">
        <p className="text-xs font-semibold">Verifying administrative access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-blue-400" />
          <h1 className="text-lg font-black text-white">Homes24 Management System</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-slate-400">
            Admin: <strong className="text-white">{admin?.email}</strong>
          </span>
          <button
            onClick={handleAdminSignOut}
            className="bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex gap-3 border-b border-slate-700 pb-4">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "orders" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            Live Customer Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "inventory" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            Inventory Management ({products.length})
          </button>
        </div>

        {/* TAB 1: CUSTOMER ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-slate-400 text-xs font-bold uppercase">Total Revenue</span>
                <p className="text-2xl font-black text-emerald-400">₹{totalRevenue.toLocaleString("en-IN")}</p>
              </div>
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-slate-400 text-xs font-bold uppercase">Total Orders</span>
                <p className="text-2xl font-black text-white">{orders.length}</p>
              </div>
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-slate-400 text-xs font-bold uppercase">Role</span>
                <p className="text-2xl font-black text-amber-400">Super Admin</p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
              <div className="p-6 border-b border-slate-700">
                <h2 className="text-base font-extrabold text-white">Live Customer Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/50 text-slate-400 font-bold uppercase border-b border-slate-700">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Delivery Address</th>
                      <th className="p-4">Items Purchased</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50 text-slate-300">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-700/30 transition">
                        <td className="p-4 font-mono text-blue-400 font-bold">{order.id.slice(0, 8)}...</td>
                        <td className="p-4">
                          <p className="font-bold text-white">{order.fullName}</p>
                          <p className="text-[11px] text-slate-400">Ph: {order.phone}</p>
                        </td>
                        <td className="p-4 max-w-xs">
                          <p className="line-clamp-1">{order.street}</p>
                          <p className="text-[11px] text-slate-400">{order.city} - {order.pincode}</p>
                        </td>
                        <td className="p-4">
                          {order.items.map((item) => (
                            <p key={item.id} className="text-[11px]">
                              • <span className="font-bold text-white">{item.title}</span> (x{item.quantity})
                            </p>
                          ))}
                        </td>
                        <td className="p-4 font-extrabold text-emerald-400">₹{order.totalAmount.toLocaleString("en-IN")}</td>
                        <td className="p-4">
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY MANAGEMENT */}
        {activeTab === "inventory" && (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left: Add Product Form */}
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4 h-fit">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-slate-700 pb-3">
                <Plus className="w-5 h-5 text-blue-400" /> Add New Inventory Item
              </h2>

              {formError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Royal Oak 3-Seater Fabric Sofa"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="sofas">Sofas</option>
                      <option value="appliances">Appliances</option>
                      <option value="beds">Beds</option>
                      <option value="dining">Dining</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Condition Grade</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mint Grade A+"
                      value={newProduct.condition}
                      onChange={(e) => setNewProduct({ ...newProduct, condition: e.target.value })}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Selling Price (₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="14999"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="34999"
                      value={newProduct.originalPrice}
                      onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Image URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/photo-..."
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-xl transition shadow cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Adding Item..." : "Save Item to Inventory"}
                </button>
              </form>
            </div>

            {/* Right: Current Inventory List */}
            <div className="lg:col-span-2 bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
              <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                <h2 className="text-base font-extrabold text-white">Current Store Inventory ({products.length})</h2>
              </div>

              {products.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-xs font-semibold">
                  No items in inventory. Use the form to add your first product.
                </div>
              ) : (
                <div className="divide-y divide-slate-700/50">
                  {products.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-700/30 transition">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-xl border border-slate-700 shrink-0" />
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 uppercase">
                            {item.category}
                          </span>
                          <h4 className="font-bold text-xs text-white leading-snug">{item.title}</h4>
                          <p className="text-[11px] text-slate-400">
                            ₹{item.price.toLocaleString("en-IN")}{" "}
                            <span className="line-through text-slate-500">₹{item.originalPrice.toLocaleString("en-IN")}</span>
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteProduct(item.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}