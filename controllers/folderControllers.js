const queries = require("../prisma/queries");

exports.createFolder = async (req, res) => {
  try {
    const { folderName } = req.body;

    const userId = req.user.id;

    const folderId = req.params.folderId ? parseInt(req.params.folderId) : null;

    const newFolder = await queries.createFolder(userId, folderName, folderId);
    
    if (folderId) {
      return res.redirect(`/homepage/${folderId}`);
    } else {
      return res.redirect('/homepage');
    }


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while creating the folder.' });
  }
};
