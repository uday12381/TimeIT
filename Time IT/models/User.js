const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    },
    tasks: [
        {
            id: {
                type: String,
                required: true,
                unique: true
            },
            slotStart: {
                type: Number,
                required: true
            },
            slotEnd: {
                type: Number,
                required: true
            },
            taskName: {
                type: String,
                required: true
            },
            taskDescription: {
                type: String
            },
            date: {
                type: Date,
                required: true
            },
            endTime: {
                type: Number,
                required: true
            },
            priority: {
                type: Number,
                required: true
            },
            timeRequired: {
                type: Number,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            status: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = User = mongoose.model('user', UserSchema)