import {NextFunction, Request, Response} from "express";

export const authorization = (req: Request, res: Response, next: NextFunction) => {

    if (req.headers.authorization === "Basic YWRtaW46cXdlcnR5") {
        next()
    } else {
       res.sendStatus(401)
    }
}