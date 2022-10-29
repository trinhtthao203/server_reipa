import db from "../models/index";
import typePlanningArea from "../services/typeOfPlanningArea.service"
import Strings from "../constants/strings";
import dotenv from "dotenv";
dotenv.config();

//get all
const getAllType = async (req, res) => {

    let typeData = await typePlanningArea.handleGetAllType();

    return res.status(200).json({
        code: typeData.code,
        data: typeData.data ? typeData.data : {}
    })
}

module.exports = {
    getAllType: getAllType,
}