function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomNumbersStr (lenOfStr) {
    str = ``;
    for (let index = 0; index < lenOfStr; index++) {
        str += getRandomInt(0, 9);
    }
    return str;
} 