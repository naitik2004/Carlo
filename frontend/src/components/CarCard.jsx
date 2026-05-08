import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gauge, Fuel, Calendar, ArrowUpRight } from "lucide-react";

export default function CarCard({ car }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -12 }}
      className="group bg-white border border-black/5 hover:border-black/10 transition-all duration-500 overflow-hidden relative"
    >
      <Link to={`/cars/${car._id}`} className="block">
        <div className="relative aspect-[16/11] bg-zinc-100 overflow-hidden">
          <motion.img 
            src={car.imageUrl || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800"} 
            alt={car.model} 
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0"
          />
          <div className="absolute top-6 right-6 bg-white px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] border border-black/5 z-20">
            {car.brand} {car.year}
          </div>
          
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
        </div>
      </Link>

      <div className="p-10">
        <div className="flex justify-between items-start mb-10">
          <div className="space-y-1 overflow-hidden pr-4">
            <h3 className="text-3xl font-black uppercase tracking-tighter text-black leading-[0.8] truncate max-w-[200px]">
              {car.model}
            </h3>
            <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Premium Collection</p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xl font-black text-black italic">₹{car.pricePerDay.toLocaleString()}</span>
            <span className="block text-[8px] font-black text-zinc-400 uppercase tracking-widest mt-1">/ 24 Hours</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-10">
          {[
            { label: "Fuel", val: car.fuelType, icon: Fuel },
            { label: "Power", val: "Elite", icon: Gauge },
            { label: "Range", val: `${car.mileage}km`, icon: Calendar }
          ].map((spec, i) => (
            <div key={i} className="space-y-2">
              <span className="text-[8px] font-black text-zinc-300 uppercase tracking-[0.2em] block">{spec.label}</span>
              <span className="text-[10px] font-black text-black uppercase block">{spec.val}</span>
            </div>
          ))}
        </div>

        <Link 
          to={`/cars/${car._id}`} 
          className="w-full py-5 border border-black flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500 group/btn relative overflow-hidden"
        >
          <span className="relative z-10">Reserve Motion</span>
          <ArrowUpRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          <motion.div 
            initial={{ y: "100%" }}
            whileHover={{ y: 0 }}
            className="absolute inset-0 bg-black -z-0"
          />
        </Link>
      </div>
    </motion.div>
  );
}
