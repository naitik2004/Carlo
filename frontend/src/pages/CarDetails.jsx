import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  Star, 
  MapPin, 
  Gauge, 
  Fuel, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import api from "../utils/api";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [error, setError] = useState("");
  const [bookingStatus, setBookingStatus] = useState("idle"); // idle, booking, success
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const timeSlots = [
    "09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM"
  ];

  useEffect(() => {
    async function loadCar() {
      try {
        const { data } = await api.get(`/api/cars/${id}`);
        setCar(data);
      } catch {
        setError("Car not found.");
      }
    }
    loadCar();
  }, [id]);

  const handleBook = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select a date and a time slot.");
      return;
    }
    setBookingStatus("booking");
    // Simulate booking process
    setTimeout(() => {
      setBookingStatus("success");
    }, 2000);
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex p-4 rounded-full bg-red-50 mb-6">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-3xl font-black mb-4 text-black">Error 404</h2>
        <p className="text-zinc-500 mb-8">{error}</p>
        <Link to="/cars" className="btn-premium">Back to Fleet</Link>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
        <div className="aspect-video glass-card rounded-3xl" />
        <div className="space-y-6">
          <div className="h-12 w-3/4 bg-white/5 rounded-xl" />
          <div className="h-6 w-1/2 bg-white/5 rounded-xl" />
          <div className="h-32 w-full bg-white/5 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link to="/cars" className="inline-flex items-center gap-2 text-zinc-400 hover:text-black mb-8 transition-colors group text-[10px] font-black uppercase tracking-widest">
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Gallery
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Image & Specs */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <img 
              src={car.imageUrl} 
              alt={car.model} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 z-20 flex gap-2">
              <span className="glass px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                4.9 (120+ Reviews)
              </span>
            </div>
          </motion.div>

          <div className="card-premium p-10">
            <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter text-black">{car.brand} {car.model}</h1>
            <div className="flex flex-wrap gap-8 text-zinc-500 font-bold text-xs uppercase tracking-widest mb-10 pb-10 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-black" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-zinc-400" />
                Fully Insured
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-zinc-400" />
                Verified Owner
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-none bg-zinc-50 border border-zinc-100 flex flex-col items-center text-center">
                <Gauge className="w-6 h-6 text-black mb-3" />
                <span className="text-[8px] text-zinc-400 uppercase font-black tracking-widest mb-1">Mileage</span>
                <span className="text-xs font-black text-black">{car.mileage} KM</span>
              </div>
              <div className="p-6 rounded-none bg-zinc-50 border border-zinc-100 flex flex-col items-center text-center">
                <Fuel className="w-6 h-6 text-black mb-3" />
                <span className="text-[8px] text-zinc-400 uppercase font-black tracking-widest mb-1">Fuel Type</span>
                <span className="text-xs font-black text-black capitalize">{car.fuelType}</span>
              </div>
              <div className="p-6 rounded-none bg-zinc-50 border border-zinc-100 flex flex-col items-center text-center">
                <Calendar className="w-6 h-6 text-black mb-3" />
                <span className="text-[8px] text-zinc-400 uppercase font-black tracking-widest mb-1">Year</span>
                <span className="text-xs font-black text-black">{car.year}</span>
              </div>
              <div className="p-6 rounded-none bg-zinc-50 border border-zinc-100 flex flex-col items-center text-center">
                <Clock className="w-6 h-6 text-black mb-3" />
                <span className="text-[8px] text-zinc-400 uppercase font-black tracking-widest mb-1">Transmission</span>
                <span className="text-xs font-black text-black uppercase">Automatic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking Card */}
        <div className="lg:col-span-5">
          <div className="card-premium p-8 sticky top-32 shadow-2xl border-zinc-100">
            {bookingStatus === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 rounded-full bg-zinc-50 flex items-center justify-center mx-auto mb-6 border border-zinc-100">
                  <CheckCircle2 className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">Booking Confirmed</h3>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-8">Your ride is ready for motion.</p>
                <button 
                  onClick={() => navigate("/dashboard")}
                  className="w-full btn-premium"
                >
                  Go to Dashboard
                </button>
              </motion.div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <span className="text-3xl font-black italic">₹{car.pricePerDay.toLocaleString()}</span>
                    <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest ml-2">/ 24h</span>
                  </div>
                  <div className="px-3 py-1 bg-zinc-50 border border-zinc-100 text-zinc-500 text-[8px] font-black tracking-widest uppercase">
                    Available
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Select Date</label>
                    <input 
                      type="date" 
                      className="input-premium" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Time Slot</label>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-3 border text-[10px] font-black uppercase tracking-widest transition-all ${
                            selectedSlot === slot 
                              ? "bg-black border-black text-white" 
                              : "bg-zinc-50 border-zinc-100 text-zinc-400 hover:border-black/20"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-zinc-400">Rental Cost</span>
                      <span className="text-black">₹{car.pricePerDay.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-zinc-400">Service Fee</span>
                      <span className="text-black">₹{(car.pricePerDay * 0.1).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xl pt-6 border-t border-zinc-100 font-black italic">
                      <span className="text-black uppercase not-italic text-sm tracking-tighter">Total Amount</span>
                      <span className="text-black">₹{(car.pricePerDay * 1.1).toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleBook}
                    disabled={bookingStatus === "booking"}
                    className="w-full btn-premium py-5 mt-8"
                  >
                    {bookingStatus === "booking" ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Book Now"
                    )}
                  </button>
                  <p className="text-[8px] text-center text-zinc-300 font-bold uppercase tracking-[0.2em]">Secure payment • instant confirm</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
