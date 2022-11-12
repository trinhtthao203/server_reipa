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
                street_id: post.street_id ? post.street_id : null,
                ward_id: post.ward_id ? post.ward_id : null,
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

module.exports = {
    handleAddPost: handleAddPost,
    handleGetPostDistance: handleGetPostDistance
}