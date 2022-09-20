import db from "../models/index";
import bcrypt from "bcryptjs";


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
                        code: 200
                    });
                } else {
                    resolve({
                        code: 400,
                        error: {
                            message: `User's password incorrect. Plz try again.`
                        }
                    });
                }
            } else {
                resolve({
                    code: 400,
                    error: {
                        message: `Your phone number isn't exist. Plz try other phone number`
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
                attributes: ['phonenumber', "fullname", 'address',],
                raw: true
            });
            if (userInfo) {
                resolve({
                    code: 200,
                    user: userInfo
                });
            } else {
                resolve({
                    code: 400,
                    error: {
                        message: `Error. Plz try again.`
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
    handleGetAllUser: handleGetAllUser
}