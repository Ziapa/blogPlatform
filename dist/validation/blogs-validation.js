"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogValidation = exports.createPostByUserIdValidation = exports.createBlogValidation = exports.webSiteUrlValidation = exports.descriptionUrl = exports.nameValidation = void 0;
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const posts_validation_1 = require("./posts-validation");
exports.nameValidation = (0, express_validator_1.body)('name')
    .isString()
    .trim().notEmpty()
    .isLength({ max: 15 });
exports.descriptionUrl = (0, express_validator_1.body)('description')
    .isString()
    .trim().notEmpty()
    .isLength({ max: 500 });
exports.webSiteUrlValidation = (0, express_validator_1.body)('websiteUrl')
    .isString()
    .trim().notEmpty()
    .isURL()
    .matches("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")
    .isLength({ max: 100 });
exports.createBlogValidation = [
    exports.nameValidation,
    exports.descriptionUrl,
    exports.webSiteUrlValidation,
    input_validation_middleware_1.inputValidationMiddleware
];
exports.createPostByUserIdValidation = [
    posts_validation_1.titleValidation,
    posts_validation_1.shortDescriptionValidation,
    posts_validation_1.contentValidation
];
exports.updateBlogValidation = [
    exports.nameValidation,
    exports.descriptionUrl,
    exports.webSiteUrlValidation,
    input_validation_middleware_1.inputValidationMiddleware
];
