import { StatusCodes } from "http-status-codes";
import Org from "../../db/models/organization.model";

const getOrganization = async (req, res) => {
    try {
        if(req.user.role_id == 'admin'){
            let { page, limit, sort, cond } = req.body;
            if (!page || page < 1) {
                page = 1;
            }
            if (!limit) {
                limit = 10;
            }
            if (!cond) {
                cond = {}
            }
            if (!sort) {
                sort = { "createdAt": -1 }
            }
            limit = parseInt(limit);
            const organization = await Org.find(cond).sort(sort).skip((page - 1) * limit).limit(limit)
            const organization_count = await Org.find(cond).count()
            const totalPages = Math.ceil(organization_count / limit);
            res.status(StatusCodes.OK).send({
                status: true,
                type: 'success',
                message: "Organization List Fetch Successfully",
                page: page,
                limit: limit,
                totalPages: totalPages,
                total: organization_count,
                data: organization,
            });
        }else{
            res.status(400).send({
                status: false,
                type: 'error',
                message: "You Are Not Authorized User"
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            type: "error",
            message: error.message,
        });
    }
};
const createOrganization = async (req, res) => {
    try {
        const organization = Org.create(req.body);

        res.status(StatusCodes.OK).json({
            type: "success",
            status: true,
            message: "Organization created successfully",
            data: organization
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            type: "error",
            status: false,
            message: error.message,
        });
    }
};
const updateOrganization = async (req, res) => {
    try {
        res.status(StatusCodes.OK).json({
            type: "success",
            status: true
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            type: "error",
            status: false,
            message: error.message,
        });
    }
};
const deleteOrganization = async (req, res) => {
    try {
        res.status(StatusCodes.OK).json({
            type: "success",
            status: true
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            type: "error",
            status: false,
            message: error.message,
        });
    }
};
export default { getOrganization, createOrganization, updateOrganization, deleteOrganization }