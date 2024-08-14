const mongoose = require("mongoose")

const connectToMongoose = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log("Database connected successfully");  
  } catch (error) {
    console.log("Error while connectiong to mongoose", error.message);    
  }
}

module.exports = connectToMongoose