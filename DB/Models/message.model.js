import {DataTypes} from "sequelize";

import {sequelize} from "../dbConnection.js";
import {UserModel} from "./user.model.js";

export const MessageModel = sequelize.define("Message", {
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
        default: false
    }
});

MessageModel.belongsTo(UserModel, { foreignKey: 'userId', allowNull: false });
UserModel.hasMany(MessageModel);

