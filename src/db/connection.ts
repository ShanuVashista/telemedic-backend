import mongoose from 'mongoose'
const getConnection = async (req, res) => {
    try {
        await mongoose.connect(process.env.database_uri)
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