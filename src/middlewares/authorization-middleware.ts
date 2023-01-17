import {NextFunction, Request, Response} from "express";
import {QueryRequest, RequestWithQuery} from "../types/types";

export const basicAuthorization = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization === "Basic YWRtaW46cXdlcnR5") {
        next()
    } else {
       res.sendStatus(401)
    }
}

export const basicAuthorizationRequests = (req: RequestWithQuery<QueryRequest>, res: Response, next: NextFunction) => {
    if (req.headers.authorization === "Basic YWRtaW46cXdlcnR5") {
        next()
    } else {
        res.sendStatus(401)
    }
}