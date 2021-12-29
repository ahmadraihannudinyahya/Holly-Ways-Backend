const request = require("supertest");
const createServer = require('../createServer');
const container = require('../../Container');

const UserTestHelper = require('../../../../test/UserTestHelper');
const FundTestHelper = require('../../../../test/FundTestHelper');
const StorageTestHelper = require('../../../../test/StorageTestHelper');
const path = require("path");
const imagePathTest = path.join(__dirname, '../../../../test/testImage.jpg')

describe('create server test', ()=>{
  it('should return app object corectly', ()=>{
    const app = createServer(container);
    expect(app).toBeDefined();
  });
  it('should handle error corectly', async()=>{
    const app = createServer({});
    const response = await request(app).get('/unregisteredroute');
    expect(response.statusCode).toEqual(404);
  });
  it('should response 500 server error corectly', async ()=>{
    const app = createServer({});
    const response = await request(app).get('/api/v1/fund');
    expect(response.statusCode).toEqual(500);
  });
  describe('test access file upload', ()=>{
    const userTest = {
      email : 'usertest@mail.com',
      password : 'supersecret',
      fullname : 'user test'
    }
    const fund = {
      title : 'this is title',
      goal : 65_000_000,
      description : 'descriptions for fund'
    }
    beforeAll(async ()=>{
      const app = createServer(container);
      // get token user test
      const responseToken = await request(app).post('/api/v1/register').send({
        email : userTest.email,
        password : userTest.password,
        fullname : userTest.fullname
      })
      const responseTokenJson = JSON.parse(responseToken.text);
      userTest.token = responseTokenJson.data.user.token;
      // get id user test
      const responseId = await request(app).get('/api/v1/user');
      const responseIdJson = JSON.parse(responseId.text);
      const [{id : userId}] = responseIdJson.data.users.filter(user => user.email === userTest.email);
      userTest.id = userId;

      // post fund
      const response = await request(app)
        .post('/api/v1/fund')
        .auth(userTest.token, {type : 'bearer'})
        .type('form-data')
        .field('title', fund.title)
        .field('description', fund.description)
        .field('goal', fund.goal)
        .attach('thumbnail', imagePathTest);
      const responseJson = JSON.parse(response.text);
      const {thumbnail} = responseJson.data.fund
      fund.addedThumnail = thumbnail;
    });
  
    afterAll(async ()=>{
      await UserTestHelper.cleanTable();
    })
    afterEach(async ()=>{
      await FundTestHelper.cleanTable();
      StorageTestHelper.cleanStorage();
    });
    it('should not response 404 when access file uploaded', async ()=>{
      const app = createServer(container);
      const path = fund.addedThumnail.split('/');
      const response = await request(app).get(`/file/${path[path.length-1]}`);
      console.log(path[path.length-1]);
      expect(response.statusCode).toEqual(200);
    })
  })
})