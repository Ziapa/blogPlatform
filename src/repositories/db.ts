import {MongoClient} from "mongodb"

const mongoUri = "mongodb+srv://Ziapa:Ziapa@samuraidb.bhiinll.mongodb.net/?retryWrites=true&w=majority"

export const client = new MongoClient(mongoUri)


export async function runDb() {
    try {
        await client.connect()

        await client.db("blogs").command({ping: 1})
        console.log("connected to mongo service")

    } catch {
        await client.close()
    }
}

