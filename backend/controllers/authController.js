const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const { createSendToken } = require('../utils/generateToken');
const admin = require('../config/firebase');
const { validationResult } = require('express-validator');

const register = catchAsync(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      status: 'fail',
      message: 'User with this email already exists'
    });
  }

  // Create new user
  const newUser = await User.create({
    name,
    email,
    password
  });

  // Send token
  createSendToken(newUser, 201, res);
});

const login = catchAsync(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  // Find user and include password for comparison
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect email or password'
    });
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  // Send token
  createSendToken(user, 200, res);
});

const googleAuth = catchAsync(async (req, res, next) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({
      status: 'fail',
      message: 'ID Token is required'
    });
  }

  try {
    // Verify the ID token with Firebase
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    // Check if user exists
    let user = await User.findOne({
      $or: [
        { googleId: uid },
        { email: email }
      ]
    });

    if (user) {
      // Update existing user with Google info if needed
      if (!user.googleId) {
        user.googleId = uid;
      }
      if (!user.photoURL && picture) {
        user.photoURL = picture;
      }
      user.lastLogin = new Date();
      await user.save({ validateBeforeSave: false });
    } else {
      // Create new user
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        googleId: uid,
        photoURL: picture,
        isEmailVerified: true // Google accounts are pre-verified
      });
    }

    // Send token
    createSendToken(user, 200, res);

  } catch (error) {
    console.error('Google Auth Error:', error);
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid ID Token'
    });
  }
});

const getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

const updateProfile = catchAsync(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { name, photoURL } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name, photoURL },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

module.exports = {
  register,
  login,
  googleAuth,
  getProfile,
  updateProfile
};
