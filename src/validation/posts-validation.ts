import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";


const titleValidation = body('title')
    .isString()
    .trim().notEmpty()
    .isLength({max: 30})

const shortDescriptionValidation = body('shortDescription')
    .isString()
    .trim().notEmpty()
    .isLength({max: 100})

const contentValidation = body('content')
    .isString()
    .trim().notEmpty()
    .isLength({max: 1000})

const blogIdValidation = body('blogId')
    .isString()

export const createBlogValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    inputValidationMiddleware
]

export const updateBlogValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    inputValidationMiddleware
]