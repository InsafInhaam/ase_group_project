// import request from 'supertest';
// import express from 'express';
// import trainRoutes from '../routes/TrainRoute'; // Update the path as needed

// const app = express();
// app.use('/', trainRoutes);

// describe('GET /alltrain', () => {
//   it('should respond with JSON containing a list of trains', async () => {
//     const response = await request(app).get('/alltrain');

//     expect(response.status).toBe(201); // Assuming successful response status is 201
//     expect(response.type).toBe('application/json');
//     expect(response.body).toEqual(expect.arrayContaining([])); // Update with your expected data

//     // You can add more assertions based on your actual data structure
//   });

//   it('should respond with error JSON if something goes wrong', async () => {
//     // Mock the Train.find() function to simulate an error
//     const originalFind = Train.find;
//     Train.find = jest.fn(() => {
//       throw new Error('Mocked error');
//     });

//     const response = await request(app).get('/alltrain');

//     expect(response.status).toBe(422); // Assuming error response status is 422
//     expect(response.type).toBe('application/json');
//     expect(response.body).toEqual({ error: 'Mocked error' });

//     // Restore the original function after the test
//     Train.find = originalFind;
//   });
// });

// const request = require('supertest');
// const express = require('express');
// const trainRoutes = require('../routes/TrainRoute'); // Update the path as needed

// const app = express();
// app.use('/', trainRoutes);

// describe('GET /alltrain', () => {
//   it('should respond with JSON containing a list of trains', async () => {
//     const response = await request(app).get('/alltrain');

//     expect(response.status).toBe(201); // Assuming successful response status is 201
//     expect(response.type).toBe('application/json');
//     expect(response.body).toEqual(expect.arrayContaining([])); // Update with your expected data

//     // You can add more assertions based on your actual data structure
//   });

//   it('should respond with error JSON if something goes wrong', async () => {
//     // Mock the Train.find() function to simulate an error
//     const originalFind = Train.find;
//     Train.find = jest.fn(() => {
//       throw new Error('Mocked error');
//     });

//     const response = await request(app).get('/alltrain');

//     expect(response.status).toBe(422); // Assuming error response status is 422
//     expect(response.type).toBe('application/json');
//     expect(response.body).toEqual({ error: 'Mocked error' });

//     // Restore the original function after the test
//     Train.find = originalFind;
//   });
// });

// import request from 'supertest';
// import express from 'express';
// import trainRoutes from '../routes/TrainRoute.js'; // Update the path as needed

// const app = express();
// app.use('/', trainRoutes);

// describe('GET /alltrain', () => {
//   it('should respond with JSON containing a list of trains', async () => {
//     const response = await request(app).get('/alltrain');

//     expect(response.status).toBe(201); // Assuming successful response status is 201
//     expect(response.type).toBe('application/json');
//     expect(response.body).toEqual(expect.arrayContaining([])); // Update with your expected data

//     // You can add more assertions based on your actual data structure
//   });

//   it('should respond with error JSON if something goes wrong', async () => {
//     // Mock the Train.find() function to simulate an error
//     const originalFind = Train.find;
//     Train.find = jest.fn(() => {
//       throw new Error('Mocked error');
//     });

//     const response = await request(app).get('/alltrain');

//     expect(response.status).toBe(422); // Assuming error response status is 422
//     expect(response.type).toBe('application/json');
//     expect(response.body).toEqual({ error: 'Mocked error' });

//     // Restore the original function after the test
//     Train.find = originalFind;
//   });
// });

// import request from "supertest";
// import app from "../app.js";
// import Train from "../models/Train.js";

// describe("/alltrain endpoint", () => {
//   it("should return a list of all trains", async () => {
//     const response = await request(app).get("/train/alltrain");

//     expect(response.status).toBe(200);
//     expect(response.body).toBeInstanceOf(Array);
//     expect(response.body.length).toBeGreaterThan(0); // Assuming there are trains in the database
//   });

//   it("should handle errors gracefully", async () => {
//     // Mocking the Train.find method to simulate an error
//     jest.spyOn(Train, "find").mockRejectedValue(new Error("Database error"));

//     const response = await request(app).get("/train/alltrain");

//     expect(response.status).toBe(422);
//     expect(response.body).toEqual({ error: expect.any(String) });
//   });
// });

// describe('/alltrain endpoint', () => {
//   it('should handle errors gracefully', async () => {
//     jest.setTimeout(10000); // Increase timeout to 10 seconds

//     jest.spyOn(Train, 'find').mockRejectedValue(new Error('Database error'));

//     const response = await request(app).get('/train/alltrain');

//     expect(response.status).toBe(422);
//     expect(response.body).toEqual({ error: expect.any(String) });
//   });
// });

