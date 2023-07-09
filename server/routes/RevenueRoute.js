import express from "express";
import { Authenticate } from "../middleware/Auth.js";
import { NetIncome, TotalRevenue } from "../controllers/RevenueControllers.js";

const route = express.Router();

// router.use(Authenticate);
route.get("/total", TotalRevenue);
route.get("/expenses");
route.get("/net-income", NetIncome);

export { route as RevenueRoute };
