import request from 'supertest';

const apiUrl = 'http://localhost:8000/train/alltrain'; // Update with the correct API URL

describe('GET /alltrain', () => {
  it('should get all trains', async () => {
    const response = await request(apiUrl).get('');

    expect(response.status).toBe(201); // Check if the response status is 201
    expect(response.body).toBeDefined(); // Check if the response body is defined
  });

  it('should handle errors', async () => {
    const response = await request(apiUrl).get('');

    expect(response.status).toBe(422); // Check if the response status is 422
    expect(response.body.error).toBeDefined(); // Check if the error field is defined in the response body
  });
});
