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

util.randomIntFromRange = function(start, finish) {
    let max = Math.max(start, finish);
    let min = Math.min(start, finish);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

util.sortedIntArrayFromRange = function(start, finish, length) {
    let data = [];
    let rangeLength = Math.abs(finish - start) + 1;
    while (data.length < length) {
        let item = this.randomIntFromRange(start, finish);
        if (data.length < Math.min(rangeLength, length)) {
            if (data.indexOf(item) === -1) {
                data.push(item);
            }
        }
        else {
            data.push(item);
        }
    }
    data.sort((a, b) => {
        if (start < finish) {
            return a - b;
        }
        else {
            return b - a;
        }
    });
    return data;
};

util.supplyCharToFitLength = function(str, char, length) {
    if (length - str.length > 0) {
        return char.repeat(length - str.length) + str;
    } else {
        return str;
    }
}

module.exports = util;