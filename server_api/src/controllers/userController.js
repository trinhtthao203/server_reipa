import db from "../models/index";
import userService from "../services/user.service"
import Strings from "../constants/strings";

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

const handleRegister = async (req, res) => {
    const { phonenumber, password, fullname, address, street_id, ward_id, avatar, role_id } = req.body;
    if (!phonenumber || !password || !fullname || !address || !street_id || !ward_id || !role_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Account.FEILD_REQUIRED_MESSAGE,
            }
        })
    }

    let checkPhoneNumber = await userService.checkExistsPhoneNumber(phonenumber);

    if (checkPhoneNumber) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Account.FEILD_REQUIRED_MESSAGE,
            }
        })
    }
    // let userData = await userService.handleUserRegister(req.body);

    return res.status(200).json({
        code: userData.code,
        data: userData.data,
    })
}

const getAllUser = async (req, res) => {

    let userData = await userService.handleGetAllUser();

    return res.status(200).json({
        code: userData.code,
        data: userData.data ? userData.data : {}
    })
}

module.exports = {
    handleLogIn: handleLogIn,
    getAllUser: getAllUser,
    handleRegister: handleRegister,
}