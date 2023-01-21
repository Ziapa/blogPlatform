import {Response, Router} from "express";
import {usersServices} from "../domain/users-sevices";
import {RequestWithBody} from "../types/types";
import {UserAuthRequest} from "../types/usersType";
import {jwtService} from "../application/jwt-service";
import {authorizationMiddleware} from "../middlewares/authorization-middleware";

export const authRouter = Router()

authRouter.post("/login",

    async (req: RequestWithBody<UserAuthRequest>, res: Response) => {

        const user = await usersServices.checkCredentials(req.body)
        if (user) {
            const token = await jwtService.createJWT(user)

            res.status(200).send({accessToken: token})
        } else {
            res.sendStatus(401)
        }
        return res
    })

authRouter.get("/me",

    authorizationMiddleware,


    async (req, res) => {
        console.log("test")
    res.status(200).send(req.user)
    }
)