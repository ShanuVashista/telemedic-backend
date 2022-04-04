var express = require("express");
var router = express.Router();
var { RegisterVal } = require('../validator/patient');
var patientController = require('../controllers/patient/patient');
router.post("/patient/register", RegisterVal, patientController.Register_POST);
module.exports = router;
//# sourceMappingURL=userRoute.js.map