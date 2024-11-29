const queries = require("../prisma/queries");

exports.createFolder = async (req, res) => {
  try {
    const { folderName } = req.body;
    
    const userId = req.user.id;

    const parentFolderId = req.params.parentFolderId ? parseInt(req.params.parentFolderId) : null;
    
    const newFolder = await queries.createFolder(userId, folderName, parentFolderId);
    
    if (parentFolderId) {
      return res.redirect(`/homepage/${parentFolderId}`);
    } else {
      return res.redirect('/homepage');
    }


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while creating the folder.' });
  }
};
