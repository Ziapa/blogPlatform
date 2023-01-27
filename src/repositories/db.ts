import {MongoClient} from "mongodb"
import {BlogsDbType} from "../types/blogsTypes";
import {PostsDbType} from "../types/postsTypes";
import {UsersDbType} from "../types/usersType";
import {CommentsDbType} from "../types/commentsType";

const mongoUri = "mongodb+srv://Ziapa:Ziapa@samuraidb.bhiinll.mongodb.net/?retryWrites=true&w=majority"

export const client = new MongoClient(mongoUri)

const db = client.db("blog-platform")
export const blogsCollection = db.collection<BlogsDbType>("blogs")
export const postsCollection = db.collection<PostsDbType>("posts")
export const usersCollection = db.collection<UsersDbType>("users")
export const commentsCollection = db.collection<CommentsDbType>("comments")

export async function runDb() {
    try {

        await client.connect()

        await client.db("blogs").command({ping: 1})
        console.log("connected to mongo service")

    } catch {

        await client.close()

    }
}



