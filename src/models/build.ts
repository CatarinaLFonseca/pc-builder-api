import mongoose from "mongoose";

const buildSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },

        cpu: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cpu',
            required: true
        },

        motherboard: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Motherboard',
            required: true
        },

        ram: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ram',
            required: true
        },

        case: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Case',
            require: true
        },

        gpu: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gpu',
            required: true
        },
        psu: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Psu',
            required: true
        }
    },
    {
        versionKey: false
    }
)

const Build = mongoose.model('Build', buildSchema)

export default Build