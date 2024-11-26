const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validators = require('../controllers/validators');
const router = express.Router();

router.post('/login', authController.handleLogin);

router.post('/signup', validators.validateUser, authController.createUser);

router.post('/logout', authController.handleLogout);

module.exports = router;