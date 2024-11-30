const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  stripeCustomerId: {
    type: String,
    required: true
  },
  subscriptionStatus: {
    type: String,
    enum: ['active', 'inactive', 'cancelled', 'pending'],
    default: 'pending'
  },
  subscriptionTier: {
    type: String,
    enum: ['basic', 'premium'],
    default: 'basic'
  },
  billingHistory: [{
    transactionId: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['succeeded', 'failed', 'pending'],
      required: true
    }
  }]
}, {
  timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
