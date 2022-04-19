import mongoose from 'mongoose';
const getConnection = async (req, res) => {

    // This is mongoDB ATLAS URI So you can use this same for your test.
    // Uri = mongodb+srv://pratyush:sawan123@cluster0.36efv.mongodb.net/teleMd?retryWrites=true&w=majority
    const dbUri =
    "mongodb+srv://pratyush:sawan123@cluster0.36efv.mongodb.net/teleMd?retryWrites=true&w=majority";

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