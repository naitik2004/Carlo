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
let carId;

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

  // Create a user and get token
  const user = await User.create({
    name: 'Booking User',
    email: 'booking@example.com',
    password: 'password123',
  });
  userId = user._id;

  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'booking@example.com', password: 'password123' });
  token = loginRes.body.token;

  // Create a car for booking tests
  const carRes = await request(app)
    .post('/api/cars')
    .set('Authorization', `Bearer ${token}`)
    .field('title', 'Booking Test Car')
    .field('brand', 'Honda')
    .field('model', 'Civic')
    .field('year', 2023)
    .field('seats', 5)
    .field('transmission', 'Automatic')
    .field('fuelType', 'Gasoline')
    .field('location', 'Test City')
    .field('pricePerDay', 50)
    .field('owner', userId.toString());

  carId = carRes.body._id;
});

describe('Booking Controller', () => {
  describe('POST /api/bookings', () => {
    it('should create a booking successfully', async () => {
      const res = await request(app)
        .post('/api/bookings')
        .set('Authorization', `Bearer ${token}`)
        .send({
          carId,
          startDate: '2026-06-01',
          endDate: '2026-06-05',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.status).toBe('confirmed');
      expect(res.body.totalPrice).toBe(200); // 4 days * $50
    });

    it('should return 404 if car does not exist', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .post('/api/bookings')
        .set('Authorization', `Bearer ${token}`)
        .send({
          carId: fakeId,
          startDate: '2026-06-01',
          endDate: '2026-06-05',
        });

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Car not found');
    });

    it('should return 400 for date conflict', async () => {
      // Create first booking
      await request(app)
        .post('/api/bookings')
        .set('Authorization', `Bearer ${token}`)
        .send({
          carId,
          startDate: '2026-06-01',
          endDate: '2026-06-05',
        });

      // Try overlapping booking
      const res = await request(app)
        .post('/api/bookings')
        .set('Authorization', `Bearer ${token}`)
        .send({
          carId,
          startDate: '2026-06-03',
          endDate: '2026-06-08',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Car is already booked for these dates');
    });

    it('should return 401 without auth token', async () => {
      const res = await request(app)
        .post('/api/bookings')
        .send({
          carId,
          startDate: '2026-06-01',
          endDate: '2026-06-05',
        });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/bookings/me', () => {
    it('should return bookings for the logged-in user', async () => {
      // Create a booking first
      await request(app)
        .post('/api/bookings')
        .set('Authorization', `Bearer ${token}`)
        .send({
          carId,
          startDate: '2026-07-01',
          endDate: '2026-07-03',
        });

      const res = await request(app)
        .get('/api/bookings/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
    });
  });
});
