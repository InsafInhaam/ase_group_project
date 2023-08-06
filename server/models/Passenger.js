import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PassengerSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    salt: String,
    address: String,
    phone: String,
    profile: String,
    birthday: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret._v1;
      },
    },
    timestamps: true,
  }
);

const Passenger = mongoose.model("Passenger", PassengerSchema);
export default Passenger;
