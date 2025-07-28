const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Payment must belong to a user']
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: [true, 'Payment must be associated with an order']
  },
  razorpayPaymentId: {
    type: String,
    required: [true, 'Razorpay payment ID is required'],
    unique: true
  },
  razorpayOrderId: {
    type: String,
    required: [true, 'Razorpay order ID is required']
  },
  razorpaySignature: {
    type: String,
    required: [true, 'Razorpay signature is required']
  },
  amount: {
    type: Number,
    required: [true, 'Payment amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['captured', 'authorized', 'failed', 'refunded'],
    required: [true, 'Payment status is required']
  },
  method: {
    type: String,
    enum: ['card', 'netbanking', 'wallet', 'upi', 'emi', 'paylater']
  },
  description: String,
  notes: {
    type: Map,
    of: String
  },
  fee: Number,
  tax: Number,
  errorCode: String,
  errorDescription: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
paymentSchema.index({ user: 1 });
paymentSchema.index({ order: 1 });
paymentSchema.index({ razorpayPaymentId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ createdAt: -1 });

// Populate user and order info when querying payments
paymentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name email'
  }).populate({
    path: 'order',
    select: 'courseId courseName amount receipt'
  });
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);