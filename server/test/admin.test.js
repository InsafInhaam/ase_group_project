import { AdminLogin, UpdateAdmin } from "../controllers/AdminControllers";
import Admin from "../models/Admin.js";
import { validatePassword, generateToken } from "../utils/PasswordUtils.js";

jest.mock("../models/Admin.js");
jest.mock("../utils/PasswordUtils.js");

describe("AdminLogin", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 1: Successful Admin Login
  it("should log in the admin successfully", async () => {
    const mockAdmin = {
      email: "admin@example.com",
      password: "hashedPassword",
      salt: "someSalt",
      id: "adminId",
      name: "Admin Name",
    };

    Admin.findOne.mockResolvedValue(mockAdmin);
    validatePassword.mockResolvedValue(true);
    generateToken.mockResolvedValue("someToken");

    const mockReq = {
      body: {
        email: "admin@example.com",
        password: "password",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await AdminLogin(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Successfully logged in",
      user: { email: mockAdmin.email, id: mockAdmin.id, name: mockAdmin.name },
      token: "someToken",
    });
  });

  // Test Case 2: Admin not found
  it("should handle scenarios where admin is not found", async () => {
    Admin.findOne.mockResolvedValue(null);

    const mockReq = {
      body: {
        email: "nonexistent@example.com",
        password: "password",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await AdminLogin(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Admin not found!" });
  });

  // Test Case 3: Error Path
  it("should handle errors during the login process", async () => {
    Admin.findOne.mockRejectedValue(new Error("Database error"));

    const mockReq = {
      body: {
        email: "admin@example.com",
        password: "password",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await AdminLogin(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Admin Login Failed" });
  });
});

describe("UpdateAdmin", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 2: No Admin ID provided
  it("should handle scenarios where admin ID is not provided", async () => {
    const mockReq = {
      body: {},
      params: {},
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UpdateAdmin(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Admin ID is required",
    });
  });

  // Test Case 3: Admin not found
  it("should handle scenarios where admin is not found", async () => {
    Admin.findById.mockResolvedValue(null);

    const mockReq = {
      body: {},
      params: {
        id: "nonexistentId",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UpdateAdmin(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Admin not found" });
  });

  // Test Case 4: Email already exists
  it("should handle scenarios where the email already exists", async () => {
    const mockExistingAdmin = {
      _id: "anotherAdminId",
      email: "existing@example.com",
    };
    const mockAdmin = {
      _id: "adminId",
      email: "admin@example.com",
      save: jest.fn(),
    };

    Admin.findById.mockResolvedValue(mockAdmin);
    Admin.findOne.mockResolvedValue(mockExistingAdmin);

    const mockReq = {
      body: {
        email: "existing@example.com",
      },
      params: {
        id: "adminId",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UpdateAdmin(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Email already exists",
    });
  });

  // Test Case 5: Error Path
  it("should handle errors during the update process", async () => {
    Admin.findById.mockRejectedValue(new Error("Database error"));

    const mockReq = {
      body: {},
      params: {
        id: "adminId",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UpdateAdmin(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Failed to update admin",
    });
  });
});
