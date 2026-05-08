import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, ShieldCheck } from "lucide-react";

export default function Support() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-8 block">
          Support Center
        </span>
        <h1 className="text-7xl font-black text-black leading-[0.85] mb-20 tracking-tighter uppercase">
          HOW CAN WE <br /> ASSIST YOU?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Mail, title: "Email Us", val: "concierge@carlo.com" },
            { icon: Phone, title: "Call Us", val: "+1 (800) CARLO-ELITE" },
            { icon: MessageSquare, title: "Live Chat", val: "Available 24/7" }
          ].map((item, i) => (
            <div key={i} className="card-premium p-10">
              <item.icon className="w-8 h-8 text-black mb-8" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">{item.title}</h3>
              <p className="text-xl font-black text-black tracking-tighter">{item.val}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 card-premium p-12 bg-zinc-50 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-none bg-black flex items-center justify-center text-white">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-black">Elite Protection</h3>
              <p className="text-sm text-zinc-500">Every rental is covered by our comprehensive premium insurance.</p>
            </div>
          </div>
          <button className="btn-premium px-12">Read Policy</button>
        </div>
      </motion.div>
    </div>
  );
}
