export type UsersDbType = {
    id: string
    login: string
    passwordSalt: string
    passwordHash: string
    email:string
    createdAt: string
}

export type UsersOutputType = {
    id: string
    login: string
    email:string
    createdAt: string
}

export type UserOutputType = {
    userId: string
    login: string
    email:string
}

export type UserRequest = {
    login: string
    email:string
    password: string
}

export type UserAuthRequest = {
    loginOrEmail: string
    password: string
}