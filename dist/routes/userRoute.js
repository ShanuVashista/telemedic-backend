"use strict";
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
router.post("/doctor/register", register_2.default);
// router.post("/doctor/register", async function (req, res) {
//     const registerData = req.body;
//     const response = await Doctor_Register_POST(registerData);
//     const statuscode = response.statuscode;
//     delete response.statuscode;
//     res.status(statuscode).send(response);
//   });
exports.default = router;
//# sourceMappingURL=userRoute.js.map