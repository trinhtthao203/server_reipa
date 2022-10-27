import db from "../models/index";
import userService from "../services/user.service"
import Strings from "../constants/strings";

import dotenv from "dotenv";

dotenv.config();

//get all
const getAllUser = async (req, res) => {
    let { page, size } = req.query;
    if (!page || !size) {
        page = req.body.page;
        size = req.body.size;
    }

    let userData = await userService.handleGetAllUser(page, size);
    return res.status(200).json({
        code: userData.code,
        data: userData.data ? userData.data : {}
    })
}

const getAllRole = async (req, res) => {
    let roleData = await userService.handleGetAllRole();
    return res.status(200).json({
        code: roleData.code,
        data: roleData.data ? roleData.data : {}
    })
}

const getUser = async (req, res) => {
    let id = req.query;
    if (!id) id = req.body.id;
    let userData = await userService.handleGetUser(id);
    return res.status(200).json({
        code: userData.code,
        data: userData.data ? userData.data : {}
    })
}


//handle
const handleLogOut = async (req, res) => {

    let userData = await userService.handleUserLogOut();
    return res.status(200).json({
        code: userData.code,
        data: userData.data,
    })
}

const handleResetPasword = async (req, res) => {
    const { phonenumber, password } = req.body;
    if (!password || !phonenumber) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Auth.PHONENUMBER_PASSWORD_REQUIRED_MESSAGE
            }
        })
    }

    let userData = await userService.handleResetPassword(phonenumber, password);

    return res.status(200).json({
        code: userData.code,
        data: userData.data,
    })
}

const handleCheckPhoneNumber = async (req, res) => {
    const { phonenumber } = req.body;
    if (!phonenumber) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Auth.PHONE_NUMBER_REQUIRED_MESSAGE,
            }
        })
    }

    let userData = await userService.checkExistsPhoneNumber(phonenumber);

    return res.status(200).json({
        code: userData.code,
        data: userData.data,
    })
}


const handleRegister = async (req, res) => {
    const { phonenumber, password, fullname, address, ward_id, role_id } = req.body;
    if (!phonenumber || !password || !fullname || !address || !ward_id || !role_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Message.FEILD_REQUIRED_MESSAGE,
            }
        })
    }

    let checkPhoneNumber = await userService.checkExistsPhoneNumber(phonenumber);

    if (checkPhoneNumber.code === 200) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Register.PHONE_NUMBER_EXISTS_MESSAGE,
            }
        })
    }

    let userData = await userService.handleUserRegister(req.body);

    return res.status(200).json({
        code: userData.code,
        data: userData.data,
    })
}

const handleLogIn = async (req, res) => {
    const { phonenumber, password } = req.body;
    if (!phonenumber || !password) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Auth.PHONENUMBER_PASSWORD_REQUIRED_MESSAGE,
            }
        })
    }

    let userData = await userService.handleUserLogIn(phonenumber, password);

    return res.status(200).json({
        code: userData.code,
        data: userData.data,
    })
}

module.exports = {
    handleLogIn: handleLogIn,
    getAllUser: getAllUser,
    handleRegister: handleRegister,
    handleLogOut: handleLogOut,
    getUser: getUser,
    handleCheckPhoneNumber: handleCheckPhoneNumber,
    handleResetPasword: handleResetPasword,
    getAllRole: getAllRole,
}