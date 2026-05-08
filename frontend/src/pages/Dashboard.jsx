import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Car, 
  Plus, 
  History, 
  Settings, 
  User, 
  TrendingUp, 
  CreditCard,
  ChevronRight,
  Shield
} from "lucide-react";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const stats = [
    { label: "Active Rentals", value: "2", icon: Car, color: "text-blue-400" },
    { label: "Total Spent", value: "₹45k", icon: CreditCard, color: "text-green-400" },
    { label: "Reward Points", value: "850", icon: TrendingUp, color: "text-purple-400" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-extrabold mb-2 text-black">
            Welcome back, <span className="text-black">{user?.name || "Driver"}</span>
          </h1>
          <p className="text-zinc-500">Manage your premium car rentals and listings.</p>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <Link to="/add-car" className="btn-premium py-2 px-6 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Listing
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-premium p-6 flex items-center gap-6"
          >
            <div className={`w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center ${stat.color} border border-zinc-100`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{stat.label}</div>
              <div className="text-2xl font-black text-black">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            Recent Activity
          </h2>
          
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="card-premium p-4 flex items-center gap-4 group cursor-pointer">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={`https://images.unsplash.com/photo-15${i === 1 ? '80273916550' : '03376780353'}-e323be2ae537?w=200`} alt="Car" className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-black">{i === 1 ? 'Lamborghini Urus' : 'Porsche 911'}</h3>
                  <p className="text-xs text-zinc-500">Rental ending in 2 days</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-black">Active</div>
                  <ChevronRight className="w-4 h-4 text-zinc-300 inline-block group-hover:text-black group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>

          <Link 
            to="/my-cars" 
            className="card-premium p-8 flex items-center justify-between group hover:border-black transition-all"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-black border border-black/5">
                <Car className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-black">My Managed Listings</h3>
                <p className="text-sm text-zinc-500">Edit, delete, and monitor your car listings performance.</p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
              <ChevronRight className="w-6 h-6" />
            </div>
          </Link>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="card-premium p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-black">
              <User className="w-5 h-5 text-black" />
              Profile
            </h2>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-xl text-black border border-black/5">
                {user?.name?.charAt(0) || 'D'}
              </div>
              <div>
                <div className="font-bold text-black">{user?.name || "Driver"}</div>
                <div className="text-xs text-zinc-500">{user?.email}</div>
              </div>
            </div>
            <div className="space-y-2">
              <button className="w-full p-3 rounded-xl bg-zinc-50 border border-black/5 hover:border-black/20 text-left text-sm font-medium flex items-center justify-between transition-all group">
                Account Settings
                <Settings className="w-4 h-4 text-zinc-300 group-hover:rotate-45 transition-transform" />
              </button>
              <button className="w-full p-3 rounded-xl bg-zinc-50 border border-black/5 hover:border-black/20 text-left text-sm font-medium flex items-center justify-between transition-all">
                Security
                <Shield className="w-4 h-4 text-zinc-300" />
              </button>
            </div>
          </div>

          <div className="card-premium p-8 bg-zinc-50">
            <h3 className="font-bold mb-2 text-black">Need help?</h3>
            <p className="text-xs text-zinc-500 mb-4 leading-relaxed">Our premium concierge team is available 24/7 for our members.</p>
            <button className="w-full py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
