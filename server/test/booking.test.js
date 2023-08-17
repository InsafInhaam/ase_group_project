import {
  CreateBooking,
  GetAllBooking,
  GetBookingById,
} from "../controllers/BookingController";
import mongoose from "mongoose";
import Booking from "../models/Booking";

jest.mock("mongoose");
jest.mock("../models/Train");
jest.mock("../models/Booking");

jest.mock("../models/Booking", () => {
  return { find: jest.fn() };
});
jest.mock("../models/Train", () => {
  return { find: jest.fn() };
});
jest.mock("../utils/Mail");

describe("Create Booking", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error for invalid train ID", async () => {
    const mockReq = {
      body: {
        trainId: "invalidID",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    mongoose.Types.ObjectId.isValid.mockReturnValue(false);

    await CreateBooking(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith({
      error: "No Train available with that ID.",
    });
  });
});

describe("GetAllBooking", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve all bookings successfully", async () => {
    const mockBookings = [
      { id: "1", passengerName: "John Doe" },
      { id: "2", passengerName: "Jane Smith" },
    ];

    Booking.find.mockResolvedValue(mockBookings);

    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await GetAllBooking(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockBookings);
  });

  it("should handle errors during retrieval", async () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    const mockError = new Error("Database error");
    Booking.find.mockRejectedValue(mockError);

    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await GetAllBooking(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });

    console.error = originalConsoleError;
  });
});

describe("GetBookingById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 3: No Bookings
  it("should handle scenarios with no bookings", async () => {
    Booking.find.mockResolvedValue([]);

    const mockReq = {
      params: {
        id: "passenger1",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await GetBookingById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([]);
  });
});
