import express from "express";
import { user } from "../controllers/userController.js";
const router = express.Router();
router.route("/user").get(user);
export default router;
