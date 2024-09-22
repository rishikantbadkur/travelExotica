const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: './../../config.env' });

const Tour = require('../../models/tourModel');

mongoose
  .connect(
    process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD),
  )
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => console.log(err.message));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf8'));

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted!');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const loadData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data loading successful');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--delete') {
  deleteData();
}

if (process.argv[2] === '--import') {
  loadData();
}
