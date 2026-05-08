import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame, useMotionValue } from "framer-motion";
import { Search, Calendar, MapPin, ChevronRight, ArrowRight, Star, Shield, Zap } from "lucide-react";
import { useRef, useState } from "react";

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const RANDOM_CARS = [
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800"
];

function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden tracking-tighter leading-[0.8] flex whitespace-nowrap flex-nowrap py-6">
      <motion.div className="flex whitespace-nowrap flex-nowrap gap-20 text-[15vw] font-black text-zinc-100 uppercase" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

export default function Landing() {
  const heroRef = useRef(null);
  const marqueeRef = useRef(null);
  const [hoveredCar, setHoveredCar] = useState(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const carY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const carScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const springX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  const heroImage = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000";

  const handleMouseMove = (e) => {
    const rect = marqueeRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - 150);
    mouseY.set(e.clientY - 100);
    
    // Change image randomly every now and then
    if (!hoveredCar || Math.random() > 0.98) {
      setHoveredCar(RANDOM_CARS[Math.floor(Math.random() * RANDOM_CARS.length)]);
    }
  };

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              style={{ opacity: textOpacity }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:w-1/2"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-8 block">
                Available in 50+ Cities
              </span>
              
              <h1 className="text-7xl lg:text-9xl font-black text-black leading-[0.85] mb-10 tracking-tighter uppercase">
                ELITE <br />
                MOTION <br />
                <span className="text-zinc-200">CARLO.</span>
              </h1>

              <div className="flex gap-6">
                <Link to="/cars" className="btn-premium px-12 py-5">
                  Explore Fleet
                  <ArrowRight className="w-4 h-4 ml-3" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              style={{ y: carY, scale: carScale }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5 }}
              className="lg:w-[60%] lg:absolute -right-32 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <img src={heroImage} alt="Premium Car" className="w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Bar */}
      <section className="px-6 -mt-32 relative z-30 pb-32">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-white border border-black/5 shadow-2xl p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { label: "Departure", icon: MapPin, placeholder: "New York, USA" },
              { label: "Pick-up", icon: Calendar, placeholder: "Select Date", type: "date" },
              { label: "Return", icon: Calendar, placeholder: "Select Date", type: "date" }
            ].map((field, i) => (
              <div key={i} className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{field.label}</label>
                <div className="flex items-center gap-3 border-b border-zinc-100 pb-3">
                  <field.icon className="w-4 h-4 text-zinc-300" />
                  <input type={field.type || "text"} placeholder={field.placeholder} className="bg-transparent outline-none text-sm font-bold w-full" />
                </div>
              </div>
            ))}
            <button className="btn-premium">
              Check availability
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Parallax Marquee Section with Hover Image Effect */}
      <section 
        ref={marqueeRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !hoveredCar && setHoveredCar(RANDOM_CARS[0])}
        onMouseLeave={() => setHoveredCar(null)}
        className="py-40 bg-white border-t border-b border-zinc-100 overflow-hidden relative cursor-none"
      >
        <ParallaxText baseVelocity={-5}>VELOCITY LUXURY MOTION</ParallaxText>
        <ParallaxText baseVelocity={5}>EXPERIENCE THE UNEXPECTED</ParallaxText>
        
        {/* Floating Image */}
        {hoveredCar && (
          <motion.div 
            style={{ 
              position: "fixed",
              left: springX,
              top: springY,
              pointerEvents: "none",
              zIndex: 100
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <img 
              src={hoveredCar} 
              alt="Floating Car" 
              className="w-[300px] h-[200px] object-cover shadow-2xl border-4 border-white"
            />
          </motion.div>
        )}
      </section>

      {/* Features Grid */}
      <section className="py-40 bg-zinc-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
            {[
              { title: "PREMIUM FLEET", desc: "Handpicked for performance.", icon: Star },
              { title: "SEAMLESS FLOW", desc: "Booking made effortless.", icon: Zap },
              { title: "TOTAL PRIVACY", desc: "Discreet delivery worldwide.", icon: Shield }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <feature.icon className="w-8 h-8 text-black mb-8" />
                <h3 className="text-2xl font-black mb-6 tracking-tighter uppercase italic">{feature.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">{feature.desc}</p>
                <div className="h-[2px] bg-black mt-8 w-12" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
