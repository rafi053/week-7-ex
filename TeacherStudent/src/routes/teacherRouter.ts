import { Router } from "express";
import {
  addGrade,
  changGrade,
  getAverageGrades,
  getAllDetails,
  getGrades,
  login,
  register,
  
} from "../controllers/teacherController";
import { ChangeStream } from "mongodb";
import authMiddleware from "../middleware/authMiddleware";

const teacherRouter = Router();
/**
 * @swagger
 * /teachers/register:
 *  post:
 *    summary: Register a new teacher
 *    tags: [Teachers]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              class:
 *                type: string
 *    responses:
 *      200:
 *        description: Teacher created successfully
 *      400:
 *        description: Bad request
 *      409:
 *        description: Teacher already exists
 */
teacherRouter.post("/register", register);
/**
 * @swagger
 * /teachers/login:
 *  post:
 *    summary: Login a teacher
 *    tags: [Teachers]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string     
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: Teacher logged in successfully
 *      400:
 *        description: Bad request
 *      404:
 *        description: Teacher not found
 *      401:
 *        description: Invalid credentials
 *      500:
 *        description: Internal server error
 */
teacherRouter.post("/login", login);

// teacherRouter.use(authMiddleware);
/**
 * @swagger
 * /teachers/gradesStudent/:id:
 *  put:
 *    summary: Get all grades
 *    tags: [Teachers]
 *    responses:
 *      200:
 *        description: Grades retrieved successfully
 *      500:
 *        description: Internal server error
 */
teacherRouter.put("/student/:id", addGrade);
/**
 * @swagger
 * /teachers/grades/student/:id:
 *  get:
 *    summary: Get all grades
 *    tags: [Teachers]
 *    responses:
 *      200:
 *        description: Grades retrieved successfully
 *      500:
 *        description: Internal server error
 */

teacherRouter.get("/:id", getGrades);
/**
 * @swagger
 * /teachers/grades/:id:
 *  put:
 *    summary: Get all grades
 *    tags: [Teachers]
 *    responses:
 *      200:
 *        description: Grades retrieved successfully
 *      500:
 *        description: Internal server error
 */
teacherRouter.put("/:id", changGrade);
/**
 * @swagger
 * /teachers/grades/:id:
 *  get:
 *    summary: Get all grades
 *    tags: [Teachers]
 *    responses:
 *      200:
 *        description: Grades retrieved successfully
 *      500:
 *        description: Internal server error
 */
teacherRouter.get("/average/:id", getAverageGrades);
/**
 * @swagger
 * /teachers/grades/average/:id:
 *  get:
 *    summary: Get all grades
 *    tags: [Teachers]
 *    responses:
 *      200:
 *        description: Grades retrieved successfully
 *      500:
 *        description: Internal server error
 */
teacherRouter.get("/", getAllDetails);

export default teacherRouter;
