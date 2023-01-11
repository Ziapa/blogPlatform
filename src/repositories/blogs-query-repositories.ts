import {BlogsOutputType} from "../types/blogsTypes";
import {blogsCollection} from "./db";

export const queryBlogsRepositories = {
    async getBlogs(
        searchNameTerm: string | null,
        sortDirection: "asc" | "desc",
        pageNumber: number,
        pageSize: number,
        sortBy: string,
    ): Promise<BlogsOutputType[]> {

        const filter = {name: {$regex: searchNameTerm ?? "", $options: "i"}}

        const skipped = (pageNumber - 1) * pageSize

        const findBlogs = await blogsCollection
            .find(filter)
            .skip(skipped)
            .limit(pageSize)
            .sort({[sortBy]: sortDirection})
            .toArray()

        const count = await blogsCollection.countDocuments(filter)
        const pageCount = Math.ceil(count / pageSize)

        return {
            // @ts-ignore
            pagesCount: pageCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: count,
            items: [
                findBlogs.map(el => {
                    return {
                        id: el.id,
                        name: el.name,
                        description: el.description,
                        websiteUrl: el.websiteUrl,
                        createdAt: el.createdAt
                    }
                })
            ]
        }
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