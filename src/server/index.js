import express from 'express'
import { expressjwt } from 'express-jwt'
import { connect } from './database'
import auth from './router/auth'

export const app = express()
app.use(express.json())

// Auth should be before auth middleware
app.use('/api/auth', auth)

// Auth middleware
app.use('/api/', expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }))

if (!process.env['VITE']) {
    const frontendFiles = process.cwd() + '/dist'
    app.use(express.static(frontendFiles))
    app.get('/*', (_, res) => {
        res.send(frontendFiles + '/index.html')
    })
    app.listen(process.env['PORT'])
}

connect()
