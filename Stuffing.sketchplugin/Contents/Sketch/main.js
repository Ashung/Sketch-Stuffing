@import "utli.js";
@import "data.js";

var DataSupplier = require("sketch/data-supplier");

var onStartup = function() {

    DataSupplier.registerDataSupplier("public.text", "日历 - 农历月", "SupplyMonths");
    DataSupplier.registerDataSupplier("public.text", "日历 - 农历日", "SupplyDays");
    DataSupplier.registerDataSupplier("public.text", "日历 - 星期", "SupplyWeekdays");

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
    var dialog = ui.dialog("农历月");
    var label = ui.label("起始");
    dialog.addAccessoryView(label);
    var stepper = ui.stepper(1, 12, 1);
    dialog.addAccessoryView(stepper);
    var responseCode = dialog.runModal();
    if (responseCode == 1000) {
        var start = stepper.subviews().lastObject().integerValue();
        supplyOrderedData(context, DATA_MONTHS, start - 1);
    }
};

var onSupplyWeekdays = function(context) {
    var dialog = ui.dialog("星期", "起始 0, 表示周日。");
    var label1 = ui.label("格式");
    dialog.addAccessoryView(label1);
    var popupButton = ui.popupButton(["星期日", "周日", "日"]);
    dialog.addAccessoryView(popupButton);

    var label2 = ui.label("起始");
    dialog.addAccessoryView(label2);
    var stepper = ui.stepper(0, 6, 0);
    dialog.addAccessoryView(stepper);

    var responseCode = dialog.runModal();
    if (responseCode == 1000) {
        var data = ["日","一","二","三","四","五","六"];
        if (popupButton.indexOfSelectedItem() == 0) {
            data = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        }
        if (popupButton.indexOfSelectedItem() == 1) {
            data = ["周日","周一","周二","周三","周四","周五","周六"];
        }
        var start = stepper.subviews().lastObject().integerValue();
        supplyOrderedData(context, data, start);
    }
};

var onSupplyDays = function(context) {
    var dialog = ui.dialog("农历日");
    var label = ui.label("起始");
    dialog.addAccessoryView(label);
    var stepper = ui.stepper(1, 30, 1);
    dialog.addAccessoryView(stepper);
    var responseCode = dialog.runModal();
    if (responseCode == 1000) {
        var start = stepper.subviews().lastObject().integerValue();
        supplyOrderedData(context, DATA_DAYS, start - 1);
    }
};

var onSupplyFullNames = function(context) {
    for (var i = 0; i < context.data.requestedCount; i++) {
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
    }
};

var onSupplyMaleFullNames = function(context) {
    for (var i = 0; i < context.data.requestedCount; i++) {
        var familyName = DATA_LASTNAMES[Math.floor(Math.pow(Math.random(), 2.5) * DATA_LASTNAMES.length)];
        var name = "";
        var charsMale = utli.stringRemoveChars(DATA_CHARACTERS[0], familyName);
        for (let j = 0; j < Math.floor(Math.random() * 2) + 1; j++) {
            name += charsMale[Math.floor(Math.random() * charsMale.length)];
        }
        DataSupplier.supplyDataAtIndex(context.data.key, familyName + name, i);
    }
};

var onSupplyFemaleFullNames = function(context) {
    for (var i = 0; i < context.data.requestedCount; i++) {
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

function supplyOrderedData(context, data, start) {
    if (!start) {
        start = 0;
    }
    for (var i = 0; i < context.data.requestedCount; i++) {
        var dataIndex;
        if (context.data.isSymbolInstanceOverride == 1) {
            var selection = NSDocumentController.sharedDocumentController().currentDocument().selectedLayers().layers();
            dataIndex = selection.indexOfObject(context.data.items.objectAtIndex(i).symbolInstance());
        } else {
            dataIndex = i;
        }
        DataSupplier.supplyDataAtIndex(context.data.key, data[(dataIndex + start) % data.length], i);
    }
}

function supplyRandomData(context, data) {
    for (var i = 0; i < context.data.requestedCount; i++) {
        DataSupplier.supplyDataAtIndex(context.data.key, utli.randomOne(data), i);
    }
}