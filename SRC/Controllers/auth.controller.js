import {UserModel} from "../../DB/Models/user.model.js";
import {hashPassword, verifyPassword} from "../Utilis/hashPassword.js";
import {generateUserToken} from "../Utilis/userToken.js";
import {sendEmail} from "../Utilis/sendMail.js";
import {randomNumbersStr} from "../Utilis/randomNumbers.js";


export const login = async (req, res, next) => {
    const {email, password} = req.body;

    const user = await UserModel.findOne({where: {email: email}});

    if (!user) {
        return res.status(400).send({error: "not registered email"});
    }

    // check that his email is verfied

    if(!verifyPassword(password, user.password)){
        return res.status(400).send({error: "may be invalid password or email"});
    }

    const token = generateUserToken(email, user.password);

    return res.status(200).send({data: {message: "login done successfully", token}});
}

export const register = async (req, res, next) => {
    const {email, name, password} = req.body;

    const hashedPassword = await hashPassword(password)    

    const user = await UserModel.create({email, password: hashedPassword, fullname: name});

    // create random numbers and send it in email and verfiy user
    let randomNumbers = randomNumbersStr(6);
    let emailBody = `
    Thank you for register in our service
    your verfication code is : ${randomNumbers}
    `
    sendEmail(user.email, `saraha email verfication`, emailBody);

    return res.status(201).send({data: {name, email}})
}

export const forgetPassword = async (req, res, next) => {

}

export const verfiyCodeSend = async (req, res, next) => {

}

