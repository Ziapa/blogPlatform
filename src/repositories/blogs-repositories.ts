import {BlogsType} from "../types/blogsTypes";
import {client} from "./db";
import {WithId} from "mongodb";

let blogId = []

export const blogsRepositories = {

    async getBlogs(): Promise<WithId<BlogsType[]>[]> {

        return await client.db("blog-platform").collection<BlogsType[]>("blogs").find({}).toArray()
    },

    async findBlog(id: string): Promise<WithId<BlogsType> | null> {
        const blog = await client.db("blog-platform").collection<BlogsType>("blogs").findOne({id: {$regex: id}})
        if (blog) {
            return blog
        } else {
            return null
        }

    },
    async crateBlog(body: { name: string, description: string, websiteUrl: string }): Promise<BlogsType | undefined> {

        const newBlog = {
            id: blogId.length.toString(),
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString()
        }

        // const result =
        await client.db("blog-platform").collection<BlogsType>("blogs").insertOne(newBlog)

        return newBlog

    },
    async updateBlog(id: string, body: { name: string, description: string, websiteUrl: string }): Promise<boolean> {
        const result = await client.db("blog-platform").collection<BlogsType>("blogs").updateOne({id: id},
            {$set: {name: body.name, websiteUrl: body.websiteUrl, description: body.description}})

        return result.matchedCount === 1
    },
    async deletedBlog(id: string): Promise<boolean | undefined> {
        const result = await client.db("blog-platform").collection<BlogsType>("blogs").deleteOne({id: id})


        return result.deletedCount === 1
    }
}