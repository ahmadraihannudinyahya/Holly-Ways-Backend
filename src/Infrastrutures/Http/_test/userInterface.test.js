const request = require("supertest");
const createServer = require('../createServer');
const container = require('../../Container');

const UserTestHelper = require('../../../../test/UserTestHelper');

describe('test User Interface', ()=>{
  describe('endpoint get /user', ()=>{
    afterEach(async ()=>{
      await UserTestHelper.cleanTable();
    })
    const userRegistered = {
      email : 'userregistered@mail.com',
      password : 'supersecret',
      fullname : 'user registered'
    }
    beforeEach(async ()=>{
      const app = createServer(container);
      await request(app).post('/api/v1/register').send(userRegistered);
    })
    xit('should response All user registered', async ()=>{
      const app = createServer(container);
      const response = await request(app).get('/api/v1/user');
      const responseJson = JSON.parse(response.text);
      const {fullname, email }= responseJson.data.users[0];
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.users).lenght(1);
      expect(fullname).lenght(userRegistered.email);
      expect(email).lenght(userRegistered.email);
    });
    xit('should add response user when user has added', async()=>{
      const app = createServer(container);
      await request(app).post('/api/v1/register').send({
        email : 'user2@mail.com',
        fullname : 'user two test',
        password : 'nopassword'
      });
      const response = await request(app).get('/api/v1/user');
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.users).lenght(2);
    });
  });
  describe('endpoint delete /user', ()=>{
    const userDeleted = {
      email : 'userDeleted@mail.com',
      password : 'supersecret',
      fullname : 'user registered'
    }

    beforeEach(async ()=>{
      const app = createServer(container);
      // get token
      const responseToken = await request(app).post('/api/v1/register').send({
        email : userDeleted.email,
        password : userDeleted.password,
        fullname : userDeleted.fullname
      });
      const responseTokenJson = JSON.parse(responseToken.text);
      userDeleted.token = responseTokenJson.data.user.token;
      // get id
      const responseId = await request(app).get('/api/v1/user');
      const responseIdJson = JSON.parse(responseId.text);
      const [{id : userId}] = responseIdJson.data.users.filter(user => user.email === userDeleted.email)
      userDeleted.id = userId;
    })
    afterEach(async ()=>{
      await UserTestHelper.cleanTable();
    })
    it('should delete user corectly', async()=>{
      const app = createServer(container);
      const response = await request(app)
      .delete(`/api/v1/user/${userDeleted.id}`)
      .auth(userDeleted.token, {type : 'bearer'});
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.id).toEqual(userDeleted.id);
    });
    it('should response error when delete user without auth', async ()=>{
      const app = createServer(container);
      const response = await request(app)
      .delete(`/api/v1/user/${userDeleted.id}`);
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
    it('should response forbiden when user delete other user', async()=>{
      const app = createServer(container);
      const newUser = {
        email : 'newuser@mail.com',
        password : 'supersecret',
        fullname : 'user new'
      }

      // register user
      await request(app).post('/api/v1/register').send(newUser);
      // get id
      const responseId = await request(app).get('/api/v1/user');
      const responseIdJson = JSON.parse(responseId.text);
      const [{id : userId}] = responseIdJson.data.users.filter(user => user.email === newUser.email)
      newUser.id = userId;

      const response = await request(app)
      .delete(`/api/v1/user/${newUser.id}`)
      .auth(userDeleted.token, {type : 'bearer'});
      const responseJson = JSON.parse(response.text);
      expect(newUser.id).not.toEqual(userDeleted.id)
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
  });
});