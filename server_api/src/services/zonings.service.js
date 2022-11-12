import db from "../models/index";
import Strings from "../constants/strings";

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASS_WORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false,
});
const { QueryTypes } = require('sequelize');

const handleGetAllZoning = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let zoningData = await db.Zonings.findAll({
                order: [
                    ['name', 'ASC'],
                ],
            });
            if (zoningData) {
                resolve({
                    code: 200,
                    data: zoningData
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

const handleGetGeoJSONZoning = async (status_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let zoningData = await sequelize.query(
                `SELECT json_build_object(
                    'type', 'FeatureCollection',
                    'features', json_agg(ST_AsGeoJSON(row.*)::json)
                    )
                FROM (SELECT * FROM public."Zonings" WHERE status_id=?) row`,
                {
                    replacements: [status_id],
                    type: QueryTypes.SELECT
                }
            );
            if (zoningData) {
                resolve({
                    code: 200,
                    data: {
                        zoning: zoningData,
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

const handleGetGeoJSONZoningPolygon = async (status_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let zoningData = await sequelize.query(
                `SELECT json_build_object(
                    'type', 'FeatureCollection',
                    'features', json_agg(ST_AsGeoJSON(row.*)::json)
                    )
                FROM (SELECT * FROM public."Zonings" WHERE status_id=? AND ispolygon=true) row`,
                {
                    replacements: [status_id],
                    type: QueryTypes.SELECT
                }
            );
            if (zoningData) {
                resolve({
                    code: 200,
                    data: {
                        zoning: zoningData,
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

const handleGetGeoJSONZoningPolyline = async (status_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let zoningData = await sequelize.query(
                `SELECT json_build_object(
                    'type', 'FeatureCollection',
                    'features', json_agg(ST_AsGeoJSON(row.*)::json)
                    )
                FROM (SELECT * FROM public."Zonings" WHERE status_id=? AND ispolygon=false) row`,
                {
                    replacements: [status_id],
                    type: QueryTypes.SELECT
                }
            );
            if (zoningData) {
                resolve({
                    code: 200,
                    data: {
                        zoning: zoningData,
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

const handleUploadImage = async (id, dataImage) => {
    try {
        let newArray = dataImage.map((item) => {
            return {
                "name": item.filename,
                "zoning_id": id,
            }
        })
        await db.Images.bulkCreate(newArray)
    } catch (e) {
        console.log(e);
    }
}

const handleAddZoning = (zoning, dataImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            let zoningData = await db.Zonings.create({
                name: zoning.name,
                purpose: zoning.purpose,
                area: zoning.area,
                width: zoning.width,
                length: zoning.length,
                address: zoning.address,
                geometry: zoning.coordinates,
                ispolygon: zoning.ispolygon,
                description: zoning.description,
                province_id: zoning.province_id ? zoning.province_id : null,
                district_id: zoning.district_id ? zoning.district_id : null,
                ward_id: zoning.ward_id ? zoning.ward_id : null,
                user_id: zoning.user_id,
                typeof_zoning_id: zoning.typeof_zoning_id,
                status_id: zoning.status_id,
            })
                .then(async (result) => {
                    handleUploadImage(result.id, dataImage)
                })

            if (zoningData) {
                resolve({
                    code: 200,
                    data: {
                        zoning: zoningData,
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.COMMON_ERROR,
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    })
}

const handleGetZoningPolygonID = (status_id, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let zoningData = await sequelize.query(
                `SELECT z.*,p.name AS province_name ,d.name as district_name, w.name as ward_name, u.fullname as user_name, u.phonenumber
                FROM public."Zonings" AS z 
                LEFT JOIN public."Provinces" AS p ON z.province_id=p.id 
                LEFT JOIN public."Districts" AS d ON z.district_id=d.id
                LEFT JOIN public."Wards" AS w ON z.district_id=w.id
                LEFt JOIN public."Users" AS u ON z.user_id = u.id
                WHERE z.ispolygon=true AND z.status_id=? AND z.id=?
                `,
                {
                    replacements: [status_id, id],
                    type: QueryTypes.SELECT
                }
            );

            if (zoningData) {
                resolve({
                    code: 200,
                    data: zoningData
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.COMMON_ERROR
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

const handleGetZoningPolylineDistance = (status_id, lat, lng) => {
    return new Promise(async (resolve, reject) => {
        try {
            let zoningData = await sequelize.query(
                `SELECT z.*,p.name AS province_name ,d.name as district_name, w.name as ward_name, u.fullname as user_name, u.phonenumber, ROUND(((z.geometry::geography <-> ST_SetSRID(ST_MakePoint(?,?), 4326)::geography))::numeric,2) as dis_km 
                FROM public."Zonings" AS z
                LEFT JOIN public."Provinces" AS p ON z.province_id=p.id 
                LEFT JOIN public."Districts" AS d ON z.district_id=d.id
                LEFT JOIN public."Wards" AS w ON z.ward_id=w.id
                LEFt JOIN public."Users" AS u ON z.user_id = u.id
                WHERE ROUND(((z.geometry::geography <-> ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography))::numeric,2)<z.width AND z.ispolygon=false AND z.status_id=?
                `,
                {
                    replacements: [lat, lng, lat, lng, status_id],
                    type: QueryTypes.SELECT
                }
            );
            if (zoningData) {
                resolve({
                    code: 200,
                    data: zoningData
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.COMMON_ERROR
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    handleGetAllZoning: handleGetAllZoning,
    handleAddZoning: handleAddZoning,
    handleGetGeoJSONZoning: handleGetGeoJSONZoning,
    handleGetGeoJSONZoningPolygon: handleGetGeoJSONZoningPolygon,
    handleGetGeoJSONZoningPolyline: handleGetGeoJSONZoningPolyline,
    handleGetZoningPolygonID: handleGetZoningPolygonID,
    handleGetZoningPolylineDistance: handleGetZoningPolylineDistance
}