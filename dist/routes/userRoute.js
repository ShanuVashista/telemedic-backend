"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const patient_1 = __importDefault(require("../validator/patient"));
const patient_2 = __importDefault(require("../validator/patient"));
const register_1 = __importDefault(require("../controllers/patient/register"));
const register_2 = __importDefault(require("../controllers/doctor/register"));
router.post("/patient/register", patient_1.default, register_1.default);
router.post("/doctor/register", patient_2.default, register_2.default);
exports.default = router;
//# sourceMappingURL=userRoute.js.map