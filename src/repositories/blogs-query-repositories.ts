import {BlogsOutputType} from "../types/blogsTypes";
import {blogsCollection} from "./db";

export const queryBlogsRepositories = {
    async getBlogs(): Promise<BlogsOutputType[]> {

        const findBlogs = await blogsCollection.find({}).toArray()

        return findBlogs.map(el => {
            return {
                id: el.id,
                name: el.name,
                description: el.description,
                websiteUrl: el.websiteUrl,
                createdAt: el.createdAt
            }
        })
    },

    async findBlog(id: string | undefined): Promise<BlogsOutputType | null> {

        const blog = await blogsCollection.findOne({id:  id});

        if (blog) {
            return {
                id: blog.id,
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt
            }
        } else {
            return null
        }

    }
}