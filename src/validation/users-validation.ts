import {body} from "express-validator";

export const loginValidation = body("login")
    .isString()
    .trim().notEmpty()
    .isLength({max: 10, min:3})

export const passwordValidation = body("password")
    .isString()
    .trim().notEmpty()
    .isLength({max: 20, min:6})

export const webSiteUrlValidation = body("email")
    .isString()
    .trim().notEmpty()
    .isURL()
    .matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$\n")
    .isLength({max: 100})


export const createUserValidation = [
    loginValidation,
    passwordValidation,
    webSiteUrlValidation
]
