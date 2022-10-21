import db from "../models/index";
import Strings from "../constants/strings";
const handleGetAllProvince = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let provincesData = await db.Provinces.findAll({
                order: [
                    ['name', 'ASC'],
                ],
            });
            if (provincesData) {
                resolve({
                    code: 200,
                    data: {
                        provinces: provincesData,
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
    handleGetAllProvince: handleGetAllProvince,
}