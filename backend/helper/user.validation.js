const z = require("zod")

const userSignupBody = z.object({
  fullname: z.string({
    message: "Full name is required."
  }).min(1, { message: "Full name cannot be empty"}),
  email: z.string().email({
    message: "Invalid email address"
  }),
  password: z.string().min(6, {
    message: "Must be 6 or more characters long"
  }),
  confirmPassword: z.string().min(6, {
    message: "Must be 6 or more characters long"
  }),
  phone: z.number({
    message: "Phone number must be in digits"
  }).min(10, {
    message: "Must be 10 or more characters long."
  }),
  hasWhatsapp: z.boolean()
})

const userSigninBody = z.object({
  email: z.string().email({
    message: "Invalid email address"
  }),
  password: z.string().min(6, {
    message: "Password must be atleast 6 characters long"
  })
})

const userUpdatedBody = z.object({
  fullname: z.string({
    message: "Full name is required"
  }).min(1, {message: "Full name cannot be empty"}),
  oldPassword: z.string().min(6, {
    message: "Password must be atleast 6 characters long"
  }),
  newPassword: z.string().min(6, {
    message: "Password must be atleast 6 characters long"
  }),
  confirmNewPassword: z.string().min(6, {
    message: "Password must be atleast 6 characters long"
  }),
  phone: z.number({
    message: "Phone number must be in digits"
  }).min(10, {
    message: "Phone number must be atleast 10 characters long"
  })

})

module.exports = {
  userSignupBody,
  userSigninBody,
  userUpdatedBody
}