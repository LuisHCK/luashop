import mongoose from 'mongoose'
import validator from 'validator'

const organizationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: String,
        email: {
            type: String,
            validate: [validator.isEmail, 'Please enter a valid email']
        },
        phones: [String],
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    },
    { timestamps: true }
)

export default mongoose.models.Organization || mongoose.model('Organization', organizationSchema)
