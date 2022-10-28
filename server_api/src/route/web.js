import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import provinceController from "../controllers/provinceController";
import districtController from "../controllers/districtController";
import wardController from "../controllers/wardController";
import streetController from "../controllers/streetController";
import planningAreaController from "../controllers/planningAreasController";
import multer from "multer";
import Strings from "../constants/strings";
import Constants from "../constants/index";
let router = express.Router();

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const initWebRoutes = (app) => {

    // SET STORAGE
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    })

    var upload = multer({ storage: storage })

    const authenToken = async (req, res, next) => {
        const authorizationHeader = req.headers["authorization"];

        //'Beaer [token]'
        const token = authorizationHeader.split(' ')[1];
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
    router.post("/api/provinces/get-border-province", provinceController.getBorderProvince)
    router.post("/api/provinces/update-border-province", provinceController.updateBorderProvince)

    //district
    router.get("/api/districts/get-all", districtController.getAllDistrict)
    router.post("/api/districts/get-by-province", districtController.getDistrictByProvince)

    //ward
    router.get("/api/wards/get-all", wardController.getAllWard)
    //chua xong
    router.post("/api/wards/update-border", upload.single('myFile'), wardController.updateBorder)
    router.post("/api/wards/update-border-id", wardController.updateBorderID)
    router.post("/api/wards/sign-up", wardController.getWardSignUp)

    //street
    router.get("/api/streets/get-all", streetController.getAllStreet)
    router.post("/api/streets/sign-up", streetController.getStreetSignUp)

    //planning-area
    router.get("/api/get_all_planning_areas", planningAreaController.getAllPlanningArea)
    router.post("/api/add_planning_areas", planningAreaController.addPlanningArea)


    //rest api
    return app.use("/", router);
}

module.exports = initWebRoutes;