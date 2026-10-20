import express from 'express'
import psuController from '../controllers/PsuController'

const routes = express.Router()

routes
    .get("/psus", psuController.getPsus)
    .get("/psus/:id", psuController.getPsuById)
    .post("/psu", psuController.createPsu)
    .put("/psus/:id", psuController.updatePsu)
    .delete("/psus/:id", psuController.deletePsu)

export default routes