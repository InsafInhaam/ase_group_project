import express from "express";
import Train from "../models/Train.js";

const router = express.Router();

router.post("/trains", async (req, res) => {
  const {
    name,
    source,
    destination,
    availableDate,
    availableTime,
    seats,
    price,
    trainType,
  } = req.body;

  try {
    const newTrain = new Train({
      name,
      source,
      destination,
      availableDate,
      availableTime,
      price,
      seats,
      trainType,
    });

    await newTrain.save();
    res.status(201).send({ newTrain, message: "Train saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while creating a train.");
  }
});

router.get("/alltrain", async (req, res) => {
  const trains = await Train.find();

  try {
    res.status(201).json(trains);
  } catch (error) {
    res.status(422).json({
      error: error,
    });
  }
});

router.get("/trains/:id", async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);

    if (!train) {
      return res.status(404).send("Train not found");
    }

    res.status(200).send(train);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while retrieving the train.");
  }
});

router.get("/trainlisting", async (req, res) => {
  const { source, destination, availableDate } = req.query;

  try {
    let query = {};

    if (source) {
      query.source = source;
    }

    if (destination) {
      query.destination = destination;
    }

    if (availableDate) {
      query.availableDate = availableDate;
    }

    // Use the correct variable name 'trains' instead of 'train'
    const trains = await Train.find(query);

    if (trains.length === 0) {
      return res.status(404);
    }

    res.status(200).send(trains);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while retrieving the trains.");
  }
});

router.patch("/trains/:id", async (req, res) => {
  const {
    name,
    source,
    destination,
    departureTime,
    arrivalTime,
    seats,
    price,
  } = req.body;

  try {
    const updatedTrain = await Train.findByIdAndUpdate(
      req.params.id,
      {
        name,
        source,
        destination,
        departureTime,
        arrivalTime,
        price,
        seats,
      },
      { new: true }
    );

    if (!updatedTrain) {
      return res.status(404).send("Train not found");
    }

    res.status(200).send(updatedTrain);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while updating the train.");
  }
});

router.delete("/trains/:id", async (req, res) => {
  try {
    const deletedTrain = await Train.findByIdAndDelete(req.params.id);

    if (!deletedTrain) {
      return res.status(404).send({ error: "Train not found" });
    }

    res
      .status(200)
      .send({ deletedTrain, message: "Train deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while deleting the train.");
  }
});

export { router as TrainRoute };