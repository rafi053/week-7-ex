import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IGrade {
  subject: string;
  grade: number;
  comment: string;
}


export interface IStudent {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  classId: Types.ObjectId;
  grades: IGrade[];
}

const StudentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter username"],
    unique: true,
    minlength: [3, "Username must be at least 3 characters"],
    maxlength: [30, "Username cannot exceed 30 characters"],
    match:[ /^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    }
});

export default mongoose.model<IStudent>("Student", StudentSchema);
