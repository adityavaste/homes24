"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Heart,
  Trash2,
  ShoppingCart,
  Star,
  ArrowRight,
  Check,
} from "lucide-react";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [addedItemIds, setAddedItemIds] = useState([]);

  // Load wishlist items from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem("homes24_wishlist");
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist items", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Sync wishlist updates across tabs/events
  useEffect(() => {
    const syncWishlist = () => {
      const savedWishlist = localStorage.getItem("homes24_wishlist");
      if (savedWishlist) {
        try {
          setWishlistItems(JSON.parse(savedWishlist));
        } catch (e) {
          console.error("Failed to parse wishlist items", e);
        }
      } else {
        setWishlistItems([]);
      }
    };

    window.addEventListener("wishlistUpdated", syncWishlist);
    window.addEventListener("storage", syncWishlist);

    return () => {
      window.removeEventListener("wishlistUpdated", syncWishlist);
      window.removeEventListener("storage", syncWishlist);
    };
  }, []);

  // Update localStorage and trigger custom event
  const updateWishlistState = (newList) => {
    setWishlistItems(newList);
    localStorage.setItem("homes24_wishlist", JSON.stringify(newList));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    const updated = wishlistItems.filter((item) => item.id !== id);
    updateWishlistState(updated);
  };

  // Move single item to Cart
  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("homes24_cart") || "[]");
    const index = existingCart.findIndex((item) => item.id === product.id);

    if (index > -1) {
      existingCart[index].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("homes24_cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));

    setAddedItemIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };

  // Move All items to Cart
  const handleMoveAllToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("homes24_cart") || "[]");

    wishlistItems.forEach((product) => {
      const index = existingCart.findIndex((item) => item.id === product.id);
      if (index > -1) {
        existingCart[index].quantity += 1;
      } else {
        existingCart.push({ ...product, quantity: 1 });
      }
    });

    localStorage.setItem("homes24_cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500 font-semibold text-sm">Loading saved items...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-red-500 fill-current" />
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Your Wishlist
            </h1>
          </div>
          {wishlistItems.length > 0 && (
            <button
              onClick={handleMoveAllToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow transition"
            >
              Move All to Cart
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {wishlistItems.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-5 max-w-lg mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-extrabold text-xl text-slate-900">Your Wishlist is Empty</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Save your favorite certified pre-owned items here to keep track of prices and buy them whenever you are ready.
            </p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => {
              const discount = item.originalPrice
                ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                : 0;
              const isAdded = addedItemIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    {/* Image & Top Badges */}
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {discount > 0 && (
                        <span className="absolute top-3 left-3 bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {discount}% OFF
                        </span>
                      )}
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full shadow transition"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {item.condition || "Certified Like New"}
                        </span>
                        {item.rating && (
                          <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{item.rating}</span>
                          </div>
                        )}
                      </div>

                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-snug">
                        {item.title}
                      </h3>

                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-slate-900">
                          ₹{item.price?.toLocaleString("en-IN")}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{item.originalPrice?.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 pt-0">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`w-full font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-900 hover:bg-blue-600 text-white"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Move to Cart</span>
                        </>
                      )}
                    </button>
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