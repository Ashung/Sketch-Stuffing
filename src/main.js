const sketch = require('sketch');
const { DataSupplier } = sketch;
const util = require('util');

// Custom modules
const ui = require('./lib/ui');
const du = require('./lib/data_util');
const sys = require('./lib/system');

// Data
const DATA_LASTNAMES = require('./data/chinese_lastname.json');
const DATA_CHARACTERS_MALE = require('./data/chinese_characters_male.json');
const DATA_CHARACTERS_FEMALE = require('./data/chinese_characters_female.json');
const DATA_CHINA_LINCENSE_PLACE_NUMBER = require('./data/china_lincense_place_number.json');
const DATA_CHINA_AREA = require('./data/china_area.json');
const DATA_CITY_SUFFIXES = require('./data/china_city_suffixes.json');
const DATA_CHINA_TELPHONE_CODE = require('./data/china_telephone_code.json');

export function onStartup () {
    DataSupplier.registerDataSupplier('public.text', '日历 - 农历月', 'SupplyMonths');
    DataSupplier.registerDataSupplier('public.text', '日历 - 农历日', 'SupplyDays');
    DataSupplier.registerDataSupplier('public.text', '日历 - 星期', 'SupplyWeekdays');
    DataSupplier.registerDataSupplier('public.text', '姓名', 'SupplyFullNames');
    DataSupplier.registerDataSupplier('public.text', '姓名 (男)', 'SupplyMaleFullNames');
    DataSupplier.registerDataSupplier('public.text', '姓名 (女)', 'SupplyFemaleFullNames');
    DataSupplier.registerDataSupplier('public.text', '地理 - 中国省份', 'SupplyProvinces');
    DataSupplier.registerDataSupplier('public.text', '地理 - 中国城市', 'SupplyCities');
    DataSupplier.registerDataSupplier('public.text', '地理 - 中国省市', 'SupplyProvinceAndCities');
    DataSupplier.registerDataSupplier('public.text', '号码 - 移动电话', 'SupplyMobileNumbers');
    DataSupplier.registerDataSupplier('public.text', '号码 - 固定电话', 'SupplyPhoneNumbers');
    DataSupplier.registerDataSupplier('public.text', '号码 - 车牌号', 'SupplyCarNumbers');
    DataSupplier.registerDataSupplier('public.text', '号码 - 身份证号', 'SupplyIdCardNumbers');
    DataSupplier.registerDataSupplier('public.text', '定制 - 从文件载入', 'SupplyTextFromFile');
    DataSupplier.registerDataSupplier('public.image', '定制 - 从文件夹载入', 'SupplyImageFromFolder');
    DataSupplier.registerDataSupplier('public.text', '定制 - 从文件随机载入', 'SupplyRandomTextFromFile');
    DataSupplier.registerDataSupplier('public.image', '定制 - 从文件夹随机载入', 'SupplyRandomImageFromFolder');
}

export function onShutdown () {
    DataSupplier.deregisterDataSuppliers();
};

// Calendar

export function onSupplyMonths (context) {
    const DATA_MONTHS = ['正月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','腊月'];
    let dialog = ui.dialog('农历月');
    let label = ui.label('起始');
    dialog.addAccessoryView(label);
    let stepper = ui.stepper(1, 12, 1);
    dialog.addAccessoryView(stepper);
    let responseCode = dialog.runModal();
    if (responseCode == 1000) {
        let start = stepper.subviews().lastObject().integerValue();
        supplyOrderedData(context, DATA_MONTHS, start - 1);
    }
};

export function onSupplyWeekdays (context) {
    let dialog = ui.dialog('星期', '起始 0, 表示周日。');
    let label1 = ui.label('格式');
    dialog.addAccessoryView(label1);
    let popupButton = ui.popupButton(['星期日', '周日', '日']);
    dialog.addAccessoryView(popupButton);

    let label2 = ui.label('起始');
    dialog.addAccessoryView(label2);
    let stepper = ui.stepper(0, 6, 0);
    dialog.addAccessoryView(stepper);

    let responseCode = dialog.runModal();
    if (responseCode == 1000) {
        let data = ['日','一','二','三','四','五','六'];
        if (popupButton.indexOfSelectedItem() == 0) {
            data = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
        }
        if (popupButton.indexOfSelectedItem() == 1) {
            data = ['周日','周一','周二','周三','周四','周五','周六'];
        }
        let start = stepper.subviews().lastObject().integerValue();
        supplyOrderedData(context, data, start);
    }
};

export function onSupplyDays (context) {
    const DATA_DAYS = [
        '初一','初二','初三','初四','初五','初六','初七','初八','初九','初十',
        '十一','十二','十三','十四','十五','十六','十七','十八','十九','廿十',
        '廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','卅十'
    ];
    let dialog = ui.dialog('农历日');
    let label = ui.label('起始');
    dialog.addAccessoryView(label);
    let stepper = ui.stepper(1, 30, 1);
    dialog.addAccessoryView(stepper);
    let responseCode = dialog.runModal();
    if (responseCode == 1000) {
        let start = stepper.subviews().lastObject().integerValue();
        supplyOrderedData(context, DATA_DAYS, start - 1);
    }
};

// Person name

export function onSupplyFullNames (context) {
    for (let i = 0; i < context.data.requestedCount; i++) {
        let familyName = DATA_LASTNAMES[Math.floor(Math.pow(Math.random(), 2.5) * DATA_LASTNAMES.length)];
        let name = '';
        let charsMale = du.stringRemoveChars(DATA_CHARACTERS_MALE, familyName);
        let charsFemale = du.stringRemoveChars(DATA_CHARACTERS_FEMALE, familyName);
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

export function onSupplyMaleFullNames (context) {
    for (let i = 0; i < context.data.requestedCount; i++) {
        let familyName = DATA_LASTNAMES[Math.floor(Math.pow(Math.random(), 2.5) * DATA_LASTNAMES.length)];
        let name = '';
        let charsMale = du.stringRemoveChars(DATA_CHARACTERS_MALE, familyName);
        for (let j = 0; j < Math.floor(Math.random() * 2) + 1; j++) {
            name += charsMale[Math.floor(Math.random() * charsMale.length)];
        }
        DataSupplier.supplyDataAtIndex(context.data.key, familyName + name, i);
    }
};

export function onSupplyFemaleFullNames (context) {
    for (let i = 0; i < context.data.requestedCount; i++) {
        let familyName = DATA_LASTNAMES[Math.floor(Math.pow(Math.random(), 2.5) * DATA_LASTNAMES.length)];
        let name = '';
        let charsFemale = du.stringRemoveChars(DATA_CHARACTERS_FEMALE, familyName);
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

// Location

export function onSupplyProvinces (context) {
    let provinces = DATA_CHINA_LINCENSE_PLACE_NUMBER.map(function(item) {
        return item.full;
    });
    for (let i = 0; i < context.data.requestedCount; i++) {
        DataSupplier.supplyDataAtIndex(context.data.key, du.randomOne(provinces), i);
    }
};

export function onSupplyCities (context) {
    let provinceCodes = Object.keys(DATA_CHINA_AREA['86']);
    for (let i = 0; i < context.data.requestedCount; i++) {
        let provinceCode = du.randomOne(provinceCodes);
        let city = du.randomOne(Object.values(DATA_CHINA_AREA[provinceCode]));
        if (city == '市辖区' || city == '县') {
            city = DATA_CHINA_AREA['86'][provinceCode];
        }
        DATA_CITY_SUFFIXES.forEach(function(suffix) {
            city = city.replace(new RegExp(suffix + '$'), '');
        });
        DataSupplier.supplyDataAtIndex(context.data.key, city, i);
    }
};

export function onSupplyProvinceAndCities (context) {
    let provinceAndCities = Object.values(DATA_CHINA_TELPHONE_CODE);
    for (let i = 0; i < context.data.requestedCount; i++) {
        DataSupplier.supplyDataAtIndex(context.data.key, du.randomOne(provinceAndCities), i);
    }
};

// Numbers

export function onSupplyMobileNumbers (context) {
    let prefixs = [
        139,138,137,136,135,134,159,158,157,150,151,152,147,188,187,182,183,184,178,
        130,131,132,156,155,186,185,145,176,
        133,153,189,180,181,177,173
    ];
    let numbers = '0123456789';
    for (let i = 0; i < context.data.requestedCount; i++) {
        let text = String(du.randomOne(prefixs)) + ' ';
        text += du.randomStringUseChars_length(numbers, 4) + ' ';
        text += du.randomStringUseChars_length(numbers, 4);
        DataSupplier.supplyDataAtIndex(context.data.key, text, i);
    }
};

export function onSupplyPhoneNumbers (context) {
    for (let i = 0; i < context.data.requestedCount; i++) {
        let text = '(';
        text += du.randomOne(Object.keys(DATA_CHINA_TELPHONE_CODE));
        text += ') ';
        text += du.randomStringUseChars_length('123456789', 1);
        text += du.randomStringUseChars_length('0123456789', du.randomIntFromRange(2, 3));
        text += ' ';
        text += du.randomStringUseChars_length('0123456789', 4);
        DataSupplier.supplyDataAtIndex(context.data.key, text, i);
    }
};

export function onSupplyCarNumbers (context) {
    for (let i = 0; i < context.data.requestedCount; i++) {
        let province = du.randomOne(DATA_CHINA_LINCENSE_PLACE_NUMBER);
        let text = province['abbr'] + du.randomOne(province['license_place_number']) + ' ';
        text += du.randomStringUseChars_length('ABCDEFGHJKLMNPQRSTUVWXYZ0123456789', du.randomIntFromRange(5, 6));
        DataSupplier.supplyDataAtIndex(context.data.key, text, i);
    }
};

export function onSupplyIdCardNumbers (context) {
    let provinceCodes = Object.keys(DATA_CHINA_AREA['86']);
    for (let i = 0; i < context.data.requestedCount; i++) {
        let provinceCode = du.randomOne(provinceCodes);
        let cityCode = du.randomOne(Object.keys(DATA_CHINA_AREA[provinceCode]));
        let date = new Date();
        let randomDate = new Date(date.valueOf() - 86400000 * du.randomIntFromRange(365 * 16, 365 * 100));
        let year = randomDate.getFullYear();
        let month = randomDate.getMonth() + 1 > 9 ? randomDate.getMonth() + 1 : '0' + (randomDate.getMonth() + 1);
        let day = randomDate.getDate() > 9 ? randomDate.getDate() : '0' + randomDate.getDate();
        let suffix = du.randomStringUseChars_length('0123456789', 4);
        let text = cityCode + ' ' + year + month + day + ' ' + suffix;
        DataSupplier.supplyDataAtIndex(context.data.key, text, i);
    }
};

// Custom data from text file or image folder

export function onSupplyTextFromFile (context) {
    let texts = sys.textsFromChooseFile();
    if (texts.length > 0) {
        supplyOrderedData(context, texts);
    }
};

export function onSupplyImageFromFolder (context) {
    let images = sys.imagesFromChooseFolder();
    if (images.length > 0) {
        supplyOrderedData(context, images);
    }
};

export function onSupplyRandomTextFromFile (context) {
    let texts = sys.textsFromChooseFile();
    if (texts.length > 0) {
        supplyRandomData(context, texts);
    }
};

export function onSupplyRandomImageFromFolder (context) {
    let images = sys.imagesFromChooseFolder();
    if (images.length > 0) {
        supplyRandomData(context, images);
    }
};

//

function supplyOrderedData(context, data, start) {
    if (!start) start = 0;
    for (let i = 0; i < context.data.requestedCount; i++) {
        let dataIndex;
        if (context.data.isSymbolInstanceOverride == 1) {
            let selection = NSDocumentController.sharedDocumentController().currentDocument().selectedLayers().layers();
            dataIndex = selection.indexOfObject(context.data.items.objectAtIndex(i).symbolInstance());
        } else {
            dataIndex = i;
        }
        DataSupplier.supplyDataAtIndex(context.data.key, data[(dataIndex + start) % data.length], i);
    }
}

function supplyRandomData(context, data) {
    for (let i = 0; i < context.data.requestedCount; i++) {
        DataSupplier.supplyDataAtIndex(context.data.key, data[Math.floor(Math.random() * data.length)], i);
    }
}
