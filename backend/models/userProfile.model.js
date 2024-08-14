const mongoose = require("mongoose")

const userProfileSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  domain:[
    {
      type: String,
      default: ""
    }
  ],
  graduationYear:{
    type: String,
    default: ""
  },
  githubLink:{
    type: String,
    default: ""
  },
  linkedinLink:{
    type: String,
    default: ""
  },
  state:{
    type: String,
    default: ""
  },
  education:[
    {
      mode:{
        type: String,
        enum:["college", "school"],
        required: true
      },
      schoolname:{
        type: String,
        required: true
      },
      class:{
        type: String,
        enum:["10th", "12th", "Diploma", "Undergraduate", "Postgraduate"],
        required: true
      },
      passingYear:{
        type: String,
        required: true
      },
      gpa:{
        type: String,
        required: true
      },
      universityName:{
        type: String,
        required: true
      },
      fieldOfStudy:{
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      startYear:{
        type: String,
        required: true
      },
      endYear:{
        type: String,
        required: true
      }
    }
  ],
  projects:[
    {
      title:{
        type: String,
        required: true
      },
      description:{
        type: String,
        required: true
      },
      projectLinks:[
        {
          type:{
            type: String,
            enum:["video", "repository", "certificate", "deployed"]
          },
          url:{
            type: String,
            validate: {
              validator: function (v) {
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
              },
              message: (props) => `${props.value} is not a valid URL!`,
            },
          }
        }
      ],
      skills:[
        {type: String}
      ]
    }
  ],
  workExperience:[
    {
      mode:{
        type: String,
        enum: ["job", "internship"],
        required: true
      },
      companyName:{
        type: String,
        required: true
      },
      jobType:{
        type: String,
        enum:["part", "semi", "full"],
        required: true
      },
      companyWebsite:{
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
          },
          message: (props) => `${props.value} is not a valid URL!`,
        },
      },
      title:{
        type: String,
        required: true
      },
      location:{
        type: String,
        required: true
      },
      hasRemote:{
        type: Boolean,
        default: false
      },
      startDate:{
        type: String,
        required: true
      },
      endDate:{
        type: String
      },
      CurrentlyWorking:{
        type: Boolean,
        default: false
      }
    }
  ],
  achievements:[
    {
      type: String,
      default: ""
    }
  ],
  certifications:[
    {
      title: {
        type: String,
        required: true
      },
      description:{
        type: String,
        default: ""
      },
      startDate: {
        type:String,
        required: true
      },
      endDate: {
        type:String,
        required: true
      },
      link:{
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
          },
          message: (props) => `${props.value} is not a valid URL!`,
        },
      },
      skills: [
        {
          type: String,
          required: true
        }
      ]
    }
  ]
})

module.exports = mongoose.model("UserProfile", userProfileSchema)