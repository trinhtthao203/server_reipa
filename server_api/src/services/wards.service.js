import Strings from "../constants/strings";
import db from "../models/index";
const { Op } = require("sequelize");

const handleGetAllWard = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let wardData = await db.Wards.findAll();
            if (wardData) {
                resolve({
                    code: 200,
                    data: {
                        ward: wardData,
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.NOT_FOUND_MESSAGE,
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    })
}

const getHandleWardSignUp = (province_id, district_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let wardData = await db.Wards.findAll({
                where: {
                    [Op.and]: [
                        { province_id: province_id },
                        { district_id: district_id }
                    ]
                },
                order: [
                    ['name', 'ASC'],
                ],
            })
            if (wardData) {
                resolve({
                    code: 200,
                    data: {
                        ward: wardData,
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.NOT_FOUND_MESSAGE,
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    })
}

module.exports = {
    handleGetAllWard: handleGetAllWard,
    getHandleWardSignUp: getHandleWardSignUp
}