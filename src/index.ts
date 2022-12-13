import express, {Request, Response} from 'express'
import {blogsRouter} from "./router/video-router";
import bodyParser from "body-parser";

const app = express()
const PORT = 3003

app.use(bodyParser({}))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!!!!')
})

app.use('/videos', blogsRouter)


app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})