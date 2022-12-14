import request from 'supertest'
import {app} from '../../index'

describe('/posts', () => {

    it('should return 200', async () => {
        await request(app)
            .get('/posts')
            .expect(200, [
                {
                    id: 1,
                    title: "name1",
                    shortDescription: "description1",
                    content: "websiteUrl1",
                    blogId: "blogId1",
                    blogName: "blogName1"
                },
                {
                    id: 2,
                    title: "name2",
                    shortDescription: "description2",
                    content: "websiteUrl2",
                    blogId: "blogId2",
                    blogName: "blogName2"
                },
            ])
    })
})

