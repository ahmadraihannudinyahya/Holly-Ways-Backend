const request = require("supertest");
const createServer = require('../createServer');
const container = require('../../Container');

const UserTestHelper = require('../../../../test/UserTestHelper');
const FundTestHelper = require('../../../../test/FundTestHelper');
const DonationTestHelper = require('../../../../test/DonationTestHelper');
const StorageTestHelper = require('../../../../test/StorageTestHelper');
const path = require("path");
const exp = require("constants");
const imagePathTest = path.join(__dirname, '../../../../test/testImage.jpg');

describe('Donation interface test', ()=>{
  const userTest1 = {
    email : 'usertest1@gmail.com',
    fullname : 'user test 1',
    password : 'supersecret'
  }
  const userTest2 = {
    email : 'usertest2@gmail.com',
    fullname : 'user test 2',
    password : 'super secret'
  }
  const fundTest1 = {
    title : 'this is title',
    goal : 10000000,
    description : 'not have description, this just test'
  }
  const fundTest2 = {
    title : 'title is here',
    goal : 20000000,
    description : 'not have description, this just test'
  }
  beforeAll(async () =>{
    const app = createServer(container);
    // get token user test 1
    const responseToken = await request(app).post('/api/v1/register').send({
      email : userTest1.email,
      password : userTest1.password,
      fullname : userTest1.fullname
    })
    const responseTokenJson = JSON.parse(responseToken.text);
    userTest1.token = responseTokenJson.data.user.token;
    // get id user test 1
    const responseId = await request(app).get('/api/v1/user');
    const responseIdJson = JSON.parse(responseId.text);
    const [{id : userId}] = responseIdJson.data.users.filter(user => user.email === userTest1.email);
    userTest1.id = userId;

    // get token new user test 2
    const newResponseToken = await request(app).post('/api/v1/register').send({
      email : userTest2.email,
      password : userTest2.password,
      fullname : userTest2.fullname
    })
    const newResponseTokenJson = JSON.parse(newResponseToken.text);
    userTest2.token = newResponseTokenJson.data.user.token;
    // get id new user test 3
    const newResponseId = await request(app).get('/api/v1/user');
    const newResponseIdJson = JSON.parse(newResponseId.text);
    const [{id : newUserId}] = newResponseIdJson.data.users.filter(user => user.email === userTest2.email);
    userTest2.id = newUserId;

    // get id fund test 1 
    const responseFund1 = await request(app)
      .post('/api/v1/fund')
      .auth(userTest1.token, {type : 'bearer'})
      .type('form-data')
      .field('title', fundTest1.title)
      .field('description', fundTest1.description)
      .field('goal', fundTest1.goal)
      .attach('thumbnail', imagePathTest)
    const responseFund1Json = JSON.parse(responseFund1.text);
    fundTest1.id = responseFund1Json.data.fund.id

    // get id fund test 2
    const responseFund2 = await request(app)
      .post('/api/v1/fund')
      .auth(userTest2.token, {type : 'bearer'})
      .type('form-data')
      .field('title', fundTest2.title)
      .field('description', fundTest2.description)
      .field('goal', fundTest2.goal)
      .attach('thumbnail', imagePathTest)
    const responseFund2Json = JSON.parse(responseFund2.text);
    fundTest2.id = responseFund2Json.data.fund.id
  });
  afterAll(async ()=>{
    await FundTestHelper.cleanTable();
    await UserTestHelper.cleanTable();
    StorageTestHelper.cleanStorage();
  })
  afterEach(async ()=>{
    await DonationTestHelper.cleanTable();
  })

  describe('endPoint Post /donation/fund/:fundId', ()=>{
    it('should response corectly', async ()=>{
      const app = createServer(container);
      const response = await request(app)
        .post(`/api/v1/donation/fund/${fundTest1.id}`)
        .auth(userTest1.token, {type : 'bearer'})
        .type('form-data')
        .field('donateAmount', 100000)
        .attach('proofAttachment', imagePathTest);
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.id).toBeDefined();
    });
    it('should add donation corectly', async ()=>{
      const app = createServer(container);
      await request(app)
        .post(`/api/v1/donation/fund/${fundTest1.id}`)
        .auth(userTest1.token, {type : 'bearer'})
        .type('form-data')
        .field('donateAmount', 100000)
        .attach('proofAttachment', imagePathTest);
      
      const response = await request(app)
        .get(`/api/v1/donation/fund/${fundTest1.id}`)
        .auth(userTest1.token, {type : 'bearer'});
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.donations).toHaveLength(1);
    })
    it('should add donationObtained corectly', async ()=>{
      const app = createServer(container);
      await request(app)
        .post(`/api/v1/donation/fund/${fundTest1.id}`)
        .auth(userTest1.token, {type : 'bearer'})
        .type('form-data')
        .field('donateAmount', 100000)
        .attach('proofAttachment', imagePathTest);
      
      const response = await request(app)
        .get(`/api/v1/fund/${fundTest1.id}`)
        .auth(userTest1.token, {type : 'bearer'});
      const responseJson = JSON.parse(response.text);
      const { id,  donationObtained } = responseJson.data.fund;
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.fund).toBeDefined();
      expect(id).toEqual(fundTest1.id);
      expect(donationObtained).toEqual(100000);
    });
    it('should add donationObtained corectly when get all fund', async ()=>{
      const app = createServer(container);
      await request(app)
        .post(`/api/v1/donation/fund/${fundTest1.id}`)
        .auth(userTest1.token, {type : 'bearer'})
        .type('form-data')
        .field('donateAmount', 100000)
        .attach('proofAttachment', imagePathTest);
      
      const response = await request(app)
        .get(`/api/v1/fund`)
      const responseJson = JSON.parse(response.text);
      const { id,  donationObtained } = responseJson.data.funds[0];
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.funds).toBeDefined();
      expect(id).toEqual(fundTest1.id);
      expect(donationObtained).toEqual(100000);
    });
    it('should response fail when payload not contain data needed', async ()=>{
      const app = createServer(container);
      const response = await request(app)
        .post(`/api/v1/donation/fund/${fundTest1.id}`)
        .auth(userTest1.token, {type : 'bearer'})
        .type('form-data')
        .attach('proofAttachment', imagePathTest);
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
    it('should response 400 when not have image request', async ()=>{
      const app = createServer(container);
      const response = await request(app)
        .post(`/api/v1/donation/fund/${fundTest1.id}`)
        .auth(userTest1.token, {type : 'bearer'})
        .type('form-data')
        .field('donateAmount', 100000);
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
    it('should response 403 when request without auth', async ()=>{
      const app = createServer(container);
      const response = await request(app)
        .post(`/api/v1/donation/fund/${fundTest1.id}`)
        .type('form-data')
        .field('donateAmount', 100000)
        .attach('proofAttachment', imagePathTest);
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
  });
  describe('endPonit get /donation/fund/:fundId', ()=>{
    const donationTest1 = {
      donateAmount : 40000
    }
    const donationTest2 = {
      donateAmount : 50000
    }
    beforeEach(async ()=>{
      const app = createServer(container);
      // get id donationtest1
      const responseDonation1 = await request(app)
        .post(`/api/v1/donation/fund/${fundTest1.id}`)
        .auth(userTest1.token, {type : 'bearer'})
        .type('form-data')
        .field('donateAmount', donationTest1.donateAmount)
        .attach('proofAttachment', imagePathTest);
      const responseDonation1Json = JSON.parse(responseDonation1.text);
      donationTest1.id = responseDonation1Json.data.id;

      // get id donationTest2
      const responseDonation2 = await request(app)
        .post(`/api/v1/donation/fund/${fundTest2.id}`)
        .auth(userTest2.token, {type : 'bearer'})
        .type('form-data')
        .field('donateAmount', donationTest2.donateAmount)
        .attach('proofAttachment', imagePathTest);
      const responseDonation2Json = JSON.parse(responseDonation2.text);
      donationTest2.id = responseDonation2Json.data.id;
    });

    it('should response corectly', async()=>{
      const app = createServer(container);
      const response = await request(app)
        .get(`/api/v1/donation/fund/${fundTest1.id}`)
        .auth(userTest1.token, {type : 'bearer'});
      const responseJson = JSON.parse(response.text);
      const {id, fullname, email, donateAmount, status, proofAttachment, postAt} = responseJson.data.donations[0];
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.donations).toBeDefined()
      expect(responseJson.data.donations).toHaveLength(1);
      expect(id).toBeDefined();
      expect(proofAttachment).toBeDefined();
      expect(fullname).toEqual(userTest1.fullname);
      expect(donateAmount).toEqual(donationTest1.donateAmount);
      expect(status).toEqual('pending');
      expect(email).toEqual(userTest1.email);
      expect(postAt).toBeDefined();
    });
    it('should add response data when donation added', async ()=>{
      const app = createServer(container);
      await request(app)
        .post(`/api/v1/donation/fund/${fundTest1.id}`)
        .auth(userTest2.token, {type : 'bearer'})
        .type('form-data')
        .field('donateAmount', 1000000)
        .attach('proofAttachment', imagePathTest);

      const response = await request(app)
        .get(`/api/v1/donation/fund/${fundTest1.id}`)
        .auth(userTest1.token, {type : 'bearer'});
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.donations).toHaveLength(2);
      expect(responseJson.data.donations[0].id).toEqual(donationTest1.id);
      expect(responseJson.data.donations[1].donateAmount).toEqual(1000000);
    });
    it('should response accepted only donations when user not owner fund', async ()=>{
      const app = createServer(container);
      const response = await request(app)
        .get(`/api/v1/donation/fund/${fundTest1.id}`)
        .auth(userTest2.token, {type : 'bearer'});
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.donations).toHaveLength(0);
    })
  });
  describe('endpoint Patch /donation/:donationId/fund/:fundId', ()=>{
    const donationTest1 = {
      donateAmount : 40000
    }
    const donationTest2 = {
      donateAmount : 50000
    }
    beforeEach(async ()=>{
      const app = createServer(container);
      // get id donationtest1
      const responseDonation1 = await request(app)
        .post(`/api/v1/donation/fund/${fundTest1.id}`)
        .auth(userTest1.token, {type : 'bearer'})
        .type('form-data')
        .field('donateAmount', donationTest1.donateAmount)
        .attach('proofAttachment', imagePathTest);
      const responseDonation1Json = JSON.parse(responseDonation1.text);
      donationTest1.id = responseDonation1Json.data.id;

      // get id donationTest2
      const responseDonation2 = await request(app)
        .post(`/api/v1/donation/fund/${fundTest2.id}`)
        .auth(userTest2.token, {type : 'bearer'})
        .type('form-data')
        .field('donateAmount', donationTest2.donateAmount)
        .attach('proofAttachment', imagePathTest);
      const responseDonation2Json = JSON.parse(responseDonation2.text);
      donationTest2.id = responseDonation2Json.data.id;
    });
    it('should response corectly', async()=>{
      const app = createServer(container);
      const response = await request(app)
        .patch(`/api/v1/donation/${donationTest1.id}/fund/${fundTest1.id}`)
        .auth(userTest1.token, {type : 'bearer'});
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.id).toEqual(donationTest1.id);
    });
    it('should response 404 when donation not found', async ()=>{
      const app = createServer(container);
      const response = await request(app)
        .patch(`/api/v1/donation/fake-donationid/fund/${fundTest1.id}`)
        .auth(userTest1.token, {type : 'bearer'});
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    })
    it('should response 403 when request without auth', async ()=>{
      const app = createServer(container);
      const response = await request(app)
        .patch(`/api/v1/donation/${donationTest1.id}/fund/${fundTest1.id}`)
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
    it('should response 403 when user request not fund owner', async ()=>{
      const app = createServer(container);
      const response = await request(app)
        .patch(`/api/v1/donation/${donationTest1.id}/fund/${fundTest1.id}`)
        .auth(userTest2.token, {type : 'bearer'});
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
  });
  describe('endPoint /mydonation', ()=>{
    const donationTest1 = {
      donateAmount : 40000
    }
    const donationTest2 = {
      donateAmount : 50000
    }
    beforeEach(async ()=>{
      const app = createServer(container);
      // get id donationtest1
      const responseDonation1 = await request(app)
        .post(`/api/v1/donation/fund/${fundTest1.id}`)
        .auth(userTest1.token, {type : 'bearer'})
        .type('form-data')
        .field('donateAmount', donationTest1.donateAmount)
        .attach('proofAttachment', imagePathTest);
      const responseDonation1Json = JSON.parse(responseDonation1.text);
      donationTest1.id = responseDonation1Json.data.id;

      // get id donationTest2
      const responseDonation2 = await request(app)
        .post(`/api/v1/donation/fund/${fundTest2.id}`)
        .auth(userTest2.token, {type : 'bearer'})
        .type('form-data')
        .field('donateAmount', donationTest2.donateAmount)
        .attach('proofAttachment', imagePathTest);
      const responseDonation2Json = JSON.parse(responseDonation2.text);
      donationTest2.id = responseDonation2Json.data.id;
    });
    it('should reponse object corectly', async ()=>{
      const app = createServer(container);
      const response = await request(app).get('/api/v1/mydonation').auth(userTest1.token, {type : 'bearer'});
      const responseJson = JSON.parse(response.text);
      const {id, donateAmount, status, proofAttachment, createdAt, fundTitle} =responseJson.data.donations[0]
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.donations).toBeDefined();
      expect(responseJson.data.donations).toHaveLength(1);
      expect(id).toBeDefined();
      expect(donateAmount).toEqual(donationTest1.donateAmount);
      expect(status).toEqual('pending');
      expect(proofAttachment).toBeDefined();
      expect(createdAt).toBeDefined();
      expect(fundTitle).toEqual(fundTest1.title);
    });
    it('should response donations corectly when has added donation',async ()=>{
      const app = createServer(container);
      await request(app)
        .post(`/api/v1/donation/fund/${fundTest1.id}`)
        .auth(userTest2.token, {type : 'bearer'})
        .type('form-data')
        .field('donateAmount', 200000)
        .attach('proofAttachment', imagePathTest);
      const response = await request(app).get('/api/v1/mydonation').auth(userTest2.token, {type : 'bearer'});
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.donations).toBeDefined();
      expect(responseJson.data.donations).toHaveLength(2);
    });
    it('should response 403 when request without auth', async ()=>{
      const app = createServer(container);
      const response = await request(app).get('/api/v1/mydonation');
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    })
  });
});