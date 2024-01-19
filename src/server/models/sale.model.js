import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
    {
        value: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
)

const saleSchema = new mongoose.Schema(
    {
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            required: true
        },
        inventoryProduct: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'InventoryProduct',
            required: true
        },
        products: [Object],
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
        subtotal: Number,
        discount: Number,
        status: {
            type: String,
            enum: ['complete', 'refuded', 'invalid', 'exchange']
        },
        refundType: {
            type: String,
            enum: ['full', 'partial']
        },
        notes: [noteSchema]
    },
    { timestamps: true }
)

export default mongoose.models.Sale || mongoose.model('Sale', saleSchema)
