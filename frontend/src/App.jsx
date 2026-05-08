import { BrowserRouter, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { useEffect, useState } from "react";

function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 border border-black rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-black rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{ x: mousePos.x - 3, y: mousePos.y - 3 }}
        transition={{ type: "spring", damping: 50, stiffness: 500, mass: 0.1 }}
      />
    </>
  );
}

function AnimatedContent() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <AppRoutes />
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <BrowserRouter>
        <CustomCursor />
        <Navbar />
        <main className="min-h-[70vh] pt-20">
          <AnimatedContent />
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
