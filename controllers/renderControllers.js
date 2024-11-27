const { validationResult } = require('express-validator');
const prismaQueries = require('../prisma/queries');

exports.getWelcomePage = (req, res) => {
  res.render('welcomePage');
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

exports.getHomePage = async (req, res) => {
  res.render("homepage");
};

exports.getCreateFolderForm = (req, res) => {
  res.render('folder/folderForm');
};