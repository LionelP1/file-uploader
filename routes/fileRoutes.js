const express = require('express');
const upload = require('../config/multerConfig');
const fileController = require('../controllers/fileControllers');
const authMiddleware = require('../middleware/authMiddleware');
const fileValidationMiddleware = require('../middleware/fileValidationMiddleware');


const router = express.Router();

router.post('/upload/:folderId?', 
  authMiddleware.isAuthenticated,
  fileValidationMiddleware,
  upload.single('file'),
  fileController.uploadFile
);

module.exports = router;