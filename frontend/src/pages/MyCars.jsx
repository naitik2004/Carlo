import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Plus, Edit3, Trash2, Car, Search } from "lucide-react";
import { deleteCar, getMyCars } from "../api/cars";

export default function MyCars() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function loadCars() {
    setError("");
    setIsLoading(true);
    try {
      const data = await getMyCars();
      setCars(data);
    } catch {
      setError("Please log in to view your car listings.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCars();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      await deleteCar(id);
      setCars(cars.filter((car) => car._id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-zinc-400 hover:text-black mb-8 transition-colors group text-[10px] font-black uppercase tracking-widest">
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2 text-black uppercase tracking-tighter">My <span className="text-zinc-300">Listings</span></h1>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Manage and monitor the cars you've shared.</p>
        </div>
        <Link to="/add-car" className="btn-premium py-2 px-6 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Car
        </Link>
      </div>

      {error && (
        <div className="card-premium p-12 text-center">
          <p className="text-red-500 font-bold">{error}</p>
          <Link to="/login" className="mt-6 btn-premium inline-block">Sign in now</Link>
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card h-64 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <motion.div 
                key={car._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-premium overflow-hidden group"
              >
                <div className="h-48 relative">
                  <img src={car.imageUrl || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800"} alt={car.model} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-2">{car.brand} {car.model}</h2>
                    <p className="text-[10px] text-white/80 font-black uppercase tracking-widest">{car.year} • {car.fuelType}</p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-100">
                    <div className="text-xl font-black text-black italic">₹{car.pricePerDay.toLocaleString()}<span className="text-[8px] text-zinc-400 ml-2 font-black uppercase tracking-widest not-italic">/ DAY</span></div>
                    <div className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">{car.mileage} KM</div>
                  </div>
                  <div className="flex gap-4">
                    <Link 
                      className="flex-grow flex items-center justify-center gap-2 py-4 border border-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all" 
                      to={`/edit-car/${car._id}`}
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </Link>
                    <button 
                      className="flex items-center justify-center w-14 h-12 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-100" 
                      onClick={() => handleDelete(car._id)} 
                      type="button"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {!error && cars.length === 0 && (
            <div className="card-premium p-24 text-center flex flex-col items-center">
              <div className="w-24 h-24 rounded-none bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-8">
                <Car className="w-10 h-10 text-zinc-200" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter text-black mb-4">No listings yet</h3>
              <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest max-w-sm mb-10">Share your premium vehicle with the community and start earning.</p>
              <Link to="/add-car" className="btn-premium px-12">Create Your First Listing</Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
