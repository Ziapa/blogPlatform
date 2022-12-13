"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepositories = exports.blogs = void 0;
exports.blogs = [
    {
        id: 1,
        name: "name1",
        description: "description1",
        websiteUrl: "websiteUrl"
    },
    {
        id: 2,
        name: "name2",
        description: "description2",
        websiteUrl: "websiteUrl2"
    },
];
exports.blogsRepositories = {
    findBlog(id) {
        if (id) {
            return exports.blogs.find(b => b.id === +id);
        }
        else {
            return exports.blogs;
        }
    }
};
