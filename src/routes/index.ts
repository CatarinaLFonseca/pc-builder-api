import express, { Express } from 'express'
import cpuRoutes from './cpuRoutes'
import motherBoardRoutes from './motherBoardRoutes'
import compatibilityRoutes from './compatibilityRoutes'
import ramRoutes from './ramRoutes'
import buildRoutes from './buildRoutes'
import caseRoutes from './caseRoutes'
import gpuRoutes from './gpuRoutes'
import psuRoutes from './psuRoutes'

const routes = (app: Express) => {
    app.route('/').get((req, res) => {
        res.status(200).send({
            message: 'PC Builder API'
        })
    })

    app.use(
        cpuRoutes,
        motherBoardRoutes,
        compatibilityRoutes,
        ramRoutes,
        buildRoutes,
        caseRoutes,
        gpuRoutes,
        psuRoutes
    )
}

export default routes



