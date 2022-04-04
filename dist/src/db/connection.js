var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var mongoose = require('mongoose');
var config = require('../../config');
var dbString = 'mongodb://' +
    config.database.username +
    ':' +
    config.database.password +
    '@' +
    config.database.host +
    ':' +
    config.database.port +
    '/' +
    config.database.dbName +
    '?authSource=' +
    config.database.authDb;
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
exports.getConnection = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield mongoose.connect(dbString, options);
        console.log('Database Connected to the MongoDB');
    }
    catch (error) {
        return res.status(400).json({
            message: 'Failed in Database Connection',
            status: false,
            error: error
        });
    }
});
//# sourceMappingURL=connection.js.map