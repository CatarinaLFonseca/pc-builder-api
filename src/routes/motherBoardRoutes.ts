import express from 'express'
import MotherboardController from '../controllers/MotherBoardController'

const routes = express.Router()

routes
    .get("/motherboard", MotherboardController.getMotherboard)
    .get("/motherboard/:id", MotherboardController.getMotherboardById)
    .post("/motherboard", MotherboardController.createMotherBoard)
    .put("/motherboard/:id", MotherboardController.updateMotherBoard)
    .delete("/motherboard/:id", MotherboardController.deleteMotherBoard)


export default routes