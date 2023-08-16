import express from "express";
import Train from "../models/Train.js";
import Booking from "../models/Booking.js";
import Passenger from "../models/Passenger.js";
// import axios from "axios";

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
    sourceLat,
    sourceLng,
    destinationLat,
    destinationLng,
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
      sourceLat,
      sourceLng,
      destinationLat,
      destinationLng,
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

    // if (trains.length === 0) {
    //   return res.status({error: 'Trains not found'});
    // }

    res.status(200).send(trains);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while retrieving the trains.");
  }
});

router.get("/recommendtrainlisting", async (req, res) => {
  const { source, destination } = req.query;

  try {
    let query = {};

    if (source) {
      query.source = source;
    }

    if (destination) {
      query.destination = destination;
    }

    // Use the correct variable name 'trains' instead of 'train'
    const trains = await Train.find(query);

    // if (trains.length === 0) {
    //   return res.status(404);
    // }

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

router.post("/notify/:id", async (req, res) => {
  try {
    const specificTrainId = req.params.id;
    const { message } = req.body;
    const bookings = await Booking.find(
      { trainId: specificTrainId },
      "contactNumber"
    );

    const numbers = bookings.map((booking) => booking.contactNumber);
    // const USER_ID = "25482";
    // const API_KEY = "2skLBC7FPExOGaG7cCfo";
    // const SENDER_ID = "NotifyDEMO";

    // // const message = "Hello there, your train will be arrived at 11:00 PM";

    // for (let number of numbers) {
    //   try {
    //     await axios.get(`https://app.notify.lk/api/v1/send`, {
    //       params: {
    //         user_id: USER_ID,
    //         api_key: API_KEY,
    //         sender_id: SENDER_ID,
    //         to: number,
    //         message: message,
    //       },
    //     });
    //     console.log(`Message successfully sent to: ${number}`);
    //   } catch (error) {
    //     console.error(`Failed to send message to: ${number}`);

    //     console.error("Error Message:", error.message);

    //     if (error.response) {
    //       console.error("Response Data:", error.response.data);
    //       console.error("Response Status:", error.response.status);
    //       console.error("Response Headers:", error.response.headers);
    //     }
    //   }
    // }
    console.log(message);
    console.log(`Messages sent to: ${numbers.join(", ")}`);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export { router as TrainRoute };
