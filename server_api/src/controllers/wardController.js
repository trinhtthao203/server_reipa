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

module.exports = {
    getAllWard: getAllWard,
}