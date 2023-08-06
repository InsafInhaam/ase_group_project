import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../config/index.js";

export const generateSalt = async () => {
  return bcrypt.genSalt();
};

export const generatePassword = async (password, salt) => {
  return bcrypt.hash(password, salt);
};

export const validatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await generatePassword(enteredPassword, salt)) === savedPassword;
};

export const generateToken = async (payload) => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: "7d" });
};

export const validateToken = async (req) => {
  const token = req.get("Authorization");
  if (token) {
    const payload = await jwt.verify(token.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  }
  return false;
};

export const validateUserToken = async (req) => {
  const token = req.get("Authorization");
  if (token) {
    const payload = await jwt.verify(token.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  }
  return false;
};

export const validateAdminToken = async (req) => {
  const token = req.get("Authorization");
  if (token) {
    const payload = await jwt.verify(token.split(" ")[1], APP_SECRET);
    req.admin = payload;
    return true;
  }
  return false;
};
