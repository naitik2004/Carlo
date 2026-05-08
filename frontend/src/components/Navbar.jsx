import { Link, useLocation } from "react-router-dom";
import { Car, User, LogOut, LayoutDashboard, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-black/5">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-black flex items-center justify-center transition-transform group-hover:scale-105">
            <Car className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-black uppercase tracking-tighter text-black">
            Carlo.
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-12">
          <Link 
            to="/cars" 
            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors flex items-center gap-2 ${
              location.pathname === "/cars" ? "text-black" : "text-zinc-400 hover:text-black"
            }`}
          >
            <Search className="w-3 h-3" />
            Vehicles
          </Link>
          <Link to="/about" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors">About</Link>
          <Link to="/support" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors">Support</Link>
        </div>

        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <div className="flex items-center gap-6">
              <Link 
                to="/dashboard" 
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors flex items-center gap-2 ${
                  location.pathname === "/dashboard" ? "text-black" : "text-zinc-400 hover:text-black"
                }`}
              >
                <LayoutDashboard className="w-3 h-3" />
                Dash
              </Link>
              <button 
                onClick={logout}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:text-red-600 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-3 h-3" />
                Exit
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <Link 
                to="/login" 
                className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors flex items-center gap-2"
              >
                <User className="w-3 h-3" />
                Log in
              </Link>
              <Link 
                to="/signup" 
                className="bg-black text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl shadow-black/10"
              >
                Join Now
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
