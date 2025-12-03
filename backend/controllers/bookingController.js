const Booking = require('../models/Booking');
const Car = require('../models/Car');

const createBooking = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Calculate total price
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    if (diffDays <= 0) {
        return res.status(400).json({ message: 'End date must be after start date' });
    }

    const totalPrice = diffDays * car.pricePerDay;

    // Check for conflicts
    const conflict = await Booking.findOne({
      car: carId,
      status: { $ne: 'cancelled' },
      $or: [
        { startDate: { $lt: end }, endDate: { $gt: start } }
      ]
    });

    if (conflict) {
      return res.status(400).json({ message: 'Car is already booked for these dates' });
    }

    const booking = await Booking.create({
      user: req.user.id,
      car: carId,
      startDate,
      endDate,
      totalPrice,
      status: 'confirmed'
    });

    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('car').sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user', 'name email').populate('car');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings
};
