import express from "express";
import Car from "../models/Car.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Add car
router.post("/", auth, async (req, res) => {
  const car = await Car.create({ ...req.body, user: req.user });
  res.json(car);
});

export async function listCars(req, res) {
  const { search, minPrice, maxPrice, fuel, sort, page = 1 } = req.query;

  const query = {};

  if (search) query.model = { $regex: search, $options: "i" };
  if (fuel) query.fuelType = fuel;
  if (minPrice || maxPrice)
    query.pricePerDay = {
      ...(minPrice && { $gte: Number(minPrice) }),
      ...(maxPrice && { $lte: Number(maxPrice) })
    };

  const limit = 6;
  const skip = (page - 1) * limit;

  const cars = await Car.find(query).sort(sort).limit(limit).skip(skip);

  res.json(cars);
}

// Get all cars with search + filters + sort + pagination
router.get("/", listCars);

// Get my cars
router.get("/my-cars", auth, async (req, res) => {
  const cars = await Car.find({ user: req.user });
  res.json(cars);
});

router.get("/:id", async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }

  res.json(car);
});

// Update
router.put("/:id", auth, async (req, res) => {
  const updated = await Car.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  await Car.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.json({ message: "Car deleted" });
});

export default router;
