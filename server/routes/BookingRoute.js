import express from "express";

const router = express.Router();
import Booking from "../models/Booking.js";

import Train from "../models/Train.js";
import mongoose from "mongoose";
import { generateMailTransporter } from "../utils/Mail.js";
import {
  AdminAuthenticate,
  Authenticate,
  UserAuthenticate,
} from "../middleware/Auth.js";

// router.get("/trains", async (req, res) => {
//   try {
//     const trains = await Train.find();
//     res.json(trains);
//   } catch (error) {
//     console.error("Error fetching trains:", error);
//     res.status(500).json({ message: "Error fetching trains" });
//   }
// });

// router.post("/trains/:trainId/book", async (req, res) => {
//   const { trainId } = req.params;
//   const { passengerName } = req.body;

//   try {
//     const train = await Train.findById(trainId);

//     if (!train) {
//       res.status(404).json({ message: "Train not found" });
//       return;
//     }

//     if (train.availableSeats <= 0) {
//       res.status(400).json({ message: "No available seats" });
//       return;
//     }

//     train.availableSeats -= 1;
//     await train.save();

//     res.json({ message: `Booking confirmed for ${passengerName}` });
//   } catch (error) {
//     console.error("Error booking train:", error);
//     res.status(500).json({ message: "Error booking train" });
//   }
// });

// router.use(Authenticate);
router.post("/bookings", async (req, res) => {
  try {
    const {
      trainId,
      seatNumbers,
      bookingDate,
      bookingTime,
      passengerName,
      passengerEmail,
      contactNumber,
      orderId,
      passengerId,
      price,
    } = req.body;

    const isValidTrainId = mongoose.Types.ObjectId.isValid(trainId);
    if (!isValidTrainId) {
      return res
        .status(400)
        .send({ error: "No Train available with that ID." });
    }

    const train = await Train.findById(trainId);

    if (!train || !train.seats || !Array.isArray(train.seats)) {
      return res.status(400).send({ error: "Invalid train data." });
    }

    const selectedSeats = train.seats.filter((seat) =>
      seatNumbers.includes(seat.number)
    );

    const existingBookings = await Booking.find({
      trainId,
      seatNumber: { $in: seatNumbers },
    });

    if (existingBookings.length > 0) {
      return res
        .status(400)
        .send({ error: "One or more selected seats are already booked." });
    }

    const newBooking = {
      trainId,
      seatNumber: seatNumbers, // This will save the entire array of seat numbers
      bookingDate,
      bookingTime,
      passengerName,
      passengerEmail,
      contactNumber,
      orderId,
      passengerId,
      price,
    };
    await Booking.create(newBooking);

    // Update seat statuses
    const updatedSeatNumbers = selectedSeats.map((seat) => seat.number);
    await Train.updateMany(
      { _id: trainId, "seats.number": { $in: updatedSeatNumbers } },
      { $set: { "seats.$[seat].isBooked": true } },
      { arrayFilters: [{ "seat.number": { $in: updatedSeatNumbers } }] }
    );

    // Send emails to passengers
    const transport = generateMailTransporter();
    transport.sendMail({
      from: "response@rw.com",
      to: newBooking.passengerEmail,
      subject: "Booking Confirmation",
      html: `
        <p>Thank you for your booking!</p>
        <p>Train: ${train.name}</p>
        <p>Seat Numbers: ${newBooking.seatNumber.join(", ")}</p>
        <p>Date: ${newBooking.bookingDate}</p>
        <p>Time: ${newBooking.bookingTime}</p>
      `,
    });

    res.status(201).send({ message: "Bookings created successfully." });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
});

// get all booking details
router.get("/allbookings", async (req, res) => {
  const bookings = await Booking.find();

  try {
    res.status(201).json(bookings);
  } catch (error) {
    res.status(422).json({
      error: error,
    });
  }
});

router.get("/bookingsById/:id", async (req, res) => {
  const bookings = await Booking.find({
    passengerId: req.params.id,
  });

  // const bookings = await Booking.findAll({
  //   where: { passengerId: req.params.id },
  // });

  const bookingIds = bookings.map((booking) => booking.trainId);

  const trains = await Train.find({
    _id: bookingIds,
  });

  const bookingsWithTrainDetails = bookings.map((booking) => {
    const train = trains.find((train) => train._id === booking.trainId);
    return {
      ...booking.toJSON(),
      train,
    };
  });
  try {
    res.status(201).json(bookingsWithTrainDetails);
  } catch (error) {
    res.status(422).json({
      error: error,
    });
  }
});

// router.use(AdminAuthenticate);


export { router as BookingRoute };


    // const USER_ID = "25482";
    // const API_KEY = "2skLBC7FPExOGaG7cCfo";
    // const SENDER_ID = "NotifyDEMO";

    // const message = "Hello there, your train will be arrived at 11:00 PM";

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