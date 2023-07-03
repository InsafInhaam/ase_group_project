import mongoose from "mongoose";
import { MONGO_URI } from "../config/index.js";

mongoose.set("strictQuery", false);

export default async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB Connected");
  } catch (err) {
    console.log("DB Failed", err);
  }
};
