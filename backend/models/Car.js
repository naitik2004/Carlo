const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  seats: { type: Number, required: true },
  transmission: { type: String, required: true }, // Automatic, Manual
  fuelType: { type: String, required: true },
  location: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  images: [{ type: String }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'removed'],
    default: 'available',
  },
}, {
  timestamps: true,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
