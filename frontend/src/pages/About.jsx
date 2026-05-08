import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-8 block">
          Since 2024
        </span>
        <h1 className="text-7xl font-black text-black leading-[0.85] mb-12 tracking-tighter uppercase">
          Elite <br /> Motion.
        </h1>
        <p className="text-xl text-zinc-500 leading-relaxed mb-12">
          Carlo is a premium car rental platform designed for those who demand more from their journey. 
          We believe that mobility should be an experience, not just a utility.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 border-t border-zinc-100 pt-20">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-black mb-4">Our Mission</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">To provide seamless access to the world's most exquisite vehicles, backed by a global concierge network that ensures perfection at every turn.</p>
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-black mb-4">The Fleet</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">From silent electric performance to the raw soul of a classic supercar, every vehicle in our collection is handpicked for its spirit.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
