import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token; 
  if (!token) {
    res.status(401).send({ message: "Unauthorized, missing token" });
    return;
  }

  const decoded = jwt.verify(token, 'process.env.JWT_SECRET');
  const id = (decoded as { id: string }).id;

  if (!id) {
    res.status(401).send({ message: "Unauthorized" });
  }

  next();
};
