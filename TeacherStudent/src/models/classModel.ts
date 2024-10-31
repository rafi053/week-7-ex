import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IClass {
  _id?: Types.ObjectId;
  name: string;
  teacher: Types.ObjectId;
  students?: Types.ObjectId[];
}                                                         




const ClassSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter username"],
    unique: true,
    minlength: [3, "Username must be at least 3 characters"],
    maxlength: [30, "Username cannot exceed 30 characters"],
    match:[ /^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"],
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default mongoose.model<IClass>("Class", ClassSchema);
