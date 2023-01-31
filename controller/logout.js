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
}
