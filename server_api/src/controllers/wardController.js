import db from "../models/index";
import wardService from "../services/wards.service"
import Strings from "../constants/strings";

import dotenv from "dotenv";
dotenv.config();

const getAllWard = async (req, res) => {
    let wardData = await wardService.handleGetAllWard();

    return res.status(200).json({
        code: wardData.code,
        data: wardData.data ? wardData.data : {}
    })
}

const getWardSignUp = async (req, res) => {
    const { province_id, district_id } = req.body;
    console.log(province_id, district_id);
    if (!province_id || !district_id) {
        console.log("Khong lay duoc ma tinh, ma huyen")
    }
    let wardData = await wardService.getHandleWardSignUp(province_id, district_id);

    return res.status(200).json({
        code: wardData.code,
        data: wardData.data ? wardData.data : {}
    })
}

module.exports = {
    getAllWard: getAllWard,
    getWardSignUp: getWardSignUp
}