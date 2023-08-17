import Admin from "../models/Admin.js";
import Passenger from "../models/Passenger.js";
import {
  generatePassword,
  generateSalt,
  generateToken,
  validatePassword,
} from "../utils/PasswordUtils.js";

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found!" });
    }
    const validation = await validatePassword(
      password,
      admin.password,
      admin.salt
    );

    const { id, name } = admin;

    if (validation) {
      const token = await generateToken({
        _id: admin.id,
        email: admin.email,
      });
      return res.status(200).json({
        message: "Successfully logged in",
        user: { email: admin.email, id, name },
        token,
      });
    }
  } catch {
    return res.status(400).json({ error: "Admin Login Failed" });
  }
};

export const AdminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "An Admin has already exist" });
    }
    const salt = await generateSalt();
    const hashedPassword = await generatePassword(password, salt);
    let admin = new Admin({
      name,
      email,
      password: hashedPassword,
      salt,
    });
    await admin.save();
    const token = await generateToken({
      _id: admin.id,
      email: admin.email,
    });
    return res.status(201).json({
      id: admin.id,
      email: admin.email,
      token,
    });
  } catch (e) {
    console.log("Error: ", e);
    return res.status(400).json({ error: "Admin Register Failed" });
  }
};

export const ViewAdmin = async (req, res, next) => {
  const allAdmins = await Admin.find();

  allAdmins.forEach((admin) => {
    console.log(admin.id);
  });

  return res.status(200).json(allAdmins);
};

export const UpdateAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const adminId = req.params.id;

    if (!adminId) {
      return res.status(400).json({ message: "Admin ID is required" });
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    if (name) {
      admin.name = name;
    }
    if (email) {
      const existingEmail = await Admin.findOne({ email });
      if (existingEmail && String(existingEmail._id) !== String(admin._id)) {
        return res.status(400).json({ message: "Email already exists" });
      }
      admin.email = email;
    }
    if (password) {
      const salt = await generateSalt();
      const hashedPassword = await generatePassword(password, salt);
      admin.password = hashedPassword;
      admin.salt = salt;
    }

    await admin.save();
    console.log("Try to update");
    return res
      .status(200)
      .send({ message: "Admin updated successfully", admin });
  } catch (error) {
    // console.log("Error:", error);
    return res.status(400).json({ error: "Failed to update admin" });
  }
};

export const DeleteAdmin = async (req, res, next) => {
  try {
    const adminId = req.params.id;

    if (!adminId) {
      return res.status(400).json({ message: "Admin ID is required" });
    }

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    await Admin.deleteOne({ _id: adminId });

    console.log("Admin deleted");

    return res.status(200).send({ message: "Admin deleted successfully" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(400).json({ error: "Failed to delete admin" });
  }
};

export const GetAllPassengersAccount = async (req, res) => {
  try {
    const admin = req.admin;
    if (!admin) {
      return res.status(400).json({ message: "Invalid Admin" });
    }
    const allPassengers = await Passenger.find();
    return res.status(200).json(allPassengers);
  } catch (e) {
    console.log("Error: ", e);
    return res.status(400).json({ error: "Falied to get all passengers" });
  }
};

export const GetPassengerById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = req.admin;
    if (!admin) {
      return res.status(400).json({ message: "Invalid Admin" });
    }
    const passenger = await Passenger.findById(id);
    return res.status(200).json(passenger);
  } catch (e) {
    console.log("Error: ", e);
    return res.status(400).json({ error: "Falied to get the passenger" });
  }
};
export const UpdatePassenger = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const admin = req.admin;
    if (!admin) {
      return res.status(400).json({ message: "Invalid Admin" });
    }
    const passenger = await Passenger.findById(id);
    passenger.name = name;
    const updatedPassenger = await passenger.save();
    return res.status(200).json(updatedPassenger);
  } catch (e) {
    console.log("Error: ", e);
    return res.status(400).json({ error: "Falied to update the passenger" });
  }
};
export const DeletePassenger = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = req.admin;
    if (!admin) {
      return res.status(400).json({ message: "Invalid Admin" });
    }
    const passenger = await Passenger.findById(id);
    if (!passenger) {
      return res.status(400).json({ message: "Passenger not found" });
    }
    await Passenger.deleteOne({ _id: id });
    return res.status(200).json({ message: "Passenger deleted successfully" });
  } catch (e) {
    console.log("Error: ", e);
    return res.status(400).json({ error: "Falied to delete the passenger" });
  }
};
