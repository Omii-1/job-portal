const mongoose = required("mongoose")

const jobsSchema = new mongoose.Schema({
  employer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
    require: true
  },
  type:{
    type: String,
    enum:["internship", "job"], 
    required: true
  },
  title:{
    type: String,
    required: true
  },
  mandatorySkills: [
    {
      type: String,
      required: true
    }
  ],
  optionalSkills: [
    {
      type: String
    }
  ],
  duration:{
    type: String,
    required: true
  },
  joiningDate: {
    type: Date,
    required: true
  },
  immediateJoiner:{
    type: Boolean,
    default: false
  },
  mode:{
    type: String,
    enum: ["part", "semi", "full"],
    required: true
  },
  salaryType:{
    type: String,
    enum: ["lpa", "rs"],
    default: "lpa"
  },
  salaryStart:{
    type: Number,
    required: true
  },
  salaryEnd:{
    type: Number,
    required: true,
  },
  officeType:{
    type: String,
    enum: ["remote", "office", "hybrid"],
    required: true
  },
  positions:{
    type: Number,
    required: true
  },
  experience:{
    type: Number,
    required: true
  },
  benefits:[
    {
      type: String
    }
  ],
  description:{
    type: String,
    required: true
  }
},{
  timestamps: true
})

module.exports = mongoose.model("Jobs", jobsSchema)