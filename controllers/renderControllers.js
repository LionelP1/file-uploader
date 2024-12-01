const { validationResult } = require('express-validator');
const queries = require('../prisma/queries');
const utilities = require('../utils/displayUtils');

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

    const { folders, files } = await utilities.fetchFoldersAndFiles(userId, folderId);

    const filesAndFolders = utilities.formatFoldersAndFiles(folders, files);

    res.render('homepage', { folderId, filesAndFolders });
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

exports.getFileUploadForm = (req, res) => {
  try {
    const folderId = req.params.folderId || null;

    res.render('file/fileForm', { folderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while rendering the file upload form.' });
  }
};