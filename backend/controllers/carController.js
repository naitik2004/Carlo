const Car = require('../models/Car');

// GET ALL CARS
const getCars = async (req, res) => {
  try {
    const { location, minPrice, maxPrice } = req.query;
    let query = {};

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
    }

    const cars = await Car.find(query);
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
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      const cloudinary = require('../config/cloudinary');
      
      const uploadPromises = req.files.map(file => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'carlo_cars' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );
          uploadStream.end(file.buffer);
        });
      });

      imageUrls = await Promise.all(uploadPromises);
    }

    const car = await Car.create({
      ...req.body,
      images: imageUrls,
      owner: req.user._id,
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
