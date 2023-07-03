import express from "express";

const router = express.Router();

router.get("/login", (req, res) => {
  return res.json({ message: "Hello from backend" });
});

export { router as PassengerRoute };
