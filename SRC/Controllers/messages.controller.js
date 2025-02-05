import {MessageModel} from "../../DB/Models/message.model.js";
import {paginate} from "../Utilis/paginationForModel.js";

export const getAllMessages = async (req, res, next) => {
    let whereClue = {
        userId: req.user.id
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
        return res.status(400).send({error: "no message with this id"});
    }

    message.privacy = ! message.privacy;
    message.save();

    return res.status(200).send({message: "message changed privacy successfully", data: message});
}

export const sendMessageForUser = async (req, res, next) => {
    const {password} = req.body;

     if(! await verifyPassword(password, req.user.password)){
        return res.status(400).send({error: "password is incorrect"});
    }

    req.user.destroy();

    return res.status(200).send({message: "account deleted successfully"});
}
