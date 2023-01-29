import {UserOutputType} from "../types/usersType";
import {v4 as uuidV4} from "uuid"
import {commentsRepositories} from "../repositories/comments/comments-repositories";

export const commentsServices = {

    async createComment(content: string, user: UserOutputType) {

            const newComments = {
                id: uuidV4(),
                content: content,
                commentatorInfo: {
                    userId: user.userId,
                    userLogin: user.login
                },
                createdAt: new Date().toISOString()
        }
            return await commentsRepositories.crateBlog(newComments)

    },
    async deleteComment(id: string) {
        return commentsRepositories.deleteComment(id)
    }
}