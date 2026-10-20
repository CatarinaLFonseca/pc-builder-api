import mongoose from 'mongoose'

const caseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        brand: {
            type: String,
            required: true
        },

        supportedFormFactors: {
            type: [String],
            required: true
        },

        maxGpuLength: {
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

const Case = mongoose.model('Case', caseSchema)

export default Case