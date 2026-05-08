import mongoose from "mongoose";
import dotenv from "dotenv";
import Car from "./src/models/Car.js";
import User from "./src/models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const cars = [
  {
    brand: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    pricePerDay: 15000,
    fuelType: "electric",
    mileage: 0,
    imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad42243c59?auto=format&fit=crop&q=80&w=800"
  },
  {
    brand: "Porsche",
    model: "911 Carrera",
    year: 2023,
    pricePerDay: 25000,
    fuelType: "petrol",
    mileage: 5000,
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
  },
  {
    brand: "BMW",
    model: "i8 Roadster",
    year: 2022,
    pricePerDay: 18000,
    fuelType: "hybrid",
    mileage: 12000,
    imageUrl: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&q=80&w=800"
  },
  {
    brand: "Audi",
    model: "RS e-tron GT",
    year: 2024,
    pricePerDay: 20000,
    fuelType: "electric",
    mileage: 100,
    imageUrl: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=800"
  },
  {
    brand: "Mercedes",
    model: "G-Class AMG",
    year: 2023,
    pricePerDay: 30000,
    fuelType: "petrol",
    mileage: 8000,
    imageUrl: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800"
  },
  {
    brand: "Range Rover",
    model: "Sport",
    year: 2024,
    pricePerDay: 22000,
    fuelType: "diesel",
    mileage: 500,
    imageUrl: "https://images.unsplash.com/photo-1606148334002-556e0cfafdf8?auto=format&fit=crop&q=80&w=800"
  },
  {
    brand: "Lamborghini",
    model: "Urus",
    year: 2023,
    pricePerDay: 45000,
    fuelType: "petrol",
    mileage: 2000,
    imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800"
  },
  {
    brand: "Ferrari",
    model: "Roma",
    year: 2023,
    pricePerDay: 50000,
    fuelType: "petrol",
    mileage: 1500,
    imageUrl: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800"
  },
  {
    brand: "Aston Martin",
    model: "Vantage",
    year: 2022,
    pricePerDay: 35000,
    fuelType: "petrol",
    mileage: 4000,
    imageUrl: "https://images.unsplash.com/photo-1603577372342-70c204520a8c?auto=format&fit=crop&q=80&w=800"
  },
  {
    brand: "Lucid",
    model: "Air",
    year: 2024,
    pricePerDay: 16000,
    fuelType: "electric",
    mileage: 200,
    imageUrl: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800"
  },
  {
    brand: "Bentley",
    model: "Continental GT",
    year: 2023,
    pricePerDay: 40000,
    fuelType: "petrol",
    mileage: 3000,
    imageUrl: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=800"
  },
  {
    brand: "Maserati",
    model: "MC20",
    year: 2023,
    pricePerDay: 38000,
    fuelType: "petrol",
    mileage: 1000,
    imageUrl: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?auto=format&fit=crop&q=80&w=800"
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing cars
    await Car.deleteMany({});
    console.log("Cleared existing cars");

    // Get or create a dummy user
    let user = await User.findOne({ email: "admin@carlo.com" });
    if (!user) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      user = await User.create({
        name: "Carlo Admin",
        email: "admin@carlo.com",
        password: hashedPassword
      });
      console.log("Created admin user");
    }

    const carsWithUser = cars.map(car => ({ ...car, user: user._id }));
    await Car.insertMany(carsWithUser);
    console.log("Seeded 12 cars successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
