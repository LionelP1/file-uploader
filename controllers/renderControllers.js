const { validationResult } = require('express-validator');
const prismaQueries = require('../queries');

exports.getHomePage = (req, res) => {
  res.render('homepage');
};


exports.getLoginPage = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.render('auth/login', {
    errors: [],
    data: {}
  });
};

exports.getSignupPage = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.render('auth/signup', {
    errors: [],
    data: {}
  });
};

exports.getHomePage = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.render('auth/signup', {
    errors: [],
    data: {}
  });
};