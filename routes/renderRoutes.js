const express = require('express');
const renderController = require('../controllers/renderController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', renderController.getWelcomePage);

router.get('/login', renderController.redirectIfAuthenticated, authController.getLoginPage);

router.get('/signup', renderController.redirectIfAuthenticated, authController.getSignupPage);

router.get('/home', renderController.isAuthenticated, authController.getHomePage);

module.exports = router;