const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.error(err.name, err.message);
  console.error('Uncaught exception, shutting down');

  process.exit(1);
});

mongoose
  .connect(
    process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD),
  )

  .then(() => {
    console.log('DB connected');
  })
  .catch((error) => {
    console.log(error);
  });

const app = require('./app');

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port 8000');
});

// error from asynchronous code
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection, shutting down');
  server.close(() => {
    process.exit(1);
  });
});
