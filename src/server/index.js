import express from 'express'
import { expressjwt } from 'express-jwt'
import { connect } from './database'
import auth from './router/auth'
import apiRouter from './router'
import organizationMiddleware from './middlewares/organization.middleware'
import currentUserMiddleware from './middlewares/currentUser.middleware'
import seeds from './database/seeds'

export const app = express()
app.use(express.json())

// Auth should be before auth middleware
app.use('/api/auth', auth)

// Api middlewares
app.use(
    '/api/',
    expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
    organizationMiddleware,
    currentUserMiddleware
)

// JWT unauthorized access error handling
app.use((err, _req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({message: "Unauthorized"})
    } else {
        next(err)
    }
})

// Register api router
apiRouter(app)

if (!process.env['VITE']) {
    const frontendFiles = process.cwd() + '/dist'
    app.use(express.static(frontendFiles))
    app.get('/app/*', (_, res) => {
        res.send(frontendFiles + '/index.html')
    })
    app.listen(process.env['PORT'])
}

connect()
seeds()
