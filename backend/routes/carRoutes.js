const express = require('express');
const router = express.Router();
const { getCars, getCarById, createCar, updateCar, deleteCar } = require('../controllers/carController');
const { protect } = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(getCars)
    .post(protect, upload.array('images', 5), createCar);

router.route('/:id')
    .get(getCarById)
    .put(protect, updateCar)
    .delete(protect, deleteCar);

module.exports = router;
