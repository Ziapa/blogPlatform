import request from 'supertest'
import {app} from '../../index'

describe('create post', () => {

    it('should remove all data, status 204', async () => {
        await request(app)
            .delete('/testing/all-data')
            .expect(204,{})
    })

    it('should return 200', async () => {
        await request(app)
            .get('/posts')
            .expect(200, [])
    })

    it('should return new blog and status 201', async () => {
        const payload = {
            name: "Ziapa",
            description: "Smit",
            websiteUrl: "https://github.com/Ziapa/homeWork_01/blob/master/src/router/video-router.ts"
        }
        await request(app)
            .post('/blogs')
            .send(payload)
            .auth('admin', 'qwerty')
            .expect(201,{
                id: '0',
                name: 'Ziapa',
                description: 'Smit',
                websiteUrl: 'https://github.com/Ziapa/homeWork_01/blob/master/src/router/video-router.ts'
            })
    });

    it('should return 401 "Unauthorized"', async () => {

        const newPost = {
            title: 'title',
            shortDescription: 'shortDescription',
            content: 'content',
            blogId: '0',
        }
        await request(app)
            .post('/posts')
            .send(newPost)
            .expect(401)
    })
    it('should return 400 Bad Request', async () => {

        const newPost = {
            itle: 'title',
            shortDescription: 'shortDescription',
            content: 'content',
            blogId: '0',
        }
        await request(app)
            .post('/posts')
            .send(newPost)
            .auth('admin', 'qwerty')
            .expect(400)
    })

    it('should return new post and status 201', async () => {

        const newPost = {
            title: 'title',
            shortDescription: 'shortDescription',
            content: 'content',
            blogId: '0',
        }
        await request(app)
            .post('/posts')
            .send(newPost)
            .auth('admin', 'qwerty')
            .expect(201,{
                id: '0',
                title: 'title',
                shortDescription: 'shortDescription',
                content: 'content',
                blogId: '0',
                blogName: 'Ziapa'
            })
    })

  it('should return status 204', async () => {

        const newPost = {
            title: 'newTitle',
            shortDescription: 'newShortDescription',
            content: 'newContent',
            blogId: '0',
        }
        await request(app)
            .put('/posts/0')
            .send(newPost)
            .auth('admin', 'qwerty')
            .expect(204)
    })
    it('should return updatePost 0 and status 200', async () => {

        await request(app)
            .get('/posts/0')
            .expect(200,{
                id: '0',
                title: 'newTitle',
                shortDescription: 'newShortDescription',
                content: 'newContent',
                blogId: '0',
                blogName: 'Ziapa'
            })
    })

})

