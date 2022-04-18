import mongoose from 'mongoose'
const getConnection = async (req, res) => {
    const dbUri =
    "mongodb://SohamDB:Pa$$w(2)Rd22@localhost:27017/thera_net?authSource=admin";

    try {
        await mongoose.connect(dbUri)
        console.log('Database Connected to the MongoDB')
    } catch (error) {
        return res.status(400).json({
            message: 'Failed in Database Connection',
            status: false,
            error: error
        })
    }
}
export default getConnection