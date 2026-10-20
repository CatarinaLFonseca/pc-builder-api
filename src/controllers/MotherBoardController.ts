import { Request, Response, NextFunction } from "express";
import Motherboard from "../models/motherBoard";

class MotherboardController {

    static async getMotherboard(req: Request, res: Response, next: NextFunction) {
        try {
            const motherBoards = await Motherboard.find()

            res.status(200).json(motherBoards)

        } catch (error) {
            next(error)
        }
    }

    static async getMotherboardById(req: Request, res: Response, next: NextFunction) {
        try {
            const motherBoard = await Motherboard.findById(req.params.id)

            if (!motherBoard) {
                return res.status(404).json({
                    message: 'Motherboard not found'
                })
            }

            res.status(200).json(motherBoard)

        } catch (error) {
            next(error)
        }
    }

    static async createMotherBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const motherBoard = await Motherboard.create(req.body)
            res.status(201).json(motherBoard)

        } catch (error) {
            next(error)
        }
    }

    static async updateMotherBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const motherBoard = await Motherboard.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true })

            if (!motherBoard) {
                return res.status(404).json({
                    message: 'Motherboard not found'
                })
            }

            res.status(200).json(motherBoard)
        } catch (error) {
            next(error)
        }
    }

    static async deleteMotherBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const motherBoard = await Motherboard.findByIdAndDelete(req.params.id)

            if (!motherBoard) {
                return res.status(404).json({
                    message: 'Motherboard not found'
                })
            }

            res.status(200).json({
                message: 'Motherboard deleted successfully'
            })
        } catch (error) {
            next(error)
        }
    }

}

export default MotherboardController