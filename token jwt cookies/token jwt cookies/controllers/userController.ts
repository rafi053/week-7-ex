import { Request, Response, NextFunction } from "express";

export const user = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json({user: "user"});
  };
