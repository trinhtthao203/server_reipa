import db from "../models/index";
import provinceService from "../services/provinces.service"

import dotenv from "dotenv";
import Strings from "../constants/strings";
dotenv.config();

const getAllProvince = async (req, res) => {
    let provinceData = await provinceService.handleGetAllProvince();

    return res.status(200).json({
        code: provinceData.code,
        data: provinceData.data ? provinceData.data : {}
    })
}

const getBorderProvince = async (req, res) => {
    const { id } = req.body;
    console.log(id);
    if (!id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Address.REQUEST_PROVINCE_ID,
            }
        })
    }
    let provinceData = await provinceService.handleGetBorderProvince(id);
    return res.status(200).json({
        code: provinceData.code,
        data: provinceData.data ? provinceData.data : {}
    })
}

const updateBorderProvince = async (req, res) => {
    const { id, coordinates } = req.body;
    const geometry =
    {
        type: "Polygon",
        coordinates: coordinates
    }

    let provinceData = await provinceService.handleUpdateBorderProvince(id, geometry);

    return res.status(200).json({
        code: provinceData.code,
        data: provinceData.data ? provinceData.data : {}
    })
}

module.exports = {
    getAllProvince: getAllProvince,
    getBorderProvince: getBorderProvince,
    updateBorderProvince: updateBorderProvince
}