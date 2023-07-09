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
      return res.status(404).send("Train not found");
    }

    res.status(200).send(deletedTrain);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while deleting the train.");
  }
});




export { router as TrainRoute };