import {MongoClient} from "mongodb"

const mongoUri = "mongodb://localhost:27017"

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

