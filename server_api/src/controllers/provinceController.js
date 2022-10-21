import db from "../models/index";
import provinceService from "../services/provinces.service"

import dotenv from "dotenv";
dotenv.config();

const getAllProvince = async (req, res) => {
    let provinceData = await provinceService.handleGetAllProvince();

    return res.status(200).json({
        code: provinceData.code,
        data: provinceData.data ? provinceData.data : {}
    })
}

module.exports = {
    getAllProvince: getAllProvince,
}