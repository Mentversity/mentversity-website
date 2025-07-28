// backend/controllers/contactController.js

const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email'); // Import the Email utility
const { validationResult } = require('express-validator'); // For input validation
const config = require('../config/email'); // Import config for company email

// @desc    Handle contact form submission
// @route   POST /api/contact
// @access  Public
const submitContactForm = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  const { name, email, subject, message } = req.body;
  try {
    // 1. Send confirmation email to the user
    const userForConfirmation = { name, email };
    await new Email(userForConfirmation).sendContactConfirmation(name, email, subject, message);

    // 2. Send contact message to the company
    const companyUser = { email: config.companyEmail, name: 'Mentversity Admin' };
    await new Email(companyUser).sendCompanyContactForm(name, email, subject, message);

    res.status(200).json({
      status: 'success',
      message: 'Your message has been sent successfully!',
    });

  } catch (error) {
    console.error('❌ Error sending contact form emails:', error);

    res.status(500).json({
      status: 'error',
      message: 'There was an error sending your message. Please try again later.',
    });
  }
});

module.exports = {
  submitContactForm,
};
