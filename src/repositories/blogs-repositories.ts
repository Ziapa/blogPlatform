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

export const blogsRepositories = {
    findBlog(id?: string | null) {
        if (id) {
            return blogs.find(b => b.id === id)
        } else {
            return blogs
        }
    },
    crateBlog(body: { name: string, description: string, websiteUrl: string }) {

        const newBlog = {
            id: new Date().toISOString(),
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl
        }

        if (newBlog) {
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
    }
}