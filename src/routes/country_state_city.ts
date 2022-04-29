import express from "express";
import controller from "../controllers/country-state-city/insert";
import GetCountryCode from  '../controllers/country-state-city/getCountryCode'
const router = express.Router();
router.get("/", controller);
router.get("/dial-code", GetCountryCode);
export = router;
