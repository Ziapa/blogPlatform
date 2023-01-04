import {PostsDbType, PostsOutputType} from "../types/postsTypes"
import {postsCollection} from "./db";

export const postsRepositories = {

    async getPost(): Promise<PostsOutputType[]> {

        const findPosts = await postsCollection.find({}).toArray()

        return findPosts.map(el => {
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

        const findPost = await postsCollection.findOne({id: {$regex: id}})

        if (findPost) {
            return {
                id: findPost._id.toString(),
                title: findPost.title,
                shortDescription: findPost.shortDescription,
                content: findPost.content,
                blogId: findPost.blogId,
                blogName: findPost.blogName
            }
        } else {
            return null
        }
    },
    // TODO

    async filterPostsByUserId(id: string): Promise<PostsOutputType[] | null> {
        const posts = await postsCollection.find({blogId: id}).toArray()
        if (posts) {
            return posts.map(el => {
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