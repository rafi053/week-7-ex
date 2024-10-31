"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENVIORMENT === "dev") {
        console.error(err.stack);
    }
    res.status(500).json({ message: "Error Eccured", error: err.message || err });
};
exports.errorHandler = errorHandler;