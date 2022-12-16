import request from 'supertest'
import {app} from '../../index'

describe('create post', () => {

    it('should remove all data, status 204', async () => {
        await request(app)
            .delete('/testing/all-data')
            .expect(204,{})
    })

    it('should return 200', async () => {

        const newPost = {
            title: 'title',
            shortDescription: 'shortDescription',
            content: 'content',
            blogId: 'blogId',
            blogName: 'title'
        }

        await request(app)
            .post('/posts')
            .send(newPost)
            .expect(201, [
                {
                    id: expect.any(String),
                    title: 'title',
                    shortDescription: 'shortDescription',
                    content: 'content',
                    blogId: 'blogId',
                    blogName: 'title'
                }
            ])
    })

    it('should return 200', async () => {
        await request(app)
            .get('/posts')
            .expect(200, [
                {
                    id: '1',
                    title: 'name1',
                    shortDescription: 'description1',
                    content: 'websiteUrl1',
                    blogId: 'blogId1',
                    blogName: 'blogName1'
                }
            ])
    })

    it('should return 200', async () => {
        await request(app)
            .get('/posts/1')
            .expect(200,
                {
                    id: '1',
                    title: 'name1',
                    shortDescription: 'description1',
                    content: 'websiteUrl1',
                    blogId: 'blogId1',
                    blogName: 'blogName1'
                }
            )
    })


})

