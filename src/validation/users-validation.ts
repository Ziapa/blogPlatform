import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const loginValidation = body("login")
    .isString()
    .trim().notEmpty()
    .matches("^[a-zA-Z0-9_-]*$")
    .isLength({max: 10, min:3})

export const passwordValidation = body("password")
    .isString()
    .trim().notEmpty()
    .isLength({max: 20, min:6})

export const emailValidation = body("email")
    .isString()
    .trim().notEmpty()
    .isEmail()
    .isLength({max: 100})


export const createUserValidation = [
    loginValidation,
    passwordValidation,
    emailValidation,
    inputValidationMiddleware
]


