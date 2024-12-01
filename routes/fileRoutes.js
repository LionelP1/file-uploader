const express = require('express');
const upload = require('../config/multerConfig');
const fileController = require('../controllers/fileControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/upload/:folderId?', authMiddleware.isAuthenticated, upload.single('file'), fileController.uploadFile);

module.exports = router;