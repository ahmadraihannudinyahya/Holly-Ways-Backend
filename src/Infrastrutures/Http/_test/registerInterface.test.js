const request = require("supertest");
const createServer = require('../createServer');
const container = require('../../Container');

const UserTestHelper = require('../../../../test/UserTestHelper');

describe('test register interface', ()=>{
  afterEach(async ()=>{
    await UserTestHelper.cleanTable();
  })
  describe('when post /register', ()=>{
    it('should return response corectly', async()=>{
      const payload = {
        email : 'dumbways@mail.com',
        password : 'dumbwaysbest',
        fullname : 'dumbways Id'
      }
      const app = createServer(container);
      const response = await request(app)
        .post('/api/v1/register')
        .send(payload);
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.user.fullname).toEqual(payload.fullname);
      expect(responseJson.data.user.token).toBeDefined();
    });
    it('should response eror bad payload when send bad payload', async ()=>{
      payload = {
        email : 'badpayload',
        password : 'badpayload'
      }
      const app = createServer(container);
      const response = await request(app)
        .post('/api/v1/register')
        .send(payload);
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    })
    it('should response fail when email already registered', async ()=>{
      const payload = {
        email : 'dumbways@mail.com',
        password : 'dumbwaysbest',
        fullname : 'dumbways Id'
      }
      const app = createServer(container);
      await request(app)
        .post('/api/v1/register')
        .send(payload);
      const response = await request(app)
        .post('/api/v1/register')
        .send(payload);

      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Email already used');
    })
  })
})