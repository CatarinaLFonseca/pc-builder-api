import express from 'express'
import CaseController from '../controllers/CaseController'

const routes = express.Router()

routes
    .get('/cases', CaseController.getCases)
    .get('/cases/:id', CaseController.getCaseById)
    .post('/cases', CaseController.createCase)
    .put('/cases/:id', CaseController.updateCase)
    .delete('/cases/:id', CaseController.deleteCase)

export default routes