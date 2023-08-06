import express from "express";

import { Authenticate } from "../middleware/Auth.js";
import { AddPromo, ValidatePromo } from "../controllers/PromoControllers.js";
const router = express.Router();

router.use(Authenticate);
router.post("/add-promo", AddPromo);
router.post("/validate-promo", ValidatePromo);

export { router as PromoRoute };
