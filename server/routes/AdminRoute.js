import express from "express";
import { AdminLogin, AdminRegister } from "../controllers/AdminControllers";

const router = express.Router();

router.post("/login", AdminLogin);
router.post("/register", AdminRegister);

export { router as AdminRoute };
