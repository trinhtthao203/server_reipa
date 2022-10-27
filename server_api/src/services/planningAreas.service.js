import db from "../models/index";
import Strings from "../constants/strings";
const handleGetAllPlanningArea = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let planningAreaData = await db.Planning_areas.findAll({
                order: [
                    ['name', 'ASC'],
                ],
            });
            if (planningAreaData) {
                resolve({
                    code: 200,
                    data: {
                        planningArea: planningAreaData,
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

const handleAddPlanningArea = (planningArea, geometry) => {

    return new Promise(async (resolve, reject) => {
        try {
            let planningAreaData = await db.Planning_areas.create({
                id: planningArea.id,
                name: planningArea.name,
                function: planningArea.functions,
                area: planningArea.area,
                address: planningArea.address,
                coordinates: geometry,
                ward_id: planningArea.ward_id,
                user_id: planningArea.user_id,
                typeof_planning_area_id: planningArea.typeof_planning_area_id,
                approved: planningArea.approved,
            });
            if (planningAreaData) {
                resolve({
                    code: 200,
                    data: {
                        planningArea: planningAreaData,
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
    handleGetAllPlanningArea: handleGetAllPlanningArea,
    handleAddPlanningArea: handleAddPlanningArea,
}