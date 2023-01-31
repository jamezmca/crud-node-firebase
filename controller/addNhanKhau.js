const {db} = require('../config/firebase');

module.exports.addNhanKhau = async (req, res) => {
  const {id,cmnd,fullname,age,phone,maho} = req.body;
  try {
    const id=req.body.id
    const peopleObject = {
      id,
      cmnd,
      fullname,
      age,
      phone,
      maho
    };
    const entry = db.collection('nhankhau').doc(id);
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