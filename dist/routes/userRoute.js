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
const router = express_1.default.Router();
const patient_1 = __importDefault(require("../validator/patient"));
const register_1 = __importDefault(require("../controllers/patient/register"));
const register_2 = __importDefault(require("../controllers/doctor/register"));
router.post("/patient/register", patient_1.default, register_1.default);
router.post("/doctor/register", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const registerData = req.body;
        const response = yield (0, register_2.default)(registerData);
        const statuscode = response.statuscode;
        delete response.statuscode;
        res.status(statuscode).send(response);
    });
});
exports.default = router;
//# sourceMappingURL=userRoute.js.map