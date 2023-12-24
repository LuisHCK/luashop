import { Schema, model, models } from 'mongoose'

const inventorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: { type: String, default: '' },
        location: { type: String, default: '' },
        organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'InventoryProduct'
            }
        ]
    },
    { timestamps: true }
)

const inventoryProductSchema = new Schema(
    {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        price: { type: Number, required: true, default: 0 },
        stock: { type: Number, required: true },
        minimum: Number,
        lot: String
    },
    { timestamps: true }
)

export const InventoryProductModel = models.InventoryProduct || model('InventoryProduct', inventoryProductSchema)
export const InventoryModel = models.Inventory || model('Inventory', inventorySchema)
