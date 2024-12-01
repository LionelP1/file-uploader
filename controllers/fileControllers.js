const queries = require("../prisma/queries");

exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const uploadedFile = req.file;

    const fileUrl = uploadedFile.path;
    const fileName = uploadedFile.originalname;
    const fileSize = uploadedFile.size;

    const userId = req.user.id;
    const folderId = req.body.folderId || null;

    const newFile = await queries.createFile(userId, fileName, fileUrl, fileSize, folderId);

    res.status(201).json({
      message: 'File uploaded successfully',
      fileUrl: fileUrl,
      fileName: fileName,
      fileSize: fileSize,
      fileId: newFile.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during the file upload' });
  }
};