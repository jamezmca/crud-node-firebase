const {db} = require('../config/firebase');

module.exports.updateAccount = async (req, res) => {
  const {fullname,password,username} = req.body;
  try {
    const peopleObject = {
       fullname,
       password,
       username
      };
    const response = await db.collection('account').doc(req.params.id);
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