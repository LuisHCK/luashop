import omit from 'lodash/omit'
import Organization from '../models/organization.model'


export const index = async (req, res) => {
    try {
        const organizations = await Organization.find({ owner: req.auth._id })
        res.json(organizations)
    } catch (error) {
        console.error(error)
        res.status(404).json({ message: 'Not found' })
    }
}

export const create = async (req, res) => {
    try {
        const { auth, body } = req
        const userOrgs = await Organization.find({ owner: auth._id }).countDocuments()

        if (userOrgs < 1) {
            const newOrg = await Organization.create({ ...body, owner: auth._id })
            return res.json(newOrg.toObject())
        }

        res.status(403).json({ message: 'You can only have 1 organization' })
    } catch (error) {
        console.error(error)
        res.status(422).json({ message: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const { auth, body } = req

        const cleanBody = omit(body, ['owner', 'createdAt', 'updatedAt'])

        const updatedOrg = await Organization.findOneAndUpdate(
            { _id: body._id, $and: [{ owner: auth._id }] },
            { $set: cleanBody },
            { new: true }
        )

        // if null the updated isn't completed
        if (!updatedOrg) {
            return res
                .status(404)
                .json({ message: `The organization that you are trying to edit doesn't exists` })
        }

        res.json(updatedOrg)
    } catch (error) {
        console.error(error)
        res.status(422).json({ message: error.message })
    }
}
