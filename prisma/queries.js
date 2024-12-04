const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const prismaQueries = {
  createUser: async (userName, firstName, lastName, hashedPassword) => {
    return await prisma.user.create({
      data: {
        userName,
        firstName,
        lastName,
        password: hashedPassword,
      },
    });
  },

  findUserByUsername: async (userName) => {
    return await prisma.user.findUnique({
      where: {
        userName: userName,
      },
    });
  },

  findUserById: async (id) => {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  },

  createFolder: async (userId, folderName, parentId = null) => {
    return await prisma.folder.create({
      data: {
        userId,
        folderName,
        parentId,
      },
    });
  },


  getFolders: async (userId, parentId = null) => {
    return await prisma.folder.findMany({
      where: {
        userId,
        parentId,
      },
      include: {
        children: true,
      },
    });
  },

  updateFolderName: async (folderId, newFolderName) => {
    return await prisma.folder.update({
      where: { id: folderId },
      data: { folderName: newFolderName },
    });
  },

  createFile: async (userId, fileName, filePath, fileSize, folderId = null, cloudinaryPublicId) => {
    return await prisma.file.create({
      data: {
        userId,
        fileName,
        filePath,
        fileSize,
        folderId,
        cloudinaryPublicId,
      },
    });
  },


  getFolderById: async (userId, folderId) => {
    return await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId: userId,
      },
      include: {
        user: true,
      },
    });
  },

  getSubFolders: async (userId, parentFolderId = null) => {
    return await prisma.folder.findMany({
      where: {
        userId: userId,
        parentId: parentFolderId, // null for root-level folders
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  },

  getFilesInFolder: async (userId, folderId = null) => {
    return await prisma.file.findMany({
      where: {
        userId: userId,
        folderId: folderId, // null for root-level files
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  },

  getFileById: async (userId, fileId) => {
    return await prisma.file.findUnique({
      where: {
        userId: userId,
        id: fileId,
      },
    });
  },

  deleteFile: async (userId, fileId) => {
    return await prisma.file.delete({
      where: {
        userId: userId,
        id: fileId,
      },
    });
  },

  deleteFolder: async ( userId, folderID) => {
    // delete all files
    await prisma.file.deleteMany({
      where: {
        folderId: folderId,
        userId: userId,
      },
    });
  
    // delete subfolders
    const subfolders = await prisma.folder.findMany({
      where: { parentId: folderId, userId: userId },
    });
  
    for (const subfolder of subfolders) {
      await prismaQueries.deleteFolder(subfolder.id, userId);
    }
  
    // delete itself
    return await prisma.folder.deleteMany({
      where: {
        id: folderId,
        userId: userId,
      },
    });
  },
};

module.exports = prismaQueries;