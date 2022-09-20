import bodyParser, { json, urlencoded } from 'body-parser'
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import express from "express";
import connectDB from './config/connectDB';
import cors from 'cors';

const app = express();
app.use(cors({ origin: true }))

require("dotenv").config();

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

const port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})