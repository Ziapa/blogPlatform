import {commentsCollection} from "../db";
import {CommentsDbType} from "../../types/commentsType";


export const commentsRepositories = {

    async crateBlog(newComments: CommentsDbType): Promise<CommentsDbType | null> {

        const result = await commentsCollection.insertOne(newComments)

        if (result.acknowledged) {
            return newComments

        } else {
            return null
        }

    },

}