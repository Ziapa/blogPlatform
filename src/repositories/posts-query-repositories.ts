import {PostsOutputType} from "../types/postsTypes";
import {postsCollection} from "./db";

export const queryPostsRepositories = {
    async getPost(): Promise<PostsOutputType[]> {

        const findPosts = await postsCollection.find({}).toArray()

        return findPosts.map(el => {
            return {
                id: el.id,
                title: el.title,
                shortDescription: el.shortDescription,
                content: el.content,
                blogId: el.blogId,
                blogName: el.blogName
            }
        })
    },

    async findPost(id: string): Promise<PostsOutputType | null> {

        const findPost = await postsCollection.findOne({id: id})

        if (findPost) {
            return {
                id: findPost.id,
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
                    id: el.id,
                    title: el.title,
                    shortDescription: el.shortDescription,
                    createAt: el.createdAt,
                    content: el.content,
                    blogId: el.blogId,
                    blogName: el.blogName
                }
            })
        } else {
            return null
        }
    },

}