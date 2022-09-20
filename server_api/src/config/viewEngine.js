import express from "express";
import db from "../models";
const configViewEngine = (app) =>{
    
    app.use(express.static("./src/public"));
    //Use engine use ejs
    app.set("view engine", "ejs");
    app.set("views", "./src/views")

    
}

module.exports = configViewEngine;