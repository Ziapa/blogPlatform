"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsServices = void 0;
const blogs_repositories_1 = require("../repositories/blogs-repositories");
const db_1 = require("../repositories/db");
exports.blogsServices = {
    getBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogs_repositories_1.blogsRepositories.getBlogs();
        });
    },
    findBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogs_repositories_1.blogsRepositories.findBlog(id);
        });
    },
    crateBlog(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogId = yield db_1.blogsCollection.find({}, { projection: { _id: 0 } }).toArray();
            const newBlog = {
                id: blogId.length.toString(),
                name: body.name,
                description: body.description,
                websiteUrl: body.websiteUrl,
                createdAt: new Date().toISOString()
            };
            return yield blogs_repositories_1.blogsRepositories.crateBlog(newBlog);
        });
    },
    updateBlog(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogs_repositories_1.blogsRepositories.updateBlog(id, body);
        });
    },
    deletedBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogs_repositories_1.blogsRepositories.deletedBlog(id);
        });
    }
};
