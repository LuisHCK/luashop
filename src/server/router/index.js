import { Application } from 'express'
import organizations from './organizations.router'
import sandbox from './sandbox.router'
import inventories from './inventories.router'

/**
 *
 * @param {Application} app
 */
const apiRouter = (app) => {
    app.use('/api/sandbox', sandbox)
    app.use('/api/organizations', organizations)
    app.use('/api/inventories', inventories)
}

export default apiRouter
