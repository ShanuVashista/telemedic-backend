import { existsSync, mkdirSync, renameSync, unlinkSync } from "fs";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../../db/models/user";

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
        await User.deleteMany()
        const user = await User.create({ ...req.body, profile_photo: req.file.filename });
        console.log({ user });
        console.log({ file: req.file })

        // check if folder exists
        if (! await existsSync(`./public/uploads/${user._id}`)) {
            // create a folder in public/uploads named by user id
            await mkdirSync(`./public/uploads/${user._id}`);
        }
        // move the file to the folder
        await renameSync(`./public/uploads/${req.file.filename}`, `./public/uploads/${user._id}/${req.file.filename}`);

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
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