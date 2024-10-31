import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const token = jwt.sign(
      { id: id },
      'process.env.JWT_SECRET',
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
    });
    res.status(200).json({token: token});
  };


  