const queries = require("../prisma/queries");
const cloudinary = require('../config/cloudinary');
const axios = require('axios');

exports.uploadFile = async (req, res, next) => {
  try {
    const uploadedFile = req.file;

    const cloudinaryPublicId = uploadedFile.filename; 
    const fileUrl = uploadedFile.path;
    const fileName = uploadedFile.originalname;
    const fileSize = uploadedFile.size;

    const userId = req.user.id;
    const folderId = req.params.folderId ? parseInt(req.params.folderId) : null;

    const newFile = await queries.createFile(userId, fileName, fileUrl, fileSize, folderId, cloudinaryPublicId);

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

    if (!file) {
      return res.status(404).json({ error: 'File not found or not authorized to delete.' });
    }

    const { folderId, cloudinaryPublicId } = file;

    const deleted = await queries.deleteFile(userId, fileId);

    if (!deleted) {
      return res.status(404).json({ error: 'File not found or not authorized to delete.' });
    }

    if (cloudinaryPublicId) {
      await cloudinary.uploader.destroy(cloudinaryPublicId, (error, result) => {
        if (error) {
          console.error('Error deleting from Cloudinary:', error);
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

exports.downloadFile = async (req, res, next) => {
  const fileId = parseInt(req.params.fileId);
  const userId = req.user.id;

  try {
    const file = await queries.getFileById(userId, fileId);

    if (!file) {
      return res.status(404).json({ error: 'File not found or unauthorized.' });
    }

    const signedUrl = cloudinary.url(file.cloudinaryPublicId, {
      secure: true,
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + 60 * 10,
    });

    const response = await axios.get(signedUrl, { responseType: 'arraybuffer' });

    res.setHeader('Content-Disposition', `attachment; filename="${file.fileName}"`);
    res.setHeader('Content-Type', response.headers['content-type']);

    res.send(response.data);

  } catch (error) {
    res.status(500).json({ error: 'Error processing your request.' });
  }
};