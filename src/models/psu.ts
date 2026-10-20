import mongoose from 'mongoose'

const psuSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        brand: {
            type: String,
            required: true
        },

        wattage: {
            type: Number,
            required: true
        },

        efficiency: {
            type: String,
            required: true
        },

        modular: {
            type: Boolean,
            required: true
        },

        color: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
)

const Psu = mongoose.model('Psu', psuSchema)

export default Psu