@import "utli.js";
@import "data.js";

var DataSupplier = require("sketch/data-supplier");

var onStartup = function() {

    DataSupplier.registerDataSupplier("public.text", "历法 - 月份", "SupplyMonths");
    DataSupplier.registerDataSupplier("public.text", "历法 - 日", "SupplyDays");
    DataSupplier.registerDataSupplier("public.text", "历法 - 星期", "SupplyWeekdays");
    DataSupplier.registerDataSupplier("public.text", "历法 - 星期 (中)", "SupplyShortWeekdays");
    DataSupplier.registerDataSupplier("public.text", "历法 - 星期 (短)", "SupplyNarrowWeekdays");

    DataSupplier.registerDataSupplier("public.text", "地理 - 中国省份", "SupplyProvinces");
    DataSupplier.registerDataSupplier("public.text", "地理 - 中国城市", "SupplyCities");

    DataSupplier.registerDataSupplier("public.text", "姓名", "SupplyFullNames");
    DataSupplier.registerDataSupplier("public.text", "姓名 (男)", "SupplyMaleFullNames");
    DataSupplier.registerDataSupplier("public.text", "姓名 (女)", "SupplyFemaleFullNames");
    
    DataSupplier.registerDataSupplier("public.text", "号码 - 移动电话", "SupplyMobileNumbers");
    DataSupplier.registerDataSupplier("public.text", "号码 - 固定电话", "SupplyPhoneNumbers");
    DataSupplier.registerDataSupplier("public.text", "号码 - 车牌号", "SupplyCarNumbers");
    DataSupplier.registerDataSupplier("public.text", "号码 - 身份证号", "SupplyIdCardNumbers");

    DataSupplier.registerDataSupplier("public.text", "定制 - 从文件载入", "SupplyTextFromFile");
    DataSupplier.registerDataSupplier("public.image", "定制 - 从文件夹载入", "SupplyImageFromFolder");
    DataSupplier.registerDataSupplier("public.text", "定制 - 从文件随机载入", "SupplyRandomTextFromFile");
    DataSupplier.registerDataSupplier("public.image", "定制 - 从文件夹随机载入", "SupplyRandomImageFromFolder");

};

var onShutdown = function() {
    DataSupplier.deregisterDataSuppliers();
};

var onSupplyMonths = function(context) {
    var data = utli.orderedDataOffsetFromData_count(DATA_MONTHS, context.data.requestedCount);
    DataSupplier.supplyData(context.data.key, data);
};

var onSupplyWeekdays = function(context) {
    var data = utli.orderedDataOffsetFromData_count(DATA_WEEKDAYS, context.data.requestedCount);
    DataSupplier.supplyData(context.data.key, data);
};

var onSupplyShortWeekdays = function(context) {
    var data = utli.orderedDataOffsetFromData_count(DATA_WEEKDAYS_SHORT, context.data.requestedCount);
    DataSupplier.supplyData(context.data.key, data);
};

var onSupplyNarrowWeekdays = function(context) {
    var data = utli.orderedDataOffsetFromData_count(DATA_WEEKDAYS_NARROW, context.data.requestedCount);
    DataSupplier.supplyData(context.data.key, data);
};

var onSupplyDays = function(context) {
    var offset = utli.randomIntFromRange(0, DATA_DAYS.length - 1);
    for (var i = 0; i < context.data.requestedCount; i++) {
        DataSupplier.supplyDataAtIndex(context.data.key, DATA_DAYS[(i + offset) % DATA_DAYS.length], i);
    }
};

var onSupplyFullNames = function(context) {
    var count = context.data.requestedCount;
    var i = 0;
    while (i < count) {
        var familyName = DATA_LASTNAMES[Math.floor(Math.pow(Math.random(), 2.5) * DATA_LASTNAMES.length)];
        var name = "";
        var charsMale = utli.stringRemoveChars(DATA_CHARACTERS[0], familyName);
        var charsFemale = utli.stringRemoveChars(DATA_CHARACTERS[1], familyName);
        if (Math.random() < 0.5) {
            for (let j = 0; j < Math.floor(Math.random() * 2) + 1; j++) {
                name += charsMale[Math.floor(Math.random() * charsMale.length)];
            }
        }
        else {
            for (let j = 0; j < Math.floor(Math.random() * 2) + 1; j++) {
                name += charsFemale[Math.floor(Math.random() * charsFemale.length)];
            }
        }
        DataSupplier.supplyDataAtIndex(context.data.key, familyName + name, i);
        i ++;
    }
};

var onSupplyMaleFullNames = function(context) {
    var count = context.data.requestedCount;
    var i = 0;
    while (i < count) {
        var familyName = DATA_LASTNAMES[Math.floor(Math.pow(Math.random(), 2.5) * DATA_LASTNAMES.length)];
        var name = "";
        var charsMale = utli.stringRemoveChars(DATA_CHARACTERS[0], familyName);
        for (let j = 0; j < Math.floor(Math.random() * 2) + 1; j++) {
            name += charsMale[Math.floor(Math.random() * charsMale.length)];
        }
        DataSupplier.supplyDataAtIndex(context.data.key, familyName + name, i);
        i ++;
    }
};

var onSupplyFemaleFullNames = function(context) {
    var count = context.data.requestedCount;
    var i = 0;
    while (i < count) {
        var familyName = DATA_LASTNAMES[Math.floor(Math.pow(Math.random(), 2.5) * DATA_LASTNAMES.length)];
        var name = "";
        var charsFemale = utli.stringRemoveChars(DATA_CHARACTERS[1], familyName);
        if (Math.random() < 0.9) {
            for (let j = 0; j < Math.floor(Math.random() * 2) + 1; j++) {
                name += charsFemale[Math.floor(Math.random() * charsFemale.length)];
            }
        }
        else {
            name = charsFemale[Math.floor(Math.random() * charsFemale.length)].repeat(2);
        }
        DataSupplier.supplyDataAtIndex(context.data.key, familyName + name, i);
        i ++;
    }
};

var onSupplyProvinces = function(context) {
    var provinces = DATA_CHINA_PROVINCES.map(function(item) {
        return item.full;
    });
    for (var i = 0; i < context.data.requestedCount; i++) {
        DataSupplier.supplyDataAtIndex(context.data.key, utli.randomOne(provinces), i);
    }
};

var onSupplyCities = function(context) {
    var provinceCodes = Object.keys(DATA_CHINA_AREA["86"]);
    for (var i = 0; i < context.data.requestedCount; i++) {
        var provinceCode = utli.randomOne(provinceCodes);
        var city = utli.randomOne(Object.values(DATA_CHINA_AREA[provinceCode]));
        if (city == "市辖区" || city == "县") {
            city = DATA_CHINA_AREA["86"][provinceCode];
        }
        DATA_CITY_SUFFIXES.forEach(function(suffix) {
            city = city.replace(new RegExp(suffix + "$"), "");
        });
        DataSupplier.supplyDataAtIndex(context.data.key, city, i);
    }
};

var onSupplyMobileNumbers = function(context) {
    var prefixs = [
        139,138,137,136,135,134,159,158,157,150,151,152,147,188,187,182,183,184,178,
        130,131,132,156,155,186,185,145,176,
        133,153,189,180,181,177,173
    ];
    var numbers = "0123456789";
    for (var i = 0; i < context.data.requestedCount; i++) {
        var text = String(utli.randomOne(prefixs)) + " ";
        text += utli.randomStringUseChars_length(numbers, 4) + " ";
        text += utli.randomStringUseChars_length(numbers, 4);
        DataSupplier.supplyDataAtIndex(context.data.key, text, i);
    }
};

var onSupplyPhoneNumbers = function(context) {
    for (var i = 0; i < context.data.requestedCount; i++) {
        var text = "(";
        text += utli.randomOne(Object.keys(DATA_CHINA_TELPHONE_CODE));
        text += ") ";
        text += utli.randomStringUseChars_length("123456789", 1);
        text += utli.randomStringUseChars_length("0123456789", utli.randomIntFromRange(2, 3));
        text += " ";
        text += utli.randomStringUseChars_length("0123456789", 4);
        DataSupplier.supplyDataAtIndex(context.data.key, text, i);
    }

    // var items = context.data.items;
    // items.forEach(function(item, i) {

    //     var name, groupId;
    //     if (context.data.isSymbolInstanceOverride == 0) {
    //         name = item.name();
    //         groupId = item.parentGroup().objectID();
    //     } else {
    //         name = item.affectedLayer().name();
    //         groupId = item.symbolInstance().objectID();
    //     }

    //     var text = `${i} - ${name} - ${groupId}`;
    //     DataSupplier.supplyDataAtIndex(context.data.key, text, i);
    // });
};

var onSupplyCarNumbers = function(context) {
    for (var i = 0; i < context.data.requestedCount; i++) {
        var province = utli.randomOne(DATA_CHINA_PROVINCES);
        var text = province["abbr"] + utli.randomOne(province["license_place_number"]) + " ";
        text += utli.randomStringUseChars_length("ABCDEFGHJKLMNPQRSTUVWXYZ0123456789", utli.randomIntFromRange(5, 6));
        DataSupplier.supplyDataAtIndex(context.data.key, text, i);
    }
};

var onSupplyIdCardNumbers = function(context) {
    var provinceCodes = Object.keys(DATA_CHINA_AREA["86"]);
    for (var i = 0; i < context.data.requestedCount; i++) {
        var provinceCode = utli.randomOne(provinceCodes);
        var cityCode = utli.randomOne(Object.keys(DATA_CHINA_AREA[provinceCode]));
        var date = new Date();
        var randomDate = new Date(date.valueOf() - 86400000 * utli.randomIntFromRange(365 * 16, 365 * 100));
        var year = randomDate.getFullYear();
        var month = randomDate.getMonth() + 1 > 9 ? randomDate.getMonth() + 1 : "0" + (randomDate.getMonth() + 1);
        var day = randomDate.getDate() > 9 ? randomDate.getDate() : "0" + randomDate.getDate();
        var suffix = utli.randomStringUseChars_length("0123456789", 4);
        var text = cityCode + " " + year + month + day + " " + suffix;
        DataSupplier.supplyDataAtIndex(context.data.key, text, i);
    }
};

var onSupplyTextFromFile = function(context) {
    var texts = textsFromFile();
    if (texts.length > 0) {
        supplyOrderedData(context, texts);
    }
};

var onSupplyImageFromFolder = function(context) {
    var images = imagesFromFolder();
    if (images.length > 0) {
        supplyOrderedData(context, images);
    }
};

var onSupplyRandomTextFromFile = function(context) {
    var texts = textsFromFile();
    if (texts.length > 0) {
        supplyRandomData(context, texts);
    }
};

var onSupplyRandomImageFromFolder = function(context) {
    var images = imagesFromFolder();
    if (images.length > 0) {
        supplyRandomData(context, images);
    }
};

function textsFromFile() {
    var textFile = sys.chooseFile();
    if (textFile == nil) {
        return [];
    } else {
        return sys.textsFromFile(textFile);
    }
}

function imagesFromFolder() {
    var imageFolder = sys.chooseFolder();
    if (imageFolder == nil) {
        return [];
    } else {
        return sys.imagesFromFolder(imageFolder);
    }
}

function supplyOrderedData(context, data) {
    for (var i = 0; i < context.data.requestedCount; i++) {
        var dataIndex;
        if (context.data.isSymbolInstanceOverride == 1) {
            var selection = NSDocumentController.sharedDocumentController().currentDocument().selectedLayers().layers();
            dataIndex = selection.indexOfObject(context.data.items.objectAtIndex(i).symbolInstance())
        } else {
            dataIndex = i;
        }
        DataSupplier.supplyDataAtIndex(context.data.key, data[dataIndex % data.length], i);
    }
}

function supplyRandomData(context, data) {
    for (var i = 0; i < context.data.requestedCount; i++) {
        DataSupplier.supplyDataAtIndex(context.data.key, utli.randomOne(data), i);
    }
}