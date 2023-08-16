import express from "express";
import {
  AdminLogin,
  AdminRegister,
  DeleteAdmin,
  DeletePassenger,
  GetAllPassengersAccount,
  GetPassengerById,
  UpdateAdmin,
  UpdatePassenger,
  ViewAdmin,
} from "../controllers/AdminControllers.js";
import { AdminAuthenticate } from "../middleware/Auth.js";

const router = express.Router();

router.post("/login", AdminLogin);
router.get("/view", ViewAdmin);

router.use(AdminAuthenticate);
router.get("/passengers", GetAllPassengersAccount);
router.patch("/update/:id", UpdateAdmin);
router.delete("/delete/:id", DeleteAdmin);
router.post("/register", AdminRegister);
router.get("/passenger/:id", GetPassengerById);
router.patch("/passenger/:id", UpdatePassenger);
router.delete("/passenger/:id", DeletePassenger);

export { router as AdminRoute };