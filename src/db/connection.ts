import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
const getConnection = async (req, res, next) => {

    // This is mongoDB ATLAS URI So you can use this same for your test.
    const dbUri = "mongodb+srv://pratyush:sawan123@cluster0.36efv.mongodb.net/teleMd?retryWrites=true&w=majority" ;

    try {
        await mongoose.connect(dbUri ?? process.env.database_uri)
        console.log('Database Connected to the MongoDB')
        next();
    } catch (error) {
        console.log('Error in connecting to the MongoDB', error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed in Database Connection',
            status: false,
            error: error
        }).end()
    }
}
export default getConnection