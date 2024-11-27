const express = require('express');
const renderController = require('../controllers/renderControllers');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', renderController.getWelcomePage);

router.get('/login', authMiddleware.redirectIfAuthenticated, renderController.getLoginPage);

router.get('/signup', authMiddleware.redirectIfAuthenticated, renderController.getSignupPage);

router.get('/homepage', authMiddleware.isAuthenticated, renderController.getHomePage);

module.exports = router;