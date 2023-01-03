import {ObjectId} from "mongodb";

export type PostsDbType = {
    _id: typeof ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}

export type PostsOutputType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}
