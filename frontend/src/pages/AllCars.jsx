import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, SlidersHorizontal, Plus, LayoutGrid, List } from "lucide-react";
import { getCars } from "../api/cars";
import { buildCarQuery } from "../lib/carFilters";
import CarCard from "../components/CarCard";

export default function AllCars() {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({ search: "", fuel: "", minPrice: "", maxPrice: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function loadCars() {
      setLoading(true);
      setError("");
      try {
        const data = await getCars(buildCarQuery(filters));
        setCars(data);
      } catch {
        setError("Could not load cars right now.");
      } finally {
        setLoading(false);
      }
    }
    loadCars();
  }, [filters]);

  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl font-black uppercase tracking-tighter text-black"
          >
            Elite <span className="text-zinc-300">Fleet</span>
          </motion.h1>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mt-2">Discover your next destination companion.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest border transition-all ${
              showFilters ? "bg-black border-black text-white shadow-xl shadow-black/10" : "border-zinc-100 bg-zinc-50 text-zinc-400 hover:border-black/20"
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            Filters
          </button>
          <Link to="/add-car" className="btn-premium py-3 px-6">
            <Plus className="w-3 h-3" />
            List Car
          </Link>
        </div>
      </div>

      {/* Filters Area */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-12"
          >
            <div className="card-premium p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Search Model</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                  <input 
                    className="input-premium pl-12 py-3" 
                    name="search" 
                    placeholder="e.g. Tesla" 
                    value={filters.search} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Fuel Type</label>
                <select 
                  className="input-premium py-3 appearance-none" 
                  name="fuel" 
                  value={filters.fuel} 
                  onChange={handleChange}
                >
                  <option value="">All Types</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Min Price (₹)</label>
                <input 
                  className="input-premium py-3" 
                  name="minPrice" 
                  type="number" 
                  placeholder="0" 
                  value={filters.minPrice} 
                  onChange={handleChange} 
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Max Price (₹)</label>
                <input 
                  className="input-premium py-3" 
                  name="maxPrice" 
                  type="number" 
                  placeholder="100,000+" 
                  value={filters.maxPrice} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      {loading ? (
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card-premium h-[500px] animate-pulse bg-zinc-50" />
          ))}
        </div>
      ) : error ? (
        <div className="card-premium p-24 text-center">
          <p className="text-red-500 font-bold uppercase tracking-widest text-xs">{error}</p>
        </div>
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>

          {cars.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card-premium p-32 text-center flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-none bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-10">
                <Search className="w-10 h-10 text-zinc-200" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter text-black mb-4">No match found</h3>
              <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest max-w-sm mb-10">We couldn't find any vehicles matching your criteria.</p>
              <button 
                onClick={() => setFilters({ search: "", fuel: "", minPrice: "", maxPrice: "" })}
                className="btn-premium px-12"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
