import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Train from "../models/Train.js";
import { generateMailTransporter } from "../utils/Mail.js";

export const CreateBooking = async (req, res) => {
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
      seatNumber: seatNumbers,
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
};

export const GetAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error.message); // Logging the error can help in debugging.
    res.status(400).json({ error: error.message });
  }
};

export const GetBookingById = async (req, res) => {
  try {
    const bookings = await Booking.find({
      passengerId: req.params.id,
    });

    // If there are no bookings, immediately return an empty array
    if (bookings.length === 0) {
      return res.status(200).json([]);
    }

    const bookingIds = bookings.map((booking) => booking.trainId);

    const trains = await Train.find({
      _id: { $in: bookingIds },
    });

    const bookingsWithTrainDetails = bookings.map((booking) => {
      const train = trains.find(
        (train) => train._id.toString() === booking.trainId.toString()
      );
      return {
        ...booking.toJSON(),
        train,
      };
    });

    res.status(200).json(bookingsWithTrainDetails);
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

// const bookings = await Booking.findAll({
//   where: { passengerId: req.params.id },
// });
