import {BlogsType} from "../types/blogsTypes";
import {blogsCollection} from "./db";
import {InsertOneResult, WithId} from "mongodb";


export const blogsRepositories = {

    async getBlogs(): Promise<BlogsType[]> {

        return await blogsCollection.find({}, {projection: {_id: 0}}).toArray()
    },

    async findBlog(id: string | undefined): Promise<WithId<BlogsType> | null> {

        const blog = await blogsCollection.findOne({id: {$regex: id}}, {projection: {_id: 0}})
        if (blog) {
            return blog
        } else {
            return null
        }

    },
    async crateBlog(newBlog: BlogsType): Promise<InsertOneResult<BlogsType>> {
        return await blogsCollection.insertOne(newBlog)
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