import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import provinceController from "../controllers/provinceController";
import districtController from "../controllers/districtController";
import wardController from "../controllers/wardController";
import streetController from "../controllers/streetController";
import Strings from "../constants/strings";
import Constants from "../constants/index";
let router = express.Router();

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const initWebRoutes = (app) => {
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

    router.get("/", homeController.getHomePage)

    //get
    router.get("/api/user/get-user/id", authenToken, userController.getUser)
    router.get("/api/user/get-user/:id", authenToken, userController.getUser)
    router.get("/api/user/get-all", authenToken, userController.getAllUser)
    router.get("/api/provinces/get-all", provinceController.getAllProvince)
    router.get("/api/districts/get-all", districtController.getAllDistrict)
    router.get("/api/wards/get-all", wardController.getAllWard)
    router.get("/api/streets/get-all", streetController.getAllStreet)
    router.get("/api/roles/get-all", userController.getAllRole)

    //post
    router.post("/api/wards/sign-up", wardController.getWardSignUp)
    router.post("/api/streets/sign-up", streetController.getStreetSignUp)
    router.post("/api/districts/get-by-province", districtController.getDistrictByProvince)
    router.post("/api/auth/login", userController.handleLogIn)
    router.post("/api/auth/register", userController.handleRegister)
    router.post("/api/auth/check-phonenumber", userController.handleCheckPhoneNumber)
    router.post("/api/auth/reset-password", userController.handleResetPasword)
    router.post("/api/auth/update-profile", authenToken, (req, res) => {
        const user = red;
        if (!user) return res.status(401).json({ success: false, msg: "fail" })
    })

    router.post("/api/refreshToken", refeshToken)
    router.post("/api/logout", userController.handleLogOut)

    //put

    //rest api
    return app.use("/", router);
}

module.exports = initWebRoutes;