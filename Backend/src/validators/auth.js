import { body } from 'express-validator'

const registerValidator = [
    body("firstName").trim().isLength({ min: 3, max: 30 }).withMessage("Name must be between 3 to 30 chars"),
    body("lastName").trim().isLength({ min: 3, max: 30 }).withMessage("Name must be between 3 to 30 chars"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6, max: 20 }).withMessage("Password must be between 6 to 20 chars"),
    body("role").isIn(['admin', 'organizer', 'attendee']).withMessage("Invalid Role"),
]

const loginValidator = [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6, max: 20 }).withMessage("Password must be between 6 to 20 chars"),
]

export { registerValidator, loginValidator }