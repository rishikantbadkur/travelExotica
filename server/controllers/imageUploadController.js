const path = require('path');
const fs = require('fs');
const multer = require('multer');

const createTourFolder = (tourName) => {
  const dir = path.join(__dirname, '../public/images/tours', tourName);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return dir;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { tourName } = req.body;

    if (!tourName) {
      return cb(new Error('Tour name is required'), null);
    }

    const dir = createTourFolder(tourName);

    cb(null, dir);
  },

  filename: (req, file, cb) => {
    const fileIndex = req.files.length;

    const fileName = fileIndex === 4 ? 'cover.jpg' : `tour-${fileIndex}.jpg`;

    cb(null, fileName);
  },
});

const upload = multer({ storage });

exports.uploadTourImageController = (req, res) => {
  upload.array('images', 4)(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        status: 'fail',
        message: err.message,
      });
    }
    const { tourName } = req.body;

    if (!tourName) {
      return res.status(400).json({
        status: 'fail',
        message: 'Tour name is required',
      });
    }

    if (req.files.length !== 4) {
      return res.status(400).json({
        status: 'fail',
        message: 'Exactly 4 images are required',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Images uploaded successfully',
    });
  });
};
