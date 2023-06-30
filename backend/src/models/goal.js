const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
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
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal