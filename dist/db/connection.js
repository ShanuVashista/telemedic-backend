"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const getConnection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // This is mongoDB ATLAS URI So you can use this same for your test.
    const dbUri = "mongodb://SohamDB:Pa$$w(2)Rd22@localhost:27017/thera_net?authSource=admin";
    try {
        yield mongoose_1.default.connect(dbUri);
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
exports.default = getConnection;
//# sourceMappingURL=connection.js.map