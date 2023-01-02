import {PostsType} from "../types/postsTypes"
import {postsCollection} from "./db";
import {InsertOneResult, WithId} from "mongodb";

export const postsRepositories = {

    async getPost(): Promise<WithId<PostsType>[]> {

        return postsCollection.find({}, {projection: {_id: 0}}).toArray()
    },

    async findPost(id: string): Promise<WithId<PostsType> | null> {

        const blog = await postsCollection.findOne({id: {$regex: id}}, {projection: {_id: 0}})

        if (blog) {
            return blog
        } else {
            return null
        }
    },
    // TODO

    async filterPostsByUserId(id: string): Promise<WithId<PostsType>[] | null> {
        const posts = await postsCollection.find({blogId: id}, {projection: {_id: false}}).toArray()
        if (posts) {
            return posts
        } else {
            return null
        }
    },

    async createPost(newPost: PostsType): Promise<InsertOneResult<PostsType>> {
        return await postsCollection.insertOne(newPost)
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