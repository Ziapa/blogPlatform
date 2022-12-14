import {BlogsDbType, BlogsOutputType} from "../types/blogsTypes";
import {blogsCollection} from "./db";
import {queryRequest} from "../router/blogs-router";
import { PaginationViewModel} from "../helpers/pagination";

export const queryBlogsRepositories = {

    mapBlogToViewType (blog: BlogsDbType): BlogsOutputType {
        return {
            id: blog.id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt
        }
    },

    async getBlogs(
        pagination: queryRequest
    ): Promise<PaginationViewModel<BlogsOutputType[]>> {

        const filter = {name: {$regex: pagination.searchNameTerm ?? "", $options: "i"}}
        const skipped = (pagination.pageNumber - 1) * pagination.pageSize

        const findBlogs = await blogsCollection
            .find(filter)
            .skip(skipped)
            .limit(pagination.pageSize)
            .sort({[pagination.sortBy]: pagination.sortDirection})
            .toArray()
        const count = await blogsCollection.countDocuments(filter)
        const items: BlogsOutputType[] = findBlogs.map(e => this.mapBlogToViewType(e))

        return new PaginationViewModel(count, pagination.pageSize, pagination.pageNumber, items)

    },

    async findBlog(id: string | undefined): Promise<BlogsOutputType | null> {

        const blog = await blogsCollection.findOne({id: id});

        if (blog) {
            return this.mapBlogToViewType(blog)
        } else {
            return null
        }

    }
}