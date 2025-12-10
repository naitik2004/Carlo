// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

// Debug middleware to show request logs
app.use((req, res, next) => {
  console.log(`${req.method} → ${req.originalUrl}`);
  next();
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cars", require("./routes/carRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));


app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// dotenv.config();

// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.originalUrl}`);
//   next();
// });

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/cars', require('./routes/carRoutes'));
// app.use('/api/bookings', require('./routes/bookingRoutes'));
// // app.use('/api/users', require('./routes/userRoutes')); // Optional if needed

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });








// deepclone 
// const deepClone = obj => JSON.parse(JSON.stringify(obj));