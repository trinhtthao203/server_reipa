import db from "../models/index";
import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);
import Strings from "../constants/strings";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Constants from "../constants";
const { Op } = require("sequelize");
dotenv.config();

//get all

const handleGetAllUser = (page, size) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfo = await db.Users.findAndCountAll({
                attributes: [
                    Strings.Database.ID,
                    Strings.Database.PHONE_NUMBER,
                    Strings.Database.FULL_NAME,
                    Strings.Database.AVATAR,
                    Strings.Database.ADDRESS,
                    Strings.Database.STREET_ID,
                    Strings.Database.WARD_ID,
                    Strings.Database.ROLE_ID,
                ],
                limit: parseInt(size),
                offset: parseInt(page) * parseInt(size),
            });
            if (userInfo) {
                resolve({
                    code: 200,
                    data: {
                        size: size,
                        currentPage: page,
                        userInfo: userInfo,
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.NOT_FOUND_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

const handleGetAllRole = (page, size) => {
    return new Promise(async (resolve, reject) => {
        try {
            let roleData = await db.Roles.findAll({
                attributes: [
                    "id", "name", "icon", "description"
                ],
                where: {
                    id: {
                        [Op.gt]: 2
                    }
                },
            });
            if (roleData) {
                resolve({
                    code: 200,
                    data:
                        roleData

                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.NOT_FOUND_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

//handle

const handleUserLogOut = () => {
    return new Promise(async (resolve, reject) => {

    })
}

const handleUserLogIn = (phonenumber, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfo = await db.Users.findOne({
                where: { phonenumber: phonenumber },
            })
            if (userInfo) {
                let check = await bcrypt.compareSync(password, userInfo.password);
                if (check) {
                    const accessToken = jwt.sign({ id: userInfo.id, role_id: userInfo.role_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: Constants.Api.EXPIRES_IN });
                    const refeshToken = jwt.sign({ id: userInfo.id, role_id: userInfo.role_id }, process.env.REFRESH_TOKEN_SECRET);
                    resolve({
                        code: 200,
                        data: {
                            message: Strings.User.SUCCESS_LOGIN_MESSAGE,
                            id: userInfo.id,
                            phonenumber: userInfo.phonenumber,
                            fullname: userInfo.fullname,
                            role_id: userInfo.role_id,
                            accessToken: accessToken,
                            refeshToken: refeshToken,
                        }
                    });
                } else {
                    resolve({
                        code: 401,
                        data: {
                            message: Strings.User.PASSWORD_INCORRECT_MESSAGE
                        }
                    });
                }
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.User.PHONE_NUMBER_INCORRECT_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

const handleGetUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfo = await db.Users.findOne({
                where: { id: id }
            });

            if (userInfo) {
                resolve({
                    code: 200,
                    data: userInfo
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.User.ID_INCORRECT_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

const handleUserRegister = (userInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(userInfo.password);
            await db.Users.create({
                phonenumber: userInfo.phonenumber,
                password: hashPasswordFromBcrypt,
                fullname: userInfo.fullname,
                avatar: "",
                address: userInfo.address,
                street_id: userInfo.street_id,
                ward_id: userInfo.ward_id,
                role_id: userInfo.role_id,
            })
            resolve({
                code: 200,
                data: {
                    message: Strings.Register.SUCCESS_REGISTER_MESSAGE
                }
            });
        } catch (e) {
            reject(e);
        }
    })
}

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (err) {
            reject(err)
        }
    })
}

const checkExistsPhoneNumber = (phonenumber) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await db.Users.findOne({
                where: { phonenumber: phonenumber }
            })
            if (check) {
                resolve({
                    code: 200,
                    data: {
                        message: Strings.Message.PHONE_NUMBER_EXISTS_MESSAGE
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.PHONE_NUMBER_NOT_EXISTS_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

const handleResetPassword = (phonenumber, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await db.Users.findOne({
                where: { phonenumber: phonenumber }
            })
            if (check) {
                let hashPasswordFromBcrypt = await hashUserPassword(password);
                let succes = await db.Users.update(
                    { password: hashPasswordFromBcrypt },
                    { where: { phonenumber: phonenumber } }
                )
                if (succes) {
                    resolve({
                        code: 200,
                        data: {
                            message: "Đổi thành công"
                        }
                    });
                } else {
                    resolve({
                        code: 400,
                        data: {
                            message: "Đổi không thành công"
                        }
                    });
                }
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Auth.PHONE_NUMBER_INCORRECT_MESSAGE
                    }
                });
            }


        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    handleUserLogIn: handleUserLogIn,
    handleGetAllUser: handleGetAllUser,
    handleUserRegister: handleUserRegister,
    checkExistsPhoneNumber: checkExistsPhoneNumber,
    handleUserLogOut: handleUserLogOut,
    handleGetUser: handleGetUser,
    handleGetAllRole: handleGetAllRole,
    handleResetPassword: handleResetPassword,
}