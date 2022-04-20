import { existsSync, unlinkSync } from "fs";
import { ensureDirSync, move } from "fs-extra";
import { StatusCodes } from "http-status-codes";
import path from "path";
import User from "../../db/models/user";
import { createToken } from "../../lib/jwt";
import { Roles } from "../../lib/roles";

const register = async (req, res) => {
    if (!req.file) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please upload a profile photo"
        });
    }
    if (!req.body.confirmPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please confirm your password"
        });
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Passwords do not match"
        });
    }
    try {
        // await User.deleteMany()
        const user = await User.create({ ...req.body, role_id: Roles.PATIENT, profile_photo: req.file.filename });

        const userDir = path.resolve(`./public/uploads/${user._id}`);
        //ensure dir exists
        await ensureDirSync(userDir);
        // move the file to the folder

        const filePath = path.join(userDir, req.file.filename);
        await move(req.file.path, filePath);

        const token = createToken(user);
        res.status(StatusCodes.CREATED).json({
            message: "User created successfully asdf",
            user,
            token,
        });
    } catch (error) {
        // mongoose email exists error
        if (error.code === 11000) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User already exists"
            });
        }
        console.log({ error });
        //if file exists
        if (await existsSync(req.file.path)) {
            unlinkSync(req.file.path);
        }
        return res.status(400).json({
            message: error.message
        })
    }
}
export default register