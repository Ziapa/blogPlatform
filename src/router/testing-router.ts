import {Request, Response, Router} from "express";
import {testingRepositories} from "../repositories/testing-repositories";


export const testingRouter = Router()

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
    if (await testingRepositories.deleteAll()) {
    res.sendStatus(204)
} else {
    res.status(404)
}
})




