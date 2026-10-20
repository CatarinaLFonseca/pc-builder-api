import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {

    if (error instanceof mongoose.Error.CastError) {
        return res.status(400).json({
            message: 'Invalid ID'
        })
    }

    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: error.errors
        })
    }

    console.error(error)

    res.status(500).json({
        message: 'Internal server error'
    })
}