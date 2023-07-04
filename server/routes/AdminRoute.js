import express from "express";
import {
  AdminLogin,
  AdminRegister,
  DeletePassenger,
  GetAllPassengersAccount,
  GetPassengerById,
  UpdatePassenger,
} from "../controllers/AdminControllers.js";
import { Authenticate } from "../middleware/Auth.js";

const router = express.Router();

router.post("/login", AdminLogin);
router.post("/register", AdminRegister);

router.use(Authenticate);
router.get("/passengers", GetAllPassengersAccount);
router.get("/passenger/:id", GetPassengerById);
router.patch("/passenger/:id", UpdatePassenger);
router.delete("/passengers/:id", DeletePassenger);

export { router as AdminRoute };
