import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  profile: {
    bio?: string;
    socialLinks?: string;
  };
  posts: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  username: {
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
  profile: {
    bio: {
      type: String,
      maxlength: [500, "Bio cannot exceed 500 characters"], 
    },
    socialLinks: {
      type: String,
      validate: [validator.isURL, "Please enter valid URL"],
    },
  },
  posts: {
    type: [Schema.Types.ObjectId],
    ref: "Post",
  },
});

export default mongoose.model<IUser>("User", UserSchema);
