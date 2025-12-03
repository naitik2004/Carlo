import { Link } from 'react-router-dom';
import { Users, Fuel, Settings, MapPin } from 'lucide-react';

const CarCard = ({ car }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.images[0] || 'https://via.placeholder.com/400x300?text=Car'} 
          alt={`${car.brand} ${car.model}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-sm font-semibold text-slate-900 shadow-sm">
          ${car.pricePerDay}/day
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{car.brand} {car.model}</h3>
            <p className="text-slate-500 text-sm">{car.year}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-slate-600 mb-4">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-slate-400" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="w-4 h-4 text-slate-400" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Settings className="w-4 h-4 text-slate-400" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="truncate">{car.location}</span>
          </div>
        </div>

        <Link 
          to={`/cars/${car._id}`} 
          className="block w-full text-center bg-slate-900 text-white py-2.5 rounded-lg hover:bg-slate-800 transition-colors font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
