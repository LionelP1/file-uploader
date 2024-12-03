const express = require('express');
const upload = require('../config/multerConfig');
const fileController = require('../controllers/fileControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create-file/:folderId?',
  authMiddleware.isAuthenticated,
  (req, res, next) => {
    upload(req, res, (err) => {
      const folderId = req.params.folderId ? parseInt(req.params.folderId) : null;

      if (req.fileValidationError) {
        return res.render('file/fileForm', {
          folderId: folderId,
          error: 'Invalid file type',
        });
      }

      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.render('file/fileForm', {
            folderId: folderId,
            error: `File size exceeds the limit`,
          });
        }

        return res.render('file/fileForm', {
          folderId: folderId,
          error: 'An unexpected error occurred during file upload.',
        });
      }

      next();
    });
  },
  fileController.uploadFile
);

module.exports = router;