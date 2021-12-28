const request = require("supertest");
const createServer = require('../createServer');
const container = require('../../Container');

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
  })
})