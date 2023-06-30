const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password

    return userObject
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    const isMatch = bcrypt.compare(password, user.password)

    if (!user || !isMatch) {
        throw new Error('Unable to login.')
    }

    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User