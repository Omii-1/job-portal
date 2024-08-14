const mongoose = require("mongoose")

const employerSchema = new mongoose.Schema({
  fullname:{
    type: String,
    required: true
  },
  companyname:{
    type: String,
    required: true
  },
  designation:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true,
    unique: true
  },
  hasWhatsapp:{
    type: Boolean,
    default: false
  },
  workemail:{
    type: String,
    unique: true,
    default: ""
  },
  password:{
    type: String,
    required: true
  },
  role:{
    type: String, 
    default: "employer"
  },
  profile:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmployerProfile"
  },
  jobs:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs"
    }
  ],
  appliedJobs:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AppliedJobs"
    }
  ]
},
{
  timestamps: true
})

module.exports = mongoose.model("Employer", employerSchema)