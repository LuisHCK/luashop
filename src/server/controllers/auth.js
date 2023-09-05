import { sign } from 'jsonwebtoken'
import { addDays } from 'date-fns'
import { compareSync } from 'bcrypt'
import User from '@/server/models/user'

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body

        // Try to find the user and also return the password field
        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            throw new Error('Invalid email or password')
        }

        const validPassword = compareSync(password, user.password)

        if (!validPassword) {
            throw new Error('Invalid password')
        }

        const token = signJWToken(user)
        const exp = addDays(new Date(), 7).toISOString()

        return res.json({
            token,
            exp,
            user
        })
    } catch (error) {
        console.error(error.message)
        return res.status(401).json({ message: 'Invalid username or password' })
    }
}

const signJWToken = (user) => {
    return sign(
        {
            _id: user._id,
            role: user.role,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: '7d'
        }
    )
}
