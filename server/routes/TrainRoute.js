import express from "express";
import Train from "../models/Train.js";

const router = express.Router();

router.post("/trains", async (req, res) => {
  const { name, source, destination, departureTime, arrivalTime, seats, price } =
    req.body;

  try {
    const newTrain = new Train({
      name,
      source,
      destination,
      departureTime,
      arrivalTime,
      price,
      seats,
    });

    await newTrain.save();
    res.status(201).send(newTrain);
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

export { router as TrainRoute };