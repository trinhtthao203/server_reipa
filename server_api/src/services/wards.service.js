import db from "../models/index";

const handleGetAllWard = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let wardData = await db.Wards.findAll();
            console.log(wardData);
            if (wardData) {
                resolve({
                    code: 200,
                    data: {
                        ward: wardData,
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: "Không tìm thấy dữ liệu",
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    })
}

module.exports = {
    handleGetAllWard: handleGetAllWard,
}