const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { protect } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

// DB connect
connectDB();

app.use(cors());

app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} → ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

app.get('/api/protected', protect, (req, res) => {
  res.json({
    message: 'Access granted to protected route',
    user: req.user
  });
});

app.get('/', (req, res) => res.send('API running...'));

module.exports = app;
