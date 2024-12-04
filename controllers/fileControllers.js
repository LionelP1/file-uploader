const queries = require("../prisma/queries");

exports.uploadFile = async (req, res, next) => {
  try {
    const uploadedFile = req.file;

    const fileUrl = uploadedFile.path;
    const fileName = uploadedFile.originalname;
    const fileSize = uploadedFile.size;

    const userId = req.user.id;
    const folderId = req.params.folderId ? parseInt(req.params.folderId) : null;

    const newFile = await queries.createFile(userId, fileName, fileUrl, fileSize, folderId);

    if (folderId) {
      return res.redirect(`/homepage/${folderId}`);
    } else {
      return res.redirect('/homepage');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during the file upload' });
  }
};

exports.deleteFile = async (req, res) => {
  const fileId = parseInt(req.params.fileId);
  const userId = req.user.id;

  try {
    const file = await queries.getFileById(fileId, userId); 
    const folderId = file.folderId;

    const deleted = await queries.deleteFile(fileId, userId);

    if (!deleted.count) {
      return res.status(404).json({ error: 'File not found or not authorized to delete.' });
    }



    if (parentFolderId) {
      res.redirect(`/homepage/${folderId}`);
    } else {
      res.redirect('/homepage');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the file.' });
  }
};