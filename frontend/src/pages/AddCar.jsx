import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Plus, Car, Image as ImageIcon, IndianRupee, Gauge, Fuel } from "lucide-react";
import { createCar } from "../api/cars";
import { normalizeCarForm } from "../lib/carFilters";

const initialForm = {
  brand: "",
  model: "",
  year: "",
  pricePerDay: "",
  fuelType: "petrol",
  mileage: "",
  imageUrl: "",
};

export default function AddCar() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await createCar(normalizeCarForm(form));
      navigate("/my-cars");
    } catch {
      setError("Please log in before adding a car.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-zinc-400 hover:text-black mb-8 transition-colors group text-[10px] font-black uppercase tracking-widest">
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      <div className="flex items-center gap-6 mb-12">
        <div className="w-14 h-14 rounded-none bg-black flex items-center justify-center text-white">
          <Plus className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-black">List Your <span className="text-zinc-300">Car</span></h1>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Enter vehicle details to begin.</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-premium p-10 shadow-2xl"
      >
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Brand</label>
              <div className="relative group">
                <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-black transition-colors" />
                <input className="input-premium pl-12" name="brand" placeholder="e.g. Tesla" value={form.brand} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Model</label>
              <input className="input-premium" name="model" placeholder="e.g. Model S" value={form.model} onChange={handleChange} required />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Year</label>
              <input className="input-premium" name="year" type="number" placeholder="2024" value={form.year} onChange={handleChange} required />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Price Per Day (₹)</label>
              <div className="relative group">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-black transition-colors" />
                <input className="input-premium pl-12" name="pricePerDay" type="number" placeholder="5000" value={form.pricePerDay} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Fuel Type</label>
              <div className="relative group">
                <Fuel className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-black transition-colors" />
                <select className="input-premium pl-12 appearance-none" name="fuelType" value={form.fuelType} onChange={handleChange}>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Mileage (KM)</label>
              <div className="relative group">
                <Gauge className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-black transition-colors" />
                <input className="input-premium pl-12" name="mileage" type="number" placeholder="10000" value={form.mileage} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Image URL</label>
              <div className="relative group">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-black transition-colors" />
                <input className="input-premium pl-12" name="imageUrl" placeholder="https://unsplash.com/..." value={form.imageUrl} onChange={handleChange} />
              </div>
              <p className="text-[8px] text-zinc-300 ml-1 font-black uppercase tracking-widest mt-2 italic">Provide a high-quality URL for the best listing appearance.</p>
            </div>
          </div>

          <div className="pt-10 border-t border-zinc-100 flex gap-6">
            <button 
              type="submit" 
              disabled={isLoading}
              className="flex-grow btn-premium py-5"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Publish Listing"
              )}
            </button>
            <Link to="/dashboard" className="px-10 py-5 border border-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center">
              Cancel
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
