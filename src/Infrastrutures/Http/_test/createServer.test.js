const request = require("supertest");
const createServer = require('../createServer');
const container = require('../../Container');

describe("Test the root path", () => {
  it('shoild response 200', async ()=>{
    const app = createServer(container);
    const response = await request(app).get('/');
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual('Hello World!');
  })
});