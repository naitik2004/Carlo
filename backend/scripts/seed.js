const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Car = require('../models/Car');
const Booking = require('../models/Booking');
const connectDB = require('../config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Booking.deleteMany();
    await Car.deleteMany();
    await User.deleteMany();

    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user',
      },
    ]);

    const adminUser = users[0]._id;

    const cars = [
      {
        user: adminUser,
        owner: adminUser,
        title: 'Tesla Model 3',
        brand: 'Tesla',
        model: 'Model 3',
        year: 2023,
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Electric',
        location: 'San Francisco',
        pricePerDay: 120,
        images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80'],
        status: 'available',
      },
      {
        user: adminUser,
        owner: adminUser,
        title: 'Toyota Camry',
        brand: 'Toyota',
        model: 'Camry',
        year: 2022,
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Hybrid',
        location: 'Los Angeles',
        pricePerDay: 60,
        images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80'],
        status: 'available',
      },
      {
        user: adminUser,
        owner: adminUser,
        title: 'Ford Mustang',
        brand: 'Ford',
        model: 'Mustang',
        year: 2021,
        seats: 4,
        transmission: 'Manual',
        fuelType: 'Petrol',
        location: 'Miami',
        pricePerDay: 150,
        images: ['https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80'],
        status: 'available',
      },
      {
        user: adminUser,
        owner: adminUser,
        title: 'BMW X5',
        brand: 'BMW',
        model: 'X5',
        year: 2023,
        seats: 7,
        transmission: 'Automatic',
        fuelType: 'Diesel',
        location: 'New York',
        pricePerDay: 180,
        images: ['https://images.unsplash.com/photo-1556189250-72ba95452da9?auto=format&fit=crop&w=800&q=80'],
        status: 'available',
      },
       {
        user: adminUser,
        owner: adminUser,
        title: 'Mercedes C-Class',
        brand: 'Mercedes',
        model: 'C-Class',
        year: 2022,
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        location: 'Chicago',
        pricePerDay: 140,
        images: ['https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80'],
        status: 'available',
      },
       {
        user: adminUser,
        owner: adminUser,
        title: 'Honda Civic',
        brand: 'Honda',
        model: 'Civic',
        year: 2021,
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        location: 'Seattle',
        pricePerDay: 55,
        images: ['https://images.unsplash.com/photo-1606152421811-aa911307c6ae?auto=format&fit=crop&w=800&q=80'],
        status: 'available',
      },
    ];

    await Car.insertMany(cars);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
