import userModel from '../models/user.model'

export default async (req, res, next) => {
    const { auth, originalUrl, method } = req

    if (originalUrl === '/api/organizations' && method === 'POST') {
        return next()
    }

    if (auth) {
        const user = await userModel.findById(auth._id)

        if (!user.organization) {
            return res.status(422).json({ message: 'You do not have an organization assigned' })
        }
    }
    next()
}
