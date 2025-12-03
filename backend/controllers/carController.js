const Car = require('../models/Car');

// GET ALL CARS
const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    return res.status(200).json(cars);
  } catch (err) {
    console.error("GET CARS ERROR:", err.message);
    return res.status(500).json({ message: "Server error fetching cars" });
  }
};

// GET SINGLE CAR
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });

    return res.status(200).json(car);
  } catch (err) {
    console.error("GET CAR ERROR:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// CREATE CAR
const createCar = async (req, res) => {
  try {
    const car = await Car.create({
      ...req.body,
      owner: req.user._id, // DO NOT REMOVE THIS
    });

    return res.status(201).json(car);
  } catch (err) {
    console.error("CREATE CAR ERROR:", err.message);
    return res.status(500).json({ message: "Server error creating car" });
  }
};

// UPDATE CAR
const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });

    if (car.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json(updatedCar);
  } catch (err) {
    console.error("UPDATE CAR ERROR:", err.message);
    return res.status(500).json({ message: "Server error updating car" });
  }
};

// DELETE CAR
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });

    if (car.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await car.deleteOne();
    return res.status(200).json({ message: "Car removed" });
  } catch (err) {
    console.error("DELETE CAR ERROR:", err.message);
    return res.status(500).json({ message: "Server error deleting car" });
  }
};

module.exports = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
