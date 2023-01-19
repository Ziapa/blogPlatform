import {UserOutputType} from "./usersType";

declare global {
    declare namespace  Express {
        export interface Request {
            user: UserOutputType | null
        }
    }
}