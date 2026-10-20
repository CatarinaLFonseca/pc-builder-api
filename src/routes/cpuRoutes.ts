import express from 'express'
import cpuController from '../controllers/CpuController'

const routes = express.Router()

routes
    .get("/cpus", cpuController.getCpus)
    .get("/cpus/:id", cpuController.getCpuById)
    .post("/cpus", cpuController.createCpu)
    .put("/cpus/:id", cpuController.updateCpu)
    .delete("/cpus/:id", cpuController.deleteCpu)

export default routes