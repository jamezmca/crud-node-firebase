const jwt = require('jsonwebtoken')

module.exports.logout = (req, res, next) => 
{
  // console.log("Right here!")
  try {
    console.log("Clearing token")
    res.clearCookie("token")
    res.status(200).json("Logout sucessfully!")
    res.end()
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

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
        console.log("Chua dang nhap")
        res.redirect('/login')
    }   
}
