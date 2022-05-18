import express from "express";
import controller from "../controllers/organization/organization.controller";
import auth from '../middlewares/auth.middleware';
const router = express.Router();

router.get("/get",auth, controller.getOrganization);
router.post('/create',auth, controller.createOrganization);
router.delete('/delete',auth, controller.deleteOrganization);
router.put('/update',auth, controller.updateOrganization);

export = router;
