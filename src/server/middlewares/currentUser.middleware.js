import userModel from '../models/user.model'
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export default async (req, _res, next) => {
    const { auth } = req

    if (auth) {
        const currentUser = await userModel.findById(auth._id).populate('organization')

        if (currentUser) {
            req.currentUser = currentUser.toObject()
        }
    }

    next()
}
