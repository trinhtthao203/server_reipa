import db from "../models/index";
import investorService from "../services/investors.service"
import Strings from "../constants/strings";
import dotenv from "dotenv";
dotenv.config();

//get all
const getAllInvestor = async (req, res) => {

    let investorData = await investorService.handleGetAllInvestor();

    return res.status(200).json({
        code: investorData.code,
        data: investorData.data ? investorData.data : {}
    })
}

module.exports = {
    getAllInvestor: getAllInvestor,
}