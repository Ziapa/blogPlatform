import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";


export const contentValidation = body("content")
    .isString()
    .trim().notEmpty()
    .isLength({min: 20, max: 300})





export const commentsValidation = [
    contentValidation,
    inputValidationMiddleware
]

