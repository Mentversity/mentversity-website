const express = require('express');
const { body } = require('express-validator');
const {
  createOrder,
  verifyPayment,
  webhook,
  getPaymentHistory,
  getOrderHistory
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules
const createOrderValidation = [
  body('courseId')
    .notEmpty()
    .withMessage('Course ID is required'),
  body('courseName')
    .notEmpty()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Course name is required and must be less than 200 characters'),
  body('amount')
    .isNumeric()
    .isFloat({ min: 1 })
    .withMessage('Amount must be a positive number')
];

// Public routes
router.post('/webhook', webhook);

// Protected routes
router.use(protect); // All routes after this middleware are protected

router.post('/create-order', createOrderValidation, createOrder);
router.post('/verify', verifyPayment);
router.get('/history', getPaymentHistory);
router.get('/orders', getOrderHistory);

module.exports = router;