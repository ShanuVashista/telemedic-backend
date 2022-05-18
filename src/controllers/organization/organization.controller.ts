import { StatusCodes } from "http-status-codes";
import Org from "../../db/models/organization.model";

const getOrganization = async (req, res) => {
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