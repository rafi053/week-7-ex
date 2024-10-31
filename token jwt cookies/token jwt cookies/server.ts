import express, { Application } from "express";
import authRouter from "./routes/authRouter.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";


const app: Application = express();

const PORT =  5000;

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use(authMiddleware);
app.use("/get", userRouter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
