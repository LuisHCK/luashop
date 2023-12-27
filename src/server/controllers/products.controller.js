import OrganizationModel from '../models/organization.model'
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
        const newProduct = await ProductModel.create({
            ...req.body,
            organization: req.currentUser.organization
        })
        res.json(newProduct)
    } catch (error) {
        console.error(error)
        res.status(422).json({ message: error.message })
    }
}
