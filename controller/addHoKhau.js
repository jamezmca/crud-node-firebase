const {db} = require('../config/firebase');

module.exports.addHoKhau = async (req, res) => {
  const {maho,IDchuho,sothanhvien,diachi} = req.body;
  try {
    const entry = db.collection('hokhau');
    const peopleObject = {
      maho,
      IDchuho,
      sothanhvien,
      diachi,
    };
    entry.set(peopleObject);
        res.status(200).send({
          status: 'success',
          message: 'Ho khau added, register successfully !',
          data: peopleObject,
        });
  } catch (error) {
    res.status(500).json(error.message);
  }
}