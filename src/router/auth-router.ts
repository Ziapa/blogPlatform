import {Response, Router} from "express";
import {usersServices} from "../domain/users-sevices";
import {RequestWithBody} from "../types/types";
import {UserAuthRequest} from "../types/usersType";

export const authRouter = Router()

authRouter.post("/login",



    async (req: RequestWithBody<UserAuthRequest>, res: Response<boolean> ) => {

        const result = await usersServices.checkCredentials(req.body)
        if (result) {
            res.sendStatus(204)
        } else {
            res.sendStatus(400)
        }
        return res
    })