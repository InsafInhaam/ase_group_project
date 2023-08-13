import express from "express";
const router = express.Router();
import Booking from "../models/Booking.js";
import Train from "../models/Train.js";
import mongoose from "mongoose";
import { generateMailTransporter } from "../utils/Mail.js";
import { Authenticate } from "../middleware/Auth.js";

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
// router.post("/bookings", async (req, res) => {
//   try {
//     const {
//       trainId,
//       seatNumber,
//       bookingDate,
//       bookingTime,
//       passengerName,
//       passengerEmail,
//       contactNumber,
//       orderId,
//       passengerId,
//     } = req.body;

//     // Check if the train exists
//     // const train = await Train.findById(trainId);
//     // if (!train) {
//     //   return res.status(400).send('Invalid train ID. Train not found.');
//     // }

//     const isValidTrainId = mongoose.Types.ObjectId.isValid(trainId);
//     if (!isValidTrainId) {
//       return res.status(400).send("No Train available like that.");
//     }
//     const train = await Train.findById(trainId);

//     // Check if the seat is available
//     const selectedSeat = train.seats.find((seat) => seat.number === seatNumber);
//     if (!selectedSeat || selectedSeat.isBooked) {
//       return res.status(400).send("Seat not available.");
//     }

//     // Check if the seat is already booked
//     const existingBooking = await Booking.findOne({ trainId, seatNumber });
//     if (existingBooking) {
//       return res.status(400).send("This seat is already booked.");
//     }

//     const newBooking = new Booking({
//       trainId,
//       seatNumber,
//       bookingDate,
//       bookingTime,
//       passengerName,
//       passengerEmail,
//       contactNumber,
//       orderId,
//       passengerId,
//     });

//     await newBooking.save();

//     // Mark the seat as booked in the train schema
//     await Train.updateOne(
//       { _id: trainId, "seats.number": seatNumber },
//       { $set: { "seats.$.isBooked": true } }
//     );

//     let transport = generateMailTransporter();

//     transport.sendMail({
//       from: "response@rw.com",
//       to: newBooking.passengerEmail,
//       subject: "Email Verification",
//       html: `
//         <p>Your Details</p>`,
//     });

//     res.status(201).send("Booking created successfully.");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("An error occurred while creating a booking.");
//   }
// });

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

    const bookedSeats = train.seats.filter((seat) => seat.isBooked);
    console.log(bookedSeats)

    const selectedSeats = train.seats.filter((seat) =>
      seatNumbers.includes(seat.number)
    );

    if (selectedSeats.some((seat) => seat.isBooked)) {
      return res.status(400).send("One or more selected seats are not available.");
    }

    const existingBookings = await Booking.find({
      trainId,
      seatNumber: { $in: seatNumbers },
    });

    if (existingBookings.length > 0) {
      return res
        .status(400)
        .send({ error: "One or more selected seats are already booked." });
    }

    // Create and save new bookings
    const newBookings = selectedSeats.map((selectedSeat) => ({
      trainId,
      seatNumber: selectedSeat.number,
      bookingDate,
      bookingTime,
      passengerName,
      passengerEmail,
      contactNumber,
      orderId,
      passengerId,
      price,
    }));

    await Booking.insertMany(newBookings);

    // Update seat statuses
    const updatedSeatNumbers = selectedSeats.map((seat) => seat.number);
    await Train.updateMany(
      { _id: trainId, "seats.number": { $in: updatedSeatNumbers } },
      { $set: { "seats.$[seat].isBooked": true } },
      { arrayFilters: [{ "seat.number": { $in: updatedSeatNumbers } }] }
    );

    // Send emails to passengers
    const transport = generateMailTransporter();
    newBookings.forEach((booking) => {
      transport.sendMail({
        from: "response@rw.com",
        to: booking.passengerEmail,
        subject: "Booking Confirmation",
        html: `
          <p>Thank you for your booking!</p>
          <p>Train: ${train.name}</p>
          <p>Seat Number: ${booking.seatNumber}</p>
          <p>Date: ${booking.bookingDate}</p>
          <p>Time: ${booking.bookingTime}</p>
          <!-- Add more booking details as needed -->
        `,
      });
    });

    res.status(201).send("Bookings created successfully.");
  } catch (error) {
    console.error(error);
    console.log(error.message);
    res.status(400).send({ message: error.message });
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

export { router as BookingRoute };
