import { Schema, model, models } from 'mongoose'

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        brand: String,
        codebar: { type: String, unique: true },
        categories: [String],
        unit: String,
        photo: String,
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true }
    },
    { timestamps: true }
)

export default models.Product || model('Product', productSchema)
