import {PostsType} from "../types/postsTypes"
import {blogsRepositories} from "./blogs-repositories";
import {postsCollection} from "./db";
import {WithId} from "mongodb";


const createAt = new Date().toISOString()

export const postsRepositories = {

    async getPost(): Promise<WithId<PostsType>[]> {

        return postsCollection.find({},{projection: {_id: 0}}).toArray()
    },
    async findPost(id: string): Promise<WithId<PostsType> | null> {

        const blog = await postsCollection.findOne({id: {$regex: id}},{projection: {_id: 0}})

        if (blog) {
            return blog
        } else {
            return null
        }
    },
    async createPost(body: { title: string, shortDescription: string, content: string, blogId: string }): Promise<PostsType | null | undefined> {

        const postId = await postsCollection.find({},{projection: {_id: 0}}).toArray()

        const blog = await blogsRepositories.findBlog(body.blogId)
        if (!blog) return null
        const newPost = {
            id: postId.length.toString(),
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: blog.id,
            blogName: blog.name,
            createdAt: createAt
        }


        await postsCollection.insertOne(newPost)

        return newPost

    },
    async updatePost(id: string, body: {
        title: string, shortDescription: string, content: string, blogId: string
    }): Promise<Boolean> {

        const result =
            await postsCollection.updateOne({id: id},
                {
                    title: body.title,
                    shortDescription: body.shortDescription,
                    content: body.content,
                    blogId: body.blogId,
                })

        return result.matchedCount === 1
    },
    async deletePost(id: string): Promise<Boolean | undefined> {
        const result = await postsCollection.deleteOne({id: id})

        return result.deletedCount === 1

    }

}