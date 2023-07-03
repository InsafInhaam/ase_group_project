import express from "express";
import dbConnection from "./service/Database.js";
import { PORT } from "./config/index.js";
import { PassengerRoute } from "./routes/PassengerRoute.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/passenger", PassengerRoute);

app.listen(PORT, () => {
  dbConnection();
  console.log(`App is running on port ${PORT}`);
});
