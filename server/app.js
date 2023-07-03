import express from "express";
import { PORT } from "./config/index.js";
import dbConnection from "./database/Database.js";
import { PassengerRoute, AdminRoute } from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/passenger", PassengerRoute);
app.use("/admin", AdminRoute);

app.listen(PORT, () => {
  dbConnection();
  console.log(`App is running on port ${PORT}`);
});
