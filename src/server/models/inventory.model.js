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
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'InventoryProduct',
                    required: true
                },
                price: { type: Number, required: true, default: 0 },
                stock: { type: Number, required: true },
                minimum: Number,
                lot: String
            }
        ]
    },
    { timestamps: true }
)

export const InventoryModel = models.Inventory || model('Inventory', inventorySchema)
