import express from "express";
import dbConnection from "./service/database.js";
import { PORT } from "./config/index.js";

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  dbConnection();
  console.log(`App is running on port ${PORT}`);
});
