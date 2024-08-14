const express = require("express")
const dotenv = require("dotenv").config()

const connectToMongoose = require("./db/conn")

const app = express()

app.use(express.json())

app.listen(process.env.PORT, ()=>{
  connectToMongoose()
  console.log(`server started ${process.env.PORT}`);
})