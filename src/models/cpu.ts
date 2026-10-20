import mongoose from "mongoose";

const cpuSchema = new mongoose.Schema({
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
    cores: {
        type: Number,
        required: true
    },
    threads: {
        type: Number,
        required: true
    },
    tdp: {
        type: Number,
        required: true
    }
},
    {
        versionKey: false
    })

const Cpu = mongoose.model('Cpu', cpuSchema)

export default Cpu