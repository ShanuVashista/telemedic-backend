"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const professional_1 = __importDefault(require("../controllers/doctor/professional"));
const register_1 = __importDefault(require("../controllers/doctor/register"));
const http_status_codes_1 = require("http-status-codes");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const patient_controller_1 = __importDefault(require("../controllers/patient/patient.controller"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        const datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});
const upload = (0, multer_1.default)({
    storage,
    fileFilter: function (req, file, callback) {
        const ext = path_1.default.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'));
        }
        callback(null, true);
    },
}).single('profile_image');
router.post("/patient/register", function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: err.message
            });
        }
        next();
    });
}, patient_controller_1.default.register);
router.post("/doctor/register", function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: err.message
            });
        }
        next();
    });
}, register_1.default);
router.put("/doctor/profession_info", professional_1.default);
exports.default = router;
//# sourceMappingURL=userRoute.js.map