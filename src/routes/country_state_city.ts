import express from "express";
// import controller from "../controllers/country-state-city/insert";
import getCountry from "../controllers/country-state-city/getCountry";
const router = express.Router();
// router.get("/", controller);
router.get("/countryName",getCountry);
export = router;
