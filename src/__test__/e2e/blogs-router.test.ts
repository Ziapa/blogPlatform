import request from "supertest"
import {app} from "../../index"

describe("/blogs", () => {

    it("should remove all data, status 204", async () => {
        await request(app)
            .delete("/testing/all-data")
            .expect(204)
    })

    it("should return 200", async () => {
        await request(app)
            .get("/blogs")
            .expect(200, [])
    })

    it("should return Unauthorized and status 401", async () => {
        const payload = {
            name: "Ziapa",
            description: "Smit",
            websiteUrl: "https://github.com/Ziapa/homeWork_01/blob/master/src/router/video-router.ts"
        }
        await request(app)
            .post("/blogs")
            .send(payload)
            .expect(401, {})
    });

    it("should return Bad Request status 400", async () => {
        const payload = {
            ame: "Ziapa",
            description: "Smit",
            websiteUrl: "https://github.com/Ziapa/homeWork_01/blob/master/src/router/video-router.ts"
        }
        await request(app)
            .post("/blogs")
            .send(payload)
            .auth("admin", "qwerty")
            .expect(400,{ errorsMessages: [ { message: "Invalid value", field: "name" }]})
    });

    it("should return new blog and status 201", async () => {
        const payload = {
            name: "Ziapa",
            description: "Smit",
            websiteUrl: "https://github.com/Ziapa/homeWork_01/blob/master/src/router/video-router.ts"
        }
        const response = await request(app)
            .post("/blogs")
            .send(payload)
            .auth("admin", "qwerty")
            expect(response.status).toBe(201)
    });

    it("should return status 204", async () => {
        const payload = {
            name: "newName",
            description: "newDescription",
            websiteUrl: "https://newUrl.ru"
        }
        await request(app)
            .put("/blogs/0")
            .send(payload)
            .auth("admin", "qwerty")
            .expect(204)
    });

    it("should return newBlog and status 200", async () => {
        await request(app)
            .get("/blogs/0")
            .expect(200)
    })
})




