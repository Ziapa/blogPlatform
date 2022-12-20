import {validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsMessages = errors.array({onlyFirstError: true}).map(e => ({
            message: e.msg,
            field: e.param
        }))
        res.status(400).json({ errorsMessages });
    } else {
        next()
    }
}