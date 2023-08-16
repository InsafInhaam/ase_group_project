// const request = require('supertest');
// const app = require('../app');

// describe("Passenger Registration", () => {
//   it("should register a new passenger", async () => {
//     const response = await request(app).post("/passenger/register").send({
//       name: "John Doe",
//       email: "johndoe@example.com",
//       password: "password123",
//       address: "123 Main St",
//       phone: "123-456-7890",
//       profile: "profile-image-url", // Optional
//     });

//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty("id");
//     expect(response.body).toHaveProperty("email");
//     expect(response.body).toHaveProperty("token");
//   });

//   it("should return an error for invalid registration data", async () => {
//     const response = await request(app).post("/passenger/register").send({
//       // Missing required fields
//     });

//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("error");
//   });

//   it("should return an error if passenger already exists", async () => {
//     // Create a passenger with the same email before running this test

//     const response = await request(app).post("/passenger/register").send({
//       name: "John Doe",
//       email: "johndoe@example.com",
//       password: "password123",
//       address: "123 Main St",
//       phone: "123-456-7890",
//       profile: "profile-image-url", // Optional
//     });

//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("error");
//   });
// });


import Passenger from '../models/Passenger.js'; // Import the Passenger model
import cloudinary from '../utils/Cloudinary.js';
import { uploadToCloudinary } from '../utils/UploadToCloudinary.js';
import {
  passengerSchema,
  passengerLoginSchema,
} from '../utils/InputValidation.js';
import {
  generatePassword,
  generateSalt,
  generateToken,
  validatePassword,
} from '../utils/PasswordUtils.js';
import {
  PassengerLogin,
  PassengerRegister,
} from "../controllers/index.js";

jest.mock('../models/Passenger'); // Mock the Passenger model
// Mock other dependencies as needed

describe('Passenger Controller', () => {
  // Test cases for registerPassenger function
  describe('PassengerRegister', () => {
    // Write your tests for registerPassenger here
  });

  // Test cases for PassengerLogin function
  describe('PassengerLogin', () => {
    // Mock req and res objects
    let req, res;

    beforeEach(() => {
      req = { body: {} };
      res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
    });

    it('should handle successful login', async () => {
      // Mock request data
      req.body = {
        email: 'test@example.com',
        password: 'password123',
      };

      // Mock Passenger.findOne to return a passenger
      Passenger.findOne = jest.fn().mockResolvedValue({
        _id: 'passengerId',
        email: 'test@example.com',
        password: 'hashedPassword',
        salt: 'salt',
        // ... other passenger data ...
      });

      // Mock validatePassword to return true
      validatePassword.mockReturnValue(true);

      // Mock generateToken to return a mock token
      generateToken.mockResolvedValue('mockToken');

      // Call the function being tested
      await PassengerLogin(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Successfully logged in',
        // ... expected response data ...
      });
    });

    // Write more test cases for other scenarios
  });

  // Add more describe blocks for other functions if needed
});
