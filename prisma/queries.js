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


  deleteFolder: async (folderId) => {
    //How to handle the files and other 
    //folders within that folder
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

  createFile: async (userId, fileName, filePath, fileSize, folderId = null) => {
    return await prisma.file.create({
      data: {
        userId,
        fileName,
        filePath,
        fileSize,
        folderId,
      },
    });
  },


  deleteFile: async (fileId) => {
    return await prisma.file.delete({
      where: { id: fileId },
    });
  },


  getFolderById: async (folderId, userId) => {
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

};

module.exports = prismaQueries;