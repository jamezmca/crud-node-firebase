const {db} = require('../config/firebase');

module.exports.updateChiPhi = async (req, res) => {
  const {chiphi} = req.body;
  try {
    const peopleObject = {
       chiphi
      };
    const response = await db.collection('chiphi').doc(req.params.id);
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