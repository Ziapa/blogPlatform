import {UsersDbType} from "./usersType";

declare global {
    declare namespace  Express {
        export interface Request {
            user: UsersDbType | null
        }
    }
}