import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import { ResponseStructure } from "../response";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: IUser = await User.create(req.body);
        res.status(201).json(new ResponseStructure(true, user, "User created successfully"));
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users:IUser[]  | null = await User.find();
        if (!users) throw new Error("Users not found");
        res.status(200).json(new ResponseStructure(true, users, "Users retrieved successfully"));
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: IUser | null = await User.findOne({ username: req.params.username }).populate({
            path: "posts",
            populate: {
                path: "author",
                select: "username",
            },
        })
        if (!user) throw new Error("User not found");
        res.status(200).json(new ResponseStructure(true, user, "User retrieved successfully"));
    } catch (error) {
        next(error);
    }
};