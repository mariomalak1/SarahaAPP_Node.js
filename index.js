import Express from "express";
import dotenv from "dotenv";

import {sequelize, dbConnection} from "./DB/dbConnection.js"
import {dbModels} from "./DB/dbModels.js"
// import {router as apiRouter} from "./SRC/Routers/index.router.js";
// import {ApiError} from "./SRC/Utillis/apiErrors.js";
// import globalErrorHandle from "./SRC/Middlewares/globalErrorHandle.middleware.js";

dotenv.config({path: "config.env"});

const app = Express();

app.use(Express.json());

// sequelize.sync({"force":true});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server run on port: ${PORT}`);
});