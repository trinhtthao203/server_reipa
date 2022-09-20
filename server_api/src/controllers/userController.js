import db from "../models/index";
import userService from "../services/user.service"

const handleLogIn = async (req, res) => {
    const { phonenumber, password } = req.body;

    console.log(phonenumber, password);
    if (!phonenumber || !password) {
        return res.status(400).json({
            code: 400,
            error: {
                message: "Phonenumber and password is require !",
            }
        })
    }

    let userData = await userService.handleUserLogIn(phonenumber, password);

    return res.status(200).json({
        code: userData.code,
        error: userData.error,
    })
}

const getAllUser = async (req, res) => {

    let userData = await userService.handleGetAllUser();

    return res.status(200).json({
        code: userData.code,
        error: userData.error,
        user: userData.user ? userData.user : {}
    })
}

module.exports = {
    handleLogIn: handleLogIn,
    getAllUser: getAllUser
}