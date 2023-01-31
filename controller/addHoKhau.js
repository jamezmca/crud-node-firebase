const {db} = require('../config/firebase');

module.exports.addHoKhau = async (req, res) => {
  const {IDchuho,maho,sothanhvien,diachi} = req.body;
  try {
    const id = req.body.IDchuho;
    
    const peopleObject = {
      IDchuho,
      maho,
      sothanhvien,
      diachi,
    }
    const entry = db.collection('hokhau').doc(id);
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