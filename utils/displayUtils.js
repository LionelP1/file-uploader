const queries = require('../prisma/queries');

exports.fetchFoldersAndFiles = async (userId, folderId) => {
  try {
    const folders = await queries.getFolders(userId, folderId);
    const files = await queries.getFilesInFolder(userId, folderId);

    return { folders, files };
  } catch (error) {
    throw new Error('Error fetching folders and files');
  }
};

exports.formatFoldersAndFiles = (folders, files) => {
  return [
    ...folders.map(folder => ({
      id: folder.id,
      name: folder.folderName,
      size: null,
      createdAt: folder.createdAt,
      updatedAt: folder.updatedAt,
      type: 'Folder',
    })),
    ...files.map(file => ({
      id: file.id,
      name: file.fileName,
      size: file.fileSize,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt,
      type: 'File',
    })),
  ];
};
