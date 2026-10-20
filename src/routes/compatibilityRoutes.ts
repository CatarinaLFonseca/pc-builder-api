import express from 'express'
import CompatibilityController from '../controllers/CompatibilityController'

const routes = express.Router()

routes
    .get('/compatibility/cpu/:cpuId/motherboard/:motherboardId', CompatibilityController.checkCpuMotherboard)
    .get('/compatibility/ram/:ramId/motherboard/:motherboardId', CompatibilityController.checkRamMotherboard)
    .get('/compatibility/motherboard/:motherboardId/case/:caseId', CompatibilityController.checkMotherboardCase)
    .get('/compatibility/gpu/:gpuId/case/:caseId', CompatibilityController.checkGpuCase)
    .get('/compatibility/psu/:psuId/build/:buildId', CompatibilityController.checkPsuBuild)


export default routes