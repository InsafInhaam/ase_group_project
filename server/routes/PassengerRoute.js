import express from "express";
// import { passengerProfileUpload } from "../middleware/Multer.js";
import { passengerProfileUpload } from "../middleware/Upload.js";
import {
  PassengerLogin,
  PassengerRegister,
  GetPassengerProfile,
  UpdatePassengerProfile,
} from "../controllers/index.js";

import { Authenticate } from "../middleware/Auth.js";
const router = express.Router();

router.post("/register", PassengerRegister);
router.post("/login", PassengerLogin);

router.use(Authenticate);
router.get("/getprofile", GetPassengerProfile);
router.patch("/updateprofile", UpdatePassengerProfile);

export { router as PassengerRoute };