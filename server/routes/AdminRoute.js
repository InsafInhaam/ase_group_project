import express from "express";
import {
  AdminLogin,
  AdminRegister,
  DeletePassenger,
  GetAllPassengersAccount,
  GetPassengerById,
  UpdatePassenger,
} from "../controllers/AdminControllers.js";
import { AdminAuthenticate } from "../middleware/Auth.js";

const router = express.Router();

router.post("/login", AdminLogin);

router.use(AdminAuthenticate);
router.post("/register", AdminRegister);
router.get("/passengers", GetAllPassengersAccount);
router.get("/passenger/:id", GetPassengerById);
router.patch("/passenger/:id", UpdatePassenger);
router.delete("/passenger/:id", DeletePassenger);

export { router as AdminRoute };
