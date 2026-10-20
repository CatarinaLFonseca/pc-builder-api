import mongoose from "mongoose";

const gpuSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        brand: {
            type: String,
            required: true
        },

        chipset: {
            type: String,
            required: true
        },

        vram: {
            type: Number,
            required: true
        },

        length: {
            type: Number,
            required: true
        },

        tdp: {
            type: Number,
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

const Gpu = mongoose.model('Gpu', gpuSchema)

export default Gpu