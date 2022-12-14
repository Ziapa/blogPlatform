import request from 'supertest'
import {app} from '../../index'

describe('/blogs', () => {



    it('should return 200', async () => {
        await request(app)
            .get('/blogs')
            .expect(200, [
                {
                    id: '1',
                    name: 'name1',
                    description: 'description1',
                    websiteUrl: 'websiteUrl'
                },
                {
                    id: '2',
                    name: 'name2',
                    description: 'description2',
                    websiteUrl: 'websiteUrl2'
                }
            ])
    })


    it('should remove all data, status 204', async () => {
        await request(app)
            .delete('/testing/all-data')
            .expect(204 )
    })

    it('should return new blog and status 200', async () => {

    const payload = {
        name: "Ziapa",
        description: "Smit",
        websiteUrl: "https://github.com/Ziapa/homeWork_01/blob/master/src/router/video-router.ts"    }

        await request(app)
            .post('/blogs')
            .send(payload)
            .expect(201,
                {
                    //TODO
                    id: expect.any(String),
                    name: "Ziapa",
                    description: "Smit",
                    websiteUrl: "https://github.com/Ziapa/homeWork_01/blob/master/src/router/video-router.ts"
                }
    )
    });
})

