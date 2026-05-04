// Mock environment variables before app initializes
process.env.JWT_SECRET = 'testsecret';
process.env.MONGO_URI = 'mongodb://localhost:27017/car-rental-test';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Car = require('../models/Car');
const Booking = require('../models/Booking');

jest.setTimeout(20000);

let token;
let userId;

beforeAll(async () => {
  // app.js connects using process.env.MONGO_URI
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Booking.deleteMany({});
  await Car.deleteMany({});
  await User.deleteMany({});

  const user = await User.create({
    name: 'Integration Booking User',
    email: 'intbooking@example.com',
    password: 'password123',
  });
  userId = user._id;

  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'intbooking@example.com', password: 'password123' });
  token = loginRes.body.token;
});

describe('Booking Routes Integration', () => {
  it('should complete full flow: create car → book car → verify booking in user bookings', async () => {
    // Step 1: Create a car
    const carRes = await request(app)
      .post('/api/cars')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Integration Car')
      .field('brand', 'BMW')
      .field('model', 'X5')
      .field('year', 2024)
      .field('seats', 5)
      .field('transmission', 'Automatic')
      .field('fuelType', 'Diesel')
      .field('location', 'Munich')
      .field('pricePerDay', 120)
      .field('owner', userId.toString());

    expect(carRes.statusCode).toBe(201);
    const carId = carRes.body._id;

    // Step 2: Book the car
    const bookRes = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        carId,
        startDate: '2026-08-01',
        endDate: '2026-08-04',
      });

    expect(bookRes.statusCode).toBe(201);
    expect(bookRes.body.totalPrice).toBe(360); // 3 days * $120

    // Step 3: Verify booking appears in user's bookings
    const myBookings = await request(app)
      .get('/api/bookings/me')
      .set('Authorization', `Bearer ${token}`);

    expect(myBookings.statusCode).toBe(200);
    expect(myBookings.body.length).toBe(1);
    expect(myBookings.body[0].car.brand).toBe('BMW');
  });

  it('should prevent double-booking the same car for overlapping dates', async () => {
    // Create a car
    const carRes = await request(app)
      .post('/api/cars')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Conflict Car')
      .field('brand', 'Audi')
      .field('model', 'A4')
      .field('year', 2023)
      .field('seats', 5)
      .field('transmission', 'Automatic')
      .field('fuelType', 'Gasoline')
      .field('location', 'Berlin')
      .field('pricePerDay', 80)
      .field('owner', userId.toString());

    const carId = carRes.body._id;

    // First booking succeeds
    const first = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({ carId, startDate: '2026-09-01', endDate: '2026-09-05' });

    expect(first.statusCode).toBe(201);

    // Second overlapping booking fails
    const second = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({ carId, startDate: '2026-09-03', endDate: '2026-09-07' });

    expect(second.statusCode).toBe(400);
    expect(second.body.message).toBe('Car is already booked for these dates');
  });

  it('should allow booking non-overlapping dates on the same car', async () => {
    // Create a car
    const carRes = await request(app)
      .post('/api/cars')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Multi-Book Car')
      .field('brand', 'Mercedes')
      .field('model', 'C-Class')
      .field('year', 2024)
      .field('seats', 5)
      .field('transmission', 'Automatic')
      .field('fuelType', 'Gasoline')
      .field('location', 'Stuttgart')
      .field('pricePerDay', 100)
      .field('owner', userId.toString());

    const carId = carRes.body._id;

    // First booking
    const first = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({ carId, startDate: '2026-10-01', endDate: '2026-10-05' });

    expect(first.statusCode).toBe(201);

    // Non-overlapping booking succeeds
    const second = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({ carId, startDate: '2026-10-10', endDate: '2026-10-15' });

    expect(second.statusCode).toBe(201);

    // Verify both bookings exist
    const myBookings = await request(app)
      .get('/api/bookings/me')
      .set('Authorization', `Bearer ${token}`);

    expect(myBookings.body.length).toBe(2);
  });
});
