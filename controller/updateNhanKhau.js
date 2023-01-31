const {db} = require('../config/firebase');

module.exports.updateNhanKhau = async (req, res) => {
  const {cmnd,fullname,age,phone,maho} = req.body;
  try {
    const peopleObject = {
        cmnd,
        fullname,
        age,
        phone,
        maho
      };
    const response = await db.collection('nhankhau').doc(req.params.id);
    response.set(peopleObject,{merge:true});
    res.status(200).send({
        status: 'success',
        message: 'Update success !',
        data: peopleObject,
      });
  } catch (error) {
    res.status(500).json(error.message);
  }
}