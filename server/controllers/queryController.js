const Contacts = require('../models/contactModel');

exports.createUserQuery = async (req, res, next) => {
  try {
    const query = await Contacts.create(req.body);

    res.status(201).json({
      status: 'success',
      data: query,
    });
  } catch (error) {
    // console.log(error);

    next(error);
  }
};
