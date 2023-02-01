const {db} = require('../config/firebase');

module.exports.updateNhanKhau = async (req, res) => {
  const {name,chuHo,phone,maho,date,age,gender,identify,address,status} = req.body;
  try {
    const peopleObject = {
      name,
      chuHo,
      age,
      phone,
      maho,
      date,
      gender,
      identify,
      address,
      status
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