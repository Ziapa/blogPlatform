import {commentsCollection} from "../db";
import {CommentsDbType, CommentsOutputType} from "../../types/commentsType";


export const commentsRepositories = {

    async crateBlog(newComments: CommentsDbType): Promise<CommentsOutputType | null> {

        const result = await commentsCollection.insertOne(newComments)

        if (result.acknowledged) {
            return {content: newComments.content}
        } else {
            return null
        }

    },

}