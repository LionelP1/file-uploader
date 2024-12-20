const express = require('express');
const renderController = require('../controllers/renderControllers');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware.redirectIfAuthenticated, renderController.getWelcomePage);

router.get('/login', authMiddleware.redirectIfAuthenticated, renderController.getLoginPage);

router.get('/signup', authMiddleware.redirectIfAuthenticated, renderController.getSignupPage);

router.get('/homepage/:folderId?', authMiddleware.isAuthenticated, renderController.getHomePage);

router.get('/create-folder/:folderId?', authMiddleware.isAuthenticated, renderController.getCreateFolderForm);

router.get('/create-file/:folderId?', authMiddleware.isAuthenticated, renderController.getCreateFileForm);

router.get('/file-info/:fileId', authMiddleware.isAuthenticated, renderController.getFileInfoPage);

module.exports = router;