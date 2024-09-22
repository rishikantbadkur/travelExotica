const mongoose = require('mongoose');

const webhookEventModel = new mongoose.Schema({
  orderId: {
    type: String,
    required: [true, 'An order id is required'],
  },
  eventData: {
    type: mongoose.Schema.Types.Mixed,
  },

  processed: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const WebhookEvent = mongoose.model('WebhookEvent', webhookEventModel);

module.exports = WebhookEvent;
