const { validationResult } = require('express-validator');
const prismaQueries = require('../queries');

exports.getLoginPage = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.render('auth/login', {
    errors: [],
    data: {}
  });
};

// Render the signup page
exports.getSignupPage = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.render('auth/signup', {
    errors: [],
    data: {}
  });
};