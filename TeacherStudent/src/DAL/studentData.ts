import Student, { IStudent } from "../models/studentModel";
import Teacher, { ITeacher } from "../models/teacherModel";
import Class, { IClass } from "../models/classModel";
import exp from "constants";
import e from "express";
import { ExitStatus } from "typescript";
import { ObjectId, Schema } from "mongoose";


export  const getClass = async ( classRoom: string) : Promise<IClass | null> => {
    const classRoomDetails: IClass | null = await Class.findOne({ name: classRoom });
    return classRoomDetails;
}

export  const  register = async (student: IStudent): Promise<IStudent> => {
    const studentToAdd: IStudent = await Student.create(student);
    return studentToAdd;
}


export  const  login = async (email: string, password: string): Promise<IStudent | null> => {
    const teacher: IStudent | null = await Student.findOne({ email: email, password: password });
    return teacher;
}


export  const  getGrades = async (id: string): Promise<IStudent | null> => {
    const students: IStudent | null = await Student.findById(id).populate(
        {
            path: "classId",
            select: "name, teacher",
            
        }
    );
    return students;
}

export  const  addToClass = async (id: any): Promise<ITeacher | null> => {
    const student: any = await Class.updateOne({ _id: id }, { $push: { students: id } });
    return student;
}
