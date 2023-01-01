import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {contentValidation, shortDescriptionValidation, titleValidation} from "./posts-validation";

export const nameValidation = body('name')
    .isString()
    .trim().notEmpty()
    .isLength({max: 15})

export const descriptionUrl = body('description')
    .isString()
    .trim().notEmpty()
    .isLength({max: 500})

export const webSiteUrlValidation = body('websiteUrl')
    .isString()
    .trim().notEmpty()
    .isURL()
    .matches("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")
    .isLength({max: 100})


export const createBlogValidation = [
    nameValidation,
    descriptionUrl,
    webSiteUrlValidation,
    inputValidationMiddleware
]

export const createPostByUserIdValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation
]

export const updateBlogValidation = [
    nameValidation,
    descriptionUrl,
    webSiteUrlValidation,
    inputValidationMiddleware
]
