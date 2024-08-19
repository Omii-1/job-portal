const bcrypt = require("bcryptjs")

const Employer = require("../models/employer.model")

const { employerSignupBody, employerSigninBody, employerUpdateBody } = require("../helper/employer.validation")
const {generateTokenAndSetCookies} = require("../utils/generateTokens")

// employer signup
const employerSignup = async (req, res) => {
  try{
    const validationResult = employerSignupBody.safeParse(req.body)

    if(!validationResult.success){
      return res.status(400).json({
        error: validationResult.error.errors.map(
          err => err.message
        ).join(", ")
      })
    }

    const {fullname, companyname, designation, phone, hasWhatsapp, email, password, confirmPassword } = validationResult.data

    if(password !== confirmPassword){
      return res.status(400).json({
        error: "Password don't match"
      })
    }

    const existingUser = await Employer.findOne({email})
    
    if(existingUser){
      return res.status(400).json({
        error: "Employer already exist"
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashpass = await bcrypt.hash(password, salt)

    const newEmployer = new Employer({
      fullname, 
      companyname, 
      designation, 
      phone, 
      hasWhatsapp, 
      email, 
      password: hashpass
    })

    await newEmployer.save()

    generateTokenAndSetCookies(newEmployer._id, newEmployer.role, res)

    return res.status(200).json({
      message: "Employer created Successfully",
      id: newEmployer._id,
      fullname: newEmployer.fullname,
      companyname: newEmployer.companyname,
      email: newEmployer.email,
      role: newEmployer.role
    })

  }catch(err){
    console.log("Error found in employer signup controller", err.message);
    return res.status(500).json({
      error: "Internal server error"
    })   
  }
}

// employer signin
const employerSignin =  async(req, res) => {
  try{
    const validationResult = employerSigninBody.safeParse(req.body)

    if(!validationResult.success){
      return res.status(400).json({
        error: validationResult.error.errors.map(
          err => err.message
        ).join(", ")
      })
    }

    const { email, password} = validationResult.data

    const existingUser = await Employer.findOne({ email })

    const checkPassword = await bcrypt.compare(password, existingUser?.password || "")

    if(!existingUser || !checkPassword){
      return res.status(400).json({
        error: "Invalid email and password"
      })
    }

    generateTokenAndSetCookies(existingUser._id, existingUser.role, res)

    return res.status(200).json({
      message: "employer logged successfully",
      id: existingUser._id,
      fullname: existingUser.fullname,
      role: existingUser.role
    })
  }catch(err){
    console.log("Error found in employer signin controller", err.message);
    return res.status(500).json({
      error: "internal server error"
    })   
  }
}

// employer logout
const employerLogout = async(req, res) => {
  try{
    res.cookie("jwt", "", {maxAge:0})

    return res.status(200).json({
      message: "Employer logged out successfully"
    })
  } catch(err){
    console.log("Error in employer logout controller", err.message);
    return res.status(500).json({
      error: "Internal server error"
    })   
  }
}

// employer get details
const employerDetails = async(req, res) => {
  try{
    const employer = await Employer.findById(req.id)

    if (!employer){
      return res.status(400).json({
        error: "Employer not found"
      })
    }

    const employerData = await Employer.findById(employer._id).select("-password")

    return res.status(200).json({
      employeriInfo: employerData
    })
  }catch(err){
    console.log("error in employer get details controller", err.message);
    return res.status(500).json({
      error: "Internal server error"
    })
  }
}

// employer update details
const employerUpdate = async(req, res) => {
  try{
    const validationResult = employerUpdateBody.safeParse(req.body)

    if(!validationResult.success){
      return res.status(400).json({
        error: validationResult.error.errors.map(
          err => err.message
        ).join(", ")
      })
    }

    const {fullname, companyname, designation, phone, oldPassword, password, confirmPassword} = validationResult.data

    const employer = await Employer.findById(req.id)

    if(!employer){
      return re.status(400).json({
        error: "Employer not found."
      })
    }

    const prevPassword = await bcrypt.compare(oldPassword, employer.password)

    if(!prevPassword){
      return res.status(400).json({
        error:"old password is incorrect"
      })
    }

    if(password !== confirmPassword){
      return res.status(400).json({
        error: "Password don't match"
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    await Employer.findByIdAndUpdate(employer._id, {
      fullname: fullname,
      companyname: companyname,
      designation: designation,
      phone: phone,
      password: hashPassword
    })

    return res.status(200).json({
      message: "employer updated successfully",
    })

  }catch(err){
    console.log("Error in update employer controller", err.message);
    return res.status(500).json({
      error: "Internal server error"
    })
  }
}

module.exports = {
  employerSignup,
  employerSignin,
  employerLogout,
  employerDetails,
  employerUpdate
}