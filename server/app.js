import express from "express";
import dbConnection from "./database/Database.js";
import cors from "cors";
import bodyParser from "body-parser";

import { PORT } from "./config/index.js";

import { PassengerRoute } from "./routes/PassengerRoute.js";
import { TrainRoute } from "./routes/TrainRoute.js";
import { BookingRoute } from "./routes/BookingRoute.js";
import { AdminRoute } from "./routes/AdminRoute.js";
import { RevenueRoute } from "./routes/RevenueRoute.js";
import { ExpensesRoute } from "./routes/ExpensesRoute.js";
import { PromoRoute } from "./routes/PromoRoute.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use("/passenger", PassengerRoute);
app.use("/admin", AdminRoute);
app.use("/train", TrainRoute);
app.use("/booking", BookingRoute);
app.use("/revenue", RevenueRoute);
app.use("/expenses", ExpensesRoute);
app.use("/promo", PromoRoute);

app.listen(PORT, () => {
  dbConnection();
  console.log(`App is running on port ${PORT}`);
});

export default app;
