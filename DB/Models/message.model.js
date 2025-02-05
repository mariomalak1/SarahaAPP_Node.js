import {DataTypes} from "sequelize";

import {sequelize} from "../dbConnection.js";
import {UserModel} from "./user.model.js";

export const MessageModel = sequelize.define("Message", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    anonymousName : {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len:{
                args: [1, 50],
                message: "anonymous name must be between 1 and 50 characters long"
            }
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            len: {
                args: [1, 3000],
                message: "message must be between 1 and 3000 characters long"
            }
        }
    },
    privacy:{
        type: DataTypes.BOOLEAN,
        defualt: 0
    },
});

MessageModel.belongsTo(UserModel, {
    foreignKey: {
        allowNull: false,
        onDelete: 'SET NULL',
        onUpdate: 'RESTRICT'
    }
});
UserModel.hasMany(MessageModel);

