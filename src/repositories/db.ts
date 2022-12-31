import {MongoClient} from "mongodb"
import {BlogsType} from "../types/blogsTypes";

const mongoUri = "mongodb+srv://Ziapa:Ziapa@samuraidb.bhiinll.mongodb.net/?retryWrites=true&w=majority"

export const client = new MongoClient(mongoUri)

const db = client.db("blog-platform")
export const blogsCollection = db.collection<BlogsType>("blogs")

export async function runDb() {
    try {

        await client.connect()

        await client.db("blogs").command({ping: 1})
        console.log("connected to mongo service")

    } catch {

        await client.close()

    }
}



