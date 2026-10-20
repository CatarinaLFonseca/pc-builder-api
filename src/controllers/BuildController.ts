import { Request, Response, NextFunction } from 'express'
import Build from '../models/build'
import Cpu from '../models/cpu'
import Motherboard from '../models/motherBoard'
import Ram from '../models/ram'
import Case from '../models/case'
import Gpu from '../models/gpu'
import Psu from '../models/psu'
import { checkCpuAndMotherboard } from '../compatibility/CpuAndMotherboard'
import { checkRamAndMotherboard } from '../compatibility/RamAndMotherboard'
import { checkMotherboardAndCase } from '../compatibility/MotherboardAndCase'
import { checkGpuCase } from '../compatibility/GpuAndCase'
import { checkPsuAndBuild } from '../compatibility/PsuAndBuild'

class BuildController {
    static async getBuilds(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const build = await Build.find()
                .populate('cpu')
                .populate('motherboard')
                .populate('ram')
                .populate('case')
                .populate('gpu')
                .populate('psu')

            res.status(200).json(build)

        } catch (error) {
            next(error)
        }

    }

    static async getBuildById(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const build = await Build.findById(req.params.id)
                .populate('cpu')
                .populate('motherboard')
                .populate('ram')
                .populate('case')
                .populate('gpu')
                .populate('psu')

            if (!build) {
                return res.status(404).json({
                    message: 'Build not found'
                })
            }

            return res.status(200).json(build)
        } catch (error) {
            next(error)
        }
    }

    static async checkBuildCompatibility(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const build = await Build.findById(req.params.id)
                .populate('cpu')
                .populate('motherboard')
                .populate('ram')
                .populate('case')
                .populate('gpu')
                .populate('psu')

            if (!build) {
                return res.status(404).json({
                    message: 'Build not found'
                })
            }

            const cpu = build.cpu as any
            const motherboard = build.motherboard as any
            const ram = build.ram as any
            const computerCase = build.case as any
            const gpu = build.gpu as any
            const psu = build.psu as any

            const cpuMotherboardCompatible = checkCpuAndMotherboard(
                cpu.socket,
                motherboard.socket
            )

            const ramMotherboardCompatible = checkRamAndMotherboard(
                ram.memoryType,
                motherboard.memoryType
            )

            const motherboardCaseCompatible = checkMotherboardAndCase(
                motherboard.formFactor,
                computerCase.supportedFormFactors
            )

            const gpuCaseCompatible = checkGpuCase(
                gpu.length,
                computerCase.maxGpuLength
            )

            const psuBuildCheck = checkPsuAndBuild(
                cpu.tdp,
                gpu.tdp,
                psu.wattage
            )

            const compatible =
                cpuMotherboardCompatible &&
                ramMotherboardCompatible &&
                motherboardCaseCompatible &&
                gpuCaseCompatible &&
                psuBuildCheck.compatible

            return res.status(200).json({
                compatible,
                build: {
                    name: build.name
                },
                checks: {
                    cpuMotherboard: {
                        compatible: cpuMotherboardCompatible,
                        reason: cpuMotherboardCompatible
                            ? 'CPU and motherboard use the same socket'
                            : `CPU uses ${cpu.socket}, but motherboard uses ${motherboard.socket}`
                    },
                    ramMotherboard: {
                        compatible: ramMotherboardCompatible,
                        reason: ramMotherboardCompatible
                            ? 'RAM and motherboard use the same memory type'
                            : `RAM uses ${ram.memoryType}, but motherboard supports ${motherboard.memoryType}`

                    },
                    motherboardCase: {
                        compatible: motherboardCaseCompatible,
                        reason: motherboardCaseCompatible
                            ? 'Motherboard form factor is supported by the case'
                            : `Motherboard uses ${motherboard.formFactor}, but the case does not support it`
                    },
                    gpuCase: {
                        compatible: gpuCaseCompatible,
                        reason: gpuCaseCompatible
                            ? 'GPU fits inside the case'
                            : `GPU length is ${gpu.length}mm, but the case supports up to ${computerCase.maxGpuLength}mm`
                    },
                    psuBuild: {
                        compatible: psuBuildCheck.compatible,
                        estimatedConsumption: psuBuildCheck.estimatedConsumption,
                        recommendedWattage: psuBuildCheck.recommendedWattage,
                        reason: psuBuildCheck.compatible
                            ? `PSU provides enough power. Recommended: ${psuBuildCheck.recommendedWattage}W`
                            : `PSU provides ${psu.wattage}W, but the build requires approximately ${psuBuildCheck.recommendedWattage}W`
                    }
                }
            })

        } catch (error) {
            next(error)
        }
    }

    static async createBuild(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { cpu, motherboard, ram, case: computerCase, gpu, psu } = req.body

            const cpuExists = await Cpu.findById(cpu)
            const motherboardExists = await Motherboard.findById(motherboard)
            const ramExists = await Ram.findById(ram)
            const caseExists = await Case.findById(computerCase)
            const gpuExists = await Gpu.findById(gpu)
            const psuExists = await Psu.findById(psu)

            if (!cpuExists) {
                return res.status(404).json({
                    message: 'CPU not found'
                })
            }

            if (!motherboardExists) {
                return res.status(404).json({
                    message: 'Motherboard not found'
                })
            }

            if (!ramExists) {
                return res.status(404).json({
                    message: 'RAM not found'
                })
            }

            if (!caseExists) {
                return res.status(404).json({
                    message: 'Case not found'
                })
            }

            if (!gpuExists) {
                return res.status(404).json({
                    message: 'GPU not found'
                })
            }

            if (!psuExists) {
                return res.status(404).json({
                    message: 'PSU not found'
                })
            }

            const build = await Build.create(req.body)

            res.status(201).json(build)
        } catch (error) {
            next(error)
        }
    }

    static async updateBuild(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const {
                cpu,
                motherboard,
                ram,
                case: computerCase,
                gpu,
                psu
            } = req.body

            if (cpu) {
                const cpuExists = await Cpu.findById(cpu)

                if (!cpuExists) {
                    return res.status(404).json({
                        message: 'CPU not found'
                    })
                }
            }

            if (motherboard) {
                const motherboardExists = await Motherboard.findById(motherboard)

                if (!motherboardExists) {
                    return res.status(404).json({
                        message: 'Motherboard not found'
                    })
                }
            }

            if (ram) {
                const ramExists = await Ram.findById(ram)

                if (!ramExists) {
                    return res.status(404).json({
                        message: 'RAM not found'
                    })
                }
            }

            if (computerCase) {
                const caseExists = await Case.findById(computerCase)

                if (!caseExists) {
                    return res.status(404).json({
                        message: 'Case not found'
                    })
                }
            }

            if (gpu) {
                const gpuExists = await Gpu.findById(gpu)

                if (!gpuExists) {
                    return res.status(404).json({
                        message: 'GPU not found'
                    })
                }
            }

            if (psu) {
                const psuExists = await Psu.findById(psu)

                if (!psuExists) {
                    return res.status(404).json({
                        message: 'PSU not found'
                    })
                }
            }

            const build = await Build.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    returnDocument: 'after',
                    runValidators: true
                }
            )

            if (!build) {
                return res.status(404).json({
                    message: 'Build not found'
                })
            }

            return res.status(200).json(build)

        } catch (error) {
            next(error)
        }
    }

    static async deleteBuild(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const build = await Build.findByIdAndDelete(req.params.id)

            if (!build) {
                return res.status(404).json({
                    message: 'Build not found'
                })
            }

            return res.status(200).json({
                message: 'Build deleted successfully'
            })

        } catch (error) {
            next(error)
        }
    }
}

export default BuildController