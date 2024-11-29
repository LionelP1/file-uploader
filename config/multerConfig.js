const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads/',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'mp4'],
  },
});

const upload = multer({ storage: storage });

module.exports = upload