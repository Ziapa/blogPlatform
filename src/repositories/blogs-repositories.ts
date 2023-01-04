import {BlogsDbType, BlogsOutputType} from "../types/blogsTypes";
import {blogsCollection} from "./db";


export const blogsRepositories = {

    async getBlogs(): Promise<BlogsOutputType[]> {

        const findBlogs = await blogsCollection.find({}, {projection: {_id: 0}}).toArray()

        return findBlogs.map(el => {
            return {
                id: el._id.toString(),
                name: el.name,
                description: el.description,
                websiteUrl: el.websiteUrl,
                createdAt: el.createdAt
            }
        })
    },

    async findBlog(id: string | undefined): Promise<BlogsOutputType | null> {

        const blog = await blogsCollection.findOne({id: {$regex: id}}, {projection: {_id: 0}})
        if (blog) {
            return {
                id: blog._id.toString(),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt
            }
        } else {
            return null
        }

    },
    async crateBlog(newBlog: BlogsDbType): Promise<BlogsOutputType> {

        const result = await blogsCollection.insertOne(newBlog)

        return {
            id: result.insertedId.toString(),
            name: newBlog.name,
            description: newBlog.description,
            websiteUrl: newBlog.websiteUrl,
            createdAt: newBlog.createdAt
        }
    },
    async updateBlog(id: string, body: { name: string, description: string, websiteUrl: string }): Promise<boolean> {
        const result = await blogsCollection.updateOne({id: id},
            {$set: {name: body.name, websiteUrl: body.websiteUrl, description: body.description}})

        return result.matchedCount === 1
    },
    async deletedBlog(id: string): Promise<boolean | undefined> {
        const result = await blogsCollection.deleteOne({id: id})


        return result.deletedCount === 1
    }
}