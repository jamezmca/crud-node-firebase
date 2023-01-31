const jwt = require('jsonwebtoken')

module.exports.check = (req, res, next) =>
{
    try {
        var token = req.cookies.token
        console.log(token)
        var kq = jwt.verify(token,"SUPER_SERRECT_KEY")
        console.log("JWT Token:", kq)
        if (kq != undefined) {
            next()
        }
    } catch (error) {
        console.log("Chua dang nhap !")
        res.redirect('/login')
    }   
}