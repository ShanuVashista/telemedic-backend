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
const fs_1 = __importDefault(require("fs"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
exports.uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fileName = req.file.fieldname;
    fs_1.default.readFile(fileName, (err, data) => {
        if (err)
            throw err;
        const params = {
            Bucket: 'testBucket',
            Key: fileName,
            Body: JSON.stringify(data, null, 2)
        };
        s3.upload(params, function (s3Err, data) {
            if (s3Err)
                throw s3Err;
            console.log(`File uploaded successfully at ${data.Location}`);
        });
    });
});
//# sourceMappingURL=upload.js.map