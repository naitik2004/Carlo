const express = require('express');
const router = express.Router();
const { getCars, getCarById, createCar, updateCar, deleteCar } = require('../controllers/carController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getCars).post(protect, createCar);
router.route('/:id').get(getCarById).put(protect, updateCar).delete(protect, deleteCar);

module.exports = router;
