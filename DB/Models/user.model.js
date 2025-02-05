import {DataTypes} from "sequelize";

import {sequelize} from "../dbConnection.js";

export const UserModel = sequelize.define("User", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:{
                args: [3, 50], 
                message: "name must be between 2 and 50 characters long"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                message: "Please enter a valid email address"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:{
                args: [8, 60], 
                message: "Password must be between 8 and 60 characters long"
            }
        }
    },
    isVerfied: {
        type: DataTypes.BOOLEAN,
        default: false  
    },
    verfiyNum: {
        type: DataTypes.STRING,
        allowNull: true
    } 
}, {timestamps: true, paranoid: true});