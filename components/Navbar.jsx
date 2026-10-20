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
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 text-center font-medium">
        ⚡ Certified Pre-Owned Furniture & Appliances | 1-Year Warranty & 3-Day Free Returns
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">

          {/* Logo & City Selector */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-blue-600">
                Homes<span className="text-slate-900">24</span>
              </span>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                Assured
              </span>
            </Link>

            {/* Location Picker */}
            <div className="relative hidden lg:block">
              <button
                type="button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-full transition cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {cityDropdownOpen && (
                <div className="absolute top-full mt-2 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
                  {cities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setSelectedCity(city);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold transition ${
                        selectedCity === city
                          ? "bg-blue-50 text-blue-600 font-bold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl items-center relative">
            <input
              type="text"
              placeholder="Search sofa, washing machine, refrigerator, dining table..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3 sm:gap-5">

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-2 text-slate-600 hover:text-red-500 relative transition"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              href="/cart"
              className="p-2 text-slate-600 hover:text-blue-600 relative transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border-2 border-white">
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
                  className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs py-1.5 px-3 rounded-full hover:bg-blue-100 transition cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <span className="max-w-[120px] sm:max-w-[160px] truncate">
                    {user.email}
                  </span>
                  <ChevronDown className="w-3 h-3 text-blue-500" />
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
                className="hidden sm:flex items-center gap-1.5 text-slate-700 hover:text-blue-600 font-medium text-sm p-1.5 transition"
              >
                <User className="w-5 h-5" />
                <span>Account</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900"
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
          <span className="ml-auto text-emerald-600 font-bold whitespace-nowrap">Up to 70% Off MRP</span>
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-4">
          <div className="relative my-2">
            <input
              type="text"
              placeholder="Search items..."
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
            <Link href="/catalog" className="p-2.5 bg-slate-50 rounded-lg">Sofas & Living</Link>
            <Link href="/catalog" className="p-2.5 bg-slate-50 rounded-lg">Home Appliances</Link>
            <Link href="/catalog" className="p-2.5 bg-slate-50 rounded-lg">Beds & Storage</Link>
            <Link href="/catalog" className="p-2.5 bg-slate-50 rounded-lg">Office Furniture</Link>
          </div>

          {/* Mobile User Profile / Login */}
          <div className="pt-2 border-t border-slate-100">
            {user ? (
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs font-bold text-slate-900">{user.name}</p>
                  <p className="text-xs text-blue-600">{user.email}</p>
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
                className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-bold text-xs py-2.5 rounded-lg"
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