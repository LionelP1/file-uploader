const { SUPPORTED_FILE_TYPES, MAX_SIZE } = require('../config/fileTypes');

const fileValidationMiddleware = (req, res, next) => {
  const uploadedFile = req.file;
  const folderId = req.params.folderId ? parseInt(req.params.folderId) : null;

  if (!uploadedFile) {
    return res.render('fileForm', {
      folderId: folderId,
      error: 'No file selected. Please choose a file to upload.',
    });
  }

  if (!SUPPORTED_FILE_TYPES.includes(uploadedFile.mimetype)) {
    return res.render('fileForm', {
      folderId: folderId,
      error: 'Invalid file type. Only supported types are: ' + SUPPORTED_FILE_TYPES.join(', '),
    });
  }

  if (uploadedFile.size > MAX_SIZE) {
    return res.render('fileForm', {
      folderId: folderId,
      error: `File size exceeds the maximum allowed limit of ${MAX_SIZE / (1024 * 1024)} MB.`,
    });
  }
  next();
};

module.exports = fileValidationMiddleware;