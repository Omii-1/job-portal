const jwt = require("jsonwebtoken")

const User = require("../models/user.model")
const Employer = require("../models/employer.model")

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
    let user;
    if(decode.role == "user"){
      user = await User.findById(decode.userId)
    } else if (decode.role == "employer"){
      user = await Employer.findById(decode.userId)
    }

    if(!user){
      return res.status(401).json({
        error: "Unauthorized - User not found"
      })
    }

    // RETRUN THE USER
    req.id = user._id

    next()

  }catch(err){
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}

module.exports = protectRoute