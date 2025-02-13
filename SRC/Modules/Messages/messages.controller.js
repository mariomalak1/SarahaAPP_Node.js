import {nanoid} from "nanoid";

import {MessageModel} from "../../../DB/Models/message.model.js";
import {UserModel} from "../../../DB/Models/user.model.js";
import {paginate} from "../../Utilis/paginationForModel.js";

export const getAllMessages = async (req, res, next) => {
    let whereClue = {
        UserId: req.user.id
    }
    
    const paginator = await paginate(req, MessageModel, whereClue);
    
    const response = {
        meta: {
            count: paginator.data.length,
            page: paginator.page,
            limit: paginator.limit,
        },
        data: paginator.data
    }
    
    return res.status(200).send(response);
}

export const editMessagePrivacy = async (req, res, next) => {
    const {messageId} = req.body;

    const message = await MessageModel.findByPk(messageId);
    
    if(!message){
        return res.status(404).send({error: "no message with this id"});
    }

    // message is not for this user
    if(message.UserId != req.user.id){
        return res.status(404).send({message: "no message with this id"});
    }

    message.privacy = ! message.privacy;
    message.save();

    return res.status(200).send({message: "message changed privacy successfully", data: message});
}

export const sendMessageForUser = async (req, res, next) => {
    const {userEmail, content, anonymousName} = req.body;

    const user = await UserModel.findOne({where: {email: userEmail}});

    if(!user){
        return res.status(404).send({message: "not found this user"});
    }

    const messageId = nanoid(7);
    
    const message = await MessageModel.create({id: messageId, UserId: user.id, content, anonymousName});

    return res.status(200).send({message: "message created successfully", data: message});
}


export const deleteMessage = async (req, res, next) => {
    const {messageId} = req.body;

    const message = await MessageModel.findOne({where: {id: messageId}});
    
    if(!message){
        return res.status(404).send({error: "no message with this id"});
    }
    
    // message is not for this user
    if(message.UserId != req.user.id){
        return res.status(404).send({message: "no message with this id"});
    }

    message.destroy();

    return res.status(204).send({message: "message deleted successfully"});
}
