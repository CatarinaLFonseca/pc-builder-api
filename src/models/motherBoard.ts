import mongoose from 'mongoose'

const motherboardSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        brand: {
            type: String,
            required: true
        },

        socket: {
            type: String,
            required: true
        },

        chipset: {
            type: String,
            required: true
        },

        memoryType: {
            type: String,
            required: true
        },

        formFactor: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
)

const Motherboard = mongoose.model('Motherboard', motherboardSchema)

export default Motherboard