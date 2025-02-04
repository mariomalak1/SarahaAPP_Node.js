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
    return randomNumbers;
}

// code is expired in 15 min -> check time code created at
export async function isCodeExpired (resetCodeInstance){
    if(!resetCodeInstance){
        // there's no code send for this email
        return null;
    }
    const now = new Date();
    const codeExpiry = Number(process.env.CODE_EXPIRED_IN) || 15;
    const expiryTimeAgo = new Date(now.getTime() - codeExpiry * 60 * 1000);
    const sendCodeTime = new Date(resetCodeInstance.updatedAt || resetCodeInstance.createdAt);

    return sendCodeTime <= expiryTimeAgo;
}