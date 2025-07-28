const crypto = require('crypto');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const User = require('../models/User');
const razorpay = require('../config/razorpay');
const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');

const createOrder = catchAsync(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { courseId, courseName, amount } = req.body;
  const userId = req.user.id;
  console.log(`Creating order for user ${userId} for course ${courseId} (${courseName}) with amount ${amount}`);

  // Generate receipt ID
  const receipt = `order_${userId.toString().slice(-10)}_${Date.now().toString().slice(-8)}`;

  // Create Razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount: amount * 100, // Convert to paise
    currency: 'INR',
    receipt,
    notes: {
      userId,
      courseId,
      courseName
    }
  });

  // Save order to database
  const order = await Order.create({
    user: userId,
    courseId,
    courseName,
    amount,
    razorpayOrderId: razorpayOrder.id,
    receipt,
    notes: razorpayOrder.notes
  });

  console.log(`Order created: ${order} ${razorpayOrder.id} for user ${userId}`);

  res.status(201).json({
    status: 'success',
    data: {
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      receipt: razorpayOrder.receipt,
      key: process.env.RAZORPAY_KEY_ID,
      order
    }
  });
});

const verifyPayment = catchAsync(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Verify signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (!isAuthentic) {
    return res.status(400).json({
      status: 'fail',
      message: 'Payment verification failed'
    });
  }

  // Find the order
  const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
  if (!order) {
    return res.status(404).json({
      status: 'fail',
      message: 'Order not found'
    });
  }

  // Update order status
  order.status = 'paid';
  await order.save();

  // Get payment details from Razorpay
  const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

  // Create payment record
  const payment = await Payment.create({
    user: order.user,
    order: order._id,
    razorpayPaymentId: razorpay_payment_id,
    razorpayOrderId: razorpay_order_id,
    razorpaySignature: razorpay_signature,
    amount: paymentDetails.amount / 100, // Convert from paise
    status: paymentDetails.status,
    method: paymentDetails.method,
    description: paymentDetails.description,
    fee: paymentDetails.fee / 100,
    tax: paymentDetails.tax / 100
  });

  res.status(200).json({
    status: 'success',
    message: 'Payment verified successfully',
    data: {
      payment,
      order
    }
  });
});

const webhook = catchAsync(async (req, res, next) => {
  const webhookSignature = req.headers['x-razorpay-signature'];
  const webhookBody = JSON.stringify(req.body);

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(webhookBody)
    .digest('hex');

  if (webhookSignature !== expectedSignature) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid webhook signature'
    });
  }

  const { event, payload } = req.body;

  try {
    switch (event) {
      case 'payment.captured':
        await handlePaymentCaptured(payload.payment.entity);
        break;
      case 'payment.failed':
        await handlePaymentFailed(payload.payment.entity);
        break;
      case 'order.paid':
        await handleOrderPaid(payload.order.entity);
        break;
      default:
        console.log(`Unhandled webhook event: ${event}`);
    }

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Webhook processing failed'
    });
  }
});

const handlePaymentCaptured = async (paymentData) => {
  const order = await Order.findOne({ razorpayOrderId: paymentData.order_id });
  if (!order) return;

  // Update order status
  order.status = 'paid';
  await order.save();

  // Create or update payment record
  await Payment.findOneAndUpdate(
    { razorpayPaymentId: paymentData.id },
    {
      user: order.user,
      order: order._id,
      razorpayPaymentId: paymentData.id,
      razorpayOrderId: paymentData.order_id,
      amount: paymentData.amount / 100,
      status: paymentData.status,
      method: paymentData.method,
      description: paymentData.description,
      fee: paymentData.fee ? paymentData.fee / 100 : 0,
      tax: paymentData.tax ? paymentData.tax / 100 : 0
    },
    { upsert: true, new: true }
  );

  console.log(`Payment captured for order: ${order.razorpayOrderId}`);
};

const handlePaymentFailed = async (paymentData) => {
  const order = await Order.findOne({ razorpayOrderId: paymentData.order_id });
  if (!order) return;

  // Update order status
  order.status = 'failed';
  await order.save();

  // Create payment record for failed payment
  await Payment.create({
    user: order.user,
    order: order._id,
    razorpayPaymentId: paymentData.id,
    razorpayOrderId: paymentData.order_id,
    amount: paymentData.amount / 100,
    status: 'failed',
    method: paymentData.method,
    errorCode: paymentData.error_code,
    errorDescription: paymentData.error_description
  });

  console.log(`Payment failed for order: ${order.razorpayOrderId}`);
};

const handleOrderPaid = async (orderData) => {
  const order = await Order.findOne({ razorpayOrderId: orderData.id });
  if (!order) return;

  order.status = 'paid';
  await order.save();

  console.log(`Order paid: ${order.razorpayOrderId}`);
};

const getPaymentHistory = catchAsync(async (req, res, next) => {
  const payments = await Payment.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .limit(50);

  res.status(200).json({
    status: 'success',
    results: payments.length,
    data: {
      payments
    }
  });
});

const getOrderHistory = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .limit(50);

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders
    }
  });
});

module.exports = {
  createOrder,
  verifyPayment,
  webhook,
  getPaymentHistory,
  getOrderHistory
};
