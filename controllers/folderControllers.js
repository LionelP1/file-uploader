const queries = require("../prisma/queries");

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
  const folderId = parseInt(req.params.folderId, 10);
  const userId = req.user.id;

  try {
    const deleted = await queries.deleteFolder(folderId, userId);

    if (!deleted.count) {
      return res.status(404).json({ error: 'Folder not found or not authorized to delete.' });
    }

    const folder = await queries.getFolderById(folderId, userId);

    const parentFolderId = folder.parentId;

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

