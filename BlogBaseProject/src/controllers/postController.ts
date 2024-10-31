import { Request, Response, NextFunction } from "express";
import Post, { IComment, IPost } from "../models/postModel";
import User, { IUser } from "../models/userModel";
import { ResponseStructure } from "../response";

// Create a new post
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {
    const { title, content, author } = req.body;
    const user: IUser | null = await User.findById(author);
    if (!user) {
      throw new Error("User not found");
    }

    const post: IPost = await Post.create({ title, content, author });
    user.posts.push(post._id);
    await user.save();

    res.status(201).json(new ResponseStructure(true, post, "Post created successfully"));
  } catch (error) {
    next(error);
  }
};

    
// Delete a post
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const post: IPost | null = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      throw new Error("Post not found");
    }
    await User.findByIdAndDelete(post.author, { $pull: { posts: post._id } });
    res.status(200).json(new ResponseStructure(true, {}, "Post deleted successfully"));
  } catch (error) {
    next(error);
  }
};



// Get all posts
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const posts: IPost[] | null = await Post.find().populate(
      {
        path: "author",
        select: "username email profile",
      }
    )
    .populate({
      path: "comments.author",
      select: "username email profile",
    })
    if (!posts) {
      throw new Error("Posts not found");
    }
    res.status(200).json(new ResponseStructure(true, posts, "Posts retrieved successfully"));
  } catch (error) {
    next(error);
  }
};


// Get a single post by ID
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const post: IPost | null = await Post.findById(req.params.id).populate(
      {
        path: "author",
        select: "username email profile",
      }
    )
    .populate({
      path: "comments.author",
      select: "username email profile",
    })
    if (!post) {
      throw new Error("Post not found");
    }
    res.status(200).json(new ResponseStructure(true, post, "Post retrieved successfully"));
  } catch (error) {
    next(error);
  }
};


// Update a post
export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const post: IPost | null = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate({
      path: "author",
      select: "username email profile",
    })
    .populate({
      path: "comments.author",
      select: "username email profile",
    });
    if (!post) {
      throw new Error("Post not found");
    }
    res.status(200).json(new ResponseStructure(true, post, "Post updated successfully"));
  } catch (error) {
    next(error);
  }
};


// Add a comment to a post
export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { content, author } = req.body;
    const user : IUser | null = await User.findById(author);
    if (!user) {
      throw new Error("User not found");
    }
    const comment : IComment = {
      content : content,
      author : user._id,
      createdAt : new Date()
    }

    const post: IPost | null = await Post.findByIdAndUpdate(req.params.id, { $push: { comments: comment } }, { new: true }).populate({
      path: "author",
      select: "username email profile",
    }).populate({
      path: "comments.author",
      select: "username email profile",
    })
    if (!post) {
      throw new Error("Post not found");
    } 
    res.status(200).json(new ResponseStructure(true, post, "Comment added successfully"));
  } catch (error) {
    next(error);
  }
};