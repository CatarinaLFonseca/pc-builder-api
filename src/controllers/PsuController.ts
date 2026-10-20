import { Request, Response, NextFunction } from 'express'
import Psu from '../models/psu'

class psuController {
    static async getPsus(req: Request, res: Response, next: NextFunction) {
        try {
            const psus = await Psu.find()

            res.status(200).json(psus)

        } catch (error) {
            next(error)
        }
    }

    static async getPsuById(req: Request, res: Response, next: NextFunction) {
        try {
            const psu = await Psu.findById(req.params.id)

            if (!psu) {
                return res.status(404).json({
                    message: 'PSU not found'
                })
            }

            res.status(200).json(psu)

        } catch (error) {
            next(error)
        }

    }

    static async createPsu(req: Request, res: Response, next: NextFunction) {
        try {
            const psu = await Psu.create(req.body)
            res.status(201).json(psu)
        } catch (error) {
            next(error)
        }
    }

    static async updatePsu(req: Request, res: Response, next: NextFunction) {

        try {
            const psu = await Psu.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true })

            if (!psu) {
                return res.status(404).json({
                    message: 'PSU not found'
                })
            }

            res.status(200).json(psu)

        } catch (error) {
            next(error)
        }

    }

    static async deletePsu(req: Request, res: Response, next: NextFunction) {
        try {
            const psu = await Psu.findByIdAndDelete(req.params.id)

            if (!psu) {
                return res.status(404).json({
                    message: 'PSU not found'
                })
            }

            res.status(200).json({
                message: 'PSU deleted successfully'
            })


        } catch (error) {
            next(error)
        }
    }
}

export default psuController