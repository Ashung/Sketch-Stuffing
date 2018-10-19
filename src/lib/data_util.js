const util = {

    stringRemoveChars: (string, chars) => {
        let result = string;
        for (let i = 0; i < chars.length; i++) {
            result = string.replace(chars[i], '');
        }
        return result;
    },

    randomOne: arr => {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    randomStringUseChars_length: (chars, length) => {
        let result = '';
        for (let i = 0; i < length; i ++) {
            result += util.randomOne(chars);
        }
        return result;
    },

    randomIntFromRange: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

};

module.exports = util;