import express, {Request, Response} from 'express'
import {testingRouter} from "./router/testing-router";
import {postsRouter} from "./router/posts-router";
import {blogsRouter} from "./router/blogs-router";
import {runDb} from "./repositories/db";

export const app = express()
const PORT = 3003

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Samurai!!!!')
})

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing', testingRouter)

const startApp = async () => {

    await runDb()

    app.listen(PORT, () => {
        console.log(new Date())
        console.log(new Date().toString())
        console.log(new Date().toDateString())
        console.log(new Date().toISOString())
    })
}
startApp()