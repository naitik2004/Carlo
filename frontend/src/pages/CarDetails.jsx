import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Users, Fuel, Settings, MapPin, Calendar, CheckCircle, Trash2 } from 'lucide-react';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await API.get(`/cars/${id}`);
        setCar(data);
      } catch (error) {
        console.error('Error fetching car:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: `/cars/${id}` } });
      return;
    }

    try {
      setError('');
      setBookingStatus('processing');
      await API.post('/bookings', {
        carId: id,
        startDate,
        endDate,
      });
      setBookingStatus('success');
    } catch (error) {
      setBookingStatus('error');
      setError(error.response?.data?.message || 'Booking failed');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this car? This action cannot be undone.')) {
      try {
        await API.delete(`/cars/${id}`);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting car:', error);
        alert('Failed to delete car');
      }
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!car) return <div className="text-center py-12">Car not found</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
            <img 
              src={car.images[0] || 'https://via.placeholder.com/800x600?text=Car'} 
              alt={car.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {car.images.slice(1).map((img, index) => (
              <div key={index} className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img src={img} alt={`${car.title} ${index + 2}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Details & Booking */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{car.brand} {car.model}</h1>
            <div className="flex items-center text-slate-500 mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              {car.location}
            </div>
            <p className="text-3xl font-bold text-primary">${car.pricePerDay}<span className="text-lg text-slate-500 font-normal">/day</span></p>
            
            {user && user._id === car.owner && (
              <button 
                onClick={handleDelete}
                className="mt-4 flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                Delete Car
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-slate-400" />
              <span className="text-slate-700">{car.seats} Seats</span>
            </div>
            <div className="flex items-center gap-3">
              <Fuel className="w-5 h-5 text-slate-400" />
              <span className="text-slate-700">{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-slate-400" />
              <span className="text-slate-700">{car.transmission}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-slate-400" />
              <span className="text-slate-700">{car.year} Model</span>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Book this car</h3>
            
            {bookingStatus === 'success' ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h4 className="text-xl font-bold text-slate-900 mb-2">Booking Confirmed!</h4>
                <p className="text-slate-600 mb-4">You can view your booking in the dashboard.</p>
                <button onClick={() => navigate('/dashboard')} className="btn-primary w-full">
                  Go to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="input-field"
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="input-field"
                      required
                      min={startDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full btn-primary py-3 text-lg"
                    disabled={bookingStatus === 'processing'}
                  >
                    {bookingStatus === 'processing' ? 'Processing...' : 'Book Now'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
