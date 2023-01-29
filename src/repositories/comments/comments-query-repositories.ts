import {blogsCollection, commentsCollection} from "../db";
import {PaginationViewModel} from "../../helpers/pagination";
import {QueryRequest} from "../../types/types";
import {CommentsDbType} from "../../types/commentsType";

export const queryCommentsRepositories = {

    mapCommentsToViewType (comments: CommentsDbType): CommentsDbType {
        return {
            id: comments.id,
            content: comments.content,
            commentatorInfo: {
                userId: comments.commentatorInfo.userId,
                userLogin: comments.commentatorInfo.userLogin
            },
            createdAt: comments.createdAt
        }
    },

    async getComments(pagination: QueryRequest): Promise<PaginationViewModel<CommentsDbType[]>> {

        const filter = {}
        const skipped = (pagination.pageNumber - 1) * pagination.pageSize

        const findBlogs = await commentsCollection
            .find(filter)
            .skip(skipped)
            .limit(pagination.pageSize)
            .sort({[pagination.sortBy]: pagination.sortDirection})
            .toArray()
        const count = await blogsCollection.countDocuments(filter)
        const items: CommentsDbType[] = findBlogs.map(el => this.mapCommentsToViewType(el))

        return new PaginationViewModel(count, pagination.pageSize, pagination.pageNumber, items)

    }

}