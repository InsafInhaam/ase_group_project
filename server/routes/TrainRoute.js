import express from "express";
import {
  CreateTrain,
  DeleteTrain,
  GetTrain,
  GetTrainById,
  ListTrain,
  NotifyTrain,
  RecommendTrain,
  UpdateTrain,
} from "../controllers/TrainController.js";

const router = express.Router();
router.post("/trains", CreateTrain);
router.get("/alltrain", GetTrain);
router.get("/trains/:id", GetTrainById);
router.get("/trainlisting", ListTrain);
router.get("/recommendtrainlisting", RecommendTrain);
router.patch("/trains/:id", UpdateTrain);
router.delete("/trains/:id", DeleteTrain);
router.post("/notify/:id", NotifyTrain);

export { router as TrainRoute };