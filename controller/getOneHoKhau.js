const {db} = require('../config/firebase');

module.exports.getOneHoKhau = async (req, res) => {
    try {
        const obj = await db.collection('hokhau').doc(req.params.id);
        const response = await obj.get();
        return res.json(response.data());
      } catch (error) {
         return res.json(error)
      }
}

