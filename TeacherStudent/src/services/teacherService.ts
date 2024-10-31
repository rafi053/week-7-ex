import * as teacherData from "../DAL/teacherData.js";
import { IClass } from "../models/classModel.js";
import { IGrade, IStudent } from "../models/studentModel.js";
import { stdout } from "process";
import Teacher, { ITeacher } from "../models/teacherModel";


export const register = async (name: string, email: string, password: string, classRoom: string): Promise<ITeacher | undefined> => {
  let newTeacher = {
    name,
    email,
    password,
  }

  const teacherToAdd: ITeacher = await teacherData.register(newTeacher);
  if (teacherToAdd._id){
    let newClass = {
    name: classRoom,
    teacher: teacherToAdd._id
  }
  const classToAdd = await teacherData.addClass(newClass);
  await teacherData.addClassIdToTeacher(teacherToAdd._id, classToAdd._id); 
  return teacherToAdd
  }
}



export const login = async (email: string, password: string): Promise<ITeacher | null> => {
  const teacher: ITeacher | null = await teacherData.login(email, password);  
  return teacher;
};


export const getGrades = async (): Promise<IStudent[] | null> => {
  const students: IStudent[] | null = await teacherData.getGrades();
  return students;
}


export const addGrade = async (id: string, grade: IGrade): Promise<IStudent | null> => {
  const status: IStudent | null = await teacherData.addGrade(id, grade);
  return status;
};


export const changGrade = async (id: string, grade: IGrade): Promise<IStudent> => {
  const student: any = await teacherData.changGrade(id, grade);
  return student;
};


export const getAverageGrades = async (): Promise<number> => {
  const status: any = await teacherData.getGrades();
  return status;
};




export const getAllDetails = async (id: string ): Promise<ITeacher | null> => {
  const users: ITeacher | null = await teacherData.getAllDetails( id );
  return users;
}