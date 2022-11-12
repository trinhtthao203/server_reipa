import express from "express";
import userController from "../controllers/userController";
import provinceController from "../controllers/provinceController";
import districtController from "../controllers/districtController";
import wardController from "../controllers/wardController";
import streetController from "../controllers/streetController";
import zoningController from "../controllers/zoningsController";
import postController from "../controllers/postController";
import typeofZoningController from "../controllers/typeofZoningController";
import imagesController from "../controllers/imageController";
import multer from "multer";
import Strings from "../constants/strings";
import Constants from "../constants/index";
let router = express.Router();

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const initWebRoutes = (app) => {
    const authenToken = async (req, res, next) => {
        const authorizationHeader = req.headers["authorization"];

        //"Beaer [token]"
        const token = authorizationHeader.split(" ")[1];
        if (!token)
            return res.status(401).json({
                code: 401,
                data: {
                    message: Strings.Message.REQUEST_401
                }
            })

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            console.log(err, data);
            if (err) return res.status(403).json({
                code: 403,
                data: {
                    message: Strings.Message.REQUEST_403
                }
            })
            req.user = data;
            next();
        })
    }

    const refeshToken = (req, res) => {
        const refeshToken = req.body.token;
        console.log(req.body);
        if (!refeshToken)
            return res.status(401).json({
                code: 401,
                data: {
                    message: Strings.Message.REQUEST_401
                }
            })

        jwt.verify(refeshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            console.log(err, data);
            if (err) return res.status(403).json({
                code: 403,
                data: {
                    message: Strings.Message.REQUEST_403
                }
            })

            //neu refreshToken hop le => tao ra mot accessToken moi
            const accessToken = jwt.sign({ id: data.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: Constants.Api.EXPIRES_IN });
            res.json({ accessToken });
        })
    }

    //user
    router.post("/api/logout", userController.handleLogOut)
    router.post("/api/auth/login", userController.handleLogIn)
    router.get("/api/roles/get-all", userController.getAllRole)
    router.post("/api/auth/register", userController.handleRegister)
    router.get("/api/user/get-all", authenToken, userController.getAllUser)
    router.get("/api/user/get-user/id", authenToken, userController.getUser)
    router.get("/api/user/get-user/:id", authenToken, userController.getUser)
    router.post("/api/auth/reset-password", userController.handleResetPasword)
    router.post("/api/auth/check-phonenumber", userController.handleCheckPhoneNumber)
    router.post("/api/refreshToken", refeshToken)

    //province
    router.get("/api/provinces/get-all", provinceController.getAllProvince)
    router.post("/api/provinces/update-border-province", provinceController.updateBorderProvince)
    router.post("/api/provinces/geojson-border-province-by-id", provinceController.getBorderProvinceByID)

    //district
    router.get("/api/districts/get-all", districtController.getAllDistrict)
    router.post("/api/districts/get-by-province", districtController.getDistrictByProvince)
    router.post("/api/districts/geojson-border-district-by-id", districtController.getBorderDistrictByID)

    //ward
    router.get("/api/wards/get-all", wardController.getAllWard)
    router.post("/api/wards/geojson-border-ward-by-id", wardController.getBorderWardByID)
    //chua xong
    router.post("/api/wards/update-border", wardController.updateBorder)
    router.post("/api/wards/update-border-id", wardController.updateBorderID)
    router.post("/api/wards/sign-up", wardController.getWardSignUp)

    //street
    router.get("/api/streets/get-all", streetController.getAllStreet)
    router.post("/api/streets/sign-up", streetController.getStreetSignUp)

    //zoning
    router.get("/api/zoning/get_all_zonings", zoningController.getAllZoning)
    router.post("/api/zoning/add_zonings", zoningController.addZoning);
    router.post("/api/zoning/geojson_zonings", zoningController.getGeoJSONZoning)
    router.post("/api/zoning/geojson_zonings_polygon", zoningController.getGeoJSONZoningPolygon)
    router.post("/api/zoning/geojson_zonings_polyline", zoningController.getGeoJSONZoningPolyline)
    router.post("/api/zoning/zonings_polygon_id", zoningController.getZoningPolygonID)
    router.post("/api/zoning/zonings_polyline_by_distance", zoningController.getZoningPolylineDistance)

    //type of zoning
    router.get("/api/type_of_zoning/get_all_type", typeofZoningController.getAllType)

    //images
    router.post("/api/images/get_all_by_zoning_id", imagesController.getAllImageByZoningID)
    router.post("/api/images/get_one_by_zoning_id", imagesController.getOneImageByZoningID)
    router.post("/api/images/get_one_by_post_id", imagesController.getOneImageByPostID)

    //posts
    router.post("/api/post/add_post", postController.addPost);
    router.post("/api/post/post_by_distance_latlng", postController.getPostByDistanceLatLng);


    //rest api
    return app.use("/", router);
}

module.exports = initWebRoutes;