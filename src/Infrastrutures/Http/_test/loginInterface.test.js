const request = require("supertest");
const createServer = require('../createServer');
const container = require('../../Container');
const socket = require('../../SocketIoNotification/config');


const UserTestHelper = require('../../../../test/UserTestHelper');

describe('test interface login', ()=>{
  const UserRegistered = {
    email : 'dumbways@mai.com',
    fullname : 'dumbways best',
    password : 'supersecretpass'
  }
  beforeAll(async ()=>{
    const app = createServer(container);
    await request(app)
      .post('/api/v1/register')
      .send(UserRegistered);
  })
  afterAll(async ()=>{
    await UserTestHelper.cleanTable();
    socket.disconnect();
  })
  describe('test endpoint post /login', ()=>{
    it('should response corectly', async ()=>{
      const app = createServer(container);
      const response = await request(app)
      .post('/api/v1/login')
      .send({
        email : UserRegistered.email,
        password : UserRegistered.password
      });
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.user.fullname).toEqual(UserRegistered.fullname);
      expect(responseJson.data.user.email).toEqual(UserRegistered.email);
      expect(responseJson.data.user.token).toBeDefined();
    });
    it('should response fail when user uregistered', async ()=>{
      const app = createServer(container);
      const response = await request(app)
      .post('/api/v1/login')
      .send({
        email : 'unregistered@mail.com',
        password : UserRegistered.password
      });
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Email isnt registered, please register');
    });
    it('should response fail when password wrong', async()=>{
      const app = createServer(container);
      const response = await request(app)
      .post('/api/v1/login')
      .send({
        email : UserRegistered.email,
        password : 'wrongPassword'
      });
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Password wrong');
    })
  })
})