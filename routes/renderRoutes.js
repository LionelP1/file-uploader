const express = require('express');
const authController = require('../controllers/renderController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/login', authMiddleware.redirectIfAuthenticated, authController.getLoginPage);

router.get('/signup', authMiddleware.redirectIfAuthenticated, authController.getSignupPage);

router.get('/home', authMiddleware.isAuthenticated, authController.getHomePage);

module.exports = router;