const mongoose = require("mongoose")

const employerProfileSchema = new mongoose.Schema({
  employer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer"
  },
  linkedin:{
    type: String,
    required: true
  },
  websiteLink:{
    type: String
  },
  noOfEmployee: {
    type: String
  },
  locationOfHeadquators: {
    type: String,
    required: true
  },
  industryType:{
    type: String,
    required: true
  },
  companyType: {
    type: String,
    required: true
  },
  aboutCompany: {
    type: String,
    required: true
  },
  comapnyLogo: {
    type: String
  },
  ComapnyTagline: {
    type: String
  },
  twiiter:{
    type: String
  }
},{
  timestamps: true
})

module.exports = mongoose.model("EmployerProfile", employerProfileSchema)