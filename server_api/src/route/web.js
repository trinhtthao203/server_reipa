import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
let router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage)
    router.get("/crud", homeController.getCRUD)

    //api

    //get
    router.get("/api/get-user", homeController.displayGetUser)
    router.get("/api/edit-user", homeController.getEditUser)
    router.get("/api/delete-user", homeController.deleteUser)
    router.get("/api/user/get-all", userController.getAllUser)

    //post
    router.post("/api/auth/login", userController.handleLogIn)
    router.post("/api/post-user", homeController.postUser)
    router.post("/api/put-user-info", homeController.putUserInfo)

    //put



    //rest api
    return app.use("/", router);
}

module.exports = initWebRoutes;