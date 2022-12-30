import {blogsType} from "../types/blogsTypes";

export const blogs : Array<blogsType> = [
    {
        id: "1",
        name: "name1",
        description: "description1",
        websiteUrl: "websiteUrl"
    },
    {
        id: "2",
        name: "name2",
        description: "description2",
        websiteUrl: "websiteUrl2"
    },
]

let blogId = []


export const blogsRepositories = {

    getBlogs() {
        return blogs
    },

    findBlog(id: string) {
            return blogs.find(b => b.id === id)
    },
    crateBlog(body: { name: string, description: string, websiteUrl: string }) {

        const newBlog = {
            id: blogId.length.toString(),
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString()
        }

        if (newBlog) {
            blogId.push(blogId.length + 1)
            blogs.push(newBlog)
            return newBlog
        }
    },
    updateBlog(id:string, body: { name: string, description: string, websiteUrl: string }) {
        const updateBlog = blogs.find(b => b.id === id)
        if (updateBlog) {
            updateBlog.name = body.name
            updateBlog.websiteUrl = body.websiteUrl
            updateBlog.description = body.description
            return true
        } else {
            return false
        }
    },
    deletedBlog(id:string) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1)
                return true
            }
        }
    }
}