const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');
const authMiddleware = require('../path/to/authMiddleware');

router.post('/folders/:parentFolderId?/create-folder', authMiddleware.isAuthenticated, folderController.createFolder);

module.exports = router;
