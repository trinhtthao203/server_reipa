import db from "../models/index";
import planningAreaService from "../services/planningAreas.service"

import dotenv from "dotenv";
import Strings from "../constants/strings";
dotenv.config();

const getAllPlanningArea = async (req, res) => {
    let planningAreaData = await planningAreaService.handleGetAllPlanningArea();

    return res.status(200).json({
        code: planningAreaData.code,
        data: planningAreaData.data ? planningAreaData.data : {}
    })
}

const addPlanningArea = async (req, res) => {
    console.log('file', req.files);
    console.log('body', req.body);
    res.status(200).json({
        message: 'success!',
    });
    // const { name, type, coordinates, area, functions, address, user_id, ward_id, typeof_planning_area_id, approved } = req.body;
    // const geometry = {
    //     type: type,
    //     coordinates: coordinates
    // }

    // if (!name || !coordinates || !typeof_planning_area_id || !user_id || !functions || !area) {
    //     return res.status(400).json({
    //         code: 400,
    //         message: Strings.Message.FEILD_REQUIRED_MESSAGE
    //     })
    // }

    // let planningAreaData = await planningAreaService.handleAddPlanningArea(req.body, geometry);

    // return res.status(200).json({
    //     code: planningAreaData.code,
    //     data: planningAreaData.data ? planningAreaData.data : {}
    // })
}

module.exports = {
    getAllPlanningArea: getAllPlanningArea,
    addPlanningArea: addPlanningArea,
}