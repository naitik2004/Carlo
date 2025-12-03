import { useState, useEffect } from 'react';
import API from '../api/axios';
import CarCard from '../components/CarCard';
import { Search, Filter } from 'lucide-react';
import gsap from 'gsap';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    if (cars.length > 0) {
      gsap.fromTo('.car-card', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
    }
  }, [cars]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.location) params.append('location', filters.location);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

      const { data } = await API.get(`/cars?${params.toString()}`);
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCars();
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Find the perfect car for your next journey
          </h1>
          <p className="text-slate-300 text-lg mb-8">
            Choose from our wide range of premium vehicles for any occasion.
          </p>
          
          <form onSubmit={handleSearch} className="bg-white p-4 rounded-xl shadow-lg flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPinIcon className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
              <input
                type="text"
                name="location"
                placeholder="Location (e.g. Miami)"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-4">
               <input
                type="number"
                name="minPrice"
                placeholder="Min $"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="w-24 px-4 py-2 border border-gray-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
               <input
                type="number"
                name="maxPrice"
                placeholder="Max $"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="w-24 px-4 py-2 border border-gray-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button type="submit" className="btn-primary flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Search
            </button>
          </form>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
      </section>

      {/* Car Grid */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Available Vehicles</h2>
          <span className="text-slate-500">{cars.length} cars found</span>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div key={car._id} className="car-card">
                <CarCard car={car} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 bg-white rounded-xl border border-dashed border-gray-300">
            No cars found matching your criteria.
          </div>
        )}
      </section>
    </div>
  );
};

// Helper icon component since MapPin was missing in import
const MapPinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

export default Home;
