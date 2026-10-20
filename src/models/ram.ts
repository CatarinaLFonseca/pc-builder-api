import mongoose from 'mongoose'

const ramSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        brand: {
            type: String,
            required: true
        },

        memoryType: {
            type: String,
            required: true
        },

        capacity: {
            type: Number,
            required: true
        },

        speed: {
            type: Number,
            required: true
        },

        modules: {
            type: Number,
            required: true
        }
    },
    {
        versionKey: false
    }
)

const Ram = mongoose.model('Ram', ramSchema)

export default Ram