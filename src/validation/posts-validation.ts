import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {blogsRepositories} from "../repositories/blogs-repositories";


export const titleValidation = body('title')
    .isString()
    .trim().notEmpty()
    .isLength({max: 30})

export const shortDescriptionValidation = body('shortDescription')
    .isString()
    .trim().notEmpty()
    .isLength({max: 100})

export const contentValidation = body('content')
    .isString()
    .trim().notEmpty()
    .isLength({max: 1000})

export const blogIdValidation = body('blogId')
    .isString()
    .trim().notEmpty()
    .custom(value => {
        const blog = blogsRepositories.findBlog(value)
        if (!blog) throw new Error()
        return true
    })



export const createPostValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    inputValidationMiddleware
]

export const updatePostValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    inputValidationMiddleware
]

