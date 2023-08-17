import mongoose from "mongoose";

const trainSchema = new mongoose.Schema({
  name: String,
  source: String,
  destination: String,
  availableDate: String,
  availableTime: String,
  seats: [
    {
      number: String,
      isBooked: Boolean,
    },
  ],
  price: String,
  trainType: String,
  sourceLat: String,
  sourceLng: String,
  destinationLat: String,
  destinationLng: String,
});

const Train = mongoose.model("Train", trainSchema);

export default Train;
