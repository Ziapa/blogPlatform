import express, {Request, Response} from 'express'
import {blogsRouter} from "./router/video-router";

export const app = express()
const PORT = 3003

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!!!!')
})

app.use('/blogs', blogsRouter)
app.use('/testing', blogsRouter)


app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})