import express from "express";
import controller from "../controllers/country-state-city/insert";
import GetCountryCode from  '../controllers/country-state-city/getCountryCode'
import GetState from  '../controllers/country-state-city/getState'
const router = express.Router();
router.get("/", controller);
router.get("/dial-code", GetCountryCode);
router.get("/states", GetState);
export = router;
