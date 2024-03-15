import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const inventorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: { type: String, default: '' },
        location: { type: String, default: '' },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            required: true,
            index: true
        }
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

const inventoryProductSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    inventory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true
    },
    price: { type: Number },
    stock: { type: Number },
    minimum: Number,
    lot: String
})

inventoryProductSchema.index(
    { product: 1, inventory: 1 },
    { name: 'inventoryProduct', unique: true }
)

inventoryProductSchema.plugin(mongoosePaginate)

export const InventoryProductModel =
    mongoose.models.InventoryProduct || mongoose.model('InventoryProduct', inventoryProductSchema)

export const InventoryModel =
    mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema)
