import express from "express";
// import { passengerProfileUpload } from "../middleware/Multer.js";
import { passengerProfileUpload } from "../middleware/Upload.js";
import {
  PassengerLogin,
  PassengerRegister,
  GetPassengerProfile,
  UpdatePassengerProfile,
} from "../controllers/index.js";

import { UserAuthenticate } from "../middleware/Auth.js";
const router = express.Router();

router.post("/register", PassengerRegister);
router.post("/login", PassengerLogin);

router.use(UserAuthenticate);
router.get("/getprofile", GetPassengerProfile);
router.patch("/updateprofile", UpdatePassengerProfile);

export { router as PassengerRoute };
