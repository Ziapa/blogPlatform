import {commentsCollection} from "../db";
import {CommentsDbOutputType, CommentsDbType} from "../../types/commentsType";


export const commentsRepositories = {

    async crateBlog(newComments: CommentsDbType): Promise<CommentsDbOutputType | null> {

        const result = await commentsCollection.insertOne(newComments)

        if (result.acknowledged) {
            return {
                id: newComments.id,
                content: newComments.content,
                commentatorInfo: {
                    userId: newComments.commentatorInfo.userId,
                    userLogin: newComments.commentatorInfo.userLogin
                },
                createdAt: newComments.createdAt
            }

        } else {
            return null
        }

    },

    async deleteComment(id: string) {
        const result = await commentsCollection.deleteOne({id: id})

        return result.deletedCount === 1
    },

    async updateComment(id: string, content: string) {

        const result = await commentsCollection.updateOne(
            {id: id},
            {
                $set: {
                    content: content
                }
            })
        return result.matchedCount === 1
    }
}