import { ValidatePromo } from "../controllers/PromoControllers";
import Promo from "../models/Promo.js";

jest.mock("../models/Promo.js");

describe("ValidatePromo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 1: Successful validation of a promo code
  it("should validate a promo code successfully", async () => {
    const mockPromo = {
      promoCode: "TESTPROMO",
      expiryDate: "2999-12-31",
      isActive: true,
      findOne: jest.fn(),
    };

    Promo.findOne.mockResolvedValue(mockPromo);

    const mockReq = {
      body: {
        promoCode: "TESTPROMO",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ValidatePromo(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      promo: mockPromo,
      message: "Success, promo code is valid.",
    });
  });

  // Test Case 2: Invalid promo code
  it("should handle an invalid promo code", async () => {
    Promo.findOne.mockResolvedValue(null);

    const mockReq = {
      body: {
        promoCode: "INVALIDPROMO",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ValidatePromo(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Invalid promo code.",
    });
  });
});
