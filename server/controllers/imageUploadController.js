// const path = require('path');
// const fs = require('fs');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinaryConfig');

// const createTourFolder = (tourName) => {
//   const dir = path.join(__dirname, '../public/images/tours', tourName);

//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }

//   return dir;
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const { tourName } = req.body;

//     if (!tourName) {
//       return cb(new Error('Tour name is required'), null);
//     }

//     const dir = createTourFolder(tourName);

//     cb(null, dir);
//   },

//   filename: (req, file, cb) => {
//     const fileIndex = req.files.length;

//     const fileName = fileIndex === 4 ? 'cover.jpg' : `tour-${fileIndex}.jpg`;

//     cb(null, fileName);
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const { tourName } = req.body;
    // console.log(req.files);

    return {
      folder:
        req.files.length === 4
          ? `tours/${tourName}/cover`
          : `tours/${tourName}`,
      allowed_formats: ['jpg', 'jpeg', 'png'],
    };
  },
});

const upload = multer({ storage });

exports.uploadTourImageController = (req, res, next) => {
  try {
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

      const uploadedImages = req.files.map((file) => file.path);

      res.status(200).json({
        status: 'success',
        message: 'Images uploaded successfully',
        images: uploadedImages,
      });
    });
  } catch (error) {
    next(error);
  }
};
