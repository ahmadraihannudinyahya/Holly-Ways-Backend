const path = require('path');
const request = require('supertest');
const createServer = require('../createServer');
const container = require('../../Container');
const socket = require('../../SocketIoNotification/config');

const imagePathTest = path.join(__dirname, '../../../../test/testImage.jpg');
const UserTestHelper = require('../../../../test/UserTestHelper');

describe('test User Interface', () => {
  describe('endpoint get /user', () => {
    afterEach(async () => {
      await UserTestHelper.cleanTable();
    });
    const userRegistered = {
      email: 'userregistered@mail.com',
      password: 'supersecret',
      fullname: 'user registered',
    };
    beforeEach(async () => {
      const app = createServer(container);
      await request(app).post('/api/v1/register').send(userRegistered);
    });
    afterAll(() => {
      socket.disconnect();
    });
    it('should response All user registered', async () => {
      const app = createServer(container);
      const response = await request(app).get('/api/v1/user');
      const responseJson = JSON.parse(response.text);
      const { fullname, email } = responseJson.data.users[0];
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.users).toHaveLength(1);
      expect(fullname).toEqual(userRegistered.fullname);
      expect(email).toEqual(userRegistered.email);
    });
    it('should add response user when user has added', async () => {
      const app = createServer(container);
      await request(app).post('/api/v1/register').send({
        email: 'user2@mail.com',
        fullname: 'user two test',
        password: 'nopassword',
      });
      const response = await request(app).get('/api/v1/user');
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.users).toHaveLength(2);
    });
  });
  describe('endpoint delete /user', () => {
    const userDeleted = {
      email: 'userDeleted@mail.com',
      password: 'supersecret',
      fullname: 'user registered',
    };

    beforeEach(async () => {
      const app = createServer(container);
      // get token
      const responseToken = await request(app).post('/api/v1/register').send({
        email: userDeleted.email,
        password: userDeleted.password,
        fullname: userDeleted.fullname,
      });
      const responseTokenJson = JSON.parse(responseToken.text);
      userDeleted.token = responseTokenJson.data.user.token;
      // get id
      const responseId = await request(app).get('/api/v1/user');
      const responseIdJson = JSON.parse(responseId.text);
      const [{ id: userId }] = responseIdJson.data.users.filter((user) => user.email === userDeleted.email);
      userDeleted.id = userId;
    });
    afterEach(async () => {
      await UserTestHelper.cleanTable();
    });
    it('should delete user corectly', async () => {
      const app = createServer(container);
      const response = await request(app)
        .delete(`/api/v1/user/${userDeleted.id}`)
        .auth(userDeleted.token, { type: 'bearer' });
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.id).toEqual(userDeleted.id);
    });
    it('should response error when delete user without auth', async () => {
      const app = createServer(container);
      const response = await request(app)
        .delete(`/api/v1/user/${userDeleted.id}`);
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
    it('should response forbiden when user delete other user', async () => {
      const app = createServer(container);
      const newUser = {
        email: 'newuser@mail.com',
        password: 'supersecret',
        fullname: 'user new',
      };

      // register user
      await request(app).post('/api/v1/register').send(newUser);
      // get id
      const responseId = await request(app).get('/api/v1/user');
      const responseIdJson = JSON.parse(responseId.text);
      const [{ id: userId }] = responseIdJson.data.users.filter((user) => user.email === newUser.email);
      newUser.id = userId;

      const response = await request(app)
        .delete(`/api/v1/user/${newUser.id}`)
        .auth(userDeleted.token, { type: 'bearer' });
      const responseJson = JSON.parse(response.text);
      expect(newUser.id).not.toEqual(userDeleted.id);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
  });
  describe('endpoint get /profile', () => {
    afterEach(async () => {
      await UserTestHelper.cleanTable();
    });
    const userRegistered = {
      email: 'userregistered@mail.com',
      password: 'supersecret',
      fullname: 'user registered',
    };
    beforeEach(async () => {
      const app = createServer(container);
      const response = await request(app).post('/api/v1/register').send({
        email: userRegistered.email,
        password: userRegistered.password,
        fullname: userRegistered.fullname,
      });
      const responseJson = JSON.parse(response.text);
      userRegistered.token = responseJson.data.user.token;

      const responseId = await request(app).get('/api/v1/user');
      const responseIdJson = JSON.parse(responseId.text);
      const [{ id: userId }] = responseIdJson.data.users.filter((user) => user.email === userRegistered.email);
      userRegistered.id = userId;
    });
    it('should response profil corectly', async () => {
      const app = createServer(container);
      const response = await request(app).get('/api/v1/profil').auth(userRegistered.token, { type: 'bearer' });
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.user).toBeDefined();
      const {
        fullname, email, phone, image,
      } = responseJson.data.user;
      expect(fullname).toEqual(userRegistered.fullname);
      expect(email).toEqual(userRegistered.email);
      expect(phone).toEqual(null);
      expect(image).toEqual(null);
    });
    it('should response 403 when request without auth', async () => {
      const app = createServer(container);
      const response = await request(app).get('/api/v1/profil');
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
  });
  describe('endpoint patch /profile', () => {
    afterEach(async () => {
      await UserTestHelper.cleanTable();
    });
    const userRegistered = {
      email: 'userregistered@mail.com',
      password: 'supersecret',
      fullname: 'user registered',
    };
    beforeEach(async () => {
      const app = createServer(container);
      const response = await request(app).post('/api/v1/register').send({
        email: userRegistered.email,
        password: userRegistered.password,
        fullname: userRegistered.fullname,
      });
      const responseJson = JSON.parse(response.text);
      userRegistered.token = responseJson.data.user.token;

      const responseId = await request(app).get('/api/v1/user');
      const responseIdJson = JSON.parse(responseId.text);
      const [{ id: userId }] = responseIdJson.data.users.filter((user) => user.email === userRegistered.email);
      userRegistered.id = userId;
    });
    it('should response corectly', async () => {
      const app = createServer(container);
      const response = await request(app)
        .patch('/api/v1/profil')
        .auth(userRegistered.token, { type: 'bearer' })
        .type('form-data')
        .field('fullname', 'edited name');
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });
    it('should edit profile corectly', async () => {
      const app = createServer(container);
      await request(app)
        .patch('/api/v1/profil')
        .auth(userRegistered.token, { type: 'bearer' })
        .type('form-data')
        .field('fullname', 'edited name')
        .field('phone', '086792367')
        .attach('image', imagePathTest);
      const response = await request(app).get('/api/v1/profil').auth(userRegistered.token, { type: 'bearer' });
      const expectedProfile = JSON.parse(response.text);
      expect(expectedProfile.data.user.fullname).toEqual('edited name');
      expect(expectedProfile.data.user.phone).toEqual('086792367');
      expect(expectedProfile.data.user.image).not.toEqual(null);
    });
    it('should response error when request with bad payload', async () => {
      const app = createServer(container);
      const response = await request(app)
        .patch('/api/v1/profil')
        .auth(userRegistered.token, { type: 'bearer' })
        .type('form-data')
        .field('fullname', 'edited name')
        .field('phone', 'not number')
        .field('image', 'image.jpg');
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
    it('should response error when request without authenticaton', async () => {
      const app = createServer(container);
      const response = await request(app)
        .patch('/api/v1/profil')
        .type('form-data')
        .field('fullname', 'edited name');
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
    it('should response error when auth not valid', async () => {
      const app = createServer(container);
      const response = await request(app)
        .patch('/api/v1/profil')
        .auth('FakeToken.ForTest', { type: 'bearer' })
        .type('form-data')
        .field('fullname', 'edited name');
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
  });
});
