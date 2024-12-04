const queries = require("../prisma/queries");
const cloudinary = require('../config/cloudinary');

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
    const file = await queries.getFileById(userId, fileId); 
    const folderId = file.folderId;

    if (!file) {
      return res.status(404).json({ error: 'File not found or not authorized to delete.' });
    }

    console.log(userId);
    console.log(fileId);

    const deleted = await queries.deleteFile(userId, fileId);

    if (!deleted) {
      return res.status(404).json({ error: 'File not found or not authorized to delete.' });
    }

    if (cloudinaryPublicId) {
      cloudinary.uploader.destroy(cloudinaryPublicId, (error, result) => {
        if (error) {
          console.error('Error deleting from Cloudinary:', error);
        } else {
          console.log('Deleted from Cloudinary:', result);
        }
      });
    }


    if (folderId) {
      res.redirect(`/homepage/${folderId}`);
    } else {
      res.redirect('/homepage');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the file.' });
  }
};