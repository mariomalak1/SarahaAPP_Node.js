import {ResetCodeModel} from "../../DB/Models/resetCode.model.js";
import dotenv from "dotenv";

dotenv.config({path: "../../config.env"});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomNumbersStr (lenOfStr) {
    let str = ``;
    for (let index = 0; index < lenOfStr; index++) {
        str += getRandomInt(0, 9);
    }
    return str;
}

export async function uniqueResetCode() {
    let randomNumbers = randomNumbersStr(6);
    let resetCode = await ResetCodeModel.findOne({where: {resetCode: randomNumbers} });
    
    while (resetCode){
        randomNumbers = randomNumbersStr(6);
        resetCode = await ResetCodeModel.findOne({where: {resetCode: randomNumbers} });
    }
}

// code is expired in 15 min -> check time code created at
export async function isCodeExpired (email){
    let resetCode = await ResetCodeModel.findOne({where: {emailUser : email} });

    if(!resetCode){
        // there's no code send for this email
        return null;
    }

    const fifteenMinutesAgo = new Date(now.getTime() - process.env.CODE_EXPIRED_IN * 60 * 1000);

    if(resetCode.createdAt < fifteenMinutesAgo){
        // code is expired
        return true;
    }
    // code not expired
    return false;
}