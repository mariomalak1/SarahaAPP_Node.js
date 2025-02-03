import {DataTypes} from "sequelize";

import {sequelize} from "../dbConnection.js";

export const ResetCodeModel = sequelize.define("ResetCode", {
    resetCode: {
        type: DataTypes.STRING,
        unique: true
    },

    emailUser: {
        type: DataTypes.STRING,
        unique: true
    },
})