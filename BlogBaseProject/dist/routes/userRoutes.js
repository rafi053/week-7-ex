"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
/**
 *
 */
userRouter.post("/", userController_1.createUser);
/**
 * @swagger
 * /api/users:
 *  get:
 *      summery: Get all the users
 *      responses:
 *          200:
 *              description: a json of all the users
 *
 */
userRouter.get("/", userController_1.getUsers);
userRouter.get("/:username", userController_1.getUser);
exports.default = userRouter;
