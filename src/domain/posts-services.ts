import {PostsOutputType} from "../types/postsTypes"
import { v4 as uuidV4 } from "uuid"
import {postsRepositories} from "../repositories/posts-repositories";
import {queryBlogsRepositories} from "../repositories/blogs-query-repositories";

export const postsServices = {


    async createPost(body: { title: string, shortDescription: string, content: string, blogId?: string }, id?: string): Promise<PostsOutputType | null> {

        // TODO

        const findBlogId = id ? id : body.blogId

        const blog = await queryBlogsRepositories.findBlog(findBlogId)

        if (!blog) return null

        const newPost = {
            id: uuidV4(),
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: blog.id,
            blogName: blog.name,
            createdAt: new Date().toISOString()
        }
        console.log(new Date().toISOString())
        return postsRepositories.createPost(newPost)
    },

    async updatePost(id: string, body: {
        title: string, shortDescription: string, content: string, blogId: string
    }): Promise<Boolean> {
        return await postsRepositories.updatePost(id, body)
    },

    async deletePost(id: string): Promise<Boolean | undefined> {
        return await postsRepositories.deletePost(id)
    }

}