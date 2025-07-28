// backend/routes/contactRoutes.js
const express = require('express');
const { submitContactForm } = require('../controllers/contactController');
const { body } = require('express-validator'); // For input validation

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('message').notEmpty().withMessage('Message is required'),
  ],
  submitContactForm
);

module.exports = router;
