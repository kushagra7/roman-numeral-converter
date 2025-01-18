const request = require('supertest');
const app = require('../src/server'); // Adjust based on your directory structure
jest.mock('axios');
const axios = require('axios');

describe('API Gateway Tests', () => {
  it('should return converted Roman numeral for valid input', async () => {
    axios.get.mockResolvedValue({ data: { input: "10", output: "X" } });
    const response = await request(app).get('/romannumeral?query=10');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ input: "10", output: "X" });
  });

  it('should return 400 for invalid input', async () => {
    const response = await request(app).get('/romannumeral?query=4000');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Number must be between 1 and 3999");
  });

  it('should return 500 if converter-service is unavailable', async () => {
    axios.get.mockRejectedValue(new Error('Service unavailable'));
    const response = await request(app).get('/romannumeral?query=10');
    expect(response.status).toBe(500);
    expect(response.text).toBe("Internal server error"); // Adjusted to match the actual response
  });

});
