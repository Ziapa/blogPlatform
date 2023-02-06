import {UserOutputType} from "../types/usersType";
import {commentsRepositories} from "../repositories/comments/comments-repositories";
import {randomUUID} from "crypto";

export const commentsServices = {

    async createComment(content: string, user: UserOutputType, postId: string) {

            const newComments = {
                id: randomUUID(),
                postId: postId,
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
    },

    async updateComment(id: string, content: string) {
        return commentsRepositories.updateComment(id, content)
    }
}