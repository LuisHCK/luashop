import { InventoryModel, InventoryProductModel } from '@/server/models/inventory.model'
import isArray from 'lodash/isArray'

const useInventory = async (req) => {
    const { params, currentUser } = req
    return await InventoryModel.findOne({
        _id: params.id,
        company: currentUser.company
    })
}

export const index = async (req, res) => {
    try {
        const { currentUser } = req
        let inventories = await InventoryModel.find({
            organization: currentUser.organization._id
        }).lean()

        inventories = await Promise.all(
            inventories.map(async (i) => {
                const products = await InventoryProductModel.find({
                    inventory: i._id
                }).countDocuments()

                return {
                    ...i,
                    products
                }
            })
        )

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
        const { currentUser, body, params } = req

        const updatedInventory = await InventoryModel.findOneAndUpdate(
            { _id: params.id, $and: [{ organization: currentUser.organization }] },
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
        }).countDocuments()

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

export const products = async (req, res) => {
    try {
        const { params } = req
        const { page, limit } = req.query
        const inventory = await InventoryModel.findById(params.id)

        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' })
        }

        const query = {
            inventory
        }
        const options = {
            page: page || 1,
            limit: limit || 20,
            collation: {
                locale: 'en'
            },
            sort: {
                createdAt: 1
            },
            populate: 'product'
        }

        const inventoryProducts = await InventoryProductModel.paginate(query, options)

        res.json(inventoryProducts)
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
        const { body } = req

        const inventory = await useInventory(req)

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
        const { body } = req

        const inventory = await useInventory(req)

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

export const bulkImport = async (req, res) => {
    try {
        const { body } = req
        const inventory = await useInventory(req)

        if (isArray(body)) {
            const productsToAdd = body.map((product) => ({
                inventory: inventory._id,
                product: product._id,
                stock: product.stock || 0,
                price: product.price || 0,
                lot: product.lot || 0
            }))

            const data = await InventoryProductModel.insertMany(productsToAdd)
            return res.json(data)
        } else {
            return res.status(422).json({ message: `Products to add should be an array` })
        }
    } catch (error) {
        console.error(error)
        res.status(422).json({ message: `Can't import products` })
    }
}
