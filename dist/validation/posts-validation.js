"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogValidation = exports.createBlogValidation = void 0;
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
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
    .trim().notEmpty();
exports.createBlogValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    input_validation_middleware_1.inputValidationMiddleware
];
exports.updateBlogValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    input_validation_middleware_1.inputValidationMiddleware
];
