"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repositories_1 = require("../repositories/blogs-repositories");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', (req, res) => {
    res.status(200).send(blogs_repositories_1.blogsRepositories.findBlog());
});
