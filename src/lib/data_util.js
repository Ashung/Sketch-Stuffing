const util = {};

util.stringRemoveChars = function(string, chars) {
    let result = string;
    for (let i = 0; i < chars.length; i++) {
        result = string.replace(chars[i], '');
    }
    return result;
};

util.randomOne = function(arr, expression) {
    let num = Math.random();
    if (expression) {
        num = expression;
    }
    return arr[Math.floor(num * arr.length)];
};

util.randomStringUseChars_length = function(chars, length) {
    let result = '';
    for (let i = 0; i < length; i ++) {
        result += this.randomOne(chars);
    }
    return result;
};

util.randomIntFromRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

util.supplyCharToFitLength = function(str, char, length) {
    if (length - str.length > 0) {
        return char.repeat(length - str.length) + str;
    } else {
        return str;
    }
}

module.exports = util;