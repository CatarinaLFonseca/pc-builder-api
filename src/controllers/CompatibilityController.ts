import { Request, Response, NextFunction } from "express";
import Cpu from "../models/cpu";
import Motherboard from "../models/motherBoard";
import Ram from "../models/ram";
import Case from "../models/case";
import Gpu from "../models/gpu";
import Psu from "../models/psu";
import Build from "../models/build";

import { checkCpuAndMotherboard } from "../compatibility/CpuAndMotherboard";
import { checkRamAndMotherboard } from "../compatibility/RamAndMotherboard";
import { checkMotherboardAndCase } from "../compatibility/MotherboardAndCase";
import { checkGpuCase } from "../compatibility/GpuAndCase";
import { checkPsuAndBuild } from "../compatibility/PsuAndBuild";

class CompatibilityController {
    static async checkCpuMotherboard(req: Request, res: Response, next: NextFunction) {
        try {
            const { cpuId, motherboardId } = req.params

            const cpu = await Cpu.findById(cpuId)
            const motherboard = await Motherboard.findById(motherboardId)

            if (!cpu) {
                return res.status(404).json({
                    message: 'CPU not found'
                })
            }
            if (!motherboard) {
                return res.status(404).json({
                    message: 'Motherboard not found'
                })
            }

            const compatible = checkCpuAndMotherboard(
                cpu.socket,
                motherboard.socket
            )

            return res.status(200).json({
                compatible,
                cpu: {
                    name: cpu.name,
                    socket: cpu.socket
                },
                motherboard: {
                    name: motherboard.name,
                    socket: motherboard.socket
                },
                reason: compatible
                    ? 'CPU and motherboard use the same socket'
                    : `CPU uses ${cpu.socket}, but motherboard uses ${motherboard.socket}`
            })

        } catch (error) {
            next(error)
        }
    }

    static async checkRamMotherboard(req: Request, res: Response, next: NextFunction) {
        try {
            const { ramId, motherboardId } = req.params

            const ram = await Ram.findById(ramId)
            const motherboard = await Motherboard.findById(motherboardId)

            if (!ram) {
                return res.status(404).json({
                    message: 'RAM not found'
                })
            }

            if (!motherboard) {
                return res.status(404).json({
                    message: 'Motherboard not found'
                })
            }

            const compatible = checkRamAndMotherboard(
                ram.memoryType,
                motherboard.memoryType
            )

            return res.status(200).json({
                compatible,
                ram: {
                    name: ram.name,
                    memoryType: ram.memoryType
                },
                motherboard: {
                    name: motherboard.name,
                    memoryType: motherboard.memoryType
                },
                reason: compatible
                    ? 'RAM and motherboard use the same memory type'
                    : `RAM uses ${ram.memoryType}, but motherboard supports ${motherboard.memoryType}`
            })

        } catch (error) {
            next(error)
        }
    }

    static async checkMotherboardCase(req: Request, res: Response, next: NextFunction) {
        try {
            const { motherboardId, caseId } = req.params

            const motherboard = await Motherboard.findById(motherboardId)
            const computerCase = await Case.findById(caseId)

            if (!motherboard) {
                return res.status(404).json({
                    message: 'Motherboard not found'
                })
            }

            if (!computerCase) {
                return res.status(404).json({
                    message: 'Case not found'
                })
            }

            const compatible = checkMotherboardAndCase(
                motherboard.formFactor,
                computerCase.supportedFormFactors
            )

            return res.status(200).json({
                compatible,
                motherboard: {
                    name: motherboard.name,
                    formFactor: motherboard.formFactor
                },
                case: {
                    name: computerCase.name,
                    supportedFormFactors: computerCase.supportedFormFactors
                },
                reason: compatible
                    ? 'Motherboard form factor is supported by the case'
                    : `Motherboard uses ${motherboard.formFactor}, but the case does not support it`
            })
        } catch (error) {
            next(error)
        }
    }

    static async checkGpuCase(req: Request, res: Response, next: NextFunction) {
        try {
            const { gpuId, caseId } = req.params

            const gpu = await Gpu.findById(gpuId)
            const computerCase = await Case.findById(caseId)

            if (!gpu) {
                return res.status(404).json({
                    message: 'GPU not found'
                })
            }

            if (!computerCase) {
                return res.status(404).json({
                    message: 'Case not found'
                })
            }

            const compatible = checkGpuCase(
                gpu.length,
                computerCase.maxGpuLength
            )

            return res.status(200).json({
                compatible,
                gpu: {
                    name: gpu.name,
                    length: gpu.length
                },
                case: {
                    name: computerCase.name,
                    maxGpuLength: computerCase.maxGpuLength
                },
                reason: compatible
                    ? 'GPU fits inside the case'
                    : `GPU length is ${gpu.length}mm, but the case supports up to ${computerCase.maxGpuLength}mm`
            })

        } catch (error) {
            next(error)
        }
    }
    static async checkPsuBuild(req: Request, res: Response, next: NextFunction) {
        try {
            const { psuId, buildId } = req.params

            const psu = await Psu.findById(psuId)

            if (!psu) {
                return res.status(404).json({
                    message: 'PSU not found'
                })
            }

            const build = await Build.findById(buildId)
                .populate('cpu')
                .populate('gpu')

            if (!build) {
                return res.status(404).json({
                    message: 'BUILD not found'
                })
            }

            const cpu = build.cpu as any
            const gpu = build.gpu as any

            const psuBuildCheck = checkPsuAndBuild(
                cpu.tdp,
                gpu.tdp,
                psu.wattage
            )

            return res.status(200).json({
                compatible: psuBuildCheck.compatible,
                psu: {
                    name: psu.name,
                    wattage: psu.wattage
                },

                build: {
                    name: build.name
                },

                estimatedConsumption: psuBuildCheck.estimatedConsumption,
                recommendedWattage: psuBuildCheck.recommendedWattage,

                reason: psuBuildCheck.compatible
                    ? `PSU provides enough power for this build`
                    : `PSU provides ${psu.wattage}W, but the build requires approximately ${psuBuildCheck.recommendedWattage}W`
            })

        } catch (error) {
            next(error)
        }
    }
}

export default CompatibilityController