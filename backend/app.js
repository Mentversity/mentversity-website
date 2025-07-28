const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const globalErrorHandler = require('./middleware/errorMiddleware');

// Import routes
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const contactRoutes = require('./routes/contactRoutes'); // NEW: Import contact routes

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// CORS configuration - FIX: Explicitly set multiple allowed origins
app.use(cors({
  origin: [
    'https://www.mentversity.com',
    'https://mentversity.com',
    'http://localhost:3000',
    'http://localhost:5000',
    // Add more environments here if needed
    // 'https://dev.mentversity.com',
    // 'https://staging.mentversity.com',
  ],
  credentials: true
}));
// Body parser middleware
// IMPORTANT: This will parse JSON and URL-encoded bodies for most routes.
// The /api/payments/webhook route specifically uses bodyParser.raw() before its handler.
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/contact', contactRoutes); // NEW: Add contact routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Mentversity Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Handle undefined routes
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;