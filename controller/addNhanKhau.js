const {db} = require('../config/firebase');

module.exports.addNhanKhau = async (req, res) => {
  const {cmnd,fullname,age,phone,maho} = req.body;
  try {
    const entry = db.collection('nhankhau').doc();
    const peopleObject = {
      id: entry.id,
      cmnd,
      fullname,
      age,
      phone,
      maho
    };
    entry.set(peopleObject);
        res.status(200).send({
          status: 'success',
          message: 'Nhan khau added, register successfully !',
          data: peopleObject,
        });
  } catch (error) {
    res.status(500).json(error.message);
  }
}