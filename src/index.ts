import express, {Request, Response} from "express"
import {testingRouter} from "./router/testing-router";
import {postsRouter} from "./router/posts-router";
import {blogsRouter} from "./router/blogs-router";
import {runDb} from "./repositories/db";
import {usersRouter} from "./router/users-router";
import {authRouter} from "./router/auth-router";

export const app = express()
const PORT = 3003

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello Samurai!!!!")
})

app.use("/blogs", blogsRouter)
app.use("/posts", postsRouter)
app.use("/testing", testingRouter)
app.use("/users", usersRouter)
app.use("/auth", authRouter)

const startApp = async () => {

    await runDb()

    app.listen(PORT, () => {
    })
}
startApp()