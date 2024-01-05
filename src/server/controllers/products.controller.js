import { InventoryModel } from '../models/inventory.model'
import ProductModel from '../models/product.model'

export const index = async (req, res) => {
    try {
        const products = await ProductModel.find({ organization: req.currentUser.organization })

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

        console.log(params)

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
        const results = await ProductModel.find({
            $and: [{ $text: { $search: searchParam } }, { organization: currentUser.organization }]
        }).lean()

        results.map(async (result) => {
            const inventory = await InventoryModel.findOne({
                // organization: currentUser.organization,
                'products.product': result._id.toString()
            })

            console.log(inventory)
        })

        res.json(results)
    } catch (error) {
        console.error(error)
        res.status(404).json({ message: 'No results found' })
    }
}
