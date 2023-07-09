import express from "express";
import {
  CreateExpenses,
  DeleteExpenses,
  GetAllExpenses,
  GetExpensesById,
  UpdateExpenses,
} from "../controllers/ExpensesControllers.js";

const router = express.Router();

router.get("/:id", GetExpensesById);
router.get("/", GetAllExpenses);
router.post("/", CreateExpenses);
router.patch("/:id", UpdateExpenses);
router.delete("/:id", DeleteExpenses);

export { router as ExpensesRoute };
