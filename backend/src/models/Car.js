import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // owner
  brand: String,
  model: String,
  year: Number,
  pricePerDay: Number,
  fuelType: String,
  mileage: Number,
  imageUrl: String
});

export default mongoose.model("Car", CarSchema);
