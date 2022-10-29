import db from "../models/index";
import bcrypt from "bcryptjs";
import Strings from "../constants/strings";
import dotenv from "dotenv";
dotenv.config();

//get all
const handleGetAllInvestor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let investorData = await db.Investors.findAll({
                order: [
                    ['name', 'ASC'],
                ],
            });
            if (investorData) {
                resolve({
                    code: 200,
                    data: investorData
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

module.exports = {
    handleGetAllInvestor: handleGetAllInvestor
}