const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user']
  },
  courseId: {
    type: String,
    required: [true, 'Please provide course ID']
  },
  courseName: {
    type: String,
    required: [true, 'Please provide course name']
  },
  amount: {
    type: Number,
    required: [true, 'Please provide order amount'],
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    default: 'INR'
  },
  razorpayOrderId: {
    type: String,
    required: [true, 'Razorpay order ID is required'],
    unique: true
  },
  status: {
    type: String,
    enum: ['created', 'attempted', 'paid', 'failed', 'cancelled'],
    default: 'created'
  },
  receipt: {
    type: String,
    required: true
  },
  notes: {
    type: Map,
    of: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
orderSchema.index({ user: 1 });
orderSchema.index({ razorpayOrderId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

// Populate user info when querying orders
orderSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name email'
  });
  next();
});

module.exports = mongoose.model('Order', orderSchema);
