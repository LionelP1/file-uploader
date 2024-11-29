const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create-folder/:folderId?', authMiddleware.isAuthenticated, folderController.createFolder);
module.exports = router;
