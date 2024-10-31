"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const CommentSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: [true, "Please enter comment content"],
        minlength: [1, "Comment must be at least 1 character"],
        maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please enter comment author"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const PostSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please enter post author"],
    },
    comments: [CommentSchema]
});
exports.default = mongoose_1.default.model("Post", PostSchema);
