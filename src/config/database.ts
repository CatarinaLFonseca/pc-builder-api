import mongoose from "mongoose";

export async function connectDatabase() {
    try {
        const mongoUri = process.env.STRING_CONEXAO_BD

        if (!mongoUri) {
            throw new Error('STRING_CONEXAO_BD is not defined')
        }

        await mongoose.connect(mongoUri)
        console.log('MongoBD connected successfully')

    } catch (error) {
        console.error('Faileds to connect to MongoDB:', error)
        process.exit(1)
    }

}