const { async } = require('@firebase/util');
const {db} = require('../config/firebase');
const jwt = require('jsonwebtoken')

module.exports.login = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    db.collection('account')
    .where("username", "==", username)
    .where("password", "==", password)
    .get()
    .then((querySnapshot) => {
        // querySnapshot.forEach((doc) => all_match.push(doc.data()))
        querySnapshot.forEach((doc) => {
            all_match = doc.data()
        })
        if (querySnapshot.size!=0) {
            const token = jwt.sign(all_match.id, "SUPER_SERRECT_KEY")
            res.cookie('token', token)
            res.status(200).send({
                message: "Login successfully !",
                token: token,
                data: all_match})
            console.log("Login successfully")
        }
        else {
            res.send("Account not exist, please register or login again !")
            console.log("Login fail !")
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
        res.status(500).send(error)
    })
}
