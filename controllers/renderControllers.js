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

    let folder = folderId ? await queries.getFolderById(folderId, userId) : null;

    if (folderId && !folder) {
      return res.status(404).redirect('/homepage');
    }

    const parentFolder = folder?.parentId
    ? await queries.getFolderById(folder.parentId, userId)
    : null;

    const { folders, files } = await utilities.fetchFoldersAndFiles(userId, folderId);
    const filesAndFolders = utilities.formatFoldersAndFiles(folders, files);

    return res.render('homepage', {
      folder: folder,
      filesAndFolders: filesAndFolders,
      parentFolder: parentFolder,
    });

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

exports.getCreateFileForm = (req, res) => {
  try {
    const folderId = req.params.folderId || null;

    res.render('file/fileForm', { folderId, error:''});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while rendering the file upload form.' });
  }
};

exports.getFileInfoPage = async (req, res) => {
  const fileId = parseInt(req.params.fileId, 10);
  const userId = req.user.id;

  try {
    const file = await queries.getFileById(userId, fileId);

    if (!file) {
      return res.status(404).redirect('/homepage');
    }

    res.render('file/fileInfo', { 
      file: {
        id: file.id,
        fileName: file.fileName,
        fileSize: file.fileSize,
        createdAt: file.createdAt,
        updatedAt: file.updatedAt,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};