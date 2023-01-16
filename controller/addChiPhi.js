const {db} = require('../config/firebase');

module.exports.addChiPhi = async (req, res) => {
  const {fullname,chiphi} = req.body;
  try {
    const entry = db.collection('chiphi').doc();
    const peopleObject = {
      fullname,
      chiphi
    };
    entry.set(peopleObject);
        res.status(200).send({
          status: 'success',
          message: 'Chi phi added, register successfully !',
          data: peopleObject,
        });
  } catch (error) {
    res.status(500).json(error.message);
  }
}
