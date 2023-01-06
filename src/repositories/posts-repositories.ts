import {PostsDbType, PostsOutputType} from "../types/postsTypes"
import {postsCollection} from "./db";

export const postsRepositories = {

    async createPost(newPost: PostsDbType): Promise<PostsOutputType | null> {

        const result = await postsCollection.insertOne(newPost)

        if (result.acknowledged) {
            return {
                id: newPost.id,
                title: newPost.title,
                shortDescription: newPost.shortDescription,
                content: newPost.content,
                blogId: newPost.blogId,
                blogName: newPost.blogName
            }
        } else {
            return null
        }

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