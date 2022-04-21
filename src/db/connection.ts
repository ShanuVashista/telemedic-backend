import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
const getConnection = async (req, res, next) => {

    // This is mongoDB ATLAS URI So you can use this same for your test.
    const dbUri = "mongodb://SohamDB:Pa$$w(2)Rd22@localhost:27017/thera_net?authSource=admin" ;

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