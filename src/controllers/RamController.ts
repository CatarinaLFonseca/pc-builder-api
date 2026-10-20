import { Request, Response, NextFunction } from 'express'
import Ram from '../models/ram'

class ramController {
    static async getRam(req: Request, res: Response, next: NextFunction) {
        try {
            const rams = await Ram.find()

            res.status(200).json(rams)

        } catch (error) {
            next(error)
        }
    }

    static async getRamById(req: Request, res: Response, next: NextFunction) {
        try {
            const ram = await Ram.findById(req.params.id)

            if (!ram) {
                return res.status(404).json({
                    message: 'RAM not found'
                })
            }

            res.status(200).json(ram)

        } catch (error) {
            next(error)
        }

    }

    static async createRam(req: Request, res: Response, next: NextFunction) {
        try {
            const ram = await Ram.create(req.body)
            res.status(201).json(ram)
        } catch (error) {
            next(error)
        }
    }

    static async updateRam(req: Request, res: Response, next: NextFunction) {

        try {
            const ram = await Ram.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true })

            if (!ram) {
                return res.status(404).json({
                    message: 'RAM not found'
                })
            }

            res.status(200).json(ram)

        } catch (error) {
            next(error)
        }

    }

    static async deleteRam(req: Request, res: Response, next: NextFunction) {
        try {
            const ram = await Ram.findByIdAndDelete(req.params.id)

            if (!ram) {
                return res.status(404).json({
                    message: 'RAM not found'
                })
            }

            res.status(200).json({
                message: 'Ram deleted successfully'
            })


        } catch (error) {
            next(error)
        }
    }

}

export default ramController 