import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        brand: { type: String, default: null },
        codebar: { type: String, unique: true, index: true },
        categories: { type: [String], default: [], index: true },
        unit: { type: String, default: null },
        photo: { type: String, default: null },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }
    },
    { timestamps: true }
)

productSchema.index(
    { name: 'text', description: 'text', brand: 'text' },
    { name: 'text', sparse: true }
)

productSchema.plugin(mongoosePaginate)

export default mongoose.models.Product || mongoose.model('Product', productSchema)
