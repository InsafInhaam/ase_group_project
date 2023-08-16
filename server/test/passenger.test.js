// const request = require('supertest');
// const app = require('../app');

// import Passenger from '../models/Passenger.js'; // Import the Passenger model
// import cloudinary from '../utils/Cloudinary.js';
// import { uploadToCloudinary } from '../utils/UploadToCloudinary.js';
// import {
//   passengerSchema,
//   passengerLoginSchema,
// } from '../utils/InputValidation.js';
// import {
//   generatePassword,
//   generateSalt,
//   generateToken,
//   validatePassword,
// } from '../utils/PasswordUtils.js';
// import {
//   PassengerLogin,
//   PassengerRegister,
// } from "../controllers/index.js";

// jest.mock('../models/Passenger'); // Mock the Passenger model
// // Mock other dependencies as needed

// describe('Passenger Controller', () => {
//   // Test cases for registerPassenger function
//   describe('PassengerRegister', () => {
//     // Write your tests for registerPassenger here
//   });

//   // Test cases for PassengerLogin function
//   describe('PassengerLogin', () => {
//     // Mock req and res objects
//     let req, res;

//     beforeEach(() => {
//       req = { body: {} };
//       res = {
//         status: jest.fn(() => res),
//         json: jest.fn(),
//       };
//     });

//     it('should handle successful login', async () => {
//       // Mock request data
//       req.body = {
//         email: 'test@example.com',
//         password: 'password123',
//       };

//       // Mock Passenger.findOne to return a passenger
//       Passenger.findOne = jest.fn().mockResolvedValue({
//         _id: 'passengerId',
//         email: 'test@example.com',
//         password: 'hashedPassword',
//         salt: 'salt',
//         // ... other passenger data ...
//       });

//       // Mock validatePassword to return true
//       validatePassword.mockReturnValue(true);

//       // Mock generateToken to return a mock token
//       generateToken.mockResolvedValue('mockToken');

//       // Call the function being tested
//       await PassengerLogin(req, res);

//       // Assertions
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith({
//         message: 'Successfully logged in',
//         // ... expected response data ...
//       });
//     });
//   });
// });