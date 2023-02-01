const {db} = require('../config/firebase');

module.exports.getOneChiPhi = async (req, res) => {
    try {
        const obj = await db.collection('chiphi').doc(req.params.id);
        const response = await obj.get();
        return res.json(response.data());
      } catch (error) {
         return res.json(error)
      }
}