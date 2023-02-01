const {db} = require('../config/firebase');

module.exports.getOneNhanKhau = async (req, res) => {
    try {
        const obj = await db.collection('nhankhau').doc(req.params.id);
        const response = await obj.get();
        return res.json(response.data());
      } catch (error) {
         return res.json(error)
      }
}
