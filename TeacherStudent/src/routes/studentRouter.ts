import { Router } from "express";
import { getGrades, login, register } from "../controllers/studentController";
import authMiddleware from "../middleware/authMiddleware";


const studentRouter = Router();

/**
 * @swagger
 * /students/register:
 *  post:
 *    summary: Register a new student
 *    tags: [Students]
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
 *        description: Student registered successfully
 *      400:
 *        description: Bad request
 *      409:
 *        description: Student already exists
 *      500:
 *        description: Internal server error
*/

studentRouter.post("/register", register);

/**
 * @swagger
 * /students/login:
 *  post:
 *    summary: Login a student
 *    tags: [Students]
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
 *        description: Student logged in successfully
 *      400:
 *        description: Bad request
 *      404:
 *        description: Student not found
 *      401:
 *        description: Invalid credentials
 *      500:
 *        description: Internal server error
 */

studentRouter.post("/login", login);

studentRouter.use(authMiddleware);


/**
 * @swagger
 * /students/grades:
 *  get:
 *    summary: Get all grades
 *    tags: [Students]
 *    responses:
 *      200:
 *        description: Grades retrieved successfully
 *      500:
 *        description: Internal server error
 */
studentRouter.get("/:id", getGrades);

export default studentRouter;
