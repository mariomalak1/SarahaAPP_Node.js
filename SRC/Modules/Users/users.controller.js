import {UserModel} from "../../../DB/Models/user.model.js";
import {MessageModel} from "../../../DB/Models/message.model.js";
import {sendEmail} from "../../Utilis/sendMail.js";
import {randomNumbersStr} from "../../Utilis/resetCode.js";
import {verifyPassword, hashPassword} from "../../Utilis/hashPassword.js";

export const updateProfile = async (req, res, next) => {
    const {name} = req.body;

    req.user.fullname = name;
    req.user.save();
    
    return res.status(200).send({data: {name: req.user.fullname, email: req.user.email}, message: "profile updated successfully"});    
}

export const updatePassword = async (req, res, next) => {
    const {password, newPassword} = req.body;

    // check that new password not the same old password
    if(newPassword === password){
        return res.status(400).send({error: "new password is the same with old one"});
    }

    // check that old password is correct
    if(! await verifyPassword(password, req.user.password)){
        return res.status(400).send({error: "old password is incorrect"});
    }

    const hashedNewPassword = await hashPassword(newPassword);
    req.user.password = hashedNewPassword;

    req.user.save();
    return res.status(200).send({message: "password changed successfully"});
}

export const updateMail = async (req, res, next) => {
    const {newEmail} = req.body;
    const newUser = await UserModel.findOne({where: {email: newEmail}});

    if(newUser){
        return res.status(400).send({error: "this email is already exists"});
    }

    let randomNumbers = randomNumbersStr(6);
    req.user.verfiyNum = randomNumbers;
    req.user.isVerfied = false;
    req.user.email = newEmail;

    
    let emailBody = `
    Changing mail Verfication
    your verfication code is : ${randomNumbers}
    `;
    
    sendEmail(newEmail, `Saraha Changing Email Verfication`, emailBody);
    req.user.save();
    return res.status(200).send({data: {newEmail}, message: "email changed successfully, you need to verfiy it"});
}

// need password to make this action 
// (soft delete)
export const deleteAccount = async (req, res, next) => {
    const {password} = req.body;

     if(! await verifyPassword(password, req.user.password)){
        return res.status(400).send({error: "password is incorrect"});
    }

    await MessageModel.destroy({where: {UserId: req.user.id}});

    req.user.destroy();

    return res.status(204).send({message: "account deleted successfully"});
}
