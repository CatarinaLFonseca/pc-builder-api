import 'dotenv/config'
import express from "express"
import routes from './routes'
import { connectDatabase } from './config/database'
import { errorHandler } from './middlewares/errorHandler'

const app = express()

app.use(express.json())

connectDatabase()

routes(app)


/* app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
    })
}) */

app.use(errorHandler)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
});