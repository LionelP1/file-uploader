const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const { SUPPORTED_FILE_TYPES, MAX_SIZE } = require('../config/fileTypes');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads/',
    allowed_formats: SUPPORTED_FILE_TYPES.map(type => type.split('/')[1]),
  },
});

const fileFilter = (req, file, cb) => {
  if (!SUPPORTED_FILE_TYPES.includes(file.mimetype)) {
    return cb(new Error('Unsupported file type'), false);
  }
  if (file.size > MAX_SIZE) {
    return cb(new Error(`File size exceeds the maximum allowed limit of ${MAX_SIZE / (1024 * 1024)} MB`), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: MAX_SIZE },
}).single('file');

module.exports = upload;