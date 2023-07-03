import Passenger from "../models/Passenger.js";
import {
  generatePassword,
  generateSalt,
  generateToken,
  validatePassword,
} from "../utils/PasswordUtils.js";

export const PassengerRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await Passenger.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "A Passenger has already exist" });
    }
    const salt = await generateSalt();
    const hashedPassword = await generatePassword(password, salt);
    let passenger = new Passenger({
      name,
      email,
      password: hashedPassword,
      salt,
    });
    await passenger.save();
    const token = await generateToken({
      _id: passenger.id,
      email: passenger.email,
    });
    return res.status(201).json({
      id: passenger.id,
      email: passenger.email,
      token,
    });
  } catch {
    return res.status(400).json({ error: "Passenger Register Failed" });
  }
};

export const PassengerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const passenger = await Passenger.findOne({ email });
    if (!passenger) {
      return res.status(400).json({ message: "Passenger not found!" });
    }

    const validation = await validatePassword(
      password,
      passenger.password,
      passenger.salt
    );
    if (validation) {
      const token = await generateToken({
        _id: passenger.id,
        email: passenger.email,
      });
      return res.status(200).json({
        id: passenger.id,
        email: passenger.email,
        token,
      });
    }
  } catch (e) {
    return res.status(400).json({ error: "Passenger Login Failed" });
  }
};

export const GetPassengerProfile = async (req, res) => {
  try {
    const passenger = req.passenger;
    const email = passenger.email;
    if (!passenger) {
      return res.status(400).json({ message: "Invalid Passenger" });
    }
    const passengerDetails = await Passenger.findOne({ email });
    return res.status(200).json(passengerDetails);
  } catch (e) {
    console.log("Error: ", e);
    return res.status(400).json({ error: "Passenger Details Getting Failed" });
  }
};

export const UpdatePassengerProfile = async (req, res) => {
  try {
    const passenger = req.passenger;
    const email = passenger.email;
    if (!passenger) {
      return res.status(400).json({ message: "Invalid Passenger" });
    }
    const { name } = req.body;
    const passengerDetails = await Passenger.findOne({ email });
    passengerDetails.name = name;
    const updatedPassenger = await passengerDetails.save();
    return res.status(200).json(updatedPassenger);
  } catch (e) {
    console.log("Error: ", e);
    return res.status(400).json({ error: "Passenger Details Update Failed" });
  }
};
