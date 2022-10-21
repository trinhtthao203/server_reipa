import Strings from "../constants/strings";
import db from "../models/index";
const { Op } = require("sequelize");

const handleGetAllDistrict = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let districtData = await db.Districts.findAll();
            if (districtData) {
                resolve({
                    code: 200,
                    data: {
                        district: districtData,
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

const getHandledistrictByProvince = (province_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let districtData = await db.Districts.findAll({
                where: {
                    province_id: province_id
                },
                order: [
                    ['name', 'ASC'],
                ],
            })
            if (districtData) {
                resolve({
                    code: 200,
                    data: {
                        district: districtData,
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
    handleGetAllDistrict: handleGetAllDistrict,
    getHandledistrictByProvince: getHandledistrictByProvince
}