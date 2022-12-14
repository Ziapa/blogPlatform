import request from 'supertest'
import {app} from '../../index'

describe('/testing', () => {

    it('should remove all data, status 204', async () => {
        await request(app)
            .delete('/testing/all-data')
            .expect(204, [])
    })
})

