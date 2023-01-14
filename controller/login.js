const { async } = require('@firebase/util');
const {db} = require('../config/firebase');

module.exports.login = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const all_match = []
    const entry = await db.collection('account').where("username", "==", username).get()
    console.log(entry)
    entry.forEach( (doc) => all_match.push(doc.data()));
    return res.status(200).send("User data: ",all_match)
}
