import express from "express";
import { login } from "../controllers/authController.js";
const router = express.Router();
router.route("/login/:id").get(login);
export default router;
