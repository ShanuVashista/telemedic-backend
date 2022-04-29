import express from "express";
import controller from "../controllers/country-state-city/insert";
const router = express.Router();
router.get("/", controller);
export = router;
