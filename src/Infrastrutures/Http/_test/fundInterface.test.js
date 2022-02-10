const request = require("supertest");
const createServer = require('../createServer');
const container = require('../../Container');

const UserTestHelper = require('../../../../test/UserTestHelper');
const FundTestHelper = require('../../../../test/FundTestHelper');
const StorageTestHelper = require('../../../../test/StorageTestHelper');
const path = require("path");
const imagePathTest = path.join(__dirname, '../../../../test/testImage.jpg');
const socket = require('../../SocketIoNotification/config');
describe('Fund Interface Test', ()=>{
  const userTest = {
    email : 'usertest@mail.com',
    password : 'supersecret',
    fullname : 'user test'
  }
  const newUserTest = {
    email : 'newusertest@mail.com',
    password : 'supersecret',
    fullname : 'new user test'
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

    

    // get token new user test
    const newResponseToken = await request(app).post('/api/v1/register').send({
      email : newUserTest.email,
      password : newUserTest.password,
      fullname : newUserTest.fullname
    })
    const newResponseTokenJson = JSON.parse(newResponseToken.text);
    newUserTest.token = newResponseTokenJson.data.user.token;
    // get id new user test
    const newResponseId = await request(app).get('/api/v1/user');
    const newResponseIdJson = JSON.parse(newResponseId.text);
    const [{id : newUserId}] = newResponseIdJson.data.users.filter(user => user.email === newUserTest.email);
    newUserTest.id = newUserId;
  });

  afterAll(async ()=>{
    await UserTestHelper.cleanTable();
    socket.disconnect();
  })
  describe('endpoint post /fund', ()=>{
    afterEach(async ()=>{
      await FundTestHelper.cleanTable();
      StorageTestHelper.cleanStorage();
    });
    it('should response corectly', async ()=>{
      const payload = {
        title : 'this is title',
        goal : 65_000_000,
        description : 'descriptions for fund'
      }

      const app = createServer(container);
      const response = await request(app)
        .post('/api/v1/fund')
        .auth(userTest.token, {type : 'bearer'})
        .type('form-data')
        .field('title', payload.title)
        .field('description', payload.description)
        .field('goal', payload.goal)
        .attach('thumbnail', imagePathTest)
      const responseJson = JSON.parse(response.text);
      const {id, title, thumbnail, description, goal, donationObtained} = responseJson.data.fund
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.fund).toBeDefined();
      expect(id).toBeDefined();
      expect(thumbnail).toBeDefined();
      expect(title).toEqual(payload.title);
      expect(goal).toEqual(payload.goal);
      expect(description).toEqual(payload.description);
    });
    it('should add fund corectly', async ()=>{
      const payload = {
        title : 'this is title',
        goal : 65_000_000,
        description : 'descriptions for fund'
      }

      const app = createServer(container);
      const responseFund = await request(app)
        .post('/api/v1/fund')
        .auth(userTest.token, {type : 'bearer'})
        .type('form-data')
        .field('title', payload.title)
        .field('description', payload.description)
        .field('goal', payload.goal)
        .attach('thumbnail', imagePathTest);
      const responseFundJson = JSON.parse(responseFund.text);
      const {id : fundId} = responseFundJson.data.fund

      const response = await request(app).get(`/api/v1/fund/${fundId}`);
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.fund).toBeDefined()
    })
    it('should response 400 bad request when request body not contain needed property', async ()=>{
      const payload = {
        title : 'this is title',
        goal : 65_000_000,
        description : 'descriptions for fund'
      }

      const app = createServer(container);
      const response = await request(app)
        .post('/api/v1/fund')
        .auth(userTest.token, {type : 'bearer'})
        .type('form-data')
        .field('title', payload.title)
        .field('goal', payload.goal)
        .field('description', payload.description)
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).not.toEqual('Internal Server Error');
    });
    it('should response fail forbiden when request withou authentication', async ()=>{
      const payload = {
        title : 'this is title',
        goal : 65_000_000,
        description : 'descriptions for fund'
      }

      const app = createServer(container);
      const response = await request(app)
        .post('/api/v1/fund')
        .type('form-data')
        .field('title', payload.title)
        .field('goal', payload.goal)
        .field('description', payload.description)
        .attach('thumbnail', imagePathTest)
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).not.toEqual('Internal Server Error');
    });
  });
  describe('endpoint Get /fund', ()=>{
    const testFund1 = {
      title : 'this is title',
      goal : 10000000,
      description : 'not have description, just for test'
    };
    const testFund2 = {
      title : 'title is here',
      goal : 20000000,
      description : 'not have description, just for test'
    }
    beforeEach(async ()=>{
      const app = createServer(container);
      // add fund 1 and get id
      const response1 = await request(app)
      .post('/api/v1/fund')
      .auth(userTest.token, {type : 'bearer'})
      .type('form-data')
      .field('title', testFund1.title)
      .field('goal', testFund1.goal)
      .field('description', testFund1.description)
      .attach('thumbnail', imagePathTest) 
      const response1Json = JSON.parse(response1.text);
      testFund1.id = response1Json.data.fund.id;
      // add fund 2 and get id
      const response2 = await request(app)
      .post('/api/v1/fund')
      .auth(userTest.token, {type : 'bearer'})
      .type('form-data')
      .field('title', testFund2.title)
      .field('goal', testFund2.goal)
      .field('description', testFund2.description)
      .attach('thumbnail', imagePathTest) 
      const response2Json = JSON.parse(response2.text);
      testFund2.id = response2Json.data.fund.id;

    })
    afterEach(async ()=>{
      await FundTestHelper.cleanTable();
      StorageTestHelper.cleanStorage();
    });
    it('should response data fund corectly', async()=>{
      const app = createServer(container);
      const response = await request(app).get('/api/v1/fund');
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.funds).toBeDefined();
      expect(responseJson.data.funds).toHaveLength(2);
    });
  });
  describe('endpoint Get /fund/:fundId', ()=>{
    const testFund1 = {
      title : 'this is title',
      goal : 10000000,
      description : 'not have description, just for test'
    };
    const testFund2 = {
      title : 'title is here',
      goal : 20000000,
      description : 'not have description, just for test'
    }
    beforeEach(async ()=>{
      const app = createServer(container);
      // add fund 1 and get id
      const response1 = await request(app)
      .post('/api/v1/fund')
      .auth(userTest.token, {type : 'bearer'})
      .type('form-data')
      .field('title', testFund1.title)
      .field('goal', testFund1.goal)
      .field('description', testFund1.description)
      .attach('thumbnail', imagePathTest) 
      const response1Json = JSON.parse(response1.text);
      testFund1.id = response1Json.data.fund.id;
      // add fund 2 and get id
      const response2 = await request(app)
      .post('/api/v1/fund')
      .auth(userTest.token, {type : 'bearer'})
      .type('form-data')
      .field('title', testFund2.title)
      .field('goal', testFund2.goal)
      .field('description', testFund2.description)
      .attach('thumbnail', imagePathTest) 
      const response2Json = JSON.parse(response2.text);
      testFund2.id = response2Json.data.fund.id;
    })
    afterEach(async ()=>{
      await FundTestHelper.cleanTable();
      StorageTestHelper.cleanStorage();
    });
    it('should response fund object corectlty', async ()=>{
      const app = createServer(container);
      const response = await request(app).get(`/api/v1/fund/${testFund1.id}`);
      const responseJson = JSON.parse(response.text);
      const {id, title, thumbnail, goal, description, donationObtained, postAt, donationCount } = responseJson.data.fund;
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.fund).toBeDefined();
      expect(id).toBeDefined();
      expect(thumbnail).toBeDefined();
      expect(title).toEqual(testFund1.title);
      expect(goal).toEqual(testFund1.goal);
      expect(description).toEqual(testFund1.description);
      expect(donationObtained).toEqual(0);
      expect(donationCount).toEqual(0);
      expect(postAt).toBeDefined();
    });
    it('should response fail 404 when fund id not found', async ()=>{
      const app = createServer(container);
      const response = await request(app).get(`/api/v1/fund/fake-fund-id`);
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
  });
  describe('endPoint Patch /fund/:fundId', ()=>{
    const testFund1 = {
      title : 'this is title',
      goal : 10000000,
      description : 'not have description, just for test'
    };
    const testFund2 = {
      title : 'title is here',
      goal : 20000000,
      description : 'not have description, just for test'
    }
    beforeEach(async ()=>{
      const app = createServer(container);
      // add fund 1 and get id
      const response1 = await request(app)
      .post('/api/v1/fund')
      .auth(userTest.token, {type : 'bearer'})
      .type('form-data')
      .field('title', testFund1.title)
      .field('goal', testFund1.goal)
      .field('description', testFund1.description)
      .attach('thumbnail', imagePathTest) 
      const response1Json = JSON.parse(response1.text);
      testFund1.id = response1Json.data.fund.id;
      // add fund 2 and get id
      const response2 = await request(app)
      .post('/api/v1/fund')
      .auth(userTest.token, {type : 'bearer'})
      .type('form-data')
      .field('title', testFund2.title)
      .field('goal', testFund2.goal)
      .field('description', testFund2.description)
      .attach('thumbnail', imagePathTest) 
      const response2Json = JSON.parse(response2.text);
      testFund2.id = response2Json.data.fund.id;
    })
    afterEach(async ()=>{
      await FundTestHelper.cleanTable();
      StorageTestHelper.cleanStorage();
    });

    it('should response edited fund corectly', async()=>{
      const app = createServer(container);
      const response = await request(app)
        .patch(`/api/v1/fund/${testFund1.id}`)
        .auth(userTest.token, {type : 'bearer'})
        .type('form-data')
        .field('title', 'edited title');
      const responseJson = JSON.parse(response.text);
      const { id, title, thumbnail, goal, description} = responseJson.data.fund
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.fund).toBeDefined();
      expect(id).toBeDefined();
      expect(thumbnail).toBeDefined();
      expect(title).not.toEqual(testFund1.title);
      expect(title).toEqual('edited title');
      expect(goal).toEqual(testFund1.goal);
      expect(description).toEqual(testFund1.description);
    });
    it('should edit fund corectly', async ()=>{
      const app = createServer(container);
      await request(app)
        .patch(`/api/v1/fund/${testFund1.id}`)
        .auth(userTest.token, {type : 'bearer'})
        .type('form-data')
        .field('title', 'edited title')
        .attach('thumbnail', imagePathTest);

      const response = await request(app).get(`/api/v1/fund/${testFund1.id}`);
      const responseJson = JSON.parse(response.text);
      expect(responseJson.data.fund.title).toEqual('edited title');
    });
    it('should response fail when request with bad payload', async () => {
      const app = createServer(container);
      const response = await request(app)
        .patch(`/api/v1/fund/${testFund1.id}`)
        .auth(userTest.token, {type : 'bearer'})
        .type('form-data')
        .field('title', 'title')
        .field('goal', 'not number');
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
    it('should response fail when edit fund with other user', async ()=>{
      const app = createServer(container);
      const response = await request(app)
        .patch(`/api/v1/fund/${testFund1.id}`)
        .auth(newUserTest.token, {type : 'bearer'})
        .type('form-data')
        .field('title', 'edited title');
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
    it('should response fail 404 when edit not found fund', async ()=>{
      const app = createServer(container);
      const response = await request(app)
        .patch(`/api/v1/fund/fake-fundid`)
        .auth(userTest.token, {type : 'bearer'})
        .type('form-data')
        .field('title', 'edited title');
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
  });
  describe('endPoint delete /fund/:fundId', ()=>{
    const testFund1 = {
      title : 'this is title',
      goal : 10000000,
      description : 'not have description, just for test'
    };
    const testFund2 = {
      title : 'title is here',
      goal : 20000000,
      description : 'not have description, just for test'
    }
    beforeEach(async ()=>{
      const app = createServer(container);
      // add fund 1 and get id
      const response1 = await request(app)
      .post('/api/v1/fund')
      .auth(userTest.token, {type : 'bearer'})
      .type('form-data')
      .field('title', testFund1.title)
      .field('goal', testFund1.goal)
      .field('description', testFund1.description)
      .attach('thumbnail', imagePathTest) 
      const response1Json = JSON.parse(response1.text);
      testFund1.id = response1Json.data.fund.id;
      // add fund 2 and get id
      const response2 = await request(app)
      .post('/api/v1/fund')
      .auth(userTest.token, {type : 'bearer'})
      .type('form-data')
      .field('title', testFund2.title)
      .field('goal', testFund2.goal)
      .field('description', testFund2.description)
      .attach('thumbnail', imagePathTest) 
      const response2Json = JSON.parse(response2.text);
      testFund2.id = response2Json.data.fund.id;
    })
    afterEach(async ()=>{
      await FundTestHelper.cleanTable();
      StorageTestHelper.cleanStorage();
    });
    it('should response id corectly', async ()=>{
      const app = createServer(container);
      const response = await request(app)
        .delete(`/api/v1/fund/${testFund1.id}`)
        .auth(userTest.token, {type : 'bearer'})
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.id).toEqual(testFund1.id);
    });
    it('should response 404 when fund not found', async ()=>{
      const app = createServer(container);
      const response = await request(app)
        .delete(`/api/v1/fund/fake-fundid`)
        .auth(userTest.token, {type : 'bearer'})
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
    it('should response 403 when request without auth', async ()=>{
      const app = createServer(container);
      const response = await request(app)
        .delete(`/api/v1/fund/${testFund1.id}`)
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
    it('should response error 403 when fund not owner',async ()=>{
      const app = createServer(container);
      const response = await request(app)
        .delete(`/api/v1/fund/${testFund1.id}`)
        .auth(newUserTest.token, {type : 'bearer'})
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
  });
  describe('endPoint /myfund', ()=>{
    const testFund1 = {
      title : 'this is title',
      goal : 10000000,
      description : 'not have description, just for test'
    };
    const testFund2 = {
      title : 'title is here',
      goal : 20000000,
      description : 'not have description, just for test'
    }
    beforeEach(async ()=>{
      const app = createServer(container);
      // add fund 1 and get id
      const response1 = await request(app)
      .post('/api/v1/fund')
      .auth(userTest.token, {type : 'bearer'})
      .type('form-data')
      .field('title', testFund1.title)
      .field('goal', testFund1.goal)
      .field('description', testFund1.description)
      .attach('thumbnail', imagePathTest) 
      const response1Json = JSON.parse(response1.text);
      testFund1.id = response1Json.data.fund.id;
      // add fund 2 and get id
      const response2 = await request(app)
      .post('/api/v1/fund')
      .auth(userTest.token, {type : 'bearer'})
      .type('form-data')
      .field('title', testFund2.title)
      .field('goal', testFund2.goal)
      .field('description', testFund2.description)
      .attach('thumbnail', imagePathTest) 
      const response2Json = JSON.parse(response2.text);
      testFund2.id = response2Json.data.fund.id;
    })
    afterEach(async ()=>{
      await FundTestHelper.cleanTable();
      StorageTestHelper.cleanStorage();
    });
    it('should response array of object fund corectly', async()=>{
      const app = createServer(container);
      const response = await request(app).get('/api/v1/myfund').auth(userTest.token, {type :'bearer'});
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.funds).toBeDefined();
      expect(responseJson.data.funds).toHaveLength(2);
    });
    it('should response users funds corectly', async ()=>{
      const app = createServer(container);
      const response = await request(app).get('/api/v1/myfund').auth(newUserTest.token, {type :'bearer'});
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.funds).toBeDefined();
      expect(responseJson.data.funds).toHaveLength(0);
    });
    it('should response fund object corectlty', async ()=>{
      const app = createServer(container);
      const response = await request(app).get('/api/v1/myfund').auth(userTest.token, {type :'bearer'});
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.funds).toBeDefined();
      expect(responseJson.data.funds).toHaveLength(2);
      const {id, title, thumbnail, description, goal, donationObtained} = responseJson.data.funds[0];
      expect(id).toEqual(testFund1.id);
      expect(title).toEqual(testFund1.title);
      expect(thumbnail).toBeDefined()
      expect(description).toEqual(testFund1.description);
      expect(goal).toEqual(testFund1.goal);
      expect(donationObtained).toEqual(0);
    })
    it('should response 403 when request without auth', async ()=>{
      const app = createServer(container);
      const response = await request(app).get('/api/v1/myfund');
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
  })
});