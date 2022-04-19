import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
const getConnection = async (req, res, next) => {

    // This is mongoDB ATLAS URI So you can use this same for your test.
    const dbUri = process.env.database_uri;

    try {
        await mongoose.connect(dbUri)
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