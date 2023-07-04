import mongoose from 'mongoose';

// const trainSchema = new mongoose.Schema({
//   train: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Train',
//     required: true,
//   },
//   seatNumber: {
//     type: Number,
//     required: true,
//   },
//   passengerName: {
//     type: String,
//     required: true,
//   },
// });

const trainSchema = new mongoose.Schema({
  name: String,
  source: String,
  destination: String,
  departureTime: String,
  arrivalTime: String,
  seats: [
    {
      number: String,
      isBooked: Boolean,
    },
  ],
  price: String,
});

const Train = mongoose.model('Train', trainSchema);

export default Train