import { InventoryModel, InventoryProductModel } from '@/server/models/inventory.model'

export const index = async (req, res) => {
    try {
        const { currentUser } = req
        const inventories = await InventoryModel.find({
            organization: currentUser.organization._id
        })

        res.json(inventories)
        // const inventories = await InventoryModel.find()
    } catch (error) {
        console.error(error)
        res.status(404).json({ message: error.message })
    }
}

export const create = async (req, res) => {
    try {
        const { currentUser, body } = req
        const newInventory = await InventoryModel.create({
            ...body,
            organization: currentUser.organization
        })

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
        const { currentUser, body } = req

        const updatedInventory = await InventoryModel.findOneAndUpdate(
            { _id: body._id, $and: [{ organization: currentUser.organization }] },
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
        const { currentUser, params } = req

        const inventory = await InventoryModel.findOne({
            organization: currentUser.organization,
            _id: params.id
        }).lean(true)

        const products = await InventoryProductModel.find({
            inventory: inventory
        }).populate('product')

        if (inventory) {
            return res.json({ ...inventory, products })
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
        const { currentUser, query } = req

        if (!query.confirmed) {
            return res.status(422).json({ message: 'You should confirm the deletion' })
        }

        await InventoryModel.findOneAndDelete({
            _id: body._id,
            $and: [{ organization: currentUser.organization }]
        })

        res.status(200)
    } catch (error) {
        console.error(error)
        res.status(422).json({ message: error.message })
    }
}

export const addProduct = async (req, res) => {
    try {
        const { params, body } = req

        const inventoryProductExists = await InventoryProductModel.findOne({
            inventory: params.id,
            product: body.product
        })

        if (inventoryProductExists) {
            return res.status(422).json({ message: `Product is already added to the inventory` })
        }

        const newInventoryProduct = await InventoryProductModel.create({
            ...body,
            inventory: params.id,
            product: body.product
        })

        res.json(newInventoryProduct)
    } catch (error) {
        console.error(error)
        res.status(422).json({ message: `Can't add product to inventory` })
    }
}

export const removeProduct = async (req, res) => {
    try {
        const { params, body, currentUser } = req

        const inventory = await InventoryModel.findOne({
            _id: params.id,
            company: currentUser.company
        })

        await InventoryProductModel.findOneAndDelete({
            inventory: inventory._id,
            product: body.product
        })

        res.json({ message: 'Removed product from inventory' })
    } catch (error) {
        console.error(error)
        res.status(422).json({ message: `Can't update inventory-product` })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { params, body, currentUser } = req

        const inventory = await InventoryModel.findOne({
            _id: params.id,
            company: currentUser.company
        })

        const updatedInventoryProduct = await InventoryProductModel.findOneAndUpdate(
            {
                inventory: inventory._id,
                product: body.product
            },
            { $set: body },
            { safe: true, multi: false, new: true }
        )

        res.json(updatedInventoryProduct)
    } catch (error) {
        console.error(error)
        res.status(422).json({ message: `Can't update inventory-product` })
    }
}
