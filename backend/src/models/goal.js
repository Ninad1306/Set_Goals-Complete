const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    desc: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
})

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal