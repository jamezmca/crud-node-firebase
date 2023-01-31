const {db} = require('../config/firebase');

module.exports.deleteAccount = async (req, res) => {
  
  try {
    const response = await db.collection('account').doc(req.params.id);
    response.delete();
    res.send('Delete success!')
  } catch (error) {
    res.status(500).json(error.message);
  }
}