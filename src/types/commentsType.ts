export type CommentsDbType = {
    id: string
    content: string
    commentatorInfo: {
        userId: string
        userLogin: string
    }
    createdAt: string
}
export type CommentsOutputType = {
    id: string
    commentatorInfo: {
        userId: string
        userLogin: string
    }
    createdAt: string
}