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
exports.blogsDomain = void 0;
const db_1 = require("../repositories/db");
exports.blogsDomain = {
    getBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.blogsCollection.find({}, { projection: { _id: 0 } }).toArray();
        });
    },
    findBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogsCollection.findOne({ id: { $regex: id } }, { projection: { _id: 0 } });
            if (blog) {
                return blog;
            }
            else {
                return null;
            }
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
                createdAt: createAt
            };
            // const result =
            yield db_1.blogsCollection.insertOne(newBlog);
            return newBlog;
        });
    },
    updateBlog(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.updateOne({ id: id }, { $set: { name: body.name, websiteUrl: body.websiteUrl, description: body.description } });
            return result.matchedCount === 1;
        });
    },
    deletedBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    }
};
