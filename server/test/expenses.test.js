import { CreateExpenses } from "../controllers/ExpensesControllers";
import Expenses from "../models/Expenses.js";

jest.mock("../models/Expenses.js");

describe("CreateExpenses", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 1: Successful creation of an expense
  it("should create an expense successfully", async () => {
    const mockExpense = {
      id: "1",
      name: "Test Expense",
      description: "This is a test expense",
      amount: 100.5,
      save: jest.fn(),
    };

    Expenses.mockImplementation(() => mockExpense);

    const mockReq = {
      body: {
        name: "Test Expense",
        description: "This is a test expense",
        amount: 100.5,
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await CreateExpenses(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      id: mockExpense.id,
      name: mockExpense.name,
      description: mockExpense.description,
      amount: mockExpense.amount,
    });
  });

  // Test Case 2: Error path
  it("should handle errors during the creation process", async () => {
    Expenses.mockImplementation(() => {
      throw new Error("Database error");
    });

    const mockReq = {
      body: {
        name: "Test Expense",
        description: "This is a test expense",
        amount: 100.5,
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await CreateExpenses(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Failed to Create Expenses",
    });
  });
});
