import express from "express";
import { NetIncome, TotalRevenue } from "../controllers/RevenueControllers.js";
import { Authenticate } from "../middleware/Auth.js";

const route = express.Router();

route.use(Authenticate);
route.get("/total", TotalRevenue);
route.get("/expenses");
route.get("/net-income", NetIncome);


export { route as RevenueRoute };

