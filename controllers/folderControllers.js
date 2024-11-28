const prisma = require("../prisma/queries");

exports.createFolder = async (req, res) => {
  try {
    const { folderName } = req.body;
    const { userId } = req.user;
    const parentFolderId = req.params.parentFolderId ? parseInt(req.params.parentFolderId) : null;
    
    const newFolder = await prismaQueries.createFolder(userId, folderName, parentFolderId);

    return res.status(201).json(newFolder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while creating the folder.' });
  }
};
