import express from "express";
import GpuController from '../controllers/GpuController'

const routes = express.Router()

routes
    .get('/gpus', GpuController.getGpus)
    .get('/gpus/:id', GpuController.getGpuById)
    .post('/gpu', GpuController.createGpu)
    .put('/gpus/:id', GpuController.updateGpu)
    .delete('/gpus/:id', GpuController.deleteGpu)


export default routes