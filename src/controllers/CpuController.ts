import { Request, Response, NextFunction } from 'express'
import Cpu from '../models/cpu'

class cpuController {
    static async getCpus(req: Request, res: Response, next: NextFunction) {
        try {
            const cpus = await Cpu.find()

            res.status(200).json(cpus)

        } catch (error) {
            next(error)
        }
    }

    static async getCpuById(req: Request, res: Response, next: NextFunction) {
        try {
            const cpu = await Cpu.findById(req.params.id)

            if (!cpu) {
                return res.status(404).json({
                    message: 'CPU not found'
                })
            }

            res.status(200).json(cpu)

        } catch (error) {
            next(error)
        }

    }

    static async createCpu(req: Request, res: Response, next: NextFunction) {
        try {
            const cpu = await Cpu.create(req.body)
            res.status(201).json(cpu)
        } catch (error) {
            next(error)
        }
    }

    static async updateCpu(req: Request, res: Response, next: NextFunction) {

        try {
            const cpu = await Cpu.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true })

            if (!cpu) {
                return res.status(404).json({
                    message: 'CPU not found'
                })
            }

            res.status(200).json(cpu)

        } catch (error) {
            next(error)
        }

    }

    static async deleteCpu(req: Request, res: Response, next: NextFunction) {
        try {
            const cpu = await Cpu.findByIdAndDelete(req.params.id)

            if (!cpu) {
                return res.status(404).json({
                    message: 'CPU not found'
                })
            }

            res.status(200).json({
                message: 'Cpu deleted successfully'
            })


        } catch (error) {
            next(error)
        }
    }
}


export default cpuController