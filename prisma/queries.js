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
    const existingFolder = await prisma.folder.findFirst({
      where: {
        userId,
        folderName,
        parentId,
      },
    });

    if (existingFolder) {
      throw new Error("A folder with this name already exists in the specified location.");
    }

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
  },

  deleteFile: async (fileId) => {
    return await prisma.file.delete({
      where: { id: fileId },
    });
  },

  getFolderById: async (folderId) => {
    return await prisma.folder.findUnique({
      where: { id: folderId },
      include: {
        parent: true,
        children: true,
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
        createdAt: 'asc',
      },
    });
  },

};

module.exports = prismaQueries;