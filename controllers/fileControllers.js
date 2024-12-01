const cloudinary = require('../config/cloudinary');

exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const uploadedFile = req.file;

    const fileUrl = uploadedFile.path;

    res.status(200).json({
      message: 'File uploaded successfully',
      fileUrl: fileUrl,
      fileName: uploadedFile.originalname,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during the file upload' });
  }
};