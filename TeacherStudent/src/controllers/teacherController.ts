import { NextFunction, Request, Response } from "express";
import { ResponseStructure } from "../types/response";
import * as Teacher from "../services/teacherService";
import jwt from 'jsonwebtoken';


import dotenv from "dotenv"
import { ITeacher } from "../models/teacherModel";
import { IStudent } from "../models/studentModel";

dotenv.config();

const JWT_SECRET:string = process.env.JWT_SECRET || "default_secret";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const  { name, email, password, classRoom } = req.body;
    const newTeacher: ITeacher | undefined = await Teacher.register( name, email, password, classRoom); 
    const response = new ResponseStructure(true, newTeacher, "Teacher created successfully");
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const teacher: ITeacher | null = await Teacher.login(email, password);
    if (teacher) {
      const token = jwt.sign({ id: teacher._id }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true ,  maxAge: 3600000 } );

    const response = new ResponseStructure(true, teacher, 'User logged in successfully');
    res.status(200).json(response);
   
    }
  } catch (error) {
    next(error);
  }

    
};


export const addGrade = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { grade } = req.body;
    const status: IStudent | null  = await Teacher.addGrade(id, grade);
    const response = new ResponseStructure(true, status, "Grade added successfully");
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const changGrade = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { grade } = req.body;
    const status: IStudent = await Teacher.changGrade(id, grade);
    const response = new ResponseStructure(true, status, "Grade changed successfully");
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getAverageGrades = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const grade: number = await Teacher.getAverageGrades();
    const response = new ResponseStructure(true, grade, "Average grade");
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 
  try {
    const id = req.params.id;
    const users: ITeacher | null = await Teacher.getAllDetails(id);
    const response = new ResponseStructure(true, users);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getGrades = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student: IStudent[] | null = await Teacher.getGrades();
    const response = new ResponseStructure(true, student);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};