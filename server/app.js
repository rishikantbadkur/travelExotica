const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const queryRouter = require('./routes/queryRoutes');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/AppError');
const razorPayWebhookHandler = require('./routes/razorPayWebhook');
const processPendingWebhookEvent = require('./utils/processPendingWebhooksEvent');

dotenv.config({ path: './config.env' });

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));

// app.options('*', cors());

app.use(helmet());

const limiter = rateLimit({
  max: 100,
  window: 60 * 60 * 1000,
  message: {
    message: 'Too many request, please try again in an hour',
  },
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

app.use(express.static(`${__dirname}/public`));

app.post('/webhook', razorPayWebhookHandler);

try {
  setInterval(() => {
    processPendingWebhookEvent();
  }, 30000);
} catch (error) {
  console.error(error);
}

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/queries', queryRouter);

app.all('*', (req, res, next) => {
  const err = new AppError(`cannot get ${req.originalUrl} on this server`, 404);

  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
