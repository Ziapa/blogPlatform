import {PostsDbType, PostsOutputType} from "../types/postsTypes";
import {blogsCollection, postsCollection} from "./db";
import {PaginationViewModel} from "../helpers/pagination";
import {QueryRequest} from "../types/types";

export const queryPostsRepositories = {

    mapPostToViewType(post: PostsDbType): PostsOutputType {
        return {
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            createdAt: post.createdAt,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName
        }
    },

    async getPost(pagination: QueryRequest): Promise<PaginationViewModel<PostsOutputType[]>> {

        const skipped = (pagination.pageNumber - 1) * pagination.pageSize
        const findPosts = await postsCollection
            .find({})
            .skip(skipped)
            .limit(pagination.pageSize)
            .sort({[pagination.sortBy]: pagination.sortDirection})
            .toArray()

        const count = await blogsCollection.countDocuments({})
        const items: PostsOutputType[] = findPosts.map(el => this.mapPostToViewType(el))

        return new PaginationViewModel(count, pagination.pageSize, pagination.pageNumber, items)
    },

    async findPost(id: string): Promise<PostsOutputType | null> {

        const findPost = await postsCollection.findOne({id: id})

        if (findPost) {
            return this.mapPostToViewType(findPost)
        } else {
            return null
        }
    },
    // TODO

    async filterPostsByBlogId(id: string, pagination: QueryRequest): Promise<PaginationViewModel<PostsOutputType[]> | null> {

        const skipped = (pagination.pageNumber - 1) * pagination.pageSize

        const findPosts = await postsCollection
            .find({blogId: id})
            .skip(skipped)
            .limit(pagination.pageSize)
            .sort({[pagination.sortBy]: pagination.sortDirection})
            .toArray()

        if (findPosts.length === 0) return null

        const count = await postsCollection.countDocuments({blogId: id})
        const items: PostsOutputType[] = findPosts.map(el => this.mapPostToViewType(el))

        return  new PaginationViewModel(count,pagination.pageSize,pagination.pageNumber, items)

    },

}