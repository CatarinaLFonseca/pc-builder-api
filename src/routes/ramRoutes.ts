import express from 'express'
import RamController from '../controllers/RamController'

const routes = express.Router()

routes
    .get("/rams", RamController.getRam)
    .get("/rams/:id", RamController.getRamById)
    .post("/rams", RamController.createRam)
    .put("/rams/:id", RamController.updateRam)
    .delete("/rams/:id", RamController.deleteRam)

export default routes