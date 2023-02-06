import {BlogsDbType, BlogsOutputType} from "../../types/blogsTypes";
import {blogsCollection} from "../db";


export const blogsRepositories = {

    async crateBlog(newBlog: BlogsDbType): Promise<BlogsOutputType | null> {

        const result = await blogsCollection.insertOne(newBlog)

        if (result.acknowledged) {
            return {
                id: newBlog.id,
                name: newBlog.name,
                isMembership: newBlog.isMembership,
                description: newBlog.description,
                websiteUrl: newBlog.websiteUrl,
                createdAt: newBlog.createdAt
            }
        } else {
            return null
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