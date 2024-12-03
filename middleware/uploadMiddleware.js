const uploadMiddleware = (req, res, next) => {
  const singleUpload = upload.single('file');

  singleUpload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `File upload error: ${err.message}` });
      }
      return res.status(500).json({ error: 'An error occurred during file upload' });
    }

    next();
  });
};

module.exports = uploadMiddleware;