import Passenger from "../models/Passenger.js";
import cloudinary from "../utils/Cloudinary.js";
import { uploadToCloudinary } from "../utils/UploadToCloudinary.js";
import fs from "fs";
import {
  passengerSchema,
  passengerLoginSchema,
} from "../utils/InputValidation.js";
import {
  generatePassword,
  generateSalt,
  generateToken,
  validatePassword,
} from "../utils/PasswordUtils.js";

export const PassengerRegister = async (req, res) => {
  try {
    const { error, value } = passengerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { name, email, password, address, phone, profile } = value;
    const existingUser = await Passenger.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "A Passenger has already exist" });
    }
    const salt = await generateSalt();
    const hashedPassword = await generatePassword(password, salt);
    let passenger = new Passenger({
      name,
      email,
      password: hashedPassword,
      salt,
      address: "",
      phone: "",
      profile: "",
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
    const { error, value } = passengerLoginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = value;

    const passenger = await Passenger.findOne({ email });
    if (!passenger) {
      return res.status(400).json({ error: "Passenger not found!" });
    }

    const validation = await validatePassword(
      password,
      passenger.password,
      passenger.salt
    );

    if (!validation) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const { id, name, profile, address, phone, birthday } = passenger;

    if (validation) {
      const token = await generateToken({
        _id: passenger.id,
        email: passenger.email,
      });
      return res.status(200).json({
        message: "Successfully logged in",
        user: {
          email: passenger.email,
          id,
          name,
          profile,
          address,
          phone,
          birthday,
        },
        token,
      });
    }
  } catch (error) {
    console.error("Error with passenger login:", error);
    return res.status(400).json({ error: "Passenger Login Failed" });
  }
};

export const GetPassengerProfile = async (req, res) => {
  try {
    const passenger = req.user;
    if (!passenger) {
      return res.status(400).json({ error: "Invalid Passenger" });
    }
    const email = passenger.email;
    const passengerDetails = await Passenger.findOne({ email });
    return res.status(200).json(passengerDetails);
  } catch (e) {
    console.log("Error: ", e);
    return res.status(400).json({ error: "Passenger Details Getting Failed" });
  }
};

// export const UpdatePassengerProfile = async (req, res) => {
//   try {
//     const passenger = req.user;
//     const email = passenger.email;
//     console.log(email)
//     if (!passenger) {
//       return res.status(400).json({ message: "Invalid Passenger" });
//     }
//     const { name, address, phone, birthday } = req.body;
//     const passengerDetails = await Passenger.findOne({ email });

//     const result = await uploadToCloudinary(req.file.buffer);
//     const profilePath = result.secure_url;

//     passengerDetails.name = name;
//     passengerDetails.address = address;
//     passengerDetails.phone = phone;
//     passengerDetails.birthday = birthday;
//     passengerDetails.profile = profilePath;
//     const updatedPassenger = await passengerDetails.save();
//     return res
//       .status(200)
//       .json({ message: "Successfully Updated", updatedPassenger });
//   } catch (e) {
//     console.log("Error: ", e);
//     return res.status(400).json({ error: "Passenger Details Update Failed" });
//   }
// };

export const UpdatePassengerProfile = async (req, res) => {
  try {
    const passenger = req.user;
    
    if (!passenger) {
      return res.status(400).json({ message: "Invalid Passenger" });
    }

    const email = passenger.email;
    
    const { name, address, phone, birthday, password, profilePic } = req.body;
    const passengerDetails = await Passenger.findOne({ email });

    passengerDetails.name = name;
    passengerDetails.address = address;
    passengerDetails.phone = phone;
    passengerDetails.birthday = birthday;

    if (password) {
      const salt = await generateSalt();
      const hashedPassword = await generatePassword(password, salt);
      passengerDetails.password = hashedPassword;
    }

    if (profilePic) {
      passengerDetails.profile = profilePic;
    }

    // console.log(profilePic);

    const updatedPassenger = await passengerDetails.save();
    return res
      .status(200)
      .json({ message: "Successfully Updated", updatedPassenger });
  } catch (e) {
    console.log("Error: ", e);
    return res.status(400).json({ error: "Passenger Details Update Failed" });
  }
};
