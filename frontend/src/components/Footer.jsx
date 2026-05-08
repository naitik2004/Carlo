import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Car } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="bg-white p-2 rounded-none group-hover:rotate-12 transition-transform">
                <Car className="text-black w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter">CARLO.</span>
            </Link>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-loose">
              Redefining luxury mobility for the modern world. Available in 50+ global hubs.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8">Fleet</h4>
            <ul className="space-y-4">
              {['Sedans', 'SUVs', 'Electric', 'Supercars'].map((item) => (
                <li key={item}>
                  <Link to="/cars" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8">Company</h4>
            <ul className="space-y-4">
              {['About', 'Support', 'Legal', 'Privacy'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8">Connect</h4>
            <div className="flex gap-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-zinc-500 hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600">
                © 2024 Carlo. Elite Motion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
