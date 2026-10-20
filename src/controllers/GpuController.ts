import { Request, Response, NextFunction } from 'express'
import Gpu from '../models/gpu'

class gpuController {
    static async getGpus(req: Request, res: Response, next: NextFunction) {
        try {
            const gpus = await Gpu.find()

            res.status(200).json(gpus)

        } catch (error) {
            next(error)
        }
    }

    static async getGpuById(req: Request, res: Response, next: NextFunction) {
        try {
            const gpu = await Gpu.findById(req.params.id)

            if (!gpu) {
                return res.status(404).json({
                    message: 'GPU not found'
                })
            }

            res.status(200).json(gpu)

        } catch (error) {
            next(error)
        }

    }

    static async createGpu(req: Request, res: Response, next: NextFunction) {
        try {
            const gpu = await Gpu.create(req.body)
            res.status(201).json(gpu)
        } catch (error) {
            next(error)
        }
    }

    static async updateGpu(req: Request, res: Response, next: NextFunction) {

        try {
            const gpu = await Gpu.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true })

            if (!gpu) {
                return res.status(404).json({
                    message: 'GPU not found'
                })
            }

            res.status(200).json(gpu)

        } catch (error) {
            next(error)
        }

    }

    static async deleteGpu(req: Request, res: Response, next: NextFunction) {
        try {
            const gpu = await Gpu.findByIdAndDelete(req.params.id)

            if (!gpu) {
                return res.status(404).json({
                    message: 'GPU not found'
                })
            }

            res.status(200).json({
                message: 'Gpu deleted successfully'
            })


        } catch (error) {
            next(error)
        }
    }
}

export default gpuController