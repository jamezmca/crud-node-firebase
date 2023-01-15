const {db} = require('../config/firebase');

module.exports.addAccount = async (req, res) => {
  const {username, password, fullname} = req.body;
  try {
    const entry = db.collection('account').doc();
    const peopleObject = {
      id: entry.id,
      username,
      password,
      fullname
    };
    db.collection('account')
    .where("username", "==", peopleObject.username)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size != 0) {
        res.send("Account's username already exits, please change different username !")
      }
      else {
        entry.set(peopleObject);
        res.status(200).send({
          status: 'success',
          message: 'Account added, register successfully !',
          data: peopleObject,
        });
      }
    })
  } catch (error) {
    res.status(500).json(error.message);
  }
}
