const express = require("express")
const dotenv = require("dotenv").config()
const cookieParser = require("cookie-parser")

const connectToMongoose = require("./db/conn")

const userRoute = require("./routes/user.route")
const employerRoute = require("./routes/employer.route")

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/user", userRoute)
app.use("/api/v1/employer", employerRoute)

app.listen(PORT, ()=>{
  connectToMongoose()
  console.log(`server started ${PORT}`);
})