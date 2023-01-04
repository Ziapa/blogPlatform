import {PostsOutputType} from "../types/postsTypes"
import {postsRepositories} from "../repositories/posts-repositories";
import {blogsRepositories} from "../repositories/blogs-repositories";

export const postsServices = {

    async getPost(): Promise<PostsOutputType[]> {
        return await postsRepositories.getPost()
    },

    async findPost(id: string): Promise<PostsOutputType | null> {
        return await postsRepositories.findPost(id)
    },
    // TODO

    async filterPostsByUserId(id: string): Promise<PostsOutputType[] | null> {
        return await postsRepositories.filterPostsByUserId(id)
    },

    async createPost(body: { title: string, shortDescription: string, content: string, blogId?: string }, id?: string): Promise<PostsOutputType | null> {

        // TODO

        const findBlogId = id ? id : body.blogId

        const blog = await blogsRepositories.findBlog(findBlogId)

        if (!blog) return null
        const newPost = {
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: blog.id,
            blogName: blog.name,
            createdAt: new Date().toISOString()
        }

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