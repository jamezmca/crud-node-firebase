const {db} = require('../config/firebase');

module.exports.addHoKhau = async (req, res) => {
  const {IDchuho,maho,sothanhvien,diachi} = req.body;
  try {
    const entry = db.collection('hokhau').doc();
    const peopleObject = {
      id :entry.id,
      IDchuho,
      maho,
      sothanhvien,
      diachi

    };
      
      entry.set(peopleObject);
        res.status(200).send({
          status: 'success',
          message: 'HoKhau added, register successfully !',
          data: peopleObject,
        });
  } catch (error) {
    res.status(500).json(error.message);
  }
}