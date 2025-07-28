const crypto = require('crypto');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const User = require('../models/User');
// const Course = require('../models/Course'); // REMOVED: No longer fetching Course from DB
const razorpay = require('../config/razorpay');
const config = require('../config/email');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');
const { validationResult } = require('express-validator');

const createOrder = catchAsync(async (req, res, next) => {
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

  const shortUserId = userId.toString().slice(-10);
  const shortTimestamp = Date.now().toString().slice(-8);
  const receipt = `order_${shortUserId}_${shortTimestamp}`;

  if (!razorpay) {
    return res.status(500).json({ status: 'error', message: 'Razorpay service not initialized.' });
  }

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
  const userId = req.user.id;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ status: 'fail', message: 'Missing payment verification details' });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (!isAuthentic) {
    console.error('Payment verification failed: Signature mismatch');
    return res.status(400).json({
      status: 'fail',
      message: 'Payment verification failed: Invalid signature'
    });
  }

  const order = await Order.findOne({ razorpayOrderId: razorpay_order_id, user: userId });
  if (!order) {
    console.error(`Payment verification failed: Order not found or does not belong to user. Order ID: ${razorpay_order_id}, User ID: ${userId}`);
    return res.status(404).json({
      status: 'fail',
      message: 'Order not found or not associated with your account'
    });
  }

  let paymentDetails;
  try {
    paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
  } catch (err) {
    console.error('Error fetching payment details from Razorpay:', err.message);
    return res.status(500).json({ status: 'error', message: 'Failed to fetch payment details from Razorpay' });
  }

  if (paymentDetails.status !== 'captured') {
    console.warn(`Payment ID ${razorpay_payment_id} status is not 'captured' but '${paymentDetails.status}'`);
    order.status = paymentDetails.status;
    await order.save();
    return res.status(400).json({ status: 'fail', message: `Payment not captured. Current status: ${paymentDetails.status}` });
  }

  order.status = 'paid';
  await order.save();

  const payment = await Payment.findOneAndUpdate(
    { razorpayPaymentId: razorpay_payment_id },
    {
      user: order.user,
      order: order._id,
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      razorpaySignature: razorpay_signature,
      amount: paymentDetails.amount / 100,
      currency: paymentDetails.currency,
      status: paymentDetails.status,
      method: paymentDetails.method,
      description: paymentDetails.description,
      fee: paymentDetails.fee ? paymentDetails.fee / 100 : 0,
      tax: paymentDetails.tax ? paymentDetails.tax / 100 : 0,
      notes: paymentDetails.notes,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const user = await User.findById(userId);
  if (user && !user.enrolledCourses.includes(order.courseId)) {
    user.enrolledCourses.push(order.courseId);
    await user.save({ validateBeforeSave: false });
    console.log(`User ${userId} enrolled in course ${order.courseId}`);
  }

  // NEW: Send course enrollment emails (using data from 'order' and 'user')
  try {
    if (user) { // Ensure user object is available
      // Send email to student
      await new Email(user).sendCourseEnrollment(order.courseName, order.amount, user.email, user.name);
      console.log(`Course enrollment email sent to student ${user.email}`);

      // Send notification email to company
      const companyUser = { email: config.companyEmail, name: 'Mentversity Admin' };
      await new Email(companyUser).sendCompanyCourseEnrollmentNotification(order.courseName, order.amount, user.name, user.email);
      console.log(`Course enrollment notification sent to company ${config.companyEmail}`);
    }
  } catch (emailError) {
    console.error('Error sending course enrollment emails:', emailError);
    // Do not block the main response if email fails
  }

  res.status(200).json({
    status: 'success',
    message: 'Payment verified and processed successfully',
    data: {
      payment,
      order
    }
  });
});

const webhook = catchAsync(async (req, res, next) => {
  const webhookSignature = req.headers['x-razorpay-signature'];
  const webhookBody = req.body.toString();

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(webhookBody)
    .digest('hex');

  if (webhookSignature !== expectedSignature) {
    console.error('Webhook signature verification failed.');
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid webhook signature'
    });
  }

  const { event, payload } = JSON.parse(webhookBody);

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
        console.log(`Unhandled Razorpay webhook event: ${event}`);
    }

    res.status(200).json({ status: 'success', received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Webhook processing failed internally'
    });
  }
});

// Helper function for handling 'payment.captured' event from webhook
const handlePaymentCaptured = async (paymentData) => {
  console.log(`Webhook: Payment captured for Razorpay Payment ID: ${paymentData.id}`);
  const order = await Order.findOne({ razorpayOrderId: paymentData.order_id });

  if (!order) {
    console.warn(`Webhook: Order not found for captured payment: ${paymentData.order_id}`);
    return;
  }

  order.status = 'paid';
  await order.save();

  await Payment.findOneAndUpdate(
    { razorpayPaymentId: paymentData.id },
    {
      user: order.user,
      order: order._id,
      razorpayPaymentId: paymentData.id,
      razorpayOrderId: paymentData.order_id,
      razorpaySignature: paymentData.signature || 'N/A',
      amount: paymentData.amount / 100,
      currency: paymentData.currency,
      status: paymentData.status,
      method: paymentData.method,
      description: paymentData.description,
      fee: paymentData.fee ? paymentData.fee / 100 : 0,
      tax: paymentData.tax ? paymentData.tax / 100 : 0,
      notes: paymentData.notes,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const user = await User.findById(order.user);
  if (user && !user.enrolledCourses.includes(order.courseId)) {
    user.enrolledCourses.push(order.courseId);
    await user.save({ validateBeforeSave: false });
    console.log(`Webhook: User ${order.user} enrolled in course ${order.courseId}`);

    // NEW: Send course enrollment email via webhook (for robustness)
    try {
      if (user) { // Ensure user object is available
        await new Email(user).sendCourseEnrollment(order.courseName, order.amount, user.email, user.name);
        console.log(`Webhook: Course enrollment email sent to student ${user.email}`);
        
        const companyUser = { email: config.companyEmail, name: 'Mentversity Admin' };
        await new Email(companyUser).sendCompanyCourseEnrollmentNotification(order.courseName, order.amount, user.name, user.email);
        console.log(`Webhook: Course enrollment notification sent to company ${config.companyEmail}`);
      }
    } catch (emailError) {
      console.error('Webhook: Error sending course enrollment email:', emailError);
    }
  }
};

const handlePaymentFailed = async (paymentData) => {
  console.log(`Webhook: Payment failed for Razorpay Payment ID: ${paymentData.id}`);
  const order = await Order.findOne({ razorpayOrderId: paymentData.order_id });

  if (!order) {
    console.warn(`Webhook: Order not found for failed payment: ${paymentData.order_id}`);
    return;
  }

  order.status = 'failed';
  await order.save();

  await Payment.create({
    user: order.user,
    order: order._id,
    razorpayPaymentId: paymentData.id,
    razorpayOrderId: paymentData.order_id,
    amount: paymentData.amount / 100,
    status: 'failed',
    method: paymentData.method,
    errorCode: paymentData.error_code,
    errorDescription: paymentData.error_description,
    notes: paymentData.notes,
  });

  console.log(`Payment failed recorded for order: ${order.razorpayOrderId}`);
};

const handleOrderPaid = async (orderData) => {
  console.log(`Webhook: Order paid for Razorpay Order ID: ${orderData.id}`);
  const order = await Order.findOne({ razorpayOrderId: orderData.id });

  if (!order) {
    console.warn(`Webhook: Order not found for order.paid event: ${orderData.id}`);
    return;
  }

  if (order.status !== 'paid') {
    order.status = 'paid';
    await order.save();
    console.log(`Order status updated to paid for order: ${order.razorpayOrderId}`);
  }
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
