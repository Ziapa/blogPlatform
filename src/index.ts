import express, {Request, Response} from 'express'
import {blogsRouter} from "./router/video-router";
import {testingRouter} from "./router/testing-router";
import {postsRouter} from "./router/posts-router";

export const app = express()
const PORT = 3003

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!!!!')
})

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing', testingRouter)


app.listen(PORT, () => {

})