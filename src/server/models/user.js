import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true,
            unique: [true, 'Account already exists'],
            validate: [validator.isEmail, 'Please enter a valid email']
        },
        password: {
            type: String,
            required: [true, 'Please enter your email'],
            minLength: [6, 'Your password must be at least 6 characters long'],
            select: false //dont send back password after request
        },
        role: {
            type: String,
            default: 'user',
            enum: {
                values: ['user', 'admin']
            }
        },
        status: {
            type: String,
            default: 'active',
            enum: {
                values: ['active', 'disabled']
            }
        }
    },
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    // Hash password before saving user
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS) || 10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compareSync(enteredPassword, this.password)
}

export default mongoose.models.User || mongoose.model('User', userSchema)