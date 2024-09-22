const crypto = require('crypto');
const WebhookEvent = require('../models/webhookEventModel');

// let paymentQueue = [];
// let isProcessing = false;

// const processQueue = () => {
//   if (isProcessing || paymentQueue.length === 0) {
//     return
//   }

//   isProcessing = true;

// };

const razorPayWebhookHandler = async (req, res, next) => {
  //   console.log(req);
  //   console.log(req.headers);

  const event = req.body;
  const orderId = event.payload.payment.entity.order_id;

  console.log('webhook received');

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (signature !== req.headers['x-razorpay-signature']) {
    return res.status(400).send('Invalid webhook signature');
  }

  console.log('passed check');

  try {
    if (event.event === 'payment.captured') {
      const databaseEvents = await WebhookEvent.findOne({
        orderId: orderId,
      });

      if (databaseEvents) {
        return res.status(200).send('Event already processed');
      }

      await WebhookEvent.create({ eventData: event, orderId: orderId });

      //   paymentQueue.push(req.body);

      //   console.log(req);
      res.status(200).send('Webhook received');
    } else {
      res.status(200).send('Webhook ignored');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }

  //   processQueue();
};

module.exports = razorPayWebhookHandler;
