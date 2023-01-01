import {BlogsType} from "../types/blogsTypes";
import {blogsCollection} from "./db";
import {WithId} from "mongodb";

export const blogsRepositories = {

    async getBlogs(): Promise<BlogsType[]> {

        return await blogsCollection.find({},{projection: {_id: 0}}).toArray()
    },

    async findBlog(id: string): Promise<WithId<BlogsType> | null> {

        const blog = await blogsCollection.findOne({id: {$regex: id}},{projection: {_id: 0}})
        if (blog) {
            return blog
        } else {
            return null
        }

    },
    async crateBlog(body: { name: string, description: string, websiteUrl: string }): Promise<BlogsType | undefined> {

        const blogId = await blogsCollection.find({},{projection: {_id: 0}}).toArray()
        const createAt = new Date().toISOString()

        const newBlog = {
            id: blogId.length.toString(),
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: createAt
        }

        // const result =
        await blogsCollection.insertOne(newBlog)

        return newBlog

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