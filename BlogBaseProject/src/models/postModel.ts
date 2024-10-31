import mongoose, { Schema, Document, Types } from "mongoose";

export interface IComment {
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
}

export interface IPost extends Document {
  _id: Types.ObjectId;
  title: string;
  content: string;
  author: Types.ObjectId;
  comments: IComment[];
}


const CommentSchema = new Schema<IComment>({

  content: {
    type: String,
    required: [true, "Please enter comment content"],
    minlength: [1, "Comment must be at least 1 character"],
    maxlength: [1000, "Comment cannot exceed 1000 characters"],
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please enter comment author"],
  },

  createdAt: {  
    type: Date,
    default: Date.now
  }
});

const PostSchema = new Schema<IPost>({  

  title: {  
    type: String,
    required: [true, "Please enter post title"],
    minlength: [3, "Post title must be at least 3 characters"],
    maxlength: [100, "Post title cannot exceed 100 characters"],
  },

  content: {
    type: String,
    required: [true, "Please enter post content"],
    minlength: [10, "Post content must be at least 10 characters"],
    maxlength: [1000, "Post content cannot exceed 1000 characters"],
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please enter post author"],
  },

  comments: [CommentSchema]
});


 

export default mongoose.model<IPost>("Post", PostSchema);
