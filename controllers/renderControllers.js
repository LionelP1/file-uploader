const { validationResult } = require('express-validator');
const queries = require('../prisma/queries');

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
  try {
    const folderId = req.params.folderId ? parseInt(req.params.folderId) : null;
    const userId = req.user.id;

    if (folderId) {
      const folder = await queries.getFolderById(folderId, userId);

      if (!folder) {
        return res.status(404).redirect('/homepage');
      }
    }

    res.render('homepage', { folderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching folder details.' });
  }
};

exports.getCreateFolderForm = (req, res) => {
  try {
    const folderId = req.params.folderId || null;

    res.render('folder/folderForm', { folderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while rendering the create folder form.' });
  }
};