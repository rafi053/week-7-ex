import Student, { IGrade, IStudent } from "../models/studentModel";
import Teacher, { ITeacher } from "../models/teacherModel";
import Class, { IClass } from "../models/classModel";



export  const  register = async (teacher: ITeacher): Promise<ITeacher> => {
    const TeacherToAdd: ITeacher = await Teacher.create(teacher);
    return TeacherToAdd;
}

export  const  addClass = async (classRoom: IClass): Promise<IClass> => {
    const classToAdd: IClass = await Class.create(classRoom);
    return classToAdd;
}

export  const  login = async (email: string, password: string): Promise<ITeacher | null> => {
    const teacher: ITeacher | null = await Teacher.findOne({ email: email, password: password });
    return teacher;
}



export  const  getAllDetails = async (id: string): Promise<ITeacher | null> => {
    const users: ITeacher | null = await Teacher.findById(id).populate(
        {
            path: "classId",
            select: "name, teacher",
        }
    ).populate(
        {
            path: "classId.teacher",
            select: "name email profile",
        }
    )
    return users;
};

export  const  addClassIdToTeacher = async (id: any, classId: any): Promise<ITeacher | null> => {
    const teacher: any = await Teacher.findByIdAndUpdate(
        id, 
        { $set: { class: classId } }, 
        { new: true }
      ).exec();
    return teacher;
}

export  const  addGrade = async (id: string, grade: IGrade): Promise<IStudent | null> => {
    const student: any = await Class.updateOne({ _id: id }, { $push: { grades: grade } });
    return student;
}


export  const  changGrade = async (id: string, grade: IGrade): Promise<IStudent | null> => {
    const student: any = await Class.updateOne({ _id: id }, { $set: { grades: grade } });
    return student;
}

export  const  getGrades = async (): Promise<IStudent[] | null> => {
    const students: IStudent[] = await Class.find();
    return students;
}







