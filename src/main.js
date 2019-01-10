const DataSupplier = require("sketch/data-supplier");
const Settings = require('sketch/settings');

// Custom modules
const ui = require('./lib/ui');
const du = require('./lib/data_util');
const sys = require('./lib/system');
const date = require('./lib/date');

// Data
const DATA_CHINESE_LUNAR_DAYS = require('./data/chinese_lunar_days.json');
const DATA_SURNAMES = require('./data/surnames.json');
const DATA_FIRST_NAMES_MALE = require('./data/first_name_male.json');
const DATA_FIRST_NAMES_FEMALE = require('./data/first_name_female.json');
const DATA_CHINESE_SURNAMES = require('./data/chinese_surnames.json');
const DATA_CHARACTERS_MALE = require('./data/chinese_characters_male.json');
const DATA_CHARACTERS_FEMALE = require('./data/chinese_characters_female.json');
const DATA_CHINA_LICENSE_PLACE_NUMBER = require('./data/china_license_place_number.json');
const DATA_CHINA_AREA = require('./data/china_area.json');
const DATA_CITY_SUFFIXES = require('./data/china_city_suffixes.json');
const DATA_CHINA_TELEPHONE_CODE = require('./data/china_telephone_code.json');
const DATA_EMAILS = require('./data/free_emails.json');
const DATA_ID_NUMBER_FORMATS = require('./data/id_number_format.json');

export function onStartup () {
    DataSupplier.registerDataSupplier('public.text', '日历 - 阳历', 'SupplyCalendar');
    DataSupplier.registerDataSupplier('public.text', '日历 - 农历', 'SupplyChineseCalendar');
    DataSupplier.registerDataSupplier('public.text', '时间 - 随机友好格式', 'SupplyFriendlyDate');
    DataSupplier.registerDataSupplier('public.text', '时间 - 随机自定义格式', 'SupplyFormatedDate');
    DataSupplier.registerDataSupplier('public.text', '姓名 - 中文名', 'SupplyFullNames');
    DataSupplier.registerDataSupplier('public.text', '姓名 - 中文名男', 'SupplyMaleFullNames');
    DataSupplier.registerDataSupplier('public.text', '姓名 - 中文名女', 'SupplyFemaleFullNames');
    DataSupplier.registerDataSupplier('public.text', '姓名 - 英文名', 'SupplyEnglishNames');
    DataSupplier.registerDataSupplier('public.text', '姓名 - 英文全名', 'SupplyEnglishFullNames');
    DataSupplier.registerDataSupplier('public.text', '姓名 - 英文名男', 'SupplyEnglishMaleNames');
    DataSupplier.registerDataSupplier('public.text', '姓名 - 英文名女', 'SupplyEnglishFemaleNames');
    DataSupplier.registerDataSupplier('public.text', '邮箱', 'SupplyEmails');
    DataSupplier.registerDataSupplier('public.text', '地理 - 中国省份', 'SupplyProvinces');
    DataSupplier.registerDataSupplier('public.text', '地理 - 中国城市', 'SupplyCities');
    DataSupplier.registerDataSupplier('public.text', '地理 - 中国省市', 'SupplyProvinceAndCities');
    DataSupplier.registerDataSupplier('public.text', '号码 - 移动电话', 'SupplyMobileNumbers');
    DataSupplier.registerDataSupplier('public.text', '号码 - 固定电话', 'SupplyPhoneNumbers');
    DataSupplier.registerDataSupplier('public.text', '号码 - 车牌号', 'SupplyCarNumbers');
    DataSupplier.registerDataSupplier('public.text', '号码 - 身份证号', 'SupplyIdCardNumbers');
    DataSupplier.registerDataSupplier('public.text', '号码 - 自定义编号', 'SupplyCustomNumbers');
    DataSupplier.registerDataSupplier('public.text', '号码 - 自定义序列数值', 'SupplySequenceNumbers')
    DataSupplier.registerDataSupplier('public.text', '号码 - 连续数值', 'SupplyNumericalSeries');
    DataSupplier.registerDataSupplier('public.text', '定制 - 自定义表达式', 'SupplyExpression');
    DataSupplier.registerDataSupplier('public.text', '定制 - 从文件载入', 'SupplyTextFromFile');
    DataSupplier.registerDataSupplier('public.image', '定制 - 从文件夹载入', 'SupplyImageFromFolder');
    DataSupplier.registerDataSupplier('public.text', '定制 - 从文件随机载入', 'SupplyRandomTextFromFile');
    DataSupplier.registerDataSupplier('public.image', '定制 - 从文件夹随机载入', 'SupplyRandomImageFromFolder');
    DataSupplier.registerDataSupplier('public.image', '定制 - 从选择图片载入', 'SupplyImageFromFile');
    DataSupplier.registerDataSupplier('public.image', '定制 - 从选择图片随机载入', 'SupplyRandomImageFromFile');
}

export function onShutdown () {
    DataSupplier.deregisterDataSuppliers();
};

// Person name

export function onSupplyFullNames (context) {
    for (let i = 0; i < context.data.requestedCount; i++) {
        let familyName = du.randomOne(DATA_CHINESE_SURNAMES, Math.pow(Math.random(), 2.5));
        let name = '';
        let charsMale = du.stringRemoveChars(DATA_CHARACTERS_MALE.join(""), familyName);
        let charsFemale = du.stringRemoveChars(DATA_CHARACTERS_FEMALE.join(""), familyName);
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
        let familyName = du.randomOne(DATA_CHINESE_SURNAMES, Math.pow(Math.random(), 2.5));
        let name = '';
        let charsMale = du.stringRemoveChars(DATA_CHARACTERS_MALE.join(""), familyName);
        for (let j = 0; j < Math.floor(Math.random() * 2) + 1; j++) {
            name += charsMale[Math.floor(Math.random() * charsMale.length)];
        }
        DataSupplier.supplyDataAtIndex(context.data.key, familyName + name, i);
    }
};

export function onSupplyFemaleFullNames (context) {
    for (let i = 0; i < context.data.requestedCount; i++) {
        let familyName = du.randomOne(DATA_CHINESE_SURNAMES, Math.pow(Math.random(), 2.5));
        let name = '';
        let charsFemale = du.stringRemoveChars(DATA_CHARACTERS_FEMALE.join(""), familyName);
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

export function onSupplyEnglishFullNames (context) {
    for (let i = 0; i < context.data.requestedCount; i++) {
        let fullName = '';
        let surname = du.randomOne(DATA_SURNAMES, Math.pow(Math.random(), 2.5));
        if (Math.random() < 0.5) {
            fullName = du.randomOne(DATA_FIRST_NAMES_MALE) + ' ' + surname;
        }
        else {
            fullName = du.randomOne(DATA_FIRST_NAMES_FEMALE) + ' ' + surname;
        }
        DataSupplier.supplyDataAtIndex(context.data.key, fullName, i);
    }
};

export function onSupplyEnglishNames (context) {
    for (let i = 0; i < context.data.requestedCount; i++) {
        let name = '';
        if (Math.random() < 0.5) {
            name = du.randomOne(DATA_FIRST_NAMES_MALE);
        }
        else {
            name = du.randomOne(DATA_FIRST_NAMES_FEMALE);
        }
        DataSupplier.supplyDataAtIndex(context.data.key, name, i);
    }
};

export function onSupplyEnglishMaleNames (context) {
    for (let i = 0; i < context.data.requestedCount; i++) {
        let name = du.randomOne(DATA_FIRST_NAMES_MALE);
        DataSupplier.supplyDataAtIndex(context.data.key, name, i);
    }
};

export function onSupplyEnglishFemaleNames (context) {
    for (let i = 0; i < context.data.requestedCount; i++) {
        let name = du.randomOne(DATA_FIRST_NAMES_FEMALE);
        DataSupplier.supplyDataAtIndex(context.data.key, name, i);
    }
};

export function onSupplyEmails (context) {
    for (let i = 0; i < context.data.requestedCount; i++) {
        let name = '';
        let email = du.randomOne(DATA_EMAILS, Math.pow(Math.random(), 2.5));
        let surname = du.randomOne(DATA_SURNAMES);
        if (Math.random() < 0.5) {
            name = du.randomOne(DATA_FIRST_NAMES_MALE);
        }
        else {
            name = du.randomOne(DATA_FIRST_NAMES_FEMALE);
        }
        if (Math.random() < 0.5) {
            name += '_' + surname;
        }
        name += '@' + email;
        name = name.replace('\'', "").toLowerCase();
        DataSupplier.supplyDataAtIndex(context.data.key, name, i);
    }
};

// Location

export function onSupplyProvinces (context) {
    let provinces = DATA_CHINA_LICENSE_PLACE_NUMBER.map(function(item) {
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
        if (city === '市辖区' || city === '县') {
            city = DATA_CHINA_AREA['86'][provinceCode];
        }
        DATA_CITY_SUFFIXES.forEach(function(suffix) {
            city = city.replace(new RegExp(suffix + '$'), '');
        });
        DataSupplier.supplyDataAtIndex(context.data.key, city, i);
    }
};

export function onSupplyProvinceAndCities (context) {
    let provinceAndCities = Object.values(DATA_CHINA_TELEPHONE_CODE);
    for (let i = 0; i < context.data.requestedCount; i++) {
        DataSupplier.supplyDataAtIndex(context.data.key, du.randomOne(provinceAndCities), i);
    }
};

// Numbers

export function onSupplyMobileNumbers (context) {
    let prefixes = [
        139,138,137,136,135,134,159,158,157,150,151,152,147,188,187,182,183,184,178,
        130,131,132,156,155,186,185,145,176,
        133,153,189,180,181,177,173
    ];
    let numbers = '0123456789';
    for (let i = 0; i < context.data.requestedCount; i++) {
        let text = String(du.randomOne(prefixes)) + ' ';
        text += du.randomStringUseChars_length(numbers, 4) + ' ';
        text += du.randomStringUseChars_length(numbers, 4);
        DataSupplier.supplyDataAtIndex(context.data.key, text, i);
    }
};

export function onSupplyPhoneNumbers (context) {
    for (let i = 0; i < context.data.requestedCount; i++) {
        let text = '(';
        text += du.randomOne(Object.keys(DATA_CHINA_TELEPHONE_CODE));
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
        let province = du.randomOne(DATA_CHINA_LICENSE_PLACE_NUMBER);
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

export function onSupplyCustomNumbers (context) {
    let dialog = ui.dialog('自定义编号', '使用 "可用字符" 中的字符随机替换 "格式" 中的 "替换字符"。');

    let label0 = ui.label('常见格式');
    dialog.addAccessoryView(label0);
    let formatTitles = DATA_ID_NUMBER_FORMATS.map(item => {
        return item.title;
    });
    formatTitles = ['自定义'].concat(formatTitles);
    let commonFormats = ui.popupButton(formatTitles);
    let defaultFormatIndex = Settings.settingForKey('custom_number_preset_index') || 0;
    commonFormats.selectItemAtIndex(defaultFormatIndex);
    dialog.addAccessoryView(commonFormats);

    let customNumberChars = Settings.settingForKey('custom_number_chars') || DATA_ID_NUMBER_FORMATS[0]['chars'];
    let customNumberTemplate = Settings.settingForKey('custom_number_template') || DATA_ID_NUMBER_FORMATS[0]['template'];
    let customNumberFormat = Settings.settingForKey('custom_number_format') || DATA_ID_NUMBER_FORMATS[0]['format'];
    let defaultUseChars, defaultTemplate, defaultFormat;
    if (commonFormats.indexOfSelectedItem() === 0) {
        defaultUseChars = customNumberChars;
        defaultTemplate = customNumberTemplate;
        defaultFormat = customNumberFormat;
    } else {
        defaultUseChars = DATA_ID_NUMBER_FORMATS[commonFormats.indexOfSelectedItem() - 1]['chars'];
        defaultTemplate = DATA_ID_NUMBER_FORMATS[commonFormats.indexOfSelectedItem() - 1]['template'];
        defaultFormat = DATA_ID_NUMBER_FORMATS[commonFormats.indexOfSelectedItem() - 1]['format'];
    }

    commonFormats.setCOSJSTargetFunction(sender => {
        if (sender.indexOfSelectedItem() === 0) {
            inputUseChars.setStringValue(customNumberChars);
            inputTemplate.setStringValue(customNumberTemplate);
            inputFormat.setStringValue(customNumberFormat);
        } else {
            let index = sender.indexOfSelectedItem() - 1;
            inputUseChars.setStringValue(DATA_ID_NUMBER_FORMATS[index]['chars']);
            inputTemplate.setStringValue(DATA_ID_NUMBER_FORMATS[index]['template']);
            inputFormat.setStringValue(DATA_ID_NUMBER_FORMATS[index]['format']);
        }
    });

    let label1 = ui.label('可用字符');
    dialog.addAccessoryView(label1);
    let inputUseChars = ui.input(defaultUseChars);
    dialog.addAccessoryView(inputUseChars);

    let label2 = ui.label('格式');
    dialog.addAccessoryView(label2);
    let inputFormat= ui.input(defaultFormat);
    dialog.addAccessoryView(inputFormat);

    let label3 = ui.label('替换字符');
    dialog.addAccessoryView(label3);
    let inputTemplate = ui.input(defaultTemplate);
    dialog.addAccessoryView(inputTemplate);

    let responseCode = dialog.runModal();
    if (responseCode === 1000) {
        let doSetDefaultCustomNumber = false;
        Settings.setSettingForKey('custom_number_preset_index', commonFormats.indexOfSelectedItem());
        if (commonFormats.indexOfSelectedItem() === 0) {
            doSetDefaultCustomNumber = true;
        } else {
            let dataIndex = commonFormats.indexOfSelectedItem() - 1;
            if (
                String(inputUseChars.stringValue()) !== DATA_ID_NUMBER_FORMATS[dataIndex]['chars'] ||
                String(inputTemplate.stringValue()) !== DATA_ID_NUMBER_FORMATS[dataIndex]['template'] ||
                String(inputFormat.stringValue()) !== DATA_ID_NUMBER_FORMATS[dataIndex]['format']
            ) {
                Settings.setSettingForKey('custom_number_preset_index', 0);
                doSetDefaultCustomNumber = true;
            }
        }
        if (doSetDefaultCustomNumber) {
            Settings.setSettingForKey('custom_number_chars', inputUseChars.stringValue());
            Settings.setSettingForKey('custom_number_template', inputTemplate.stringValue());
            Settings.setSettingForKey('custom_number_format', inputFormat.stringValue());
        }

        for (let i = 0; i < context.data.requestedCount; i++) {
            let inputTemplateRegExp = new RegExp(inputTemplate.stringValue(), 'g');
            let text = inputFormat.stringValue().replace(inputTemplateRegExp, () => {
                return du.randomStringUseChars_length(String(inputUseChars.stringValue()), 1);
            });
            DataSupplier.supplyDataAtIndex(context.data.key, text, i);
        }
    }
};

export function onSupplySequenceNumbers (context) {
    let dialog = ui.dialog('自定义序列数值');

    let defaultStart = Settings.settingForKey('sequence_number_start') || 1;
    let defaultType = Settings.settingForKey('sequence_number_type') || 0;
    let defaultIncrease = Settings.settingForKey('sequence_number_increase') || 1;
    let defaultLength = Settings.settingForKey('sequence_number_length') || 1;
    let defaultPrefix = Settings.settingForKey('sequence_number_prefix') || '';
    let defaultSuffix = Settings.settingForKey('sequence_number_suffix') || '';

    let label0 = ui.label('起始数字 (只允许整数)');
    dialog.addAccessoryView(label0);
    let inputStart = ui.numberInput(defaultStart);
    dialog.addAccessoryView(inputStart);

    let label1 = ui.label('数值增减方式');
    dialog.addAccessoryView(label1);
    let inputType = ui.popupButton([
        '固定增减',
        '随机增减 (增加 1 至 “递增值” 之间数值)',
        '随机自然增减 (增减 1 至 “递增值” 之间数值)',
        '随机起伏 (所有数值在 “起始” ± “递增值” 之间)'
    ]);
    inputType.selectItemAtIndex(defaultType);
    dialog.addAccessoryView(inputType);

    let label2 = ui.label('递增值 (只允许整数，例如 1 或 -1)');
    dialog.addAccessoryView(label2);
    let inputIncrease = ui.numberInput(defaultIncrease);
    dialog.addAccessoryView(inputIncrease);

    let label22 = ui.label('数值长度 (不足长度将在数值前补 0)');
    dialog.addAccessoryView(label22);
    let inputLength = ui.stepper(1, 100, parseInt(defaultLength));
    let inputLengthView = ui.stepperWithTextField(inputLength);
    dialog.addAccessoryView(inputLengthView);

    let label3 = ui.label('前缀');
    dialog.addAccessoryView(label3);
    let inputPrefix = ui.input(defaultPrefix);
    dialog.addAccessoryView(inputPrefix);

    let label4 = ui.label('后缀');
    dialog.addAccessoryView(label4);
    let inputSuffix = ui.input(defaultSuffix);
    dialog.addAccessoryView(inputSuffix);

    let responseCode = dialog.runModal();
    if (responseCode === 1000) {
        let data = [];
        let start = parseInt(inputStart.stringValue());
        let increase = parseInt(inputIncrease.stringValue());
        let length = inputLength.integerValue();
        let increaseType = inputType.indexOfSelectedItem();
        let prefix = inputPrefix.stringValue();
        let suffix = inputSuffix.stringValue();
        for (let i = 0; i < context.data.requestedCount; i++) {
            if (increaseType === 0) {
                data.push(start);
                start = start + increase;
            }
            else if (increaseType === 1) {
                data.push(start);
                start = start + du.randomIntFromRange(1, increase);
            }
            else if (increaseType === 2) {
                data.push(start);
                start = start + du.randomIntFromRange(1, increase) * du.randomOne([1, -1], Math.pow(Math.random(), 2.5));
            }
            else if (increaseType === 3) {
                let item = (i === 0) ? start : du.randomIntFromRange(start - increase, start + increase);
                data.push(item);
            }
        }
        data = data.map(item => {
            item = du.supplyCharToFitLength(String(item), '0', length);
            return prefix + item + suffix;
        });
        supplyOrderedData(context, data);

        Settings.setSettingForKey('sequence_number_start', parseInt(inputStart.stringValue()));
        Settings.setSettingForKey('sequence_number_type', increaseType);
        Settings.setSettingForKey('sequence_number_increase', increase);
        Settings.setSettingForKey('sequence_number_length', length);
        Settings.setSettingForKey('sequence_number_prefix', prefix);
        Settings.setSettingForKey('sequence_number_suffix', suffix);
    }
};

export function onSupplyExpression (context) {
    let dialog = ui.dialog('自定义表达式', '通过 Javascript 表达式生成字符串，结果必须为数值或字符串。\n\n可用变量: 数组 "data" 保存前几次遍历时表达式返回的所有字符串结果；整型 "i" 为当前图层索引；整型 "length" 为选中图层数；"temp" 为未定义全局变量; "layer" 为当前图层; "text" 为当前原始文本内容。');

    let defaultExpression = Settings.settingForKey('expression_string') || 'length + "-" + (i + 1)';
    let inputExpression = ui.input(defaultExpression);
    inputExpression.setFrame(NSMakeRect(0, 0, 300, 60));
    dialog.addAccessoryView(inputExpression);

    let responseCode = dialog.runModal();
    if (responseCode === 1000) {
        let data = [];
        let temp;
        let length = context.data.requestedCount;
        for (let i = 0; i < length; i++) {
            let layer;
            let text;
            if (context.data.isSymbolInstanceOverride == true) {
                layer = context.data.items.objectAtIndex(i).symbolInstance();
                layer.overrideValues().forEach(value => {
                    if (context.data.items.objectAtIndex(i).availableOverride().overridePoint().name().isEqualToString(value.overrideName())) {
                        text = value.value();
                    }
                });
            }
            else {
                layer = context.data.items.objectAtIndex(i);
                text = layer.stringValue();
            }
            let expressionString = String(inputExpression.stringValue());
            let item;
            try {
                item = eval(expressionString);
            } catch (err) {
                item = err.message;
            }
            data.push(String(item));
        }
        supplyOrderedData(context, data);
        Settings.setSettingForKey('expression_string', inputExpression.stringValue());
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

export function onSupplyImageFromFile (context) {
    let images = sys.imagesFromChooseFile();
    if (images.length > 0) {
        supplyOrderedData(context, images);
    }
};

export function onSupplyRandomImageFromFile (context) {
    let images = sys.imagesFromChooseFile();
    if (images.length > 0) {
        supplyRandomData(context, images);
    }
};

// Date time

export function onSupplyFriendlyDate (context) {
    let formatTitles = [
        'n分钟前 - n小时前 - n天前 - YYYY/M/d h:mm',
        'n分钟前 - n小时前 - n天前 - n月前 - n年前',
        'h:mm - 昨天 - 星期n - YYYY/M/d',
        '今天 hh:mm - 星期n hh:mm - M月d日 hh:mm'
    ];
    let weekdays = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];

    let dialog = ui.dialog('随机时间 -- 友好时间格式', '从起始时间至结束时间按顺序随机提取一个时间点，并计算此时间与起始的间隔。');

    let label1 = ui.label('时间格式');
    dialog.addAccessoryView(label1);
    let commonFormats = ui.popupButton(formatTitles);
    let defaultFormatIndex = Settings.settingForKey('friendly_date_format_index') || 0;
    commonFormats.selectItemAtIndex(defaultFormatIndex);
    dialog.addAccessoryView(commonFormats);

    let label2 = ui.label('时间起始 (当前时间)');
    dialog.addAccessoryView(label2);
    let startDate = ui.datePicker();
    dialog.addAccessoryView(startDate);

    let label3 = ui.label('时间结束');
    dialog.addAccessoryView(label3);
    let endDate = ui.datePicker();
    let defaultEndTimestamp = Settings.settingForKey('friendly_date_end');
    if (defaultEndTimestamp) {
        let defaultEndDate = date.timestampToNsDate(defaultEndTimestamp);
        endDate.setDateValue(defaultEndDate);
    }
    let endDateView = ui.datePickerWithResetButton(endDate);
    dialog.addAccessoryView(endDateView);

    let responseCode = dialog.runModal();
    if (responseCode === 1000) {
        let startTimestamp = date.nsDateToTimestamp(startDate.dateValue());
        let endTimestamp = date.nsDateToTimestamp(endDate.dateValue());
        let length = context.data.requestedCount;
        let dates = du.sortedIntArrayFromRange(startTimestamp, endTimestamp, length);
        dates = dates.map(item => {
            if (commonFormats.indexOfSelectedItem() === 0) {
                return friendlyDateFormat1(item, startTimestamp);
            }
            else if (commonFormats.indexOfSelectedItem() === 1) {
                return friendlyDateFormat2(item, startTimestamp);
            }
            else if (commonFormats.indexOfSelectedItem() === 2) {
                return friendlyDateFormat3(item, startTimestamp);
            }
            else if (commonFormats.indexOfSelectedItem() === 3) {
                return friendlyDateFormat4(item, startTimestamp);
            }
            else {
                return date.timestampToLocaleString(item);
            }
        });
        supplyOrderedData(context, dates);
        Settings.setSettingForKey('friendly_date_format_index', commonFormats.indexOfSelectedItem());
        Settings.setSettingForKey('friendly_date_end', endTimestamp);
    }

    function friendlyDateFormat1(timestamp, base) {
        let interval = base - timestamp;
        let suffix = '前';
        if (interval < 0) {
            suffix = '后';
            interval *= -1;
        }
        if (interval < 60) {
            return interval + ' 秒' + suffix;
        }
        else if (interval < 60 * 60) {
            return Math.floor(interval / 60) + ' 分钟' + suffix;
        }
        else if (interval < 24 * 60 * 60) {
            return Math.floor(interval / (60 * 60)) + ' 小时' + suffix;
        }
        else if (interval < 7 * 24 * 60 * 60) {
            return Math.floor(interval / (24 * 60 * 60)) + ' 天' + suffix;
        }
        else {
            let randomDate = new Date(timestamp * 1000);
            let hour = randomDate.getHours();
            let minute = (randomDate.getMinutes() > 9 ? '' : '0') + randomDate.getMinutes();
            return randomDate.toLocaleDateString() + ' ' + hour + ':' + minute;
        }
    }
    function friendlyDateFormat2(timestamp, base) {
        let interval = base - timestamp;
        let suffix = '前';
        if (interval < 0) {
            suffix = '后';
            interval *= -1;
        }
        if (interval < 60) {
            return interval + ' 秒' + suffix;
        }
        else if (interval < 60 * 60) {
            return Math.floor(interval / 60) + ' 分钟' + suffix;
        }
        else if (interval < 24 * 60 * 60) {
            return Math.floor(interval / (60 * 60)) + ' 小时' + suffix;
        }
        else if (interval < 30 * 24 * 60 * 60) {
            return Math.floor(interval / (24 * 60 * 60)) + ' 天' + suffix;
        }
        else if (interval < 12 * 30 * 24 * 60 * 60) {
            return Math.floor(interval / (30 * 24 * 60 * 60)) + ' 月' + suffix;
        }
        else {
            return Math.floor(interval / (12 * 30 * 24 * 60 * 60)) + ' 年' + suffix;
        }
    }
    function friendlyDateFormat3(timestamp, base) {
        let now = date.timestampToDate(base);
        let interval = base - timestamp;
        let randomDate = date.timestampToDate(timestamp);
        let dateDay = randomDate.getDate();
        let weekday = randomDate.getDay()
        let hour = randomDate.getHours();
        let minute = (randomDate.getMinutes() > 9 ? '' : '0') + randomDate.getMinutes();
        if (interval > 0) {
            if (dateDay === now.getDate() && interval < 86400) {
                return `${hour}:${minute}`;
            }
            else if (dateDay === now.getDate() - 1 && interval < 86400 * 2) {
                return '昨天';
            }
            else if (interval < 86400 * 7) {
                return weekdays[weekday];
            }
            else {
                return randomDate.toLocaleDateString();
            }
        }
        else {
            if (dateDay === now.getDate() && interval > -86400) {
                return `${hour}:${minute}`;
            }
            else if (dateDay === now.getDate() + 1 && interval > -86400 * 2) {
                return '明天';
            }
            else if (dateDay === now.getDate() + 2 && interval > -86400 * 3) {
                return '后天';
            }
            else if (interval > -86400 * 7) {
                return weekdays[weekday];
            }
            else {
                return randomDate.toLocaleString();
            }
        }
    }
    function friendlyDateFormat4(timestamp, base) {
        let now = date.timestampToDate(base);
        let interval = base - timestamp;
        let randomDate = date.timestampToDate(timestamp);
        let month = randomDate.getMonth();
        let dateDay = randomDate.getDate();
        let weekday = randomDate.getDay()
        let hour = randomDate.getHours();
        let minute = (randomDate.getMinutes() > 9 ? '' : '0') + randomDate.getMinutes();
        if (interval > 0) {
            if (dateDay === now.getDate() && interval < 86400) {
                return `今天 ${hour}:${minute}`;
            }
            else if (interval < 86400 * 7) {
                return `${weekdays[weekday]} ${hour}:${minute}`;
            }
            else {
                return `${month}月${dateDay}日 ${hour}:${minute}`;
            }
        }
        else {
            if (dateDay === now.getDate() && interval > -86400) {
                return `今天 ${hour}:${minute}`;
            }
            else if (interval > -86400 * 7) {
                return `${month}月${dateDay}日 ${hour}:${minute}`;
            }
            else {
                return `${month}月${dateDay}日 ${hour}:${minute}`;
            }
        }
    }
};

export function onSupplyFormatedDate (context) {
    let supportedLanguages = {
        "zh_Hans": "中文简体",
        "zh_Hant_HK": "繁體, 香港澳门地区",
        "zh_Hant_TW": "中文繁體, 台湾地区",
        "en_US": "英文"
    };

    let dialog = ui.dialog('随机时间 -- 自定义格式', '从起始时间至结束时间按顺序随机提取一个时间点，并按照用户输入模式格式化时间。\n\n时间格式化规范请参考 http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns。');

    let label1 = ui.label('语言');
    dialog.addAccessoryView(label1);
    let dateLanguage = ui.popupButton(Object.values(supportedLanguages));
    let defaultDateLanguageIndex = Settings.settingForKey('formated_date_language_index') || 0;
    dateLanguage.selectItemAtIndex(defaultDateLanguageIndex);
    dialog.addAccessoryView(dateLanguage);

    let label2 = ui.label('时间格式化');
    dialog.addAccessoryView(label2);
    let defaultDateFormat = Settings.settingForKey('formated_date_format') || 'eeee yyyy-MM-dd HH:mm:ss';
    let dateFormat = ui.input(defaultDateFormat);
    dialog.addAccessoryView(dateFormat);

    let label3 = ui.label('时间起始');
    dialog.addAccessoryView(label3);
    let startDate = ui.datePicker();
    let defaultStartTimestamp = Settings.settingForKey('formated_date_start');
    if (defaultStartTimestamp) {
        let defaultStartDate = date.timestampToNsDate(defaultStartTimestamp);
        startDate.setDateValue(defaultStartDate);
    }
    let startDateView = ui.datePickerWithResetButton(startDate);
    dialog.addAccessoryView(startDateView);

    let label4 = ui.label('时间结束');
    dialog.addAccessoryView(label4);
    let endDate = ui.datePicker();
    let defaultEndTimestamp = Settings.settingForKey('formated_date_end');
    if (defaultEndTimestamp) {
        let defaultEndDate = date.timestampToNsDate(defaultEndTimestamp);
        endDate.setDateValue(defaultEndDate);
    }
    let endDateView = ui.datePickerWithResetButton(endDate);
    dialog.addAccessoryView(endDateView);

    let responseCode = dialog.runModal();
    if (responseCode === 1000) {
        let startTimestamp = date.nsDateToTimestamp(startDate.dateValue());
        let endTimestamp = date.nsDateToTimestamp(endDate.dateValue());
        let length = context.data.requestedCount;
        let dates = du.sortedIntArrayFromRange(startTimestamp, endTimestamp, length);
        dates = dates.map(item => {
            let randomDate = date.timestampToNsDate(item);
            let formatter = NSDateFormatter.alloc().init();
            let localeIdentifier = Object.keys(supportedLanguages)[dateLanguage.indexOfSelectedItem()];
            let locale = NSLocale.alloc().initWithLocaleIdentifier(localeIdentifier);
            formatter.setLocale(locale);
            formatter.setDateFormat(dateFormat.stringValue());
            let randomDateFormatedString = formatter.stringFromDate(randomDate);
            return String(randomDateFormatedString);
        });
        supplyOrderedData(context, dates);
        Settings.setSettingForKey('formated_date_language_index', dateLanguage.indexOfSelectedItem());
        Settings.setSettingForKey('formated_date_format', dateFormat.stringValue());
        Settings.setSettingForKey('formated_date_start', startTimestamp);
        Settings.setSettingForKey('formated_date_end', endTimestamp);
    }
};

// Calendar

export function onSupplyCalendar (context) {
    let supportedLanguages = {
        'zh_Hans': '中文简体',
        'zh_Hant': '中文繁體',
        'en_US': '英语'
    };

    let dialog = ui.dialog('阳历', '按照起始日期生成连续日期。\n\n时间格式化规范请参考 http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns。');

    let label1 = ui.label('语言');
    dialog.addAccessoryView(label1);
    let dateLanguage = ui.popupButton(Object.values(supportedLanguages));
    let defaultDateLanguageIndex = Settings.settingForKey('calendar_language_index') || 0;
    dateLanguage.selectItemAtIndex(defaultDateLanguageIndex);
    dialog.addAccessoryView(dateLanguage);

    let label2 = ui.label('日期格式');
    dialog.addAccessoryView(label2);
    let defaultDateFormat = Settings.settingForKey('calendar_date_format') || 'yyyy-MM-dd eeee';
    let dateFormat = ui.input(defaultDateFormat);
    dialog.addAccessoryView(dateFormat);

    let label3 = ui.label('起始日期');
    dialog.addAccessoryView(label3);
    let startDate = ui.datePicker();
    startDate.setDatePickerElements(NSYearMonthDayDatePickerElementFlag|NSYearMonthDatePickerElementFlag);
    let defaultStartTimestamp = Settings.settingForKey('calendar_date_start');
    if (defaultStartTimestamp) {
        let defaultStartDate = date.timestampToNsDate(defaultStartTimestamp);
        startDate.setDateValue(defaultStartDate);
    }
    let startDateView = ui.datePickerWithResetButton(startDate);
    dialog.addAccessoryView(startDateView);

    let label4 = ui.label('递增或递减');
    dialog.addAccessoryView(label4);
    let defaultIncreaseYear = Settings.settingForKey('calendar_increase_year') || 0;
    let defaultIncreaseMonth = Settings.settingForKey('calendar_increase_month') || 0;
    let defaultIncreaseDay = Settings.settingForKey('calendar_increase_day') || 1;
    let increaseYear = ui.stepper(-100, 100, defaultIncreaseYear);
    let increaseMonth = ui.stepper(-12, 12, defaultIncreaseMonth);
    let increaseDay = ui.stepper(-30, 30, defaultIncreaseDay);
    let increaseYearView = ui.stepperWithTextField(increaseYear);
    let increaseMonthView = ui.stepperWithTextField(increaseMonth);
    let increaseDayView = ui.stepperWithTextField(increaseDay);
    let increaseStepperGroup = ui.stepperGroupWithThreeChild(
        [increaseYearView, increaseMonthView, increaseDayView],
        ['年', '月', '日']
    );
    dialog.addAccessoryView(increaseStepperGroup);

    let responseCode = dialog.runModal();
    if (responseCode === 1000) {
        let startNsDate = startDate.dateValue();
        let calendar = NSCalendar.alloc().initWithCalendarIdentifier(NSCalendarIdentifierGregorian);
        let localeIdentifier = Object.keys(supportedLanguages)[dateLanguage.indexOfSelectedItem()];
        let locale = NSLocale.alloc().initWithLocaleIdentifier(localeIdentifier);
        for (let i = 0; i < context.data.requestedCount; i++) {
            let dateComponents = NSDateComponents.alloc().init();
            dateComponents.setYear(increaseYear.integerValue() * i);
            dateComponents.setMonth(increaseMonth.integerValue() * i);
            dateComponents.setDay(increaseDay.integerValue() * i);
            let newNsDate = calendar.dateByAddingComponents_toDate_options(dateComponents, startNsDate, nil);
            let formatter = NSDateFormatter.alloc().init();
            formatter.setLocale(locale);
            formatter.setDateFormat(dateFormat.stringValue());
            let text = String(formatter.stringFromDate(newNsDate));
            DataSupplier.supplyDataAtIndex(context.data.key, text, i);
        }

        let startDateTimestamp = date.nsDateToTimestamp(startNsDate);
        Settings.setSettingForKey('calendar_language_index', dateLanguage.indexOfSelectedItem());
        Settings.setSettingForKey('calendar_date_format', dateFormat.stringValue());
        Settings.setSettingForKey('calendar_date_start', startDateTimestamp);
        Settings.setSettingForKey('calendar_increase_year', increaseYear.integerValue());
        Settings.setSettingForKey('calendar_increase_month', increaseMonth.integerValue());
        Settings.setSettingForKey('calendar_increase_day', increaseDay.integerValue());
    }
};

export function onSupplyChineseCalendar (context) {
    let supportedLanguages = {
        'zh_Hans': '简体',
        'zh_Hant_TW': '繁體, 台湾地区',
        'zh_Hant_HK': '繁體, 香港澳门地区'
    };

    let dialog = ui.dialog('农历', '按照阳历起始日期生成连续农历日期，简体和台湾地区将十一月和十二月分别写作冬月和腊月。\n\n日期格式 "U" 表示干支纪年，"Z" 表示生肖，"M" 表示月，"D" 表示日。');

    let label1 = ui.label('地区');
    dialog.addAccessoryView(label1);
    let dateLanguage = ui.popupButton(Object.values(supportedLanguages));
    let defaultDateLanguageIndex = Settings.settingForKey('chinese_calendar_language_index') || 0;
    dateLanguage.selectItemAtIndex(defaultDateLanguageIndex);
    dialog.addAccessoryView(dateLanguage);

    let label2 = ui.label('日期格式');
    dialog.addAccessoryView(label2);
    let defaultDateFormat = Settings.settingForKey('chinese_calendar_date_format') || 'U年 (Z年) M月D';
    let dateFormat = ui.input(defaultDateFormat);
    dialog.addAccessoryView(dateFormat);

    let label3 = ui.label('起始日期 (阳历)');
    dialog.addAccessoryView(label3);
    let startDate = ui.datePicker();
    startDate.setDatePickerElements(NSYearMonthDayDatePickerElementFlag|NSYearMonthDatePickerElementFlag);
    let defaultStartTimestamp = Settings.settingForKey('chinese_calendar_date_start');
    if (defaultStartTimestamp) {
        let defaultStartDate = date.timestampToNsDate(defaultStartTimestamp);
        startDate.setDateValue(defaultStartDate);
    }
    let startDateView = ui.datePickerWithResetButton(startDate);
    dialog.addAccessoryView(startDateView);

    let localeIdentifier = Object.keys(supportedLanguages)[dateLanguage.indexOfSelectedItem()];
    let startDateLunar = date.nsDateToChineseLunarDate(startDate.dateValue(), localeIdentifier);
    let startDateLunarString = `${startDateLunar.year}年 (${startDateLunar.zodiac}年) ${startDateLunar.month}月${startDateLunar.day}`;
    let startDateLunarLabel = ui.text(startDateLunarString);
    dialog.addAccessoryView(startDateLunarLabel);
    startDate.setCOSJSTargetFunction(sender => {
        localeIdentifier = Object.keys(supportedLanguages)[dateLanguage.indexOfSelectedItem()];
        startDateLunar = date.nsDateToChineseLunarDate(sender.dateValue(), localeIdentifier);
        startDateLunarString = `${startDateLunar.year}年 (${startDateLunar.zodiac}年) ${startDateLunar.month}月${startDateLunar.day}`;
        startDateLunarLabel.setStringValue(startDateLunarString);
    });

    dateLanguage.setCOSJSTargetFunction(sender => {
        localeIdentifier = Object.keys(supportedLanguages)[dateLanguage.indexOfSelectedItem()];
        startDateLunar = date.nsDateToChineseLunarDate(startDate.dateValue(), localeIdentifier);
        startDateLunarString = `${startDateLunar.year}年 (${startDateLunar.zodiac}年) ${startDateLunar.month}月${startDateLunar.day}`;
        startDateLunarLabel.setStringValue(startDateLunarString);
    });

    let todayButton = startDateView.subviews().objectAtIndex(1);
    todayButton.setCOSJSTargetFunction(sender => {
        let today = NSDate.date();
        localeIdentifier = Object.keys(supportedLanguages)[dateLanguage.indexOfSelectedItem()];
        startDateLunar = date.nsDateToChineseLunarDate(today, localeIdentifier);
        startDateLunarString = `${startDateLunar.year}年 (${startDateLunar.zodiac}年) ${startDateLunar.month}月${startDateLunar.day}`;
        startDateLunarLabel.setStringValue(startDateLunarString);
        startDate.setDateValue(today);
    });

    let label4 = ui.label('递增或递减');
    dialog.addAccessoryView(label4);
    let defaultIncreaseYear = Settings.settingForKey('chinese_calendar_increase_year') || 0;
    let defaultIncreaseMonth = Settings.settingForKey('chinese_calendar_increase_month') || 0;
    let defaultIncreaseDay = Settings.settingForKey('chinese_calendar_increase_day') || 1;
    let increaseYear = ui.stepper(-100, 100, defaultIncreaseYear);
    let increaseMonth = ui.stepper(-12, 12, defaultIncreaseMonth);
    let increaseDay = ui.stepper(-30, 30, defaultIncreaseDay);
    let increaseYearView = ui.stepperWithTextField(increaseYear);
    let increaseMonthView = ui.stepperWithTextField(increaseMonth);
    let increaseDayView = ui.stepperWithTextField(increaseDay);
    let increaseStepperGroup = ui.stepperGroupWithThreeChild(
        [increaseYearView, increaseMonthView, increaseDayView],
        ['年', '月', '日']
    );
    dialog.addAccessoryView(increaseStepperGroup);

    let defaultReplaceFirstDayToMonth = Settings.settingForKey('chinese_calendar_replace_first_day_to_month') || false;
    let replaceFirstDayToMonth = ui.checkbox(defaultReplaceFirstDayToMonth, '将"初一"改为月，在日期只有日时选择此项。');
    dialog.addAccessoryView(replaceFirstDayToMonth);

    let responseCode = dialog.runModal();
    if (responseCode === 1000) {
        let startNsDate = startDate.dateValue();
        let calendar = NSCalendar.alloc().initWithCalendarIdentifier(NSCalendarIdentifierChinese);
        for (let i = 0; i < context.data.requestedCount; i++) {
            let dateComponents = NSDateComponents.alloc().init();
            dateComponents.setYear(increaseYear.integerValue() * i);
            dateComponents.setMonth(increaseMonth.integerValue() * i);
            dateComponents.setDay(increaseDay.integerValue() * i);
            let newNsDate = calendar.dateByAddingComponents_toDate_options(dateComponents, startNsDate, nil);
            localeIdentifier = Object.keys(supportedLanguages)[dateLanguage.indexOfSelectedItem()];
            let newChineseLunarData = date.nsDateToChineseLunarDate(newNsDate, localeIdentifier);
            let dateFormatTemplate = String(dateFormat.stringValue());
            let text = dateFormatTemplate.replace(/U/gi, newChineseLunarData.year);
            text = text.replace(/Z/gi, newChineseLunarData.zodiac);
            text = text.replace(/M/gi, newChineseLunarData.month);
            text = text.replace(/D/gi, () => {
                if (replaceFirstDayToMonth.state() && newChineseLunarData.day === DATA_CHINESE_LUNAR_DAYS[0]) {
                    return newChineseLunarData.month + '月';
                }
                else {
                    return newChineseLunarData.day;
                }
            });
            DataSupplier.supplyDataAtIndex(context.data.key, text, i);
        }

        let startDateTimestamp = date.nsDateToTimestamp(startNsDate);
        Settings.setSettingForKey('chinese_calendar_language_index', dateLanguage.indexOfSelectedItem());
        Settings.setSettingForKey('chinese_calendar_date_format', dateFormat.stringValue());
        Settings.setSettingForKey('chinese_calendar_date_start', startDateTimestamp);
        Settings.setSettingForKey('chinese_calendar_increase_year', increaseYear.integerValue());
        Settings.setSettingForKey('chinese_calendar_increase_month', increaseMonth.integerValue());
        Settings.setSettingForKey('chinese_calendar_increase_day', increaseDay.integerValue());
        Settings.setSettingForKey('chinese_calendar_replace_first_day_to_month', replaceFirstDayToMonth.state());
    }
};

// Supply data functions

function supplyOrderedData(context, data, start) {
    if (!start) start = 0;
    for (let i = 0; i < context.data.requestedCount; i++) {
        let dataIndex;
        if (context.data.isSymbolInstanceOverride === 1) {
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
