
var utli = {};

utli.randomStringUseCharacters_template = function(characters, template) {};

utli.randomStringUseCharacters_length = function(characters, length) {};

utli.randomStringUseCharacters_min_max = function(characters, min, max) {};

utli.orderedDataFromData_count = function(data, count) {
    return utli.datafromData_count_shuffle(data, count, false);
};

utli.randomDataFromData_count = function(data, count) {
    return utli.datafromData_count_shuffle(data, count, true);
};

utli.datafromData_count_shuffle = function(data, count, shuffle) {
    var newData = data.slice();
    while (newData.length < count) {
        newData.push.apply(newData, data);
    }
    if (shuffle == true) {
        utli.shuffle(newData);
    }
    return newData.splice(0, count);
};

utli.shuffle = function(data) {
    let currentIndex = data.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = data[currentIndex];
        data[currentIndex] = data[randomIndex];
        data[randomIndex] = temporaryValue;
    }
    return data;
};


// let data = ["a", "b", "c", "d", "e"];
// let count = 6;
//
// console.log(utli.randomDataFromData_count(data, count));
