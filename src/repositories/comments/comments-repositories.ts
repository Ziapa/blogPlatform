import {commentsCollection} from "../db";
import {CommentsDbType, CommentsOutputType} from "../../types/commentsType";


export const commentsRepositories = {

    async crateBlog(newComments: CommentsDbType): Promise<CommentsOutputType | null> {

        const result = await commentsCollection.insertOne(newComments)

        if (result.acknowledged) {
            return {
                id: newComments.id,
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

}