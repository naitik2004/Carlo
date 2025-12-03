const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getAllBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/roleMiddleware');

router.post('/', protect, createBooking);
router.get('/me', protect, getMyBookings);
router.get('/', protect, admin, getAllBookings);

module.exports = router;
