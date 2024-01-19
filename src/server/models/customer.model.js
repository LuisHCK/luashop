import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema(
    {
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            required: true
        },
        name: String,
        email: String,
        age: Number,
        phone_number: String,
        address: String,
        status: Array,
        photo: String,
        categories: [String]
    },
    { timestamps: true }
)

export default mongoose.models.Customer || mongoose.model('Customer', customerSchema)
