import {BlogsOutputType} from "../types/blogsTypes";
import {blogsCollection} from "./db";

export const queryBlogsRepositories = {
    async getBlogs(
        searchNameTerm: string | null,
        sortDirection: "ask" | "desk",
        pageNumber: number,
        pageSize: number,
        sortBy: string,
    ): Promise<BlogsOutputType[]> {

const sort = (sortDirection: "ask" | "desk") => {
    if (sortDirection === "ask") {
        return -1
    } else {
        return 1
    }
}

const skipped = (pageNumber: number, pageSize: number) => {
    return (pageNumber - 1) * pageSize
}

        const findBlogs = await blogsCollection
            .find({name: {$regex: searchNameTerm ? searchNameTerm : ''}})
            .skip(skipped(pageNumber,pageSize))
            .limit(pageSize)
            .sort({ [sortBy]: sort(sortDirection)})
            .toArray()

        return findBlogs.map(el => {
            return {
                id: el.id,
                name: el.name,
                description: el.description,
                websiteUrl: el.websiteUrl,
                createdAt: el.createdAt
            }
        })
    },

    async findBlog(id: string | undefined): Promise<BlogsOutputType | null> {

        const blog = await blogsCollection.findOne({id: id});

        if (blog) {
            return {
                id: blog.id,
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt
            }
        } else {
            return null
        }

    }
}