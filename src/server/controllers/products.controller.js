import { InventoryModel, InventoryProductModel } from '../models/inventory.model'
import ProductModel from '../models/product.model'

export const index = async (req, res) => {
    try {
        const { page, limit, searchTerm } = req.query

        const options = {
            page: page || 1,
            limit: limit || 10,
            collation: {
                locale: 'en'
            },
            sort: {
                createdAt: 1
            }
        }

        const query = {
            organization: req.currentUser.organization
        }

        if (searchTerm?.length) {
            query.$and = [{ $text: { $search: searchTerm } }]
            options.sort = { ...options.sort, name: -1 }
        }

        const products = await ProductModel.paginate(query, options)

        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(404).json({ message: error.message })
    }
}

export const create = async (req, res) => {
    try {
        const newProduct = await ProductModel.create({
            ...req.body,
            organization: req.currentUser.organization,
            createdBy: req.currentUser
        })
        res.json(newProduct)
    } catch (error) {
        console.error(error)
        res.status(422).json({ message: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const { currentUser, params, body } = req

        const newProduct = await ProductModel.findOneAndUpdate(
            { _id: params.id, organization: currentUser.organization },
            { $set: body },
            { new: true }
        )

        res.json(newProduct)
    } catch (error) {
        console.error(error)
        res.status(422).json({ message: error.message })
    }
}

export const remove = async (req, res) => {
    try {
        const { currentUser, body } = req

        await ProductModel.findOneAndDelete({
            _id: body._id,
            $and: { organization: currentUser.organization }
        })

        res.json({ message: 'Product deleted' })
    } catch (error) {
        console.error(error)
        res.status(422).json({ message: `Can not delete the product}` })
    }
}

export const search = async (req, res) => {
    const { searchParam } = req.query
    const { currentUser } = req

    try {
        if (!searchParam) {
            return res.status(422).json({ message: 'Search param should not be empty' })
        }

        const results = await ProductModel.find({
            $and: [{ $text: { $search: searchParam } }, { organization: currentUser.organization }]
        }).lean()

        const enrichedResults = await Promise.all(
            results.map(async (result) => {
                return await enrichProductData(result)
            })
        )

        res.json(enrichedResults)
    } catch (error) {
        console.error(error)
        res.status(404).json({ message: 'No results found' })
    }
}

export const getByCodebar = async (req, res) => {
    try {
        const {
            currentUser,
            query: { codebar }
        } = req

        const product = await ProductModel.findOne({
            organization: currentUser.organization,
            codebar
        }).lean()

        if (product) {
            const enrichedProduct = await enrichProductData(product)
            return res.json(enrichedProduct)
        }

        res.status(404).json({ message: `Product with codebar: '${codebar}' does not exists` })
    } catch (error) {
        console.error(error)
        res.status(402).json({ message: 'Product not found' })
    }
}

const enrichProductData = async (product) => {
    if (product.constructor.name === 'model') {
        throw new TypeError('Product instance should not be hydratated. Please use the lean option')
    }

    const inventories = await InventoryProductModel.find({ product: product._id })
        .populate('inventory')
        .lean()

    return {
        ...product,
        inventories
    }
}
