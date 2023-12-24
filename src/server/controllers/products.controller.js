import OrganizationModel from '../models/organization.model'
import ProductModel from '../models/product.model'

export const index = async (req, res) => {
    try {
        const userOrg = await OrganizationModel.find({ owner: auth._id }).select('id')

        const products = await ProductModel.find({ organization: userOrg[0]._id })

        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(404).json({ message: error.message })
    }
}
