import { postsType } from "../types/postsTypes"

export const posts: Array<postsType> = [
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
export const postsRepositories = {
    findPosts(id?: string | null) {
        if (id) {
            return posts.find(p => p.id === id)
        } else {
            return posts
        }
    },
    createPost(body: { title: string, shortDescription: string, content: string, blogId: string }) {
        const newPost = {
            id: new Date().toISOString(),
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName: body.title
        }

        if (newPost) {
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
    }
}