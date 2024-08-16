const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const protectRoute = async(req, res, next) => {
  try{
    // get token from cookies
    const token = req.cookies.jwt

    // check token is present or not
    if(!token){
      return res.status(401).json({
        error:"Unauthorized - No token provided"
      })
    }

    // check token is valid or not
    const decode = jwt.verify(token, process.env.JWT_SECRET)

    if(!decode){
      return res.status(401).json({
        error: "Unauthorized - Invalid token"
      })
    }

    // get users data from decoded userID
    const user = await User.findById(decode.userId)

    if(!user){
      return res.status(401).json({
        error: "Unauthorized - User not found"
      })
    }

    // RETRUN THE USER
    req.user = user

    next()

  }catch(err){
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}

module.exports = protectRoute