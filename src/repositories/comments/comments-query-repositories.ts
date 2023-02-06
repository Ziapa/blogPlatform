import {commentsCollection} from "../db";
import {PaginationViewModel} from "../../helpers/pagination";
import {QueryRequest} from "../../types/types";
import {CommentsDbOutputType, CommentsDbType} from "../../types/commentsType";

export const queryCommentsRepositories = {

    mapCommentsToViewType(comments: CommentsDbType): CommentsDbOutputType {
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

    async getComment(commentId: string): Promise<CommentsDbOutputType | null> {
        const findBlog = await commentsCollection.findOne({id: commentId})

        if (findBlog) {
            return this.mapCommentsToViewType(findBlog)
        } else {
            return null
        }


    },

    async getComments(pagination: QueryRequest, postId: string): Promise<PaginationViewModel<CommentsDbOutputType[]>> {

        const filterPostById = {postId: postId}
        const skipped = (pagination.pageNumber - 1) * pagination.pageSize

        const findComments = await commentsCollection
            .find(filterPostById)
            .skip(skipped)
            .limit(pagination.pageSize)
            .sort({[pagination.sortBy]: pagination.sortDirection})
            .toArray()

        const count = await commentsCollection.countDocuments(filterPostById)
        const items: CommentsDbOutputType[] = findComments.map(el => this.mapCommentsToViewType(el))

        return new PaginationViewModel(count, pagination.pageSize, pagination.pageNumber, items)

    }

}