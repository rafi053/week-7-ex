import { Request, Response, NextFunction } from "express";
import { ResponseStructure } from "../types/response";
import * as Student from "../services/studentService";
import jwt from 'jsonwebtoken';


import dotenv from "dotenv"
import { IStudent } from "../models/studentModel";

dotenv.config();

const JWT_SECRET:string = process.env.JWT_SECRET || "default_secret";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const  { name, email, password, classRoom } = req.body;
    const newStudent:IStudent | undefined = await Student.register( name, email, password, classRoom); 
    const response = new ResponseStructure(true, newStudent, "StuIStudent created successfully");
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const student:IStudent | null = await Student.login(email, password);
    if (student) {
      const token = jwt.sign({ id: student._id }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true ,  maxAge: 3600000 } );

    const response = new ResponseStructure(true, student, 'User logged in successfully');
    res.status(200).json(response);
   
    }
  } catch (error) {
    next(error);
  }

    
};

export const getGrades = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const student: IStudent | null = await Student.getGrades( id );
    const response = new ResponseStructure(true, student);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

