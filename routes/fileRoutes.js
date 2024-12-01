const express = require('express');
const upload = require('../middleware/multer');
const fileController = require('../controllers/fileControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/upload', authMiddleware.isAuthenticated, upload.single('file'), fileController.uploadFile);

module.exports = router;