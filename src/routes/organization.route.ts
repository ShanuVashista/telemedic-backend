import express from 'express';
import controller from '../controllers/organization/organization.controller';
import { Roles } from '../lib/roles';
import auth from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/joi.middleware';
import userRole from '../middlewares/userRole.middleware';
import { createOrganizationSchema } from '../validator/organization.validation';
const router = express.Router();

router.post('/get', auth, controller.getOrganization);
router.post(
    '/',
    auth,
    userRole(Roles.ADMIN),
    validateBody(createOrganizationSchema),
    controller.createOrganization
);
router.delete('/delete', auth, controller.deleteOrganization);
router.put('/update', auth, controller.updateOrganization);

export = router;
