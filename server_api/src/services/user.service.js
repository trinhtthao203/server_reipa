import db from "../models/index";
import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);
import Strings from "../constants/strings";

const handleUserLogIn = (phonenumber, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfo = await db.Users.findOne({
                where: { phonenumber: phonenumber }
            })
            if (userInfo) {
                let check = await bcrypt.compareSync(password, userInfo.password);
                if (check) {
                    resolve({
                        code: 200,
                        data: {
                            message: Strings.Auth.SUCCESS_LOGIN_MESSAGE
                        }
                    });
                } else {
                    resolve({
                        code: 401,
                        data: {
                            message: Strings.Auth.PASSWORD_INCORRECT_MESSAGE
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

const handleGetAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfo = await db.Users.findAll({
                attributes: [Strings.Database.PHONE_NUMBER, Strings.Database.FULL_NAME, Strings.Database.ADDRESS,],
                raw: true
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
                        message: Strings.Message.COMMON_ERROR
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
                address: userInfo.address,
                street_id: userInfo.street_id,
                ward_id: userInfo.ward_id,
                avatar: "",
                role_id: userInfo.role_id,
                created_at: new Date(),
                updated_at: new Date(),
            })
            resolve({
                code: 200,
                data: {
                    message: "Create a new user success !!!!!"
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
                resolve(true);
            } else {
                resolve(false);
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
    checkExistsPhoneNumber: checkExistsPhoneNumber
}