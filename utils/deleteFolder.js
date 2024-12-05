const queries = require("../prisma/queries");
const cloudinary = require('../config/cloudinary');

const deleteFolderAndContents = async (userId, folderId) => {
  try {
    const files = await queries.getFilesInFolder(userId, folderId);
    const subfolders = await queries.getSubFolders(userId, folderId);

    for (const file of files) {
      if (file.cloudinaryPublicId) {
        await cloudinary.uploader.destroy(file.cloudinaryPublicId, (error, result) => {
          if (error) {
            throw error;
          }
        });
      }
      await queries.deleteFile(userId, file.id);
    }

    for (const subfolder of subfolders) {
      await deleteFolderAndContents(userId, subfolder.id);
    }

    await queries.deleteFolder(userId, folderId);
  } catch (error) {
    throw error;
  }
};

module.exports = { deleteFolderAndContents };
