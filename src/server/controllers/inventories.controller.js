import { InventoryModel } from '@/server/models/inventory.model'
import OrganizationModel from '@/server/models/organization.model'

export const index = async (req, res) => {
    try {
        const { auth } = req
        const userOrg = await OrganizationModel.find({ owner: auth._id }).select('id')
        const inventories = await InventoryModel.find({ organization: userOrg[0]._id })

        res.json(inventories)
        // const inventories = await InventoryModel.find()
    } catch (error) {
        console.error(error)
        res.status(404).json({ message: error.message })
    }
}

export const create = async (req, res) => {
    try {
        const { auth, body } = req
        const userOrg = await OrganizationModel.find({ owner: auth._id }).select('id')
        const newInventory = await InventoryModel.create({ ...body, organization: userOrg[0]._id })

        if (newInventory) {
            return res.json(newInventory)
        }

        res.status(422).json({ message: `Can't create the new inventory` })
    } catch (error) {
        console.error(error)
        res.status(422).json({ message: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const { auth, body } = req
        const userOrg = await OrganizationModel.find({ owner: auth._id }).select('id')

        const updatedInventory = await InventoryModel.findOneAndUpdate(
            { _id: body._id, $and: [{ organization: userOrg[0]._id }] },
            { $set: body },
            { new: true }
        )

        if (updatedInventory) {
            return res.json(updatedInventory)
        }

        res.status(422).json({ message: `Can't update the inventory` })
    } catch (error) {
        console.error(error)
        res.status(422).json({ message: `Can't update the inventory` })
    }
}

export const show = async (req, res) => {
    try {
        const { auth, params } = req


        const userOrg = await OrganizationModel.find({ owner: auth._id }).select('id')

        const inventory = await InventoryModel.findOne({
            _id: params.id,
            $and: [{ organization: userOrg[0]._id }]
        })

        if (inventory) {
            return res.json(inventory)
        } else {
            throw new Error('Inventory not found')
        }
    } catch (error) {
        console.error(error)
        res.status(404).json({ message: 'Inventory not found' })
    }
}

export const remove = async (req, res) => {
    try {
        const { auth, query } = req

        if (!query.confirmed) {
            return res.status(422).json({ message: 'You should confirm the deletion' })
        }

        const userOrg = await OrganizationModel.find({ owner: auth._id }).select('id')

        await InventoryModel.findOneAndDelete({
            _id: body._id,
            $and: [{ organization: userOrg[0]._id }]
        })

        res.status(200)
    } catch (error) {
        console.error(error)
        res.status(422).json({ message: error.message })
    }
}
