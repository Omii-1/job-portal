const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateTokenAndSetCookies = (userId, role, res) => {
  const token = jwt.sign({userId, role}, process.env.JWT_SECRET,{
    expiresIn: "15d"
  })

  res.cookie("jwt", token,{
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    samesite: "strict",
    secure: process.env.NODE_ENV !== "development"
  })
}

module.exports = {generateTokenAndSetCookies}