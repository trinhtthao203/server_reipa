import db from "../models/index";
import Strings from "../constants/strings";
import imageService from "../services/images.service"
import dotenv from "dotenv";
dotenv.config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASS_WORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false,
});
const { QueryTypes } = require('sequelize');

const handleUploadImage = async (id, dataImage) => {
    try {
        let newArray = dataImage.map((item) => {
            return {
                "name": item.filename,
                "post_id": id,
            }
        })
        await db.Images.bulkCreate(newArray)
    } catch (e) {
        console.log(e);
    }
}

const handleAddPost = (post, dataImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await db.Posts.create({
                title: post.title,
                price: post.price,
                address: post.address,
                area: post.area,
                juridical_id: post.juridical_id,
                furniture_id: post.furniture_id,
                structure: post.structure,
                bedroom: post.bedroom,
                toilet: post.toilet,
                geometry: post.coordinates,
                status_id: post.status_id,
                description: post.description,
                province_id: post.province_id ? post.province_id : null,
                district_id: post.district_id ? post.district_id : null,
                ward_id: post.ward_id ? post.ward_id : null,
                street_id: post.street_id ? post.street_id : null,
                user_id: post.user_id,
                typeof_posts_id: post.typeof_posts_id,
                typeof_real_estate_id: post.typeof_real_estate_id,
            })
                .then(async (result) => {
                    handleUploadImage(result.id, dataImage)
                })
            if (postData) {
                resolve({
                    code: 200,
                    data: {
                        message: Strings.POST.ADD_POST_SUCCESS
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

const handleGetPostDistance = (status_id, lat, lng, distance) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await sequelize.query(
                `
                SELECT p.*,u.fullname as user_name, u.phonenumber, ROUND(((p.geometry::geography <-> ST_SetSRID(ST_MakePoint(?,?), 4326)::geography))::numeric,2) as dis_m 
                FROM public."Posts" AS p
                LEFT JOIN public."Users" AS u ON p.user_id = u.id
                WHERE ROUND(((p.geometry::geography <-> ST_SetSRID(ST_MakePoint(?,?), 4326)::geography))::numeric,2)<(?) AND p.status_id=(?)
                ORDER BY dis_m ASC
                `,
                {
                    replacements: [lat, lng, lat, lng, distance, status_id],
                    type: QueryTypes.SELECT
                }
            );
            if (postData) {
                resolve({
                    code: 200,
                    data: postData
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

const handleGetGeoJSONPost = async (status_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await sequelize.query(
                `SELECT json_build_object(
                    'type', 'FeatureCollection',
                    'features', json_agg(ST_AsGeoJSON(row.*)::json)
                    )
                FROM (SELECT * FROM public."Posts" WHERE status_id=?) row`,
                {
                    replacements: [status_id],
                    type: QueryTypes.SELECT
                }
            );
            if (postData) {
                resolve({
                    code: 200,
                    data: {
                        post: postData,
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

const handleGetAddressByLatLng = async (latlng) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await sequelize.query(
                `
                SELECT war.*, pro.name as province_name, d.name as district_name 
                FROM public."Wards" AS war 
                LEFT JOIN public."Provinces" AS pro ON war.province_id=pro.id 
                LEFT JOIN public."Districts" AS d ON war.district_id=d.id
                WHERE ST_Contains(war.geometry, ST_Transform(ST_GeomFromText(?, 4326), 4326))
                `,
                {
                    replacements: [latlng],
                    type: QueryTypes.SELECT
                }
            );
            if (postData) {
                resolve({
                    code: 200,
                    data: {
                        post: postData,
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
const handleGetTypeofPost = async (id, dataImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await db.Typeof_posts.findAll({
                order: [
                    ['name', 'ASC'],
                ],
            });
            if (postData) {
                resolve({
                    code: 200,
                    data: postData
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

const handleGetTypeofRealEstate = async (id, dataImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await db.Typeof_real_estates.findAll({
                order: [
                    ['name', 'ASC'],
                ],
            });
            if (postData) {
                resolve({
                    code: 200,
                    data: postData
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

const handleGetJuridical = async (id, dataImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await db.Juridicals.findAll({
                order: [
                    ['name', 'ASC'],
                ],
            });
            if (postData) {
                resolve({
                    code: 200,
                    data: postData
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

const handleGetFurniture = async (id, dataImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await db.Furnitures.findAll({
                order: [
                    ['name', 'ASC'],
                ],
            });
            if (postData) {
                resolve({
                    code: 200,
                    data: postData
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

const handleGetAll = async (id, dataImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await db.Posts.findAll({
                order: [
                    ['title', 'ASC'],
                ],
            });
            if (postData) {
                resolve({
                    code: 200,
                    data: postData
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

const handleGetPostByID = (post_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await sequelize.query(
                `
                SELECT pos.*, p.name as province_name, d.name as district_name, w.name as ward_name, s.name as street_name,
                u.fullname as user_name, u.phonenumber, u.avatar, j.name as juridical_name, f.name as furniture_name
                FROM public."Posts" AS pos
                LEFT JOIN public."Provinces" AS p ON pos.province_id=p.id 
                LEFT JOIN public."Districts" AS d ON pos.district_id=d.id
                LEFT JOIN public."Wards" AS w ON pos.ward_id=w.id
                LEFT JOIN public."Streets" AS s ON pos.street_id=s.id
                LEFT JOIN public."Users" AS u ON pos.user_id = u.id
                LEFT JOIN public."Juridicals" AS j ON pos.user_id = j.id
                LEFT JOIN public."Furnitures" AS f ON pos.user_id = f.id
                WHERE pos.id=?
                `,
                {
                    replacements: [post_id],
                    type: QueryTypes.SELECT
                }
            );
            if (postData) {
                resolve({
                    code: 200,
                    data: postData
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.POST.NOT_EXIST_ID_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

const handleGetPostByUserID = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await sequelize.query(
                `
                SELECT * FROM public."Posts" WHERE user_id=?
                `,
                {
                    replacements: [user_id],
                    type: QueryTypes.SELECT
                }
            );
            if (postData) {
                resolve({
                    code: 200,
                    data: postData
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.POST.NOT_EXIST_ID_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    handleAddPost: handleAddPost,
    handleGetPostDistance: handleGetPostDistance,
    handleGetGeoJSONPost: handleGetGeoJSONPost,
    handleGetAddressByLatLng: handleGetAddressByLatLng,
    handleGetTypeofPost: handleGetTypeofPost,
    handleGetTypeofRealEstate: handleGetTypeofRealEstate,
    handleGetJuridical: handleGetJuridical,
    handleGetFurniture: handleGetFurniture,
    handleGetAll: handleGetAll,
    handleGetPostByID: handleGetPostByID,
    handleGetPostByUserID: handleGetPostByUserID,
}