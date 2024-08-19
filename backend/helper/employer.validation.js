const z = require("zod")

const employerBaseBody = z.object({
  fullname: z.string({
    message: "Full name is reqauired"
  }).min(1, {
      message: "Full name cannot be empty"
    }
  ),
  companyname: z.string({
    message: "Company name is required"
  }).min(1, {
    message: "Company name cannot be empty"
  }),
  designation: z.string({
    message: "Designation is required"
  }).min(1, {
    message: "Designation cannot be empty"
  }),
  phone: z.number({
    message: "Phone number must be in digits"
  }).min(10, {
    message: "Must be 10 or more characters long"
  }),
  hasWhatsapp: z.boolean(),
  email: z.string().email({
    message: "Invalid email address"
  }),
  oldPassword: z.string().min(6, {
    message: "Must be 6 or more characters long"
  }),
  password: z.string().min(6, {
    message: "Must be 6 or more characters long"
  }),
  confirmPassword: z.string().min(6, {
    message: "Must be 6 or more characters long"
  })
})

const employerSignupBody = employerBaseBody.pick({
  fullname: true,
  companyname: true,
  designation: true,
  phone: true,
  hasWhatsapp: true,
  email: true,
  password: true,
  confirmPassword: true
})

const employerSigninBody = employerBaseBody.pick({
  email: true,
  password: true
})

const employerUpdateBody = employerBaseBody.pick({
  fullname: true,
  companyname: true,
  designation: true,
  phone: true,
  oldPassword: true,
  password: true,
  confirmPassword: true
})

module.exports = {
  employerSignupBody,
  employerSigninBody,
  employerUpdateBody
}