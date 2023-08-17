import {
  PassengerLogin,
  PassengerRegister,
  GetPassengerProfile,
  UpdatePassengerProfile,
} from "../controllers/PassengerControllers";
import Passenger from "../models/Passenger";

jest.mock("../models/Passenger");
jest.mock("../utils/PasswordUtils");

describe("PassengerLogin", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if the passenger is not found", async () => {
    Passenger.findOne.mockResolvedValue(null);

    const mockReq = {
      body: {
        email: "test@example.com",
        password: "testPassword",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await PassengerLogin(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Passenger not found!",
    });
  });
});

describe("PassengerRegister", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error for invalid input", async () => {
    const mockReq = {
      body: {
        email: "test@example.com", // Provide an invalid body structure
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await PassengerRegister(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    // You can further check for the specific error message if desired
  });

  it("should return an error if passenger already exists", async () => {
    Passenger.findOne.mockResolvedValue({
      id: "123",
      email: "test@example.com",
    });

    const mockReq = {
      body: {
        name: "John Doe",
        email: "test@example.com",
        password: "testPassword",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await PassengerRegister(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "A Passenger has already exist",
    });
  });

});

describe("GetPassengerProfile", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if no valid passenger in req.user", async () => {
    const mockReq = {
      user: null,
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await GetPassengerProfile(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Invalid Passenger" });
  });

  it("should return passenger details if passenger exists in database", async () => {
    const mockReq = {
      user: { email: "test@example.com" },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockPassengerDetails = {
      name: "John Doe",
      email: "test@example.com",
      // ... other passenger details
    };

    Passenger.findOne.mockResolvedValue(mockPassengerDetails);

    await GetPassengerProfile(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockPassengerDetails);
  });

});

describe("UpdatePassengerProfile", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if no valid passenger in req.user", async () => {
    const mockReq = {
      user: null,
      body: {},
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UpdatePassengerProfile(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Invalid Passenger" });
  });

  it("should update passenger details without password and profilePic", async () => {
    const mockReq = {
      user: { email: "test@example.com" },
      body: {
        name: "John Doe",
        address: "123 Main St",
        phone: "123-456-7890",
        birthday: "2000-01-01",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockPassengerDetails = {
      name: "Old Name",
      email: "test@example.com",
      address: "Old Address",
      phone: "Old Phone",
      birthday: "1990-01-01",
      save: jest.fn().mockResolvedValue({
        name: mockReq.body.name,
        address: mockReq.body.address,
        phone: mockReq.body.phone,
        birthday: mockReq.body.birthday,
      }),
    };

    Passenger.findOne.mockResolvedValue(mockPassengerDetails);

    await UpdatePassengerProfile(mockReq, mockRes);

    const expectedUpdatedPassenger = {
      name: mockReq.body.name,
      address: mockReq.body.address,
      phone: mockReq.body.phone,
      birthday: mockReq.body.birthday,
    };

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Successfully Updated",
      updatedPassenger: expectedUpdatedPassenger,
    });
  });

});
