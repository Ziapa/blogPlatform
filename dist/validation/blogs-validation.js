"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogValidation = exports.createBlogValidation = void 0;
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const nameValidation = (0, express_validator_1.body)('name')
    .isString()
    .trim().notEmpty()
    .isLength({ max: 15 });
const descriptionUrl = (0, express_validator_1.body)('description')
    .isString()
    .trim().notEmpty()
    .isLength({ max: 500 });
const webSiteUrlValidation = (0, express_validator_1.body)('websiteUrl')
    .isString()
    .trim().notEmpty()
    .isURL()
    .matches("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")
    .isLength({ max: 100 });
exports.createBlogValidation = [
    nameValidation,
    descriptionUrl,
    webSiteUrlValidation,
    input_validation_middleware_1.inputValidationMiddleware
];
exports.updateBlogValidation = [
    nameValidation,
    descriptionUrl,
    webSiteUrlValidation,
    input_validation_middleware_1.inputValidationMiddleware
];
