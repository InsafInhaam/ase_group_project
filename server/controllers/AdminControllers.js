import Admin from "../models/Admin";

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
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
        _id: admin.id,
        email: admin.email,
      });
      return res.status(200).json({
        id: admin.id,
        email: admin.email,
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
    let admin = new Passenger({
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
  } catch {
    return res.status(400).json({ error: "Admin Register Failed" });
  }
};
