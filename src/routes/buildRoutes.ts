import express from 'express'
import BuildController from '../controllers/BuildController'

const routes = express.Router()

routes
    .get('/builds', BuildController.getBuilds)
    .get('/builds/:id/compatibility', BuildController.checkBuildCompatibility)
    .get('/builds/:id', BuildController.getBuildById)
    .post('/builds', BuildController.createBuild)
    .put('/builds/:id', BuildController.updateBuild)
    .delete('/builds/:id', BuildController.deleteBuild)

export default routes