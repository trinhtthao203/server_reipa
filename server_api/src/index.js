import bodyParser, { json, urlencoded } from 'body-parser'
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import express from "express";
import connectDB from './config/connectDB';
import cors from 'cors';

//swagger
import swaggerDoc from "swagger-ui-express";
import swagger from "./utils/swagger"
// import swaggerDocs from "./utils/swagger";

require("dotenv").config();

const app = express();
app.use(cors({ origin: true }));

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

app.use("/swagger/docs", swaggerDoc.serve);
app.use("/swagger/docs", swaggerDoc.setup(swagger));

const port = process.env.PORT || 6969;

app.listen(port, () => {
  // swaggerDocs(app, port);
  console.log(`Example app listening on port ${port}`)
})