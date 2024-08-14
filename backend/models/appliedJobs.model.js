const mongoose = require("mongoose")

const appliedJobsSchema = new mongoose.Schema({
  job:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jobs"
  },
  employer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer"
  },
  user:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  status:{
    type: String,
    enum: ["review", "selected", "rejected"],
    default: "review"
  }
},{
  timestamps: true
})

module.exports = mongoose.model("AppliedJobs", appliedJobsSchema)