import {PostsDbType, PostsOutputType} from "../types/postsTypes"
import {postsCollection} from "./db";

export const postsRepositories = {

    async getPost(): Promise<PostsOutputType[]> {

        const posts = await postsCollection.find({}, {projection: {_id: 0}}).toArray()

        return posts.map((el: PostsDbType) => {
            return {
                id: el._id.toString(),
                title: el.title,
                shortDescription: el.shortDescription,
                content: el.content,
                blogId: el.blogId,
                blogName: el.blogName
            }
        })
    },

    async findPost(id: string): Promise<PostsOutputType | null> {

        const post = await postsCollection.findOne({id: {$regex: id}}, {projection: {_id: 0}})

        if (post) {
            return {
                id: post._id.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName
            }
        } else {
            return null
        }
    },
    // TODO

    async filterPostsByUserId(id: string): Promise<PostsOutputType[] | null> {
        const posts = await postsCollection.find({blogId: id}, {projection: {_id: false}}).toArray()
        if (posts) {
            return posts.map((el: PostsDbType) => {
                return {
                    id: el._id.toString(),
                    title: el.title,
                    shortDescription: el.shortDescription,
                    content: el.content,
                    blogId: el.blogId,
                    blogName: el.blogName
                }
            })
        } else {
            return null
        }
    },

    async createPost(newPost: PostsDbType): Promise<PostsOutputType> {

        const result = await postsCollection.insertOne(newPost)

        return {
            id: result.insertedId.toString(),
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: newPost.blogName
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