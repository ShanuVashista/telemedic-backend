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
const express_1 = __importDefault(require("express"));
const professional_1 = __importDefault(require("../controllers/doctor/professional"));
const register_1 = __importDefault(require("../controllers/doctor/register"));
const http_status_codes_1 = require("http-status-codes");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const login_controller_1 = __importDefault(require("../controllers/patient/login.controller"));
const register_controller_1 = __importDefault(require("../controllers/patient/register.controller"));
const fs_extra_1 = require("fs-extra");
const healthData_controller_1 = __importDefault(require("../controllers/patient/healthData.controller"));
const patient_1 = require("../validator/patient");
const joi_middleware_1 = require("../middlewares/joi.middleware");
const list_1 = __importDefault(require("../controllers/user/list"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, fs_extra_1.ensureDir)('./public/uploads/');
            cb(null, './public/uploads/');
        });
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
}, register_controller_1.default);
router.put("/patient/healthData", (0, joi_middleware_1.validateJoi)(patient_1.healthDataSchema), healthData_controller_1.default);
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
router.post("/login", login_controller_1.default.login);
router.put("/doctor/profession_info", professional_1.default);
router.post('/list', list_1.default);
exports.default = router;
//# sourceMappingURL=userRoute.js.map