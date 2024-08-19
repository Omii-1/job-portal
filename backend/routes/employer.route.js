const express = require("express")

const { employerSignup, employerSignin, employerLogout, employerDetails, employerUpdate } = require("../controllers/employer.controller")
const protectRoute = require("../middlewares/protectRoute")

const router = express.Router()

router.post("/signup", employerSignup)
router.post("/signin", employerSignin)
router.post("/logout", employerLogout)
router.get("/get-details", protectRoute, employerDetails)
router.put("/update-details", protectRoute, employerUpdate)

module.exports = router