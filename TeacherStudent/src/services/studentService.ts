import * as studentData from "../DAL/studentData.js";
import { IStudent } from "../models/studentModel.js";


export const register = async (name: string, email: string, password: string, classRoom: string): Promise<IStudent | undefined> => {
  const classId: any = await studentData.getClass(classRoom);
  if (!classId) {
    throw new Error("Class not found");
  }
  let newStudent = {
    name,
    email,
    password,
    classId,
    grades: []
    
  }

  const studentToAdd: any  = await studentData.register(newStudent);
  await studentData.addToClass(studentToAdd._id);

  return studentToAdd
    
}



export const login = async (email: string, password: string): Promise<IStudent | null> => {
  const student: IStudent | null = await studentData.login(email, password);  
  return student;
};


export const getGrades = async ( id: string): Promise<IStudent | null> => {
    const student: IStudent | null = await studentData.getGrades( id);  
    return student;
  };


