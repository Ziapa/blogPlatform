import request from 'supertest'
import {app} from '../../index'

describe('/blogs', () => {

    it('should return 200', async () => {
        await request(app)
            .get('/blogs')
            .expect(200, [
                {
                    id: 1,
                    name: "name1",
                    description: "description1",
                    websiteUrl: "websiteUrl"
                },
                {
                    id: 2,
                    name: "name2",
                    description: "description2",
                    websiteUrl: "websiteUrl2"
                },
            ])
    })
})

