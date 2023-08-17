import { TotalRevenue } from "../controllers/RevenueControllers";
import Booking from "../models/Booking.js";

jest.mock("../models/Booking.js");

describe("TotalRevenue", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 1: Successful calculation of total revenue
  it("should calculate total revenue successfully", async () => {
    const mockBookings = [{ price: "100.50" }, { price: "200.50" }];

    Booking.find.mockResolvedValue(mockBookings);

    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await TotalRevenue(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ totalPrice: "301.00" });
  });

  // Test Case 2: Error during calculation
  it("should handle errors during revenue calculation", async () => {
    const mockError = new Error("Database error");

    Booking.find.mockRejectedValue(mockError);

    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await TotalRevenue(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: mockError });
  });
});
