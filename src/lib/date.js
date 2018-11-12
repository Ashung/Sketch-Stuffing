const DATA_CHINESE_LUNAR_DAYS = require('../data/chinese_lunar_days.json');

const date = {};

date.timestamp = function() {
    return Date.parse(new Date()) / 1000;
};

date.timestampToDate = function(timestamp) {
    return new Date(timestamp * 1000);
};

date.timestampToLocaleString = function(timestamp) {
    return this.timestampToDate(timestamp).toLocaleString();
};

date.timestampToNsDate = function(timestamp) {
    let date = NSDate.dateWithTimeIntervalSince1970(timestamp);
    return date;
};

date.nsDateToTimestamp = function(nsDate) {
    return parseInt(nsDate.timeIntervalSince1970());
};

date.nsDateToChineseLunarDate = function(nsDate, localeIdentifier) {
    let zodiacs = {
        "zh_Hans": ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
        "zh_Hant": ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬']
    };
    let formatter = NSDateFormatter.alloc().init();
    let locale = NSLocale.alloc().initWithLocaleIdentifier(localeIdentifier);
    let calendar = NSCalendar.alloc().initWithCalendarIdentifier(NSCalendarIdentifierChinese);
    formatter.setLocale(locale);
    formatter.setCalendar(calendar);
    formatter.setDateFormat('U');
    let year = String(formatter.stringFromDate(nsDate));
    formatter.setDateFormat('MMMMM');
    let month = String(formatter.stringFromDate(nsDate));
    let yearInt = Number(calendar.component_fromDate(NSCalendarUnitYear, nsDate));
    let monthInt = Number(calendar.component_fromDate(NSCalendarUnitMonth, nsDate));
    let dayInt = Number(calendar.component_fromDate(NSCalendarUnitDay, nsDate));
    let day = DATA_CHINESE_LUNAR_DAYS[dayInt - 1];
    let zodiac = zodiacs[localeIdentifier][(yearInt - 1) % 12];
    return {
        'year': year,
        'zodiac': zodiac,
        'month': month,
        'day': day,
        'yearInt': yearInt,
        'monthInt': monthInt,
        'dayInt': dayInt
    }
};

module.exports = date;