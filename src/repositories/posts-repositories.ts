import {PostsType} from "../types/postsTypes"
import {blogsRepositories} from "./blogs-repositories";

export const posts: Array<PostsType> = [
    {
        id: "1",
        title: "name1",
        shortDescription: "description1",
        content: "websiteUrl1",
        blogId: "blogId1",
        blogName: "blogName1"
    },
    {
        id: "2",
        title: "name2",
        shortDescription: "description2",
        content: "websiteUrl2",
        blogId: "blogId2",
        blogName: "blogName2"
    },
]

const postId = []

export const postsRepositories = {

    getPost() {
        return posts
    },
    findPost(id?: string | null) {
        return posts.find(p => p.id === id)
    },
    createPost(body: { title: string, shortDescription: string, content: string, blogId: string }) {
        const blog = blogsRepositories.findBlog(body.blogId)
        if (!blog) return null
        console.log(blog)
        const newPost = {
            id: postId.length.toString(),
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: blog.id,
            blogName: blog.name
        }

        if (newPost) {
            postId.push(postId.length + 1)
            posts.push(newPost)
            return newPost
        }
    },
    updatePost(id: string, body: {
        title: string, shortDescription: string, content: string, blogId: string
    }) {
        let post = posts.find(p => p.id === id)
        if (post) {
            post.title = body.title
            post.shortDescription = body.shortDescription
            post.content = body.content
            post.blogId = body.blogId
            return true
        } else {
            return false
        }
    },
    deletePost(id: string) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1)
                return true
            }
        }
    }

}