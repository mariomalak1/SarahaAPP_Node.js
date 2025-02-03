import {UserModel} from "../../DB/Models/user.model.js";
import {ResetCodeModel} from "../../DB/Models/resetCode.model.js";
import {hashPassword, verifyPassword} from "../Utilis/hashPassword.js";
import {generateUserToken} from "../Utilis/userToken.js";
import {sendEmail} from "../Utilis/sendMail.js";
import {randomNumbersStr, uniqueResetCode, isCodeExpired} from "../Utilis/resetCode.js";


export const register = async (req, res, next) => {
    const {email, name, password} = req.body;

    const hashedPassword = await hashPassword(password);
    
    let randomNumbers = randomNumbersStr(6);
    const user = await UserModel.create({email, password: hashedPassword, fullname: name, verfiyNum: randomNumbers});
    
    // create random numbers and send it in email and verfiy user
    let emailBody = `
    Thank you for register in our service
    your verfication code is : ${randomNumbers}
    `;

    sendEmail(user.email, `saraha email verfication`, emailBody);

    return res.status(201).send({data: {name, email}})
}


export const verfiyEmail = async (req, res, next) => {
    const {email, code} = req.body;

    const user = await UserModel.findOne({where: {email}});
    
    if(!user){
        return res.status(400).send({error: "not registered mail"});
    }

    if(user.isVerfied){
        return res.status(200).send({error: "email verfication done"});
    }

    if(user.verfiyNum !== code){
        return res.status(400).send({error: "invalid verfication code"});
    }

    user.verfiyNum = null;
    user.isVerfied = true;
    user.save();

    return res.status(200).send({data: {email}, message: "verfication done"});
}


export const login = async (req, res, next) => {
    const {email, password} = req.body;
    
    const user = await UserModel.findOne({where: {email: email}});

    if(!verifyPassword(password, user.password)){
        return res.status(400).send({error: "may be invalid password or mail"});
    }

    const token = generateUserToken(email, user.password);

    return res.status(200).send({data: {message: "login done successfully", token}});
}


export const forgetPassword = async (req, res, next) => {
    const {email} = req.body;

    let resetCode = await ResetCodeModel.findOne({where: {emailUser :email} });

    if(resetCode){
        if(isCodeExpired(resetCode)){
            await resetCode.destroy();
        }
    }

    resetCode = await uniqueResetCode(email);

    return res.status(200).send({data: {resetCode: resetCode}});
}

export const verfiyCodeSend = async (req, res, next) => {
    const {email, resetCode, newPassword} = req.body;

    let code = await ResetCodeModel.findOne({where: {emailUser: email} });
    
    if(!code){
        // this mail is not register before
        return res.status(400).send({data: "not valid reset code."});
    }

    if(code === resetCode){
        if(isCodeExpired(code)){
            code.resetCode = await uniqueResetCode();
            return res.status(400).send({data: "reset code is expired another email is go you."});
        }
    }
    else{
        return res.status(400).send({data: "not valid reset code."});
    }

    return 
}

