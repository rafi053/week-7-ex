import { Router } from "express";
import { createUser, getUser, getUsers } from "../controllers/userController";

const userRouter = Router();


userRouter.post("/", createUser);

/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: Get all the users
 *      responses:
 *          200:
 *              description: a json of all the users
 * */

userRouter.get("/", getUsers);
userRouter.get("/:username", getUser);

export default userRouter;
