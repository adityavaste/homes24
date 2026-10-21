"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Heart,
  Star,
  Search,
  ShoppingBag,
  BookmarkCheck,
} from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch live inventory from database
  useEffect(() => {
    async function fetchInventory() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error("Failed to load DB inventory:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchInventory();
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      activeCategory === "all" ||
      item.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item) => {
    if (!item.inStock) {
      alert("This item has already been booked by another customer.");
      return;
    }

    const existingCart = JSON.parse(
      localStorage.getItem("homes24_cart") || "[]"
    );
    const existingIndex = existingCart.findIndex((i) => i.id === item.id);

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("homes24_cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`${item.title} added to cart!`);
  };

  const handleAddToWishlist = (item) => {
    if (!item.inStock) {
      alert("This item is booked and cannot be added to wishlist.");
      return;
    }

    const existingWishlist = JSON.parse(
      localStorage.getItem("homes24_wishlist") || "[]"
    );
    if (!existingWishlist.some((w) => w.id === item.id)) {
      existingWishlist.push(item);
      localStorage.setItem(
        "homes24_wishlist",
        JSON.stringify(existingWishlist)
      );
      window.dispatchEvent(new Event("wishlistUpdated"));
      alert(`${item.title} added to wishlist!`);
    } else {
      alert("Item is already in your wishlist!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500 font-semibold text-sm">
          Loading live database inventory...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
            Homes24 Certified Inventory
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">All Products</h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
            Inspected, deep-cleaned, and covered under 1-Year functional warranty.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Search & Category Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {["all", "sofas", "appliances", "beds", "dining"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-bold px-4 py-2 rounded-xl capitalize transition cursor-pointer ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 max-w-md mx-auto">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-extrabold text-lg text-slate-900">
              No Inventory Items Found
            </h3>
            <p className="text-xs text-slate-500">
              There are no products matching this category or search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => {
              const discount = item.originalPrice
                ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                : 0;
              const isBooked = !item.inStock;

              return (
                <div
                  key={item.id}
                  className={`group bg-white rounded-2xl border border-slate-200 overflow-hidden transition duration-300 flex flex-col ${
                    isBooked ? "opacity-80" : "hover:shadow-xl"
                  }`}
                >
                  {/* Image & Overlay Badges */}
                  <div className="relative h-52 bg-slate-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full object-cover transition duration-500 ${
                        isBooked ? "grayscale-[40%]" : "group-hover:scale-105"
                      }`}
                    />

                    {/* BOOKED BADGE OVERLAY */}
                    {isBooked ? (
                      <span className="absolute top-3 left-3 bg-red-600 text-white font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest shadow-md flex items-center gap-1">
                        <BookmarkCheck className="w-3 h-3" /> BOOKED
                      </span>
                    ) : (
                      discount > 0 && (
                        <span className="absolute top-3 left-3 bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {discount}% OFF
                        </span>
                      )
                    )}

                    {!isBooked && (
                      <button
                        onClick={() => handleAddToWishlist(item)}
                        className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white text-slate-600 hover:text-red-500 rounded-full backdrop-blur-sm transition cursor-pointer"
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            isBooked
                              ? "bg-red-50 text-red-600 border border-red-100 font-extrabold"
                              : "text-blue-700 bg-blue-50 border border-blue-100"
                          }`}
                        >
                          {isBooked ? "Reserved / Out of Stock" : item.condition}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{item.rating || 4.8}</span>
                        </div>
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-slate-900">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{item.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      {/* Action Button */}
                      {isBooked ? (
                        <button
                          disabled
                          className="w-full mt-3 bg-slate-200 text-slate-500 font-bold text-xs py-2.5 rounded-xl cursor-not-allowed uppercase tracking-wider"
                        >
                          Item Booked
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-full mt-3 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}