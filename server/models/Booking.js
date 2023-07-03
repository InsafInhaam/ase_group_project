import mongoose from 'mongoose';

// const bookingSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   departure: {
//     type: String,
//     required: true,
//   },
//   arrival: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   availableSeats: {
//     type: Number,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
// });

const bookingSchema = new mongoose.Schema({
  trainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train',
  },
  seatNumber: String,
  passengerName: String,
  contactNumber: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;