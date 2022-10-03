import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import wardController from "../controllers/wardController";
import Strings from "../constants/strings";
import Constants from "../constants/index";
let router = express.Router();

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const initWebRoutes = (app) => {

    const authenToken = (req, res, next) => {
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
    router.get("/crud", homeController.getCRUD)

    //get
    router.get("/api/user/get-all", authenToken, userController.getAllUser)
    router.get("/api/ward/get-all", authenToken, wardController.getAllWard)

    //post
    router.post("/api/refreshToken", refeshToken)
    router.post("/api/logout", userController.handleLogOut)
    router.post("/api/auth/login", userController.handleLogIn)
    router.post("/api/auth/register", userController.handleRegister)

    //put

    //rest api
    return app.use("/", router);
}

module.exports = initWebRoutes;