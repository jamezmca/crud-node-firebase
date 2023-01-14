const {db} = require('../config/firebase');

module.exports.addAccount = async (req, res) => {
  const {username, password, fullname} = req.body;
  try {
    const entry = db.collection('people').doc();
    const peopleObject = {
      id: entry.id,
      username,
      password,
      fullname
    };

    entry.set(peopleObject);

    res.status(200).send({
      status: 'success',
      message: 'account added successfully',
      data: peopleObject,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}
