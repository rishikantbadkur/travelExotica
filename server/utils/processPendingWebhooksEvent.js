const Booking = require('../models/bookingModel');
const Tour = require('../models/tourModel');
const User = require('../models/userModels');
const WebhookEvent = require('../models/webhookEventModel');
const Email = require('./email');

async function processPendingWebhookEvent() {
  const events = await WebhookEvent.find({ processed: 'false' });

  if (events.length === 0) {
    return;
  }

  try {
    events.forEach(async (event) => {
      const { order_id: orderId, status } =
        event.eventData.payload.payment.entity;

      const booking = await Booking.findOne({ orderId: orderId }).select(
        '-paymentSignature',
      );

      if (booking && booking.paid === 'pending confirmation') {
        if (status === 'captured') {
          booking.paid = 'confirmed';

          await booking.save();

          event.processed = true;

          await event.save();

          const user = await User.findById(booking.user).select('name email');
          const tour = await Tour.findById(booking.tour).select('name');

          await new Email({ name: user.name, email: user.email }, undefined, {
            orderId: booking.orderId,
            tourDate: booking.tourDate,
            adult: booking.bookingData.adult,
            children: booking.bookingData.children,
            tourName: tour.name,
          }).sendBookingConfirm();
          // }
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = processPendingWebhookEvent;
