"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostValidation = exports.createPostValidation = void 0;
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const blogs_repositories_1 = require("../repositories/blogs-repositories");
const titleValidation = (0, express_validator_1.body)('title')
    .isString()
    .trim().notEmpty()
    .isLength({ max: 30 });
const shortDescriptionValidation = (0, express_validator_1.body)('shortDescription')
    .isString()
    .trim().notEmpty()
    .isLength({ max: 100 });
const contentValidation = (0, express_validator_1.body)('content')
    .isString()
    .trim().notEmpty()
    .isLength({ max: 1000 });
const blogIdValidation = (0, express_validator_1.body)('blogId')
    .isString()
    .trim().notEmpty()
    .custom(value => {
    const blog = blogs_repositories_1.blogsRepositories.findBlog(value);
    if (!blog)
        throw new Error();
    return true;
});
exports.createPostValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    input_validation_middleware_1.inputValidationMiddleware
];
exports.updatePostValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    input_validation_middleware_1.inputValidationMiddleware
];
