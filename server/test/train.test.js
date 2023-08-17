import {
  CreateTrain,
  GetTrain,
  GetTrainById,
  ListTrain,
} from "../controllers/TrainController"; 
import Train from "../models/Train";

jest.mock("../models/Train");
jest.mock("../models/Booking");

describe("CreateTrain", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 1: Create Train
  it("should successfully create a train", async () => {
    const mockReq = {
      body: {
        name: "Test Train",
        // ... other fields ...
        destinationLng: 123.456,
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    Train.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(true),
    }));

    await CreateTrain(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalledWith({
      newTrain: expect.any(Object),
      message: "Train saved successfully",
    });
  });

  // Test Case 2: Error Path
  it("should handle errors during train creation", async () => {
    const mockReq = {
      body: {
        name: "Error Train",
        // ... other fields ...
        destinationLng: 123.456,
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    Train.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error("Database error")),
    }));

    await CreateTrain(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith(
      "An error occurred while creating a train."
    );
  });
});

describe("GetTrain", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 1: Happy Path
  it("should retrieve all trains successfully", async () => {
    const mockTrains = [
      { _id: "1", name: "Train 1" },
      { _id: "2", name: "Train 2" },
    ];

    Train.find.mockResolvedValue(mockTrains);

    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await GetTrain(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockTrains);
  });
});

describe("GetTrainById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 1: Train Found
  it("should retrieve a train by its ID successfully", async () => {
    const mockTrain = { _id: "1", name: "Train 1" };

    Train.findById.mockResolvedValue(mockTrain);

    const mockReq = {
      params: {
        id: "1",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await GetTrainById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(mockTrain);
  });

  // Test Case 2: Train Not Found
  it("should handle scenarios where the train is not found", async () => {
    Train.findById.mockResolvedValue(null);

    const mockReq = {
      params: {
        id: "1",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await GetTrainById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith("Train not found");
  });

  // Test Case 3: Error Path
  it("should handle errors during train retrieval by ID", async () => {
    const mockError = new Error("Database error");

    Train.findById.mockRejectedValue(mockError);

    const mockReq = {
      params: {
        id: "1",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await GetTrainById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith(
      "An error occurred while retrieving the train."
    );
  });
});

describe("ListTrain", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 1: List all trains
  it("should retrieve all trains successfully", async () => {
    const mockTrains = [
      {
        _id: "1",
        name: "Train 1",
        source: "A",
        destination: "B",
        availableDate: "2023-08-01",
      },
      {
        _id: "2",
        name: "Train 2",
        source: "B",
        destination: "C",
        availableDate: "2023-08-02",
      },
    ];

    Train.find.mockResolvedValue(mockTrains);

    const mockReq = {
      query: {},
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await ListTrain(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(mockTrains);
  });

  // Test Case 2: Filter by source and destination
  it("should retrieve trains filtered by source and destination", async () => {
    const mockTrains = [
      {
        _id: "1",
        name: "Train 1",
        source: "A",
        destination: "B",
        availableDate: "2023-08-01",
      },
    ];

    Train.find.mockResolvedValue(mockTrains);

    const mockReq = {
      query: {
        source: "A",
        destination: "B",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await ListTrain(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(mockTrains);
  });

  // Test Case 3: Error Path
  it("should handle errors during train listing", async () => {
    const mockError = new Error("Database error");

    Train.find.mockRejectedValue(mockError);

    const mockReq = {
      query: {},
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await ListTrain(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith(
      "An error occurred while retrieving the trains."
    );
  });
});
