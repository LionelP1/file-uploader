const queries = require("../prisma/queries");
const deleteFolder = require("../utils/deleteFolder");

exports.createFolder = async (req, res) => {
  try {
    const { folderName } = req.body;

    const userId = req.user.id;

    const folderId = req.params.folderId ? parseInt(req.params.folderId) : null;

    const newFolder = await queries.createFolder(userId, folderName, folderId);
    
    if (folderId) {
      return res.redirect(`/homepage/${folderId}`);
    } else {
      return res.redirect('/homepage');
    }


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while creating the folder.' });
  }
};

exports.deleteFolder = async (req, res) => {
  const folderId = parseInt(req.params.folderId);
  const userId = req.user.id;

  try {
    const folder = await queries.getFolderById(userId, folderId);
    const parentFolderId = folder.parentFolderId;

    await deleteFolder.deleteFolderAndContents(userId, folderId);

    if (parentFolderId) {
      res.redirect(`/homepage/${parentFolderId}`);
    } else {
      res.redirect('/homepage');
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the folder.' });
  }
};