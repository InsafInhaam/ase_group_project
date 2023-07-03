import express from "express";
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
router.get("/", GetPassengerProfile);
router.patch("/", UpdatePassengerProfile);

export { router as PassengerRoute };
