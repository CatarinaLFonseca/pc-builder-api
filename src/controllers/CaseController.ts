import { Request, Response, NextFunction } from 'express'
import Case from '../models/case'

class CaseController {
    static async getCases(req: Request, res: Response, next: NextFunction) {
        try {
            const cases = await Case.find()

            return res.status(200).json(cases)
        } catch (error) {
            next(error)
        }
    }

    static async getCaseById(req: Request, res: Response, next: NextFunction) {
        try {
            const computerCase = await Case.findById(req.params.id)

            if (!computerCase) {
                return res.status(404).json({
                    message: 'Case not found'
                })
            }

            return res.status(200).json(computerCase)
        } catch (error) {
            next(error)
        }
    }

    static async createCase(req: Request, res: Response, next: NextFunction) {
        try {
            const computerCase = await Case.create(req.body)

            return res.status(201).json(computerCase)
        } catch (error) {
            next(error)
        }
    }

    static async updateCase(req: Request, res: Response, next: NextFunction) {
        try {
            const computerCase = await Case.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    returnDocument: 'after',
                    runValidators: true
                }
            )

            if (!computerCase) {
                return res.status(404).json({
                    message: 'Case not found'
                })
            }

            return res.status(200).json(computerCase)
        } catch (error) {
            next(error)
        }
    }

    static async deleteCase(req: Request, res: Response, next: NextFunction) {
        try {
            const computerCase = await Case.findByIdAndDelete(req.params.id)

            if (!computerCase) {
                return res.status(404).json({
                    message: 'Case not found'
                })
            }

            return res.status(200).json({
                message: 'Case deleted successfully'
            })
        } catch (error) {
            next(error)
        }
    }
}

export default CaseController