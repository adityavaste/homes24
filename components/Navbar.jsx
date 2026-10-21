"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  MapPin,
  Menu,
  X,
  ChevronDown,
  LogOut,
  UserCheck,
  Package,
} from "lucide-react";

export default function Navbar({
  cartCount: propCartCount,
  wishlistCount: propWishlistCount,
  initialCartCount = 0,
  initialWishlistCount = 0,
}) {
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Pune");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const defaultCart = propCartCount ?? initialCartCount;
  const defaultWishlist = propWishlistCount ?? initialWishlistCount;

  const [cartCount, setCartCount] = useState(defaultCart);
  const [wishlistCount, setWishlistCount] = useState(defaultWishlist);
  const [user, setUser] = useState(null);

  // Sync user state from localStorage
  const syncUser = () => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("homes24_user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error("Failed to parse saved user", e);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }
  };

  // Sync cart count
  const syncCartCount = () => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("homes24_cart") || "[]");
      const total = savedCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(total);
    }
  };

  // Sync wishlist count
  const syncWishlistCount = () => {
    if (typeof window !== "undefined") {
      const savedWishlist = JSON.parse(localStorage.getItem("homes24_wishlist") || "[]");
      setWishlistCount(savedWishlist.length);
    }
  };

  useEffect(() => {
    syncUser();
    syncCartCount();
    syncWishlistCount();

    window.addEventListener("userUpdated", syncUser);
    window.addEventListener("cartUpdated", syncCartCount);
    window.addEventListener("wishlistUpdated", syncWishlistCount);
    window.addEventListener("storage", syncUser);
    window.addEventListener("storage", syncCartCount);
    window.addEventListener("storage", syncWishlistCount);

    return () => {
      window.removeEventListener("userUpdated", syncUser);
      window.removeEventListener("cartUpdated", syncCartCount);
      window.removeEventListener("wishlistUpdated", syncWishlistCount);
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("storage", syncCartCount);
      window.removeEventListener("storage", syncWishlistCount);
    };
  }, []);

  // Handle Sign Out
  const handleSignOut = () => {
    localStorage.removeItem("homes24_user");
    setUser(null);
    setUserDropdownOpen(false);
    window.dispatchEvent(new Event("userUpdated"));
    router.push("/login");
  };

  const cities = ["Pune", "Mumbai", "Bengaluru", "Hyderabad", "Delhi NCR"];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white text-[10px] py-1 px-2 text-center font-medium truncate">
        ⚡ Brand New Furniture & Electronics | Official Warranty & 0% EMI
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-1">

          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center gap-1">
              <span className="text-lg sm:text-2xl font-black tracking-tight text-blue-600">
                Homes<span className="text-slate-900">24</span>
              </span>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg items-center relative mx-4">
            <input
              type="text"
              placeholder="Search sofa, washing machine, refrigerator..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          {/* User Actions & Icons */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-1.5 sm:p-2 text-slate-600 hover:text-red-500 relative transition"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold min-w-[16px] h-[16px] px-0.5 rounded-full flex items-center justify-center border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              href="/cart"
              className="p-1.5 sm:p-2 text-slate-600 hover:text-blue-600 relative transition"
              title="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold min-w-[16px] h-[16px] px-0.5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account / Profile Section */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs py-1.5 px-2 sm:px-3 rounded-full hover:bg-blue-100 transition cursor-pointer max-w-[85px] sm:max-w-[160px]"
                >
                  <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate hidden xs:inline sm:inline">
                    {user.email.split("@")[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-blue-500 shrink-0" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Logged in as</p>
                      <p className="text-xs font-extrabold text-slate-900 truncate">{user.name || "User"}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition"
                    >
                      <Package className="w-4 h-4 text-blue-600" />
                      <span>My Orders</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 transition cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1 text-slate-700 hover:text-blue-600 font-medium text-xs sm:text-sm p-1.5 transition"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Account</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-slate-600 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <nav className="hidden md:flex items-center gap-8 py-2.5 text-xs font-semibold text-slate-600 border-t border-slate-100 overflow-x-auto scrollbar-none">
          <Link href="/catalog" className="hover:text-blue-600 transition whitespace-nowrap">Sofas & Recliners</Link>
          <Link href="/catalog" className="hover:text-blue-600 transition whitespace-nowrap">Refrigerators</Link>
          <Link href="/catalog" className="hover:text-blue-600 transition whitespace-nowrap">Washing Machines</Link>
          <Link href="/catalog" className="hover:text-blue-600 transition whitespace-nowrap">Beds & Mattresses</Link>
          <Link href="/catalog" className="hover:text-blue-600 transition whitespace-nowrap">Dining Tables</Link>
          <Link href="/catalog" className="hover:text-blue-600 transition whitespace-nowrap">Smart TVs</Link>
          <Link href="/catalog" className="hover:text-blue-600 transition whitespace-nowrap">Study & Office</Link>
          <span className="ml-auto text-emerald-600 font-bold whitespace-nowrap">Factory Direct Pricing</span>
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search store inventory..."
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-800"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
            <Link href="/catalog" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-50 rounded-lg text-center">Sofas & Living</Link>
            <Link href="/catalog" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-50 rounded-lg text-center">Appliances</Link>
            <Link href="/catalog" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-50 rounded-lg text-center">Beds & Mattresses</Link>
            <Link href="/catalog" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-50 rounded-lg text-center">Dining Tables</Link>
          </div>

          {/* Mobile User Profile / Login */}
          <div className="pt-2 border-t border-slate-100">
            {user ? (
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                  <p className="text-xs text-blue-600 truncate">{user.email}</p>
                </div>
                
                <Link
                  href="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-bold text-xs py-2.5 rounded-lg"
                >
                  <Package className="w-4 h-4" />
                  <span>My Orders</span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full text-center bg-red-50 text-red-600 font-bold text-xs py-2.5 rounded-lg border border-red-200 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-bold text-xs py-2.5 rounded-lg shadow-sm"
              >
                <User className="w-4 h-4" />
                <span>Sign In / Register</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}