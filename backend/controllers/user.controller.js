const bcrypt = require('bcryptjs');

const User = require("../models/user.model")

const { userSignupBody, userSigninBody, userUpdatedBody } = require("../helper/user.validation")
const {generateTokenAndSetCookies} = require("../utils/generateTokens")

// user signup
const userSignUp = async (req, res) => {
    try{
      // validate request body
      const validationResult = userSignupBody.safeParse(req.body)
      
      if(!validationResult.success){
       // return validation error in desired format
        return res.status(411).json({
          error: validationResult.error.errors.map(
            err => err.message
          ). join(",")
        })
      } 

      const {fullname, email, password, confirmPassword, phone, hasWhatsapp} = validationResult.data

      // check password match 
      if(password != confirmPassword){
        return res.status(411).json({
          error: "Password don't match"
        })
      }

      // check username already present in db or not
      const existingUser = await User.findOne({email})
      if(existingUser){
        return res.status(411).json({
          error: "User alredy exist"
        })
      }

      // hash password
      const salt = await bcrypt.genSalt(10)
      const hashpass = await bcrypt.hash(password, salt)

      // create new user
      const newUser = new User({
        fullname,
        email,
        password: hashpass,
        phone,
        hasWhatsapp
      })

      
      // save user to database
      await newUser.save()

      // generate token and set cookies
      generateTokenAndSetCookies(newUser._id, res)

      // return success response
      return res.status(200).json({
        message: "User Created Successfully",
        _id : newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role
      })
      

    }catch(err){
      console.log("error in userSignupController: ", err.message);
      return res.status(500).json({error: err.message})
    }
}

// user signin
const userSignIn = async (req, res) => {
  try{
    const validationResult = userSigninBody.safeParse(req.body)

    if(!validationResult.success){
      return res.status(400).json({
        error: validationResult.error.errors.map(
          err => err.message
        ).join(", ")
      })
    }

    const {email, password} = validationResult.data

    const existingUser = await User.findOne({email})
    const checkPassword = await bcrypt.compare(password, existingUser?.password || "")

    if(!existingUser || !checkPassword){
      return res.status(400).json({
        error: "Invalid Email and Password"
      })
    }

    generateTokenAndSetCookies(existingUser._id, res)

    return res.status(200).json({
      message: "User logged in Successfully",
      _id : existingUser._id,
      fullname: existingUser.fullname,
      email: existingUser.email,
      role: existingUser.role
    })

  }catch(err){
    console.log("error in user signin controller", err.message)
    return res.status(500).json({ error: err.message})
  }
}

// user logout
const userLogout = async (req, res) => {
  try{
    res.cookie("jwt", "", {maxAge: 0})
    return res.status(201).json({
      message: "User logged out successfully"
    })
  }catch(err){
    console.log("Error in user logout controller", err.message)
    return res.status(500).json({
      error: "Internal server errror"
    })
  }
}

// get user-details
const userDetails = async (req, res) => {
  try{

    const user = req.user

    if(!user){
      return res.status(400).json({
        error: "User is not exist"
      })
    }

    const userData = await User.findById(user._id).select("-password")

    return res.status(200).json({
      userInfo: userData
    })
  } catch(err){
    console.log("Error in get user details controller", err.message);
    return res.status(500).json({
      error: "Internal server error"
    })
  }
}

// change fullname, password, hasWhatsapp, phone
const userUpdate = async(req, res) => {
  try{

    const validationResult = userUpdatedBody.safeParse(req.body)

    if(!validationResult.success){
      return res.status(411).json({
        error: validationResult.error.errors.map(
          err => err.message
        ).join(", ")
      })
    }

    const {fullname, oldPassword, newPassword, confirmNewPassword, phone} = validationResult.data

    
    const user = req.user
    
    const prevPassword = await bcrypt.compare(oldPassword, user.password)
    
    
    if(!prevPassword){
      return res.status(400).json({
        error: "Password is not correct" 
      })
    }
    
    if(newPassword !== confirmNewPassword){
      return res.status(400).json({
        error: "Password don't match"
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashpass = await bcrypt.hash(newPassword, salt)

    await User.findByIdAndUpdate(user._id, {
      fullname: fullname,
      password: hashpass,
      phone: phone
    })

    return res.status(200).json({
      message: "Details updated successfully",
      id: user._id,
      fullname: user.fullname,
      phone: user.phone
    })

  } catch(err){
    console.log("Error in user update controller", err.message);
    return res.status(500).json({
      message: "Internal server error"
    })   
  }
}


module.exports = {
  userSignUp,
  userSignIn,
  userLogout,
  userDetails,
  userUpdate
}