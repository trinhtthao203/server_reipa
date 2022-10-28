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


const handleUpdateBorderID = (province_id, district_id, ward_id, coordinates) => {
    return new Promise(async (resolve, reject) => {
        try {
            let wardData = await db.Wards.update(
                { coordinates: coordinates },
                {
                    where: {
                        province_id: province_id,
                        district_id: district_id,
                        id: ward_id
                    }
                }
            )
            console.log(wardData)
            if (wardData) {
                resolve({
                    code: 200,
                    data: {
                        message: Strings.Wards.UPDATE_BORDER_WARD_SUCCES
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.COMMON_ERROR,
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    })
}

const checkExistsWardID = (province_id, district_id, ward_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await db.Wards.findAll({
                where: {
                    province_id: province_id,
                    district_id: district_id,
                    id: ward_id
                }
            })
            if (!check) {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Wards.NOT_CORRECT_WARD_MESSAGE
                    }
                });
            } else {
                resolve({
                    code: 200,
                    data: {
                        message: Strings.Wards.CORRECT_WARD_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    handleGetAllWard: handleGetAllWard,
    getHandleWardSignUp: getHandleWardSignUp,
    handleUpdateBorderID: handleUpdateBorderID,
    checkExistsWardID: checkExistsWardID,
}