import express from "express";
import {
  CreateBooking,
  GetAllBooking,
  GetBookingById,
} from "../controllers/BookingController.js";
const router = express.Router();

router.post("/bookings", CreateBooking);
router.get("/allbookings", GetAllBooking);
router.get("/bookingsById/:id", GetBookingById);

export { router as BookingRoute };